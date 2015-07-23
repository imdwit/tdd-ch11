
var addObserver = function(observer) {
	if(typeof observer !== 'function') {
		throw new TypeError('observer is not a function');
	}
	this.observers = this.observers || [];
	this.observers.push(observer);
}

var hasObserver = function(observer) {
	this.observers = this.observers || [];
	return this.observers.indexOf(observer) >= 0;
}

var notifyObservers = function() {
	var args = arguments;
	this.observers = this.observers || [];
	this.observers.forEach(function(o) {
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
