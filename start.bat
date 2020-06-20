@echo off
goto console
:console
title BlackDragonBot - ConsoleLog
echo [ Debug ] [ Process Started ] starting BlackGragonBot using bot.js and setting.js..
node bot.js
title BlackDragonBot - ConsoleLog [ !ERROR! ]
echo [ERROR] 
timeout 1 > nul
echo [ Reboot ] 5 The bot will reboot after a second.
title BlackDragonBot - ConsoleLog [ Reboot Countdown: 5 ]
timeout 1 > nul
echo [ Reboot ] 4 The bot will reboot after a second.
title BlackDragonBot - ConsoleLog [ Reboot Countdown: 4 ]
timeout 1 > nul
echo [ Reboot ] 3 The bot will reboot after a second.
title BlackDragonBot - ConsoleLog [ Reboot Countdown: 3 ]
timeout 1 > nul
echo [ Reboot ] 2 The bot will reboot after a second.
title BlackDragonBot - ConsoleLog [ Reboot Countdown: 2 ]
timeout 1 > nul
echo [ Reboot ] 1 The bot will reboot after a second.
title BlackDragonBot - ConsoleLog [ Reboot Countdown: 1 ]
timeout 1 > nul
echo [ Reboot ] 0 The bot will reboot after a second.
title BlackDragonBot - ConsoleLog [ Reboot Countdown: 0 ]
timeout 1 > nul
echo The bot will reboot.
title BlackDragonBot - ConsoleLog [ Please wait ]
goto console