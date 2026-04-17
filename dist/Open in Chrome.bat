@echo off
set "FILE=%~dp0slp-media-standalone.html"
set "CHROME1=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "CHROME2=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

if exist "%CHROME1%" (
    "%CHROME1%" "%FILE%"
) else if exist "%CHROME2%" (
    "%CHROME2%" "%FILE%"
) else (
    start "" "%FILE%"
)
