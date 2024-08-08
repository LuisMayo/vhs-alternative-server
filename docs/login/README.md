# Login process:
1. (Steam version Only) Game Client asks Steam for an identity token
2. Game authenticates in Epic Online Services. Either using the Steam token or interfacing with Epic Games Store. EOS checks for ownership of the game in this step
3. Game Client logins into Game/END Server using the token provided by EOS
4. Game Client asks for the save game (/Discover endpoint)