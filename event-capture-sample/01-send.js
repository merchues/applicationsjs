function getElementDescription (element) {

	if (element.tagName === 'A') {
		return element.title ? element.title : $(element).text();
	}
	else if (element.tagName === 'BUTTON') {
		return $(element).text();
	}
	else if (element.tagName === 'INPUT') {
		return element.name;
	}
}

function sendEvent (event) {
	dsEventBroker.analytics.send({
      element: event.target.tagName,
      name: getElementDescription(event.target),
      type: event.type,
      value: event.target.value,
      timeStamp: event.timeStamp,
      metaData: event.metaData,
      customData: event.customData
    });
}


dsEventBroker.capture('click');
dsEventBroker.capture('change');
dsEventBroker.when('click').then(sendEvent);
dsEventBroker.when('change').then(sendEvent);