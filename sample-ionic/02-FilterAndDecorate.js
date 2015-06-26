dsEventBroker.when('click', {isIonicTap: true}).then(sendEvent);
dsEventBroker.when('change').then(sendEvent);

/////////////////////// User agent & location
dsEventBroker.when('*').polish({
	userAgent: navigator.userAgent,
	url: window.location.href
});
