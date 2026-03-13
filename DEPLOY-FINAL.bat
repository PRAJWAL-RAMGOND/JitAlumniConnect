@echo off
REM Final Production Deployment for GitHub Pages

echo.
echo ========================================
echo   JITCONNECT - FINAL PRODUCTION DEPLOY
echo ========================================
echo.

echo [INFO] Adding all files...
git add .

echo.
echo [INFO] Committing changes...
git commit -m "Production ready: All pages optimized for GitHub Pages"

echo.
echo [INFO] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your site will be live in 1-2 minutes at:
echo https://[username].github.io/JITConnect/
echo.
echo After 2 minutes:
echo 1. Visit your GitHub Pages URL
echo 2. Hard refresh: Ctrl + Shift + R
echo 3. Test all pages
echo.
pause
