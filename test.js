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

test('ObservableNotifyObserversTest', function(assert) {
	//test should call all observers
	var observable = new Observable();
	var ob1 = function(){ob1.called = true};
	var ob2 = function(){ob2.called = true};

	observable.addObserver(ob1);
	observable.addObserver(ob2);
	observable.notifyObservers();

	assert.ok(ob1.called);
	assert.ok(ob2.called);

	assert.end();
})

test('testShouldPassArguments', function(assert) {
	var observable = new Observable();
	var actual;

	observable.addObserver(function() {
		actual = arguments;
	});

	observable.notifyObservers('String', 1, 32);

	assert.deepEqual(['String', 1,32], actual);

	assert.end();
})
