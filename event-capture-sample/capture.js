dsEventBroker.capture('click');
deEventBroker.when('click').then(function (e) {
	console.log(e);
});