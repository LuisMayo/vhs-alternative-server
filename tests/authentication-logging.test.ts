import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { test } from "node:test";
import { format } from "node:util";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Database } from "../src/classes/database";
import { DatabaseShimLayer } from "../src/classes/database-shim";
import { Handler } from "../src/classes/handler";
import { LobbyManager } from "../src/classes/lobby-manager";
import { Logger } from "../src/classes/logger";

// Generated server credentials exercise real JWT verification without external services.
function request(authorization?: string): Request {
  return {
    headers: { authorization },
    header: (name: string) => name.toLowerCase() === "authorization" ? authorization : undefined,
    body: { action: "closeLobby" },
  } as unknown as Request;
}

function response() {
  const result: { status: number; body?: unknown } = { status: 200 };
  const res = {
    send(body: unknown) { result.body = body; return res; },
    sendStatus(status: number) { result.status = status; return res; },
  } as unknown as Response;
  return { res, result };
}

function fixture(t: { after(fn: () => void): void }) {
  const previousDatabase = Database.db;
  const previousLobbies = LobbyManager["currentLobbies"];
  const previousLogs = Logger["logs"];
  const previousLogIndex = Logger["nextLogIndex"];
  const previousArgv = process.argv;
  const previousLog = console.log;
  const messages: string[] = [];
  // Keep externally supplied development switches out of these verification tests.
  process.argv = process.argv.filter(arg => ![
    "--bypassEpicValidation", "--allowNonEpicUsers", "--bypassOwnValidation",
  ].includes(arg));
  LobbyManager["currentLobbies"] = [];
  Database.db = new DatabaseShimLayer();
  Database.db.token = randomBytes(32).toString("hex");
  Logger["logs"] = [];
  Logger["nextLogIndex"] = 0;
  console.log = (...args: unknown[]) => { messages.push(format(...args)); };
  t.after(() => {
    Database.db = previousDatabase;
    LobbyManager["currentLobbies"] = previousLobbies;
    Logger["logs"] = previousLogs;
    Logger["nextLogIndex"] = previousLogIndex;
    process.argv = previousArgv;
    console.log = previousLog;
  });
  return {
    messages,
    assertNotLogged(credential: string) {
      assert.equal(messages.join("\n").includes(credential), false, "credential leaked to console");
      assert.equal(Logger.getLogListHtml().includes(credential), false, "credential leaked to admin log");
    },
  };
}

// These cases replace process globals. Await every child and explicitly disable
// sibling concurrency, even when the runner is invoked with higher concurrency.
test("server-session credential logging", { concurrency: false }, async suite => {
  for (const failure of ["bad signature", "expired", "malformed", "missing"] as const) {
    await suite.test(`rejected session (${failure}) retains a diagnostic without the credential`, async t => {
      const f = fixture(t);
      const token = failure === "missing" ? undefined : failure === "malformed" ? "synthetic-invalid-session-token" :
        jwt.sign({ sub: "test-user" }, failure === "bad signature" ? randomBytes(32) : Database.db.token,
          { expiresIn: failure === "expired" ? -60 : "5m" });
      const { res } = response();
      await assert.rejects(Handler.lobby(request(token ? `Bearer ${token}` : undefined), res), /^Error: 401$/);
      assert.ok(f.messages.some(message => message.includes("INVALID USER TOKEN")));
      assert.ok(Logger.getLogListHtml().includes("INVALID USER TOKEN"));
      if (token) f.assertNotLogged(token);
    });
  }

  await suite.test("a valid server session still reaches the authenticated lobby action", async t => {
    const f = fixture(t);
    const token = jwt.sign("test-user", Database.db.token);
    const lobby = LobbyManager.createLobby("test-user", "synthetic-connection");
    const { res, result } = response();
    await Handler.lobby(request(`Bearer ${token}`), res);
    assert.equal(result.status, 200);
    assert.equal(LobbyManager.getLobbyByCode(lobby.code), undefined);
    f.assertNotLogged(token);
  });
});
