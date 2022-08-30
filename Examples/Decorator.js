'use strict';
var exampleMemo = function ( qwe, asd ) {
	console.log(qwe + asd);
	return qwe + asd;
};
var exampleDeb  = function ( qwe, asd ) {
	console.log(qwe + asd);
	return qwe + asd;
};
var exampleTrot = function ( qwe, asd ) {
	console.log(qwe + asd);
	return qwe + asd;
};

//Memoization + Decorator
function Memoization( fn ) {
	var cache = {};
	return function () {
		var key = JSON.stringify(arguments);
		if (!(key in cache)){
			cache[key] = fn.apply(this, arguments);
		}
		else {
			console.log('Memoization: take from cache')
		}
		return cache[key];
	};
};

//Debounce Decorator
//https://learn.javascript.ru/task/debounce
function debounce( fn, delay ) {
	var state = null;
	return function () {
		if (state){
			console.log('Debounce: not!');
			return;
		}
		fn.apply(this, arguments);
		state = true;
		setTimeout(function () {
			state = false;
		}, delay);
	}
};

//Throttle Decorator
//https://learn.javascript.ru/task/throttle
function throttle( fn, delay ) {
	var isThrottled = null,
	    args        = null,
	    self        = null;

	return function wrapper() {
		if (isThrottled){ // (2)
			console.log('Throttle: not!');
			args = arguments;
			self = this;
			return;
		}
		fn.apply(this, arguments); // (1)
		isThrottled = true;
		setTimeout(function () {
			isThrottled = false; // (3)
			if (args){
				wrapper.apply(self, args);
				args = self = null;
			}
		}, delay);
	};
};

exampleMemo = Memoization(exampleMemo);
exampleMemo(1, 2);
exampleMemo(3, 4);
exampleMemo(1, 2);//from cache

// exampleDeb = debounce(exampleDeb, 1000);
// exampleDeb(1,0); // выполнится сразу же
// exampleDeb(2,0); // игнор
// setTimeout( function() { exampleDeb(3,0) }, 100); // игнор (прошло только 100 мс)
// setTimeout( function() { exampleDeb(4,0) }, 1100); // выполнится
// setTimeout( function() { exampleDeb(5,0) }, 1500);
//
// exampleTrot = throttle(exampleTrot,1000);
// exampleTrot(1, 2);
// exampleTrot(3, 4);
// exampleTrot(5, 6);
