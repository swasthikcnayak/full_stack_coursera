const http = require("http");
const hostname = "localhost";
const port = "3000";
const fs = require("fs");
const path = require("path");

const server = http.createServer((req,res) =>
{
    if(req.method=='GET')
    {
        var fileurl;
        if(req.url == '/')
            fileurl = '/index.html'
        else
            fileurl = req.url;
        var filepath = path.resolve('./public')+fileurl;
        var fileext = path.extname(filepath);
        if(fileext == '.html')
        {
            fs.exists(filepath,(exists)=>
            {
                if(!exists)
                {
                    res.statusCode='404';
                    res.setHeader('content-type','text/html');
                    res.end('<html><body><h1>The desired file is not found </h1></body></html>')
                
                }
                else
                {
                    res.statusCode = '200';
                    res.setHeader('content-type','text/html');
                    fs.createReadStream(filepath).pipe(res);
                }
            })
        }
        else
        {
            res.statusCode='404';
            res.setHeader('content-type','text/html');
            res.end('<html><body><h1>Only html files can be served</h1></body></html>')
     
        }
    }
    else
    {
        res.statusCode='404';
        res.setHeader('content-type','text/html');
        res.end('<html><body><h1>Only GET request can be served</h1></body></html>')
    }
})

server.listen(port, hostname, () => {
  console.log(`Server is setup and running at http://${hostname}:${port}`);
});
