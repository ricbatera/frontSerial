const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const listaLoginSenha = [
    {
        login: "login 1",
        senha: "senha 1"
    },
    {
        login: "login 2",
        senha: "senha 2"
    },
    {
        login: "login 3",
        senha: "senha 3"
    },
    {
        login: "login 4",
        senha: "senha 4"
    }
];
const intervalo = 1000

function tentarLogin(loginSenha, tempo) {
    return new Promise((resolve, reject) => {
        let paylod = ["enter", loginSenha.login, "enter", loginSenha.senha, "enter","\n"];
        const intervalo = 1000
        // paylod.forEach((item) => {
        //     escreveItem(item, tempo);
        // })
        for (let index = 0; index < paylod.length; index++) {
            escreveItem(paylod[index], tempo);
        }
        resolve();
    });
}

function escreveItem(item, tempo){
    setTimeout(()=>{
        console.log(item);
    }, tempo)
}
// tentarLogin(listaLoginSenha[0],1000);

async function execLogin(lista) {
    for (item of lista) {
        await tentarLogin(item, 2000)
        //const resp = await tentarLogin(item,1000)
        //console.log(resp);
    }
}

execLogin(listaLoginSenha);


// listaLoginSenha.forEach((item,i) => {
//     setTimeout(() => {
//         tentarLogin(item)
//     }, i * intervalo)   

// });



//tentarLogin(listaLoginSenha[0]);
/*
const inter = 2000
numeros.forEach((numero, id) => {
    setInterval(() => {
        console.log(`Id: ${id} = numero: ${numero}`)
    }, 2000)
})
*/