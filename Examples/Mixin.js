'use strict';
// примесь
var sayHiMixin = {
  sayHi: function() {
    alert("Привет " + this.name);
  },
  sayBye: function() {
    alert("Пока " + this.name);
  }
};

// использование:
function User(name) {
  this.name = name;
}

// передать методы примеси
function mixin(source, target) {  
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      target[prop] = source[prop];
    }
  }
}

mixin(sayHiMixin,User.prototype);

// User "умеет" sayHi
new User("Вася").sayHi(); // Привет Вася