function Observable() {
	this.observers = [];
}

Observable.prototype.addObserver = function(observer) {
	this.observers.push(observer);
}

Observable.prototype.hasObserver = function(observer) {
	return true;
}

module.exports = Observable;
