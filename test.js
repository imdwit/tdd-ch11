var test = require('tape');
var Observable = require('./observer.js');
test('ObservableAddObserverTest', function(assert) {
	var observable = Object.create(Observable);
	var observer = function() {};
	var observers = [function(){}, function(){}];


	observable.addObserver('event', observers[0]);
	observable.addObserver('event', observers[1]);

	assert.ok(observable.hasObserver('event', observers[0]));
	assert.ok(observable.hasObserver('event', observers[1]));
	assert.end();
});


test('ObservableHasObserverTest', function(assert) {
	var observable = Object.create(Observable);
	var observer = function(){};
	assert.notOk(observable.hasObserver('event', observer));
	assert.end();
})


test('test should return false when no observers', function(assert) {
	var observable = Object.create(Observable);
	assert.doesNotThrow(function() {
		observable.notifyObservers();
	})
	assert.end();
})

test('test should store functions', function(assert) {
	var observable = Object.create(Observable);
	var observers = [function(){}, function(){}];

	observable.addObserver('event', observers[0]);
	observable.addObserver('event', observers[1]);

	assert.ok(observable.hasObserver('event', observers[0]));
	assert.ok(observable.hasObserver('event', observers[1]));

	assert.end();
})

test('ObservableNotifyObserversTest', function(assert) {
	//test should call all observers
	var observable = Object.create(Observable);
	var ob1 = function(){ob1.called = true};
	var ob2 = function(){ob2.called = true};

	observable.addObserver('event', ob1);
	observable.addObserver('event', ob2);
	observable.notifyObservers('event');

	assert.ok(ob1.called);
	assert.ok(ob2.called);

	assert.end();
})

test('testShouldPassArguments', function(assert) {
	var observable = Object.create(Observable);
	var actual;

	observable.addObserver('event', function() {
		actual = arguments;
	});

	observable.notifyObservers('event', 'String', 1, 32);

	assert.deepEqual(['String', 1,32], actual);

	assert.end();
})


test('should throw for uncallable observer', function(assert) {
	var observable = Object.create(Observable);

	assert.throws(function() {
		observable.addObserver({});
	}, 'TypeError');

	assert.end();
})


test('should notify all even when some fail', function(assert) {
	var observable = Object.create(Observable);
	var o1 = function() {throw new Error('oops')};
	var o2 = function() {o2.called = true};

	observable.addObserver('event', o1);
	observable.addObserver('event', o2);
	observable.notifyObservers('event');

	assert.ok(o2.called);

	assert.end();
})

test('should call observers in the order they were added', function(assert) {
	var observable = Object.create(Observable);
	var calls = [];
	var ob1 = function() {calls.push(ob1)};
	var ob2 = function() {calls.push(ob2)};

	observable.addObserver('event', ob1);
	observable.addObserver('event', ob2);

	observable.notifyObservers('event');

	assert.deepEqual(ob1, calls[0]);
	assert.deepEqual(ob2, calls[1]);
	assert.end();
})


test('should notify relevant observers only', function(assert) {
	var observable = Object.create(Observable);
	var calls = [];

	observable.addObserver('event', function() {
		calls.push('event');
	})

	observable.addObserver('other', function() {
		calls.push('other');
	})

	observable.notifyObservers('other');

	assert.deepEqual(['other'], calls);

	assert.end();
})
