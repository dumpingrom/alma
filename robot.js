class Robot {
	constructor() {
		this.name = randomizeName();
		this.available = true;
		this.activity = 'moving';
		this.progress = 0;
		this.maxProgress = 0;
		this.updateProgress = setInterval(() => {});
		window.app.robots.push(this);
		this.next();
	}

	setName(n) { this.name = n; }

	getName() { return this.name; }

	setAvailable(a) { this.available = a; this.setActivity('none'); }

	isAvailable() { return this.available; }

	setActivity(a) { this.activity = a; }

	getActivity() { return this.activity; }

	setProgress(p) { this.progress = p; }

	getProgress() { return this.progress; }

	setMaxProgress(mp) { this.maxProgress = mp; }

	getMaxProgress() { return this.maxProgress; }

	move() {
		this.setActivity('moving');
		this.setMaxProgress(5000);
		setTimeout(() => this.next(), 5000);
	}

	mineFoo() {
		this.setActivity('mining foo');
		this.setMaxProgress(1000);
		setTimeout(() => {
			addFoo();
			this.next();
		}, 1000);
	};

	mineBar() {
		this.setActivity('mining bar');
		var randomDuration = getRndInteger(500, 2000);
		this.setMaxProgress(randomDuration);
		setTimeout(() => {
			addBar();
			this.next();
		}, randomDuration);
	}

	buildFoobar() {
		this.setActivity('building foobar');
		// take out the bar and the foo so other robots do not use them too;
		app.foo--;
		app.bar--;
		this.setMaxProgress(2000);
		setTimeout(() => {
			// get an RNG %;
			var chance = getRndInteger(0, 100);

			if(chance > 40) {
				// if worked, add the foobar
				app.foobar++;
			} else {
				// else put the bar back in the inventory
				app.bar++;
			}
			this.next();
		}, 2000);
	}

	sellFoobar() {
		this.setActivity('selling foobar');
		this.setMaxProgress(10000);

		if(app.foobar > 5) {
			app.money += 5;
			app.foobar -= 5;
		} else {
			app.money += app.foobar;
			app.foobar = 0;
		}

		setTimeout(() => this.next(), 10000);
	}

	buyRobot() {
		this.setActivity('buying robot');
		this.setMaxProgress(0);

		app.foo -= 6;
		app.money -= 3;
		var robot = new Robot();

		if(app.robots.length >= 20) {
			app.isVictory = true;
		}

		this.next();
	}

	next() {
		this.setProgress(0);
		clearInterval(this.updateProgress);
		this.updateProgress = setInterval(() => { this.progress++ }, 1);

		if(app.foobar > 0) {
			if (this.getActivity() === 'selling foobar' || this.getActivity() === 'moving') {
				return this.sellFoobar();
			}

			return this.move();
		}

		if(app.foo >= 6 && app.money >= 3) {
			if (this.getActivity() === 'buying robot' || this.getActivity() === 'moving') {
				return this.buyRobot();
			}

			return this.move();
		}

		if(app.foo <= 6) {
			if (this.getActivity() === 'mining foo' || this.getActivity() === 'moving') {
				return this.mineFoo();
			}

			return this.move();
		}

		if(app.bar <= 0) {
			if (this.getActivity() === 'mining bar' || this.getActivity() === 'moving') {
				return this.mineBar();
			}

			return this.move();
		}

		if(app.foo > 0 && app.bar > 0) {
			if (this.getActivity() === 'building foobar' || this.getActivity() === 'moving') {
				return this.buildFoobar();
			}

			return this.move();
		}
	}
}