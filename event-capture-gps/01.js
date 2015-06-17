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
  var value = undefined;

  if(event.target) {
    value = event.target.value;
    if(event.target.tagName === 'INPUT' && event.target.type === 'password') {
      value = '*********';
    }
  }
  dsEventBroker.event.send({
      element: $(event.target).getPath(),
      name: getElementDescription(event.target, event),
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

dsEventBroker.when('click').then(sendEvent);
dsEventBroker.when('change').then(sendEvent);
dsEventBroker.when('orientationchange').then(sendEvent);

/////////////////////// User agent & location
dsEventBroker.when('*').polish({
  userAgent: navigator.userAgent,
  url: window.location.href
});

/////////////////////// Orientation change

window.addEventListener('orientationchange', function() {
  // Announce the new orientation number
  window.dsEventBroker.trigger('orientationchange', {metaData:{orientation: screen.orientation}});
}, false);

/////////////////////// Geolocate events

window.$(function () {
  var location;
  function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          setTimeout(getLocation, 100000);
          location = position;
        });
      }
  }
  getLocation();

  window.dsEventBroker.polish(function (){
    return {metaData: {location: location}};
  });

  if(window.addEventListener){
    var angle;
    window.addEventListener('deviceorientation', function(e) {
      angle = {
        absolute: e.absolute,
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
      };
    }, true);

    window.dsEventBroker.polish(function (){
      return {metaData: {angle: angle}};
    });
  }
});