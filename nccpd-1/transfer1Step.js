console.log('Loading nccpd-1-step-transfer-event event listener...');

dsEventBroker.capture('nccpd-1-step-transfer-event');

dsEventBroker.when('nccpd-1-step-transfer-event')
.polish(function(e){
	e.customData = e.detail;
})
.then(function (e) {
    console.log('dsEventBroker -> New nccpd-1-step-transfer-event event listened!', e);
})
.then(sendEvent);

console.log('nccpd-1-step-transfer-event event listener loaded.');
