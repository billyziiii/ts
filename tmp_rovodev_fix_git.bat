@echo off
echo Fixing Git repository issues...
echo.

REM 1. Check if apps/server is a submodule and fix it
echo Checking apps/server directory...
if exist "apps\server\.git" (
    echo Found .git in apps/server - removing submodule reference...
    rmdir /s /q "apps\server\.git"
)

REM 2. Remove any git submodule references
if exist ".gitmodules" (
    echo Removing .gitmodules file...
    del ".gitmodules"
)

REM 3. Force add all files
echo Force adding all files...
git add . --force

REM 4. Check what's staged
echo Checking staged files...
git status

REM 5. Create initial commit if files are staged
echo Creating initial commit...
git commit -m "Initial commit: Fullstack gambling app with NestJS backend and React frontend"

REM 6. Check if commit was successful
git log --oneline -1

REM 7. Push to GitLab
echo Pushing to GitLab...
git push -u origin main

echo.
echo Fix attempt complete!
pause