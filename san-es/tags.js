jQuery.fn.extend({
    getPath: function () {
        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);
            if (sameTagSiblings.length > 1) {
                var allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path ? path.replace(/(?:div|span)\>/g,' ').replace(/\>\s+/g,' ').replace(/^html\>body\>?/,'') : '?';
    }
});

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
	var value = event.target.value;
	if(event.target.tagName === 'INPUT' && event.target.type === 'password') {
		value = '*********';
	}
	dsEventBroker.event.send({
      element: $(event.target).getPath(),
      name: getElementDescription(event.target, event),
      type: event.type,
      value: value,
      timeStamp: event.timeStamp,
      metaData: event.metaData,
      customData: event.customData,
      correlationId: event.correlationId,
      userAgent: event.userAgent,
      url: event.url
    });
}

dsEventBroker.capture('click');
dsEventBroker.capture('change');
dsEventBroker.when('click').then(sendEvent);
dsEventBroker.when('change').then(sendEvent);

/////////////////////// User agent & location
dsEventBroker.when('*').polish({
	userAgent: navigator.userAgent,
	url: window.location.href
});

/////////////////////// ID generation

function generateUUID(){
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;// jshint ignore:line
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x7|0x8)).toString(16);// jshint ignore:line
	});
	return uuid;

}

window.dsInstanceID = window.dsInstanceID || generateUUID();
window.sessionStorage.dsSessionID = window.sessionStorage.dsSessionID || generateUUID();
window.localStorage.dsBrowserId = window.localStorage.dsBrowserId || generateUUID();

dsEventBroker.when('*').polish({
	correlationId: {
	  session: window.sessionStorage.dsSessionID,
	  browser: window.localStorage.dsBrowserId
	}
});