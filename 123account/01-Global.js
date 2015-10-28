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
	var value = event.value || event.target.value;
	if(event.target.tagName === 'INPUT' && event.target.type === 'password') {
		value = '*********';
	}
	dsEventBroker.event.send({
      element: $(event.target).getPath(),
      name: event.name || getElementDescription(event.target, event),
      type: event.type,
      value: value,
      timeStamp: event.timeStamp || new Date().getTime(),
      metaData: event.metaData,
      customData: event.customData,
      correlationId: event.correlationId,
      userAgent: event.userAgent,
      url: event.url
    });
}

dsEventBroker.capture('click');
dsEventBroker.capture('change');
