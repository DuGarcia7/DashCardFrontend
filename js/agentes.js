function carregainfo(){
    var objUser = localStorage.getItem("dashcardUser");
    if(!objUser){
        window.location = "../index.html";
    }

    var user = JSON.parse(objUser); //convertendo de string para obj
    document.getElementById("nomeUsuario").innerHTML = `${user.nome}`;

    var userDropdown = `<li><img src="${user.linkFoto}" width="100%">
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item">RACF: <b>${user.racf}</b></a></li>
                        <li><a class="dropdown-item">E-MAIL: <b>${user.email}</b></a></li>`;

    document.getElementById("dropDownItens").innerHTML = userDropdown;

    carregaAgentes();
}

function carregaAgentes(){

    fetch("http://localhost:8080/agentes")
    .then(resultado => resultado.json())
    .then(lista => preenchelista(lista));

}

function preenchelista(lista){
    var strSelect = `<select id="selectAgente" class="form-select">`;
    var strLista = `<div class="row">
                        <div class="col-9"><strong>Agente Financeiro</strong></div>
                        <div class="col-3"><strong>Volume transacional</strong></div>
                    </div>`;
    for(i=0; i<lista.length;i++){
        var agente = lista[i];

        strSelect = strSelect + `<option value="${agente.id}">${agente.nome}</option>`;

        strLista = strLista + `<div class="row">
                                    <div class="col-9"><a href="./dashboard.html?id=${agente.id}">${agente.nome}</a></div>
                                    <div class="col-3">${agente.volumeTransacional}</div>
                                </div>`;
    }
    
    strSelect = strSelect + `</select>`;
    document.getElementById("divAgente").innerHTML = strSelect;
    document.getElementById("infoAgente").innerHTML = strLista;
}

function seleciona(){
    var idAgente = document.getElementById("selectAgente").value;

    if(idAgente == -1){
        alert("Selecione um agente válido")
    }else{
        window.location = "../html/dashboard.html?id="+idAgente;
    }
    return;
}

function deslogar(){
    localStorage.removeItem("dashcardUser");
    window.location = "../index.html";
}