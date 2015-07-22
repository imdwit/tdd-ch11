var test = require('tape');
var Observable = require('./observer.js');
test('ObservableAddObserverTest', function(assert) {
	var observable = new Observable();
	var observer = function() {};

	observable.addObserver(observer);

	assert.equal(observer, observable.observers[0]);
	assert.end();
});
