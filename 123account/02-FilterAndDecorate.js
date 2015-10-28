dsEventBroker.when('*').polish(function () {
    return {
        title: document.title
    }
});

dsEventBroker.when('click').then(sendEvent);
dsEventBroker.when('change').then(sendEvent);

dsEventBroker.when('click','form>div:nth-child(5)>button:nth-child(2),form>div:nth-child(5)>button:nth-child(2) *').polish(function() {
                return {
                    customData: {
                        'Account Name':$('label>p').text()
                    }
                };
            }).then(sendEvent);

