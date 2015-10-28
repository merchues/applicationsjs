dsEventBroker.when('*', function () {
    return {
        title: document.title
    }
});

dsEventBroker.when('click').then(sendEvent);
dsEventBroker.when('change').then(sendEvent);

