function checaLogin(){
    var objUser = localStorage.getItem("dashcardUser");
    if (objUser){
        window.location = "../Workspace_web/html/agentes.html";
    }
}

function logar(){

    var txtLogin = document.getElementById("txtLogin").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Valores digitados: " + txtLogin + " / " + txtSenha);

        //cria o body
    var msgBody = {
        email : txtLogin,
        racf : txtLogin,
        senha : txtSenha
    };

        //cria cabecalho padrao JSON com o  body para o backend
    var cabecalho = {
        method : "POST",
        body : JSON.stringify(msgBody),
        headers : {
            "content-type":"application/json"
        }
    };

        //envia os dados para o backend
    fetch("http://localhost:8080/login", cabecalho).then(res => tratastatus(res));
}

function tratastatus(res){
    if(res.status == 200){
        res.json().then(user => registrarUser(user));
    }else if(res.status == 401){
        document.getElementById("msgErro").innerHTML = "Senha inválida";
    }else if(res.status == 404){
        document.getElementById("msgErro").innerHTML = `<br><br>Usuário não encontrado`;
    }else{
        document.getElementById("msgErro").innerHTML = "Erro desconhecido";
    }
}

function registrarUser(user){
    localStorage.setItem("dashcardUser", JSON.stringify(user));
    window.location = "../Workspace_web/html/agentes.html";
}