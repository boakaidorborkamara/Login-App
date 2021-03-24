const http = require("http");
const fs = require("fs");
const static = require('node-static');

var staticFileServer = new static.Server("./public");



const server = http.createServer((req,res)=>{
    
    if(req.url === '/' && req.method  === 'GET'){
        fs.readFile('index.html', 'utf8', (err,data)=>{
            if(err){
                console.log(err);
            }
            res.end(data);
        })
    }
    else if(req.url === '/login' && req.method === 'GET'){
        fs.readFile('./html/login.html', 'utf8', (err,data)=>{
            if(err){
                console.log(err);
            }
            res.end(data);
        })
    }
    else if(req.url === '/profile' && req.method === "GET"){
        fs.readFile('./html/profile.html', 'utf8',(err,data)=>{
            if(err){
                console.log(err);
            }
            res.end(data);
        })
    }
    else if(req.url === '/register' && req.method === "POST"){
        let user_form_data = "";
        req.on('data',(data)=>{
            user_form_data = JSON.parse(data);
            console.log(user_form_data);
            let send_data = JSON.stringify(user_form_data);
            fs.writeFile('registration.json', send_data, (err)=>{
                if(err){
                    console.log(err)
                    res.end(JSON.stringify({status:1,status_message:'Error!! Account unable to create, try again !'}))
                }
                
                    res.end(JSON.stringify({status:0,status_message:'Account created, login to see profile'}))
                
            })
        })


    }
        
    else if(req.url === '/profile-detail' && req.method === "GET"){
        fs.readFile('registration.json','utf8',(err,data)=>{
            if(err){
                console.log(err);
            }
            res.end(JSON.stringify(data));
        })
    }
    else if(req.url === '/login' && req.method === "POST"){
        req.on('data',(data)=>{
            let login_info = JSON.parse(data);
            console.log(login_info);
            fs.readFile('registration.json','utf8',(err,data)=>{
                if(err){
                    console.log(err)
                }
                let registration_info = JSON.parse(data);
                console.log(registration_info);
                if(login_info['userName'] === registration_info['userName'] && login_info['password'] === registration_info['password']){
                    res.end(JSON.stringify({status:0,status_message:'You have login sucessfully'}));
                }
                else{
                    res.end(JSON.stringify({status:1,status_message:'Login Details Incorrect !'}));
                }
            })
            
        })
    }
    else{
        fs.readFile('./html/404.html','utf8',(err,data)=>{
            res.end(data);
        })
    }
})

server.listen(3200,()=>{
    console.log('server is listening on port 3200');
})
