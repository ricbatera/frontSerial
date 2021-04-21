var server = require("express")();
var express = require("express");

server.use(express.static(__dirname + '/public'));
var http = require("http").Server(server);
var io = require("socket.io")(http);

server.get("/", function(req, res){
    res.sendFile("index.html")
    //res.sendFile("script.js")
})

var mySocket;

const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const port = new SerialPort("COM3")
const parser = new Readline({
    delimiter: '\r\n'
  });
port.pipe(parser)
this.dados = [];
let linhaAtual = null;
parser.on('data',(data)=>{
    //console.log(dados)
    //console.log(data)
    linhaAtual = data;
    //dados.push(data)
    io.emit("dadoEqui",{
        valor:data
    })
});
//port.write('config\n')
//port.write('\n')
//port.write('admin\n')


io.on("connection", function(socket){
    console.log("usuario coenctado");
})

http.listen(3000, function(){
    console.log("servidor está no ar!")
})

module.exports ={
    envia : function(){console.log("comando enviado") }
}

function teste(){
    console.log("chamou")
}

server.post("/", function(req, res){
    console.log("chegou requisisção post")
    fazerLogin();
    res.send("null")
    
})

server.post("/enter", function(req, res){
    port.write('\n');
    res.send("null")    
})

server.post("/admin", function(req, res){
    setTimeout(()=>port.write('admin\n'), 500);
    res.send("null")  
})

server.post("/config", function(req, res){
    setTimeout(()=>port.write('config\n\n'), 500);
    res.send("null")
})

function fazerLogin(){
    const numeros =["\n", "admin","\n", "admin","\n","\n","config","\n","\n","\n"]
    var intervalo = 1000
    numeros.forEach((numero, index)=>{
        setTimeout(()=>{
            port.write(numero);
            console.log("Linha Atual:" + linhaAtual);
            if(linhaAtual == "Login incorrect"){
                console.log("parando....")
                return;
            }
        },index *intervalo )
    })
}