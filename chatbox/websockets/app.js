const express = require('express')
const path =   require('path')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')


const wss = new WebSocket.Server({server})

//app.use(express.static(path.join(__dirname,'public')));



wss.on('connection',function connection(ws){
    console.log('a new client connected!');
    ws.send('Welcome new client1')
    ws.send('welcome to chatbox')

    ws.on('message', function incoming(message){
        console.log('recieved:',message);
       
       
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
          });
    })
})




app.get('/',(req,res)=> res.send('hello world'))

server.listen(3000,()=>console.log('server is running'))