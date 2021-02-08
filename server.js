const http = require('http');
const fs = require('fs');





let server = http.createServer((req,res)=>{
    res.setHeader('Content-Type' , 'text/html')
    res.statusCode = 200;

    let path = './html/';

    if(req.url === '/'){
        path += 'index.html'
    }
    else if(req.url === '/login'){
        path += 'login.html'
    }
    else if(req.url === '/profile'){
        path += 'profile.html'
    }
    else{
        path += '404.html'
    }

    fs.readFile(path, (err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    })
})

server.listen(3000,()=>{
    console.log('Server is listening to port 3000')
})