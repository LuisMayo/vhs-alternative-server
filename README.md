# vhs-alternative-server
 Reverse engineering notes of Video Horror Society and alternative server maybe

 ## Development
 Install dependencies
 `npm i`
 Run the compiler in watch mode so it autocompiles
 `npm run watch`

 Either press F5 on VSCode to debug the app or run `npm start` to start the server

## Login flow
VHSGame Login request. A request authenticated using a token issued by epicGames with loginRequestToken structure

Discover.
This seems like the main way of retrieveng information. A POST petition to this endpoint makes the server retrieve information?. This petitions are authenticated using an token from Login request.

Information provided can be:
1. Savegame
2. Friend list
3. Store items
4. Progression info (points required for mastery for instance)