@echo off 


rem FOR /F "tokens=4 delims= " %%P IN ('netstat -a -n -o ^|
rem  findstr :3000') DO TaskKill.exe /F /PID  %%P 

rem FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8085.*LISTENING') DO TaskKill.exe /PID %%P

set serverPid=
for /F "tokens=5 delims= " %%P in ('netstat -a -n -o ^| findstr  :3000 ') do set serverPid=%%P
if not "%serverPid%" == "" (
  taskkill /F /PID %serverPid%
) else (
   echo Server is not running.
)

 cd  C:\till_now\node_back\nodejsrestapi
 npm start