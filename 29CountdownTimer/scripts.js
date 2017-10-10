let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	// setInterval(function() {
	// 	seconds--;
	// }, 1000);
	//buggy solution -- various systems will cause this to pause or just stop randomly
	//clear existing timers first
	clearInterval(countdown);
	const now = Date.now(); //current time stamp in ms
	const then = now + seconds * 1000;
	// console.log({now, then});
	displayTimeLeft(seconds);
	displayEndTime(then);
	

	countdown = setInterval(() => { //this takes one sec to start running
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//check if it should be stopped
		if (secondsLeft < 0) {
			clearInterval(countdown); //this actually clears the countdown so it legit stops
			return;//without clearinterval it won't actually stop running, just hide
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	timerDisplay.textContent = display;
	document.title = display; //displays countdown in tab header
	// console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp); //turns ms since 1/1/1970 into a real date & time
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	// console.log(this.dataset.time);
	const seconds = parseInt(this.dataset.time);
	// console.log(seconds);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();//stop page from submitting and reloading
	const mins = this.minutes.value;
	// console.log(mins);
	timer(mins * 60);
	this.reset;
});
