Battery Tests.

Runtime: Windows 10; Windows 11 or Proton 9 (Linux)
Patching method: Hosts redirection v1 (installing certificate into system); Hosts redirection v2 (placing certificate in game's directory) or Hosts redirection
EOS: Original or Nemirtingas'
EAC: Original; Dummy (replaceing certificate so it doesn't check anything) or Bypassed (launching the game directly so EAC doesn't start at all. This method requires always Nemirtinga's EOS)
UE4SS (Modding Framework): Enabled or disabled
Result: OK (all joined); KO (client kicked out)
================================
===========Test 1===============
================================
Host:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Windows 11;
Patching method: Hosts redirection v1
EOS: Original
EAC: Original
UE4SS: Disabled

Result: OK

================================
===========Test 2===============
================================
Host:
Runtime: Windows 11;
Patching method: Hosts redirection v1
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled

Result: OK



================================
========Conclusion==============
================================
Hosts redirection v2 is online viable on Windows
================================
===========Test 3===============
================================
Host:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Proton 9;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled

Result: OK

================================
========Conclusion==============
================================
Hosts redirection v2 is online viable on Linux
================================
===========Test 4===============
================================
Host:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Original
EAC: Dummy
UE4SS: Disabled


Client:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled

Result: KO

================================
===========Test 5===============
================================
Host:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Original
EAC: Dummy
UE4SS: Disabled

Result: KO

================================
===========Test 6===============
================================
Host:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Original
EAC: Dummy
UE4SS: Disabled


Client:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Original
EAC: Dummy
UE4SS: Disabled

Result: KO

================================
========Conclusion==============
================================
Dummying-out EAC is NOT viable for online play
================================
===========Test 7===============
================================
Host:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Proton 9;
Patching method: Exe patching
EOS: Original
EAC: Original
UE4SS: Disabled

Result: OK


================================
===========Test 8===============
================================
Host:
Runtime: Proton 9;
Patching method: Exe patching
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Original
EAC: Original
UE4SS: Disabled

Result: OK

================================
===========Test 9===============
================================
Host:
Runtime: Windows 11;
Patching method: Exe patching
EOS: Original
EAC: Original
UE4SS: Disabled


Client:
Runtime: Windows 10;
Patching method: Exe patching
EOS: Original
EAC: Original
UE4SS: Disabled

Result: KO


================================
========Conclusion==============
================================
Exe patching is viable in Linux, but not in Windows
================================
===========Test 10==============
================================
Host:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Nemirtingas
EAC: Bypass
UE4SS: Disabled


Client:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Nemirtingas
EAC: Bypass
UE4SS: Disabled

Result: KO


================================
========Conclusion==============
================================
The kick is not comming from Easy Anticheat Nor Epic Online Services, but from the game itself
================================
===========Test 10==============
================================
Host:
Runtime: Windows 10;
Patching method: Hosts redirection v2
EOS: Nemirtingas
EAC: Bypass
UE4SS: Disabled
Additional Info: Using -fileopenlog argument


Client:
Runtime: Windows 11;
Patching method: Hosts redirection v2
EOS: Nemirtingas
EAC: Bypass
UE4SS: Disabled
Additional Info: Using -fileopenlog argument

Result: KO


================================
========Conclusion==============
================================
-fileopenlog doesn't seem to alieavate the issue