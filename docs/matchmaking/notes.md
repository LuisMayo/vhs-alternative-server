User clicks on search matchmaking
Client sends this request

```
POST https://mms.api.vhsgame.com/request-guaranteed-match?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd HTTP/1.1
Host: mms.api.vhsgame.com
Accept: /
Accept-Encoding: deflate, gzip
User-Agent: X-UnrealEngine-Agent
Content-Type: application/json
Authorization: Bearer 
Content-Length: 452

{
    "matchmakingTicketId": "REDACTED",
    "playerInfos": [
        {
            "playerId": "62d5cac258b5c17f57086d62",
            "matchmakingPlayerType": 2,
            "matchmakingGroupName": "NoGroup"
        }
    ],
    "cloudScriptVersion": 71,
    "partyMemberAccountIds": [],
    "latencyDatas":
    {
        "us-west-2": 255,
        "us-east-1": 30,
        "eu-central-1": 255
    },
    "charType": "CT_Toad",
    "matchmakingRegion": "MR_US_East1"
}
```

Server replies with

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 126
Connection: keep-alive
Date: Tue, 01 Aug 2023 00:09:43 GMT
x-amzn-RequestId: fecb18dc-aa62-4f0c-9542-5592f33b867f
x-amz-apigw-id: I9EC8FBKvHcFYzg=
X-Amzn-Trace-Id: Root=1-64c84d45-6255e6813679863d45e0df8d;Sampled=0;lineage=1558fd88:0|7c86ad9b:0
X-Cache: Miss from cloudfront
Via: 1.1 f5cdd38f09a779678a15f788f0f3cbe2.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: DEN52-C1
X-Amz-Cf-Id: FgVlyIOSVQ792UDu0dWrbhD0w7hZjUdM8fVdRcWWuEinuQbgn0yduw==

{"Status": "OK", "MatchmakingTicketId": "62d5cac258b5c17f57086d62-967EFA12406C63ABFD22F883DABEACD6-0", "EstimatedWaitTime": 0}骩
Client sends request through Websocket:
{
    "action": "OnQueueAs",
    "matchmakingStatus": "Matchmaking_Started",
    "matchmakingRegion": "MR_US_East1",
    "gameClientGuid": "",
    "playerAccountId": "",
    "displayName": "SkelXton",
    "preferredFaction": "F_Evil",
    "partyId": "",
    "partyMemberPlayerAccountIds": [],
    "characterType": "CT_Toad",
    "matchmakingTicketId": "",
    "matchId": "",
    "dsIpAddress": "",
    "dsPort": 0
} 
```
Server replies through WS
```
{"action": "MatchmakingNotification", "result": true, "backendError": null, "extraMessage": "", "data": {"matchmakingType": "MatchmakingSearching", "serverIp": "", "serverPort": 0, "players": [{"playerAccountId": ""}]}} 
```
(I'm redacting sensitive info)

The cancelling/failing mechanism seems to be really rough and dirty
The server may send this through WS if the server fails
```
{"message": "Internal server error", "connectionId":"I9EA2cmdvHcCIHQ=", "requestId":"I9EDKGoevHcF9SA="}
```
The client may send this to stop matchaking
```
POST https://mms.api.vhsgame.com/stop-matchmaking?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd HTTP/1.1
Host: mms.api.vhsgame.com
Accept: /
Accept-Encoding: deflate, gzip
User-Agent: X-UnrealEngine-Agent
Content-Type: application/json
Content-Length: 161

{
    "playerId": "EMPTY",
    "matchmakingTicketId": "",
    "cloudScriptVersion": 71,
    "gameClientGuid": ""
}
```
The server responding `{"Status": "OK", "MatchmakingTicketId": ""}`
The client may also send through the WS
```
{
    "action": "OnQueueAs",
    "matchmakingStatus": "Matchmaking_CancelledByPlayer" (sometimes "Matchmaking_CancelledByMatchmaker),
    "matchmakingRegion": "MR_US_East1",
    "gameClientGuid": "",
    "playerAccountId": "",
    "displayName": "SkelXton",
    "preferredFaction": "F_None",
    "partyId": "",
    "partyMemberPlayerAccountIds": [],
    "characterType": "CT_Toad",
    "matchmakingTicketId": "",
    "matchId": "",
    "dsIpAddress": "",
    "dsPort": 0
} 
```
Which the server may reply
```
{"action": "MatchmakingNotification", "result": true, "backendError": null, "extraMessage": "", "data": {"matchmakingType": "MatchmakingSearching", "serverIp": "", "serverPort": 0, "players": [{"playerAccountId": "62d5cac258b5c17f57086d62"}]}}
In true Hellbent fashion they decided to make things as weird as possible
Instead of using the websocket only
Luigi003 — 07/26/2024 7:08 PM
They seem to have decided to duplicated all requests/responses across both across the MMS and the WS servers
Anyway let's go back to the analysis 
If the match is found the server informs the client through the websocket
{"action": "MatchmakingNotification", "result": true, "backendError": null, "extraMessage": "", "data": {"matchmakingType": "MatchmakingSucceeded", "serverIp": "", "serverPort": 0, "players": [{"playerAccountId": ""}], "matchmakerSessionId": "64c84f7b37ea62313529e44c", "matchedPlayerAccountIds": ["", "", "", "", ""]}}
```

The client replies telling the server the match is made even while it was the serve which made the match
```
{
    "action": "OnQueueAs",
    "matchmakingStatus": "Matchmaking_Matched",
    "matchmakingRegion": "MR_US_West2",
    "gameClientGuid": "59459062-35cb-4a8b-8b56-2b77ac286bfd",
    "playerAccountId": "",
    "displayName": "SkelXton",
    "preferredFaction": "F_None",
    "partyId": "",
    "partyMemberPlayerAccountIds": [],
    "characterType": "CT_Toad",
    "matchmakingTicketId": "",
    "matchId": "",
    "dsIpAddress": "",
    "dsPort": 0
}
```
Then the client considers interesting to inform MMS of the found match, even while Game Servers already know of it since you know, they made it and they had already informed it 
MMS Client Request:
```
POST https://api.vhsgame.com/metagame/THEEND_Game/Client/InformMatchFound/?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd HTTP/1.1
Host: api.vhsgame.com
Accept-Encoding: deflate, gzip
Content-Type: application/json
Accept: /
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
Content-Length: 1001

{"matchmakingTicketId":1","queueDurationInSeconds":54,"sessionTicketId":"","version":71,"idpk":"10JTNRWH99LJPOP9JRUPC83WB"}
```
RESPONSE:

```
HTTP/1.1 200 OK
Date: Tue, 01 Aug 2023 00:19:08 GMT
Content-Type: application/json
Content-Length: 62
Connection: keep-alive
x-amzn-RequestId: 84c1749c-d61b-4ccf-bc2a-85f328651078
access-control-allow-origin: *
x-amz-apigw-id: I9FbaEjfPHcFdYg=
X-Amzn-Trace-Id: Root=1-64c84f7b-372e95ca1247b4c83fad84d9;Sampled=0;lineage=6fcd151f:0


{"data":{"informSuccess":true},"log":{"logSuccessful":true}}
```

The Monster Client (teens work differently) now makes a Lobby using the CustomLobby call. the server treates it as any other CreateLobby request.
The client then informs API of the custom lobby
```
POST https://api.vhsgame.com/metagame/THEEND_Game/Client/P2pMatch_OnSessionCreated/?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd HTTP/1.1
Host: api.vhsgame.com
Accept-Encoding: deflate, gzip
Content-Type: application/json
Accept: /
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36

{"newCustomCode":"VH9MUC","matchmakerSessionId":"64c84f7b37ea62313529e44c","sessionTicketId":"","version":71,"idpk":"B1DK6SPKVXGD5J6E3RU4S2YJ2"} 
```
Now you may be wondering what's that matchmakerSessionId
Well I am too
It doesn't seem to have been exchanged until this very moment
It literally exists only here
Hellbent strikes again
Ok That's everying a Monster does
Now let's check what a Teen does
The process seems to be exactly the same as the monster up to and including when the match is found
the teen Process is almost the same. Except instead of informing API of the made room it requests the room from it
Request:
```
POST https://api.vhsgame.com/metagame/THEEND_Game/Client/P2pMatch_GetSession/?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd HTTP/1.1
Host: api.vhsgame.com
Accept-Encoding: deflate, gzip
Content-Type: application/json
Accept: /
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.3
Content-Length: 938

{"matchmakerSessionId":"64c853680554f9576b5870d0","sessionTicketId":"","version":71,"idpk":"9K4GH1OH67OAG7ZNB7BR8DH98"}
The serve rreplies with the room code
HTTP/1.1 200 OK
Date: Tue, 01 Aug 2023 00:35:57 GMT
Content-Type: application/json
Content-Length: 104
Connection: keep-alive
x-amzn-RequestId: ddc9960c-dd57-4862-9861-2638d414fa70
access-control-allow-origin: *
x-amz-apigw-id: I9H5KG9aPHcF4Lg=
X-Amzn-Trace-Id: Root=1-64c8536d-4a4eb70929ead2a25820222d


{"data":{"discoverKey":"64c8536dc9b11e6ac215b31e","customCode":"KEUJ3J"},"log":{"logSuccessful":true}}
```
The client then issues a joinlobby request
Exactly the same as if it was a custom lobby
# Additional info
POST /metagame/THEEND_Game/Client/ProcessMatchEvents/?guid=59459062-35cb-4a8b-8b56-2b77ac286bfd HTTP/1.1
That's a request containing all the match info (maybe?)
I guess it would be used for progress and jorneys
We can't decode it
The websocket just listens at / without any specific path
First thing Client does on websocket is loging
Logging in
Request
```
{
    "action": "OnLogin",
    "gameClientGuid": "",
    "clientBuildNumber": "82462",
    "sessionTicketId": "",
    "playerAccountId": "",
    "cloudScriptVersion": 71
}
```
Response
`{"action": "Login", "result": true, "backendError": 0, "extraMessage": "", "data": ""}`
No further request/response is auth as the socket is now considered authenticated
Heartbeat
Client will try to keep the socket open with hearbeats
Request
```
{
    "action": "OnHeartbeat"
}
```
Response
```
{"action": "Heartbeat", "result": true, "backendError": 0, "extraMessage": "", "data": ""}
```