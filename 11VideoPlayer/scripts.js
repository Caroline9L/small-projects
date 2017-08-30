//Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); 
const progress = player.querySelector('.progress'); 
const progressBar = player.querySelector('.progress__filled'); 
const toggle = player.querySelector('.toggle'); 
const skipButtons = player.querySelectorAll('[data-skip]'); 
const ranges = player.querySelectorAll('.player__slider'); 



//Build Functions

//start and pause video
function togglePlay() {
	if (video.paused) { //paused is a video property, not play
		video.play();
	} else {
		video.pause();
	}
//the short way:
//const method = video.paused ? 'play' : 'pause';
//video[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚'; //copypaste from solution -- vsc does not seem to support the unicode characters outside of html
	toggle.textContent = icon;
}

function skip() { // to skip ahead or back
	// console.log(this.dataset.skip); //found .skip in the devtools
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	// console.log(this.name);//find the property name in devtools
	// console.log(this.value);
	video[this.name] = this.value; //will pull volume or playback rate and assign the value
}

function handleProgress() {//adjust progress bar
	//flex-basis in css, a %. in class progress-filled
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {//clicking progress bar moves video
	// console.log(e); //find offsetx & y
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //event at oX - where you clicked - divided by the width of the bar (= a %), * length of video to get the spot
	video.currentTime = scrubTime; //update video time to match
}



//Hook up event listeners

video.addEventListener('click', togglePlay); //on field click
video.addEventListener('play', updateButton); //change button if video is playing
video.addEventListener('pause', updateButton); //change button if video is paused
toggle.addEventListener('click', togglePlay); //on button click
skipButtons.forEach(button => button.addEventListener('click', skip)); //on skip button click
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));//on change of sliders
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress); //listen for video to emit timeupdate change
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));//check the variable for truth, run the function if so
// progress.addEventListener('mousemove', () => {
// 	if (mousedown) {
// 		scrub();
// 	}
// }); //run function only if true
progress.addEventListener('mousedown', () => mousedown = true); //makes this var true when fired
progress.addEventListener('mouseup', () => mousedown = false); //makes this var true when fired