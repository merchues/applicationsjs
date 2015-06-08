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

        return path.replace(/(?:div|span)\>/g,' ').replace(/\>\s+/g,' ').replace(/^html\>body\>?/,'');
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
	dsEventBroker.event.send({
      element: $(event.target).getPath(),
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
