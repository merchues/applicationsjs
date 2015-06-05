function sendClickEvent (event) {
	dsEventBroker.event.send({
      element: event.target.tagName,
      name: event.target.name,
      type: event.type,
      value: event.target.value,
      timeStamp: event.timeStamp,
      metaData: event.metaData,
      customData: event.customData
    });
}


dsEventBroker.capture('click');
dsEventBroker.when('click').then(sendClickEvent);