# VHS Alternative Server
A Video Horror Society server emulator. Allowing users to enjoy Hellbent's developed game after its sunset on September 8th, 2023. Currently Live. Check the official discord server: https://discord.gg/6CQyccRjDR

## What's working?
- ✅ Login
- ❌ Matchmaking
- ❌ Progression (journey, chests)
- ❌ Store
- ✅ Custom Matches
- ✅ Saving game

## How to Install
_The following steps will allow you to seamlessly set up the server structure for clients or hosts._
Manual instructions/developer mode in _Development/Usage_

_Hosts Redirection:_
1. Go to this link and download the latest GUI Coordinator: [Link to script](https://github.com/SkelXton/VHS-Redirector-Scripts/releases/latest)
2. Open VHS Server Coordinator and use the GUI to select your given server and details or set it up to host a game.

_Executable Patching is TBD_

If you ever decide to remove the game and patches, you can use the uninstall script to clean up our patches.

## Development/Usage
### Patching the game
Currently, we have two known methods of patching the game:

|       Method      | Play With Bots | Multiplayer game |      Supported OSs      | Requires Admin |
|:-----------------:|----------------|------------------|:-----------------------:|----------------|
| Hosts Redirection |        ✅       |         ✅        |         Windows         |        ✅       |
| Executable Patching      |        ✅       | 🟡 (Only in Linux/Proton) | Windows; Linux (Proton) |        ❌       |

## Manual Installation

#### Hosts Redirection
In order to patch the game through hosts redirection you need to edit `C:\Windows\system32\drivers\etc\hosts`.
This file serves to redirect certain domains to certain IPs. In this case, we need to redirect all VHS domains to our own. This would need to add the following
```
173.249.51.206     api.vhsgame.com
173.249.51.206     ns.api.vhsgame.com
173.249.51.206     cdn.vhsgame.com
173.249.51.206     mms.api.vhsgame.com
```
(In case you want to self-host change the IP to 127.0.0.1. If you're going to use another server use the IP provided by your server provider)

You also need to install [my CA certificate](https://github.com/LuisMayo/vhs-alternative-server/raw/main/LuigiDevVHSCAv2.crt). If you are running your own server, you will need to generate your own certificate :[Instructions](https://community.spiceworks.com/how_to/1839-installing-self-signed-ca-certificate-in-windows)
Then launch the game as usual

#### Executable Patching
Executable patching consists of modifying the executable to point to a new domain. You need to modify starting on 0x5382CA0 up to 0x5382D1F (Steam) or 0x5381C80 to 0x5381D00(Epic). The text should be encoded using UTF-16(LE). The string must include the protocol and may include 4 string replacement cues (%s). These cues are later replaced by `api`, `client`, the endpoint in particular, and a randomly generated GUID. Any HTTP URL should be fine. TLS is not required so plain HTTP URLs would suffice.

For the official server use this
```
68 00 74 00 74 00 70 00 73 00 3A 00 2F 00 2F 00 61 00 70 00 70 00 73 00 2E 00 6C 00 75 00 69 00 73 00 6D 00 61 00 79 00 6F 00 2E 00 63 00 6F 00 6D 00 2F 00 76 00 68 00 73 00 2D 00 25 00 73 00 2F 00 25 00 73 00 2F 00 25 00 73 00 2F 00 3F 00 67 00 75 00 69 00 64 00 3D 00 25 00 73
```

### Running the server (User)
1. Download a binary from the [Releases section](https://github.com/LuisMayo/vhs-alternative-server/releases) according to your OS/Architecture (check below if there isn't)
2. If using Hosts redirection/TLS you must place an appropiate certificate and key named `vhsgame.com.crt` adn `vhsgame.com.pem`
3. Else you have to launch the app with --disableRealPort which will launch on HTTP/TCP/12478
4. The server will respond to /metagame/THEEND_GAME/Client/<EP> and /vhs-api/Client/<EP> routes

If there are no binaries available for your platform:
1. [Download Node](https://nodejs.org/)
2.  Clone the repo
 `git clone https://github.com/LuisMayo/vhs-alternative-server`
3. Install dependencies
 `npm i`
4. Run the compiler
 `cd vhs-alternative-server; npx tsc`
 Or
 `npm run watch if you want to compile changes automatically`
5. Launch the server
 `npm start`

#### Env variables
The game honors the `VHS-PASSWORD` environment variable and will use for the administration dashboard (user: user)

### Args
- `--disableRealPort` will make it so the game only launches in HTTP mode and listens on port 12478. (The default behaviour is to listen on HTTPS 443)
- `--allowNonEpicUsers` will make it so even if Epic games' token validation fail the user is logged in anyway
- `--bypassEpicValidation` will bypass the validity of the EOS token in any case
- `--disableAdminPassword` will bypass the admin server password

## Login flow
VHSGame Login request. A request is authenticated using a token issued by Epic Games with loginRequestToken structure

Discover.
This seems like the main way of retrieving information. A POST petition to this endpoint makes the server retrieve information?. These petitions are authenticated using a token from Login request.

Information provided can be:
1. Savegame
2. Friend list
3. Store items
4. Progression info (points required for mastery for instance)

**Disclaimer and Legal Notice:**
-------------------------------
This project, *VHS: Evil Never Dies*, is a dedicated media preservation effort for the now-sunset multiplayer game *Video Horror Society*, hereafter referred to as *VHS*. The primary objective of this project is to safeguard and preserve the legacy of *VHS* by archiving its gameplay, media, and related content for the benefit of the game's community.

*VHS: Evil Never Dies* and its contributors are entirely unaffiliated with Hellbent Games Inc., the original developers of *Video Horror Society.* Our project operates independently, with the sole intention of preserving and celebrating the memories associated with *VHS*.

Any references to *Video Horror Society* or related intellectual property are made for historical and archival purposes only. We acknowledge the copyrights and trademarks held by Hellbent Games Inc. and respect their creative work.

No Endorsement Implied

## Contributing
This project welcomes contributions! But in order not to lose focus they need to comply with some rules:
1. This server intends to mimic the original experience to an extent. Quality-of-life improvements or tiny mods may be welcome. But deep modifications that deeply change how the game works are not welcomed (not like the Server has that power anyway since the game is P2P)
2. Typings are welcome. Submitting pure JS code will be refused, submitting poorly typed TS code is still accepted but the MR will probably take longer to accept as we solve the typing problems
