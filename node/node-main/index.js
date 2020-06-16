const http = require('http');
const hostname = 'localhost';
const port= '3000';
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res) => {
   console.log('Request for '+req.url+' by method '+req.method)
    if(req.method == 'GET')
    {
        var fileURl;
        if(req.url == '/')
            fileURl = '/index.html';
        else 
            fileURl = req.url;

        var filePATH = path.resolve('./public'+fileURl);
        const fileExt = path.extname(filePATH);
        if(fileExt == '.html')
        {
            fs.exists(filePATH,(exists)=>
            {
                if(!exists)
                {
                    res.statusCode = '404';
                    res.setHeader('Content-type','text/html');
                    res.end('<html><body><h1>Error 404: '+fileURl+' not found</h1></body></html>')
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-type','text/html');
                fs.createReadStream(filePATH).pipe(res);
            });
        }
        else{
            res.statusCode = '404';
            res.setHeader('Content-type','text/html');
            res.end('<html><body><h1>Error 404: '+fileURl+' is not of html format</h1></body></html>')
            return;
        }
    }
    else{

        res.statusCode = '404';
        res.setHeader('Content-type','text/html');
        res.end('<html><body><h1>Error 404: '+req.method+' is not supported</h1></body></html>')
        return;
    }
})

server.listen(port,hostname,()=>
{
    console.log(`Server is setup and running at http://${hostname}:${port}`)
})

