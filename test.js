var test = require('tape');
var Observable = require('./observer.js');
test('ObservableAddObserverTest', function(assert) {
	var observable = new Observable();
	var observer = function() {};

	observable.addObserver(observer);

	assert.equal(observer, observable.observers[0]);
	assert.end();
});


test('ObservableHasObserverTest', function(assert) {
	var observable = new Observable();
	var observer = function(){};
	observable.addObserver(observer);
	assert.ok(observable.hasObserver(observer));
	assert.end();
})


test('test should return false when no observers', function(assert) {
	var observable = new Observable();
	assert.notOk(observable.hasObserver(function(){}))
	assert.end();
})

test('test should store functions', function(assert) {
	var observable = new Observable();
	var observers = [function(){}, function(){}];

	observable.addObserver(observers[0]);
	observable.addObserver(observers[1]);

	assert.ok(observable.hasObserver(observers[0]));
	assert.ok(observable.hasObserver(observers[1]));

	assert.end();
})
