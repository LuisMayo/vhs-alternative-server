# vhs-alternative-server
A Video Horror Society server emulator. Allowing users to enjoy Hellbent's developed game after its sunsetting in September, 2023.

## Development/Usage
### Patching the game
(An app to make it easier to patch the game is in the works)
Currently we have two known methods of patching the game:

|       Method      | Play With Bots | Multiplayer game |      Supported OSs      | Requires Admin |
|:-----------------:|----------------|------------------|:-----------------------:|----------------|
| Hosts Redirection |        ✅       |         ✅        |         Windows         |        ✅       |
| Exe Patching      |        ✅       |         ❌        | Windows; Linux (Proton) |        ❌       |

#### Hosts Redirection
In order to patch the game through hosts redirection you need to edit `C:\Windows\system32\drivers\etc\hosts`.
This file serves to redirect certain domains to certain IPs. In this case we need to redirect all VHS domains to our own. This would need to add the following
```TBD```
(In case you want to self-host change the IP to 127.0.0.1. If you're going to use another server use the IP provided by your server provider)
You also need to install [my CA certificate](https://github.com/LuisMayo/vhs-alternative-server/raw/main/LuigiDevGoodCA.crt) (or the other server's one). [Instructions](https://community.spiceworks.com/how_to/1839-installing-self-signed-ca-certificate-in-windows)
Then launch the game as usual

#### Exe Patching
Exe patching consists on modifying the executable fail to point to a new domain

### Running the server
 Install dependencies
 `npm i`
 Run the compiler in watch mode so it autocompiles
 `npm run watch`

 Either press F5 on VSCode to debug the app or run `npm start` to start the server

 

## Login flow
VHSGame Login request. A request authenticated using a token issued by epicGames with loginRequestToken structure

Discover.
This seems like the main way of retrieving information. A POST petition to this endpoint makes the server retrieve information?. This petitions are authenticated using an token from Login request.

Information provided can be:
1. Savegame
2. Friend list
3. Store items
4. Progression info (points required for mastery for instance)
