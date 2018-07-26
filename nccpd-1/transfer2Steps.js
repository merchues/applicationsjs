console.log('Loading nccpd-2-steps-transfer-event event listener...');

dsEventBroker.capture('nccpd-2-steps-transfer-event');

dsEventBroker.when('nccpd-2-steps-transfer-event')
.polish(function(e){
	e.customData = e.detail;
})
.then(function (e) {
    console.log('dsEventBroker -> New nccpd-2-steps-transfer-event event listened!', e);
})
.then(sendEvent);

console.log('nccpd-2-steps-transfer-event event listener loaded.');
