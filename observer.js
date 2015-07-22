function Observable() {
	this.observers = [];
}

Observable.prototype.addObserver = function(observer) {
	this.observers.push(observer);
}

Observable.prototype.hasObserver = function(observer) {
	return this.observers.indexOf(observer) >= 0;
}

Observable.prototype.notifyObservers = function() {
	this.observers.forEach(function(o) {
		o();
	})
}

module.exports = Observable;
