var test = require('tape');
var Observable = require('./observer.js');
test('ObservableAddObserverTest', function(assert) {
	var observable = new Observable();
	var observer = function() {};

	observable.addObserver(observer);

	assert.deepEqual(observer, observable.observers[0]);
})
