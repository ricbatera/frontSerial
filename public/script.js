console.log("app iniciado")
var socket = io();
var linhas = ["first"];
socket.on("dadoEqui", function(dado){
    //console.log(dado);
    linhas.push(dado);
    atualizaTerminal(dado);
})