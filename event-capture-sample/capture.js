dsEventBroker.capture('click');
dsEventBroker.when('click').then(function (e) {
	console.log(e);
});