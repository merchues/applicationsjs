console.log('Loading nccpd-answer-event event listener...');

dsEventBroker.capture('nccpd-answer-event');

dsEventBroker.when('nccpd-answer-event')
.polish(function(e){
	e.customData = e.detail;
})
.then(function (e) {
    console.log('dsEventBroker -> New nccpd-answer-event event listened!', e);
})
.then(sendEvent);

console.log('nccpd-answer-event event listener loaded.');
