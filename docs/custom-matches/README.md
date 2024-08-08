1. User Alice hosts a room.
2. Game Client asks EOS for a Room, EOS returns Client the room information
3. Game Client asks Game Server for a Room. Game Client provides Game Server with the room information from EOS. Game Server returns a room code (ex: F5JQ9) which the Game Client Will display to the User
4. Alice sends the code to Bob
------
5. Bob enters the code in Game Client
6-Game Client asks Game Server for a Room with the code F5JQ9. Game Server returns the EOS room ID
Game Client asks EOS to join the room with the ID provided by the game server.
From this point on, ALL interactions, including the gameplay itself, are handled in a P2P manner using EOS as the channel