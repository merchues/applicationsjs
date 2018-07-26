console.log('Loading nccpd-end-event event listener...');

dsEventBroker.capture('nccpd-end-event');

dsEventBroker.when('nccpd-end-event')
.polish(function(e){
	e.customData = e.detail;
})
.then(function (e) {
    console.log('dsEventBroker -> New nccpd-end-event event listened!', e);
})
.then(sendEvent);

console.log('nccpd-end-event event listener loaded.');
