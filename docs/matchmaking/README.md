# Server topology
The Game Server (The one the END project emulates) is actually 4 different servers in a trenchcoat

1. api.vhsgame.com: The main server, it handles Custom Matches, Login, SaveGame and Store. This is the only server the END project (partially) implements right now
2. cdn.vhsgame.com: Unknown purpose
3. ns.api.vhsgame.com: WebSocket server which aids in the Matchmaking process
4. mms.api.vhsgame.com: Matchmaking REST server

# Matchmaking summarized flow
1. Client posts request-guaranteed-match
2. Client signals the websocket iit's matchamking
 
3. If something fails a thousand messages flow in both channels from both directions
4. If match is found, Server informs client through WS
5. Client informs server through REST and WS the match is found
6. If monster, Client issues a createLobby request, followed by a REST request to inform the lobby code
7. If Teen, Cient issues a REST request to ask the lobby code, followed by a joinLobby request
8. Everyone is happy
9. The primary ID should be the user ID
