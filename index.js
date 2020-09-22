
var app = new Vue({
	el: '#app',
	data: {
		robots: [],
		foo: 0,
		bar: 0,
		foobar: 0,
		money: 0,
		isVictory: false,
	}
});

function init() {
	// add 2 robots
	new Robot();
	new Robot();

	for (var i = app.robots.length - 1; i >= 0; i--) {
		app.robots[i].next();
	}

}

function addFoo() {
	app.foo++;
}

function addBar() {
	app.bar++;
}

var randomizeName = () => Math.random().toString(36).substring(7);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

init();
