@echo off
echo Starting SLP Media dev server...
echo Open your browser to: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server.
echo.
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=path.join(__dirname,req.url==='/'?'index.html':req.url);if(!fs.existsSync(f))f=path.join(__dirname,'index.html');const ext=path.extname(f);const mime={'html':'text/html','js':'application/javascript','css':'text/css','png':'image/png','jpg':'image/jpeg','svg':'image/svg+xml','ico':'image/x-icon'};res.setHeader('Content-Type',mime[ext.slice(1)]||'text/plain');fs.createReadStream(f).pipe(res)}).listen(5173,()=>console.log('Server running at http://localhost:5173'))"
pause
