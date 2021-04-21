var server = require("express")();
var express = require("express");
var cors = require('cors');

server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(express.static(__dirname + '/public'), cors());
var http = require("http").Server(server);
var io = require("socket.io")(http);

server.get("/", function (req, res) {
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
parser.on('data', (data) => {
    //console.log(dados)
    //console.log(data)
    linhaAtual = data;
    //dados.push(data)
    io.emit("dadoEqui", {
        valor: data
    })
});
//port.write('config\n')
//port.write('\n')
//port.write('admin\n')


io.on("connection", function (socket) {
    console.log("usuario coenctado");
})

http.listen(3000, function () {
    console.log("servidor está no ar!")
})

module.exports = {
    envia: function () { console.log("comando enviado") }
}

function teste() {
    console.log("chamou")
}

server.post("/", function (req, res) {
    let userSenha = req.body;
    //console.log(req.body);
    //console.log("chegou requisisção post")
    fazerLogin(userSenha);
    res.send("null")

})

server.post("/enter", function (req, res) {
    port.write('\n');
    res.send("null")
})

server.post("/admin", function (req, res) {
    setTimeout(() => port.write('admin\n'), 500);
    res.send("null")
})

server.post("/config", function (req, res) {
    setTimeout(() => port.write('config\n\n'), 500);
    res.send("null")
})

function fazerLogin(userSenha) {
    //console.log(userSenha)
    
    let tentativa = 0;
    let naoOk = true
    while(naoOk){
        let login = userSenha[tentativa].login;
        let senha = userSenha[tentativa].senha;
        const numeros = ["\n", login, "\n", senha, "\n"]
        if(!tentar(numeros)){
            naoOk = false
        }
    }
    function tentar(dadosLogin){
        var intervalo =1000
        dadosLogin.forEach((numero, index) => {
            setTimeout(() => {
                port.write(numero);
                console.log("Linha Atual:" + linhaAtual);
                if (linhaAtual == "Login incorrect") {
                    console.log(tentativa);
                    tentativa++;
                    console.log(tentativa);
                    return true;
                }
                
                //naoOk = false;
            }, index * intervalo)
        })
        return false;
    }

}