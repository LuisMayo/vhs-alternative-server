import {
  LoginData,
  Log,
  LoginRequest,
  LoginResponse,
} from "../types/vhs-the-game-types";

export class DummyLogin implements LoginResponse {
  data: LoginData;
  log: Log;
  constructor(data: LoginRequest) {
    this.log = { logSuccessful: true };
    this.data = {
      backendTitleId: "0",
      displayName: "Dummy",
      playerAccountId: crypto.randomUUID(),
      sessionTicketId: 'dummy',
      showEula: false,
      storeUrl: '',
      warnDbTimestamp: ''
    };
  }
}
