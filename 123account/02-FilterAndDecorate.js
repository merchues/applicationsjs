//EVENTOS A CAPTURAR
dsEventBroker.when('click').then(sendEvent);
dsEventBroker.when('change').then(sendEvent);

//ENRIQUECIMIENTO
dsEventBroker.when('*').polish(function () {
    return {
        customData: {
            title: document.title,
            clientId: utag_data.cod_cliente,
            uid: utag_data.uid
        }
    }
});

