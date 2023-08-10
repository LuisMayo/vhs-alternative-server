# vhs-alternative-server
A Video Horror Society server emulator. Allowing users to enjoy Hellbent's developed game after its sunset on September 8th, 2023.

## How to Install
_The following steps will allow you to seamlessly set up the server structure for clients or hosts._
1. Go to this link and install the latest tools: [Link to scripts](https://github.com/SkelXton/VHS-Redirector-Scripts/releases/latest)
2. Run the installation script with Administrator Privileges.
3. Open the VHS Server Coordinator and use the GUI to select your given server and details or set it up to host a game.

If you ever decide to remove the game and patches, you can use the uninstall script to clean up our patches.

## Development/Usage
### Patching the game
Currently, we have two known methods of patching the game:

|       Method      | Play With Bots | Multiplayer game |      Supported OSs      | Requires Admin |
|:-----------------:|----------------|------------------|:-----------------------:|----------------|
| Hosts Redirection |        ✅       |         ✅        |         Windows         |        ✅       |
| Executable Patching      |        ✅       |         ❌        | Windows; Linux (Proton) |        ❌       |

#### Hosts Redirection
In order to patch the game through hosts redirection you need to edit `C:\Windows\system32\drivers\etc\hosts`.
This file serves to redirect certain domains to certain IPs. In this case, we need to redirect all VHS domains to our own. This would need to add the following
```
173.249.51.206    api.vhsgame.com
173.249.51.206     ns.api.vhsgame.com
173.249.51.206     cdn.vhsgame.com
173.249.51.206     mms.api.vhsgame.com
```
(In case you want to self-host change the IP to 127.0.0.1. If you're going to use another server use the IP provided by your server provider)

You also need to install [my CA certificate](https://github.com/LuisMayo/vhs-alternative-server/raw/main/LuigiDevGoodCA.crt) (or the other server's one). [Instructions](https://community.spiceworks.com/how_to/1839-installing-self-signed-ca-certificate-in-windows)
Then launch the game as usual

#### Executable Patching
Executable patching consists of modifying the executable to point to a new domain. You need to modify starting on 0x5382CA0 up to 0x5382D1F. The text should be encoded using UTF-16(LE). The string must include the protocol and 4 string replacement cues (%s). These cues are later replaced by `api`, `client`, the endpoint in particular, and a randomly generated GUID. Any HTTP URL should be fine. TLS is not required so plain HTTP URLs would suffice.
Currently, the "official" server does not support this method of connecting (self-hosting should do). It will be supported soon

### Running the server (User)
1. Download a binary from the [Releases section](https://github.com/LuisMayo/vhs-alternative-server/releases) according to your OS/Architecture
2. Double-click on it

If there are no binaries available for your platform:
1. [Download Node](https://nodejs.org/)
2.  Clone the repo
 `git clone https://github.com/LuisMayo/vhs-alternative-server`
3. Install dependencies
 `npm i`
4. Run the compiler in watch mode so it auto compiles
 `cd vhs-alternative-server; npx tsc`
5. Launch the server
 `npm start`


### Running the server (development)
(If you're only interested in using the server rather than developing it, ignore this section)
 Clone the repo
 `git clone https://github.com/LuisMayo/vhs-alternative-server`
 Install dependencies
 `npm i`
 Run the compiler in watch mode so it auto compiles
 `npm run watch`

 Either press F5 on VSCode to debug the app or run `npm start` to start the server

 
 

## Login flow
VHSGame Login request. A request is authenticated using a token issued by Epic Games with loginRequestToken structure

Discover.
This seems like the main way of retrieving information. A POST petition to this endpoint makes the server retrieve information?. These petitions are authenticated using a token from Login request.

Information provided can be:
1. Savegame
2. Friend list
3. Store items
4. Progression info (points required for mastery for instance)

## Contributing
This project welcomes contributions! But in order not to lose focus they need to comply with some rules:
1. This server intends to mimic the original experience to an extent. Quality-of-life improvements or tiny mods may be welcome. But deep modifications that deeply change how the game works are not welcomed (not like the Server has that power anyway since the game is P2P)
2. Typings are welcome. Submitting pure JS code will be refused, submitting poorly typed TS code is still accepted but the MR will probably take longer to accept as we solve the typing problems
