console.log('Loading nccpd-generic-event event listener...');

dsEventBroker.capture('nccpd-generic-event');

dsEventBroker.when('nccpd-generic-event')
.polish(function(e){
	e.customData = e.detail;
})
.then(function (e) {
    console.log('dsEventBroker -> New nccpd-generic-event event listened!', e);
})
.then(sendEvent);

console.log('nccpd-generic-event event listener loaded.');
