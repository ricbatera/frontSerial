console.log("app iniciado")
var socket = io();
socket.on("dadoEqui", function(dado){
    console.log(dado);
})