# vhs-alternative-server
 Reverse engineering notes of Video Horror Society and alternative server maybe

## Login flow
VHSGame Login request. A request authenticated using a token issued by epicGames with loginRequestToken structure

Discover.
This seems like the main way of retrieveng information. A POST petition to this endpoint makes the server retrieve information?. This petitions are authenticated using an token from Login request.

Information provided can be:
1. Savegame
2. Friend list
3. Store items
4. Progression info (points required for mastery for instance)