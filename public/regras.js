const subGrupoModelo = document.getElementById("subgrupo-modelo");
const subGrupoTipoEquipamento = document.getElementById("grupo-tipo-equipamento");
const imagemSelecionada = document.getElementById("imagem-selecionada");
const terminal = document.getElementById("terminal");
const userSenha = []

const httpRequest = new XMLHttpRequest();

const modelosRouter = ["Cisco 1905", "Cisco 2800", "3Com 5012"]
const modelosEDD = ["DM 2104", "DM 4000", "DM 3000"]


subGrupoTipoEquipamento.addEventListener('change',()=>{
    if(subGrupoTipoEquipamento.value == 2){
        subGrupoModelo.options.length = 0;
        subGrupoModelo.options[0] = new Option("Escolha um modelo","", true)
        modelosRouter.forEach(modelo =>{
            option = new Option(modelo);
            subGrupoModelo.options[subGrupoModelo.options.length] = option;
        })
    }else if (subGrupoTipoEquipamento.value == 1){
        subGrupoModelo.options.length = 0;
        subGrupoModelo.options[0] = new Option("Escolha um modelo","", true)
        modelosEDD.forEach(modelo =>{
            option = new Option(modelo);
            subGrupoModelo.options[subGrupoModelo.options.length] = option;
        })
    }
})

subGrupoModelo.addEventListener('change',()=>{
    if(subGrupoModelo.value == "DM 2104"){
        imagemSelecionada.hidden = false;
        imagemSelecionada.src = "images/dm2104.jpg";
        userSenha.push({login: "admini", senha:"admin"});
        userSenha.push({login: "admin", senha:"admin"});
    }else if (subGrupoModelo.value == "Cisco 1905"){
        imagemSelecionada.hidden = false;
        imagemSelecionada.src = "images/cisco1905.jpg"
    }else{
        imagemSelecionada.hidden = true;
    }
})

function atualizaTerminal(linhas){
    console.log(linhas.valor)
    terminal.append(linhas.valor + "\n")
    terminal.scrollTop = terminal.scrollHeight // regra para rolar a tela do terminal sozinho
}

function login(){
    console.log('botao clicado')
    httpRequest.open('POST', 'http://localhost:3000/');
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4) {
            if(httpRequest.status == 200) {
                console.log(httpRequest.responseText);
            }
        }
    };
    httpRequest.send(JSON.stringify(userSenha));
}

function comando(){
    const cxComando = document.getElementById('digite').value;
    httpRequest.open('POST', 'http://localhost:3000/comando');
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4) {
            if(httpRequest.status == 200) {
                console.log(httpRequest.responseText);
            }
        }
    };
    httpRequest.send(JSON.stringify({comando: cxComando}));
}