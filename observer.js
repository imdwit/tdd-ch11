function Observable() {
	this.observers = [];
}

Observable.prototype.addObserver = function(observer) {
	if(typeof observer !== 'function') {
		throw new TypeError('observer is not a function');
	}
	this.observers.push(observer);
}

Observable.prototype.hasObserver = function(observer) {
	return this.observers.indexOf(observer) >= 0;
}

Observable.prototype.notifyObservers = function() {
	var args = arguments;
	this.observers.forEach(function(o) {
		try {
			o.apply(this, args);
		}
		catch(e) {
			
		}
	})
}

module.exports = Observable;
