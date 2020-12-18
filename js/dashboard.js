function carregaDash(){
    var objUser = localStorage.getItem("dashcardUser");
    if (!objUser){
        window.location = "../index.html";
    }

    var user = JSON.parse(objUser); //convertendo de string para obj
    document.getElementById("nomeUsuario").innerHTML = `<b>${user.nome}</b>`;

    var userDropdown = `<li><img src="${user.linkFoto}" width="100%">
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item">Racf: ${user.racf}</a></li>
                        <li><a class="dropdown-item">E-mail: ${user.email}</a></li>`;

    document.getElementById("dropDownItens").innerHTML = userDropdown;

    // usuario está conectado... preciso consultar o relatórico consolidado no back end
    var strId = window.location.search;
    console.log(strId);

    var idAgente = strId.substr(4);
    console.log("ID recuperado = "+idAgente);

    fetch("http://localhost:8080/transacoesporagente?id="+idAgente)
       .then(res => res.json())
       .then(lista => preencheDash(lista));
}

function preencheDash(lista){
    console.log(lista);
    var nomeAgente;
    var volume;
    var sucesso = 0;
    var falhas = 0;
    var fraudes = 0;

    for (i=0; i<lista.length; i++){
        var ag = lista[i];
        nomeAgente = ag.nomeAgente;
        volume = ag.volume;
        
        if(ag.status == 0){
            sucesso = ag.numeroOP;
        }else if(ag.status == 1){
            falhas = ag.numeroOP;
        }else{
            fraudes = ag.numeroOP;
        }
    }

    document.getElementById("nomeAgente").innerHTML = `${nomeAgente}`;
    document.getElementById("volumeAgente").innerHTML = "Volume Transacional: " + volume;
    document.getElementById("sucesso").innerHTML = sucesso;
    document.getElementById("falhas").innerHTML = falhas;
    document.getElementById("fraudes").innerHTML = fraudes;

    var ctx = document.getElementById('meuGrafico');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Sucesso', 'Falha', 'Fraude'],
            datasets: [{
                label: 'Número de operações',
                data: [sucesso, falhas, fraudes],
                backgroundColor: [
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(149, 149, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)'
                ],
            }]
        },
        options : {
            scales: {
                xAxes: [{
                    gridLines:{
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                        display: false,
                    },
                    display: false,
                }],
                yAxes: [{
                    gridLines:{
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function deslogar(){
    localStorage.removeItem("dashcardUser");
    window.location = "../index.html";
}

function voltar(){
    window.history.back();
}