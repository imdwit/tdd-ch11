function _observers(observable, event) {
	if(!observable.observers) {
		observable.observers = {};
	}

	if(!observable.observers[event]) {
		observable.observers[event] = [];
	}

	return observable.observers[event];
}


var addObserver = function(event, observer) {
	if(typeof observer !== 'function') {
		throw new TypeError('observer is not a function');
	}

	_observers(this, event).push(observer);
}

var hasObserver = function(event, observer) {
	var observers = _observers(this, event);
	return observers.indexOf(observer) >= 0;
}

var notifyObservers = function(event) {
	var args = Array.prototype.slice.call(arguments, 1);
	var observers = _observers(this, event);

	observers.forEach(function(o) {
		try {
			o.apply(this, args);
		}
		catch(e) {

		}
	})
}



module.exports = {
	addObserver: addObserver,
	hasObserver: hasObserver,
	notifyObservers: notifyObservers
};
