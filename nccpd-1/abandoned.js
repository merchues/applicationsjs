console.log('Loading nccpd-abandoned-event event listener...');

dsEventBroker.capture('nccpd-abandoned-event');

dsEventBroker.when('nccpd-abandoned-event')
.polish(function(e){
	e.customData = e.detail;
})
.then(function (e) {
    console.log('dsEventBroker -> New nccpd-abandoned-event event listened!', e);
})
.then(sendEvent);

console.log('nccpd-abandoned-event event listener loaded.');