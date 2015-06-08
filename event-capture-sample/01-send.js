function getElementText (element) {
}

function getElementDescription (element, event) {
	if(!element) return '';
	if (element.tagName === 'A') {
		return element.title ? element.title : $(element).text();
	}
	else if (element.tagName === 'BUTTON') {
		return $(element).text();
	}
	else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
		return element.name;
	}
	else if (element.tagName === 'IMG') {
		return element.alt;
	}
	else if(event && event.type === 'click') {
		return getElementDescription($(element).parent('a, button')[0]);
	}
}

function sendEvent (event) {
	dsEventBroker.event.send({
      element: event.target.tagName,
      name: getElementDescription(event.target, event),
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