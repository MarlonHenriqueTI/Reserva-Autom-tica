var PageTitleNotification = {
    Vars:{
        OriginalTitle: document.title,
        Interval: null
    },    
    On: function(notification, intervalSpeed){
        var _this = this;
        _this.Vars.Interval = setInterval(function(){
             document.title = (_this.Vars.OriginalTitle == document.title)
                                 ? notification
                                 : _this.Vars.OriginalTitle;
        }, (intervalSpeed) ? intervalSpeed : 1000);
    },
    Off: function(){
        clearInterval(this.Vars.Interval);
        document.title = this.Vars.OriginalTitle;   
    }
}


var myAudio = new Audio();
myAudio.src = chrome.extension.getURL("path/to/alerta.mp3");

window.addEventListener("load", function() {
    iniciarBusca(); 
}, true);

function atualizar(){
    window.location.reload(true);
}

function clicarEconomicaFull(){
    document.querySelectorAll('[data-cy="fullFare_select"]')[0].click();
}

function clicar24Livre() {
    document.querySelectorAll('[data-cy="RadioButtonCo-price-0"]')[0].click();
}

function clicarContinuar() {
    document.querySelectorAll('[data-cy="summaryItineraryPage-continue-btn"]')[0].click();
}


function selecionarPassageiro() {
    //document.querySelectorAll('[data-cy="option0-profile0"]')[0].click();
    alert('Encontrei a passagem, finalize o processo!');
}

function enviarFormulario() {
    document.querySelectorAll('[data-cy="btn-save-form0"]')[0].click();
}

function salvarReserva(){
    document.querySelectorAll('[data-cy="checkoutPage-continue-btn"]')[0].click();
}

function abrirSelect(){
    document.elementFromPoint(351, 823).click();
    console.log("click efetuado");
}

function simulateClick() {
    var evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    var cb = document.getElementById("profile0"); //element to click on
    var canceled = !cb.dispatchEvent(evt);
    if(canceled) {
      // A handler called preventDefault
      console.log("canceled");
    } else {
      // None of the handlers called preventDefault
      HTMLFormControlsCollection.log("not canceled");
    }
  }

function sendMail() {
var link = "mailto:yasmany.guanche24@gmail.com"
		 + "?cc=contato@marlonhenrique.com"
		 + "&subject=" + escape("Nova passagem executiva")
		 + "&body=" + "Foi encontrada uma nova passagem executiva"
;
window.location.href = link;
}

function iniciarBusca(){
    const janeladeerrodat = document.querySelectorAll('[data-cy="NoFlexibleSearchDisclaimer"]');
    const element = document.querySelectorAll('[data-cy="economic_0"]');
    const business = document.querySelectorAll('[data-cy="business_0"]');
    let mensagem;
    if(!janeladeerrodat.length){
        mensagem = "deu bom";
        console.log(mensagem);
        element[0].click();
        chrome.runtime.sendMessage({type: "alertUser"});
        PageTitleNotification.On("Passagem encontrada");
        setTimeout(clicarEconomicaFull, 1000);
        setTimeout(clicar24Livre, 6000);
        setTimeout(clicarContinuar, 8000);
        setTimeout(selecionarPassageiro, 15000);
       // setTimeout(enviarFormulario, 20000);
        //setTimeout(salvarReserva, 22000);
    
        
    } else if(business.length){
        chrome.runtime.sendMessage({type: "alertUser"});
        alert('Atenção, passagem executiva encontrada!');
    } else {
        mensagem = "deu ruim";
        console.log(mensagem);
        setTimeout(atualizar, 27000);
        
    }
    chrome.extension.sendMessage({
        type: "dom-loaded", 
        data: {
            myProperty: mensagem
        }
    });
}

