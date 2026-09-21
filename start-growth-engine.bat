@echo off
cd /d "%~dp0"
node --env-file=.env.local scripts\growth-loop.mjs
pause
