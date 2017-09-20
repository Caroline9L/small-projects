const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			console.log(localMediaStream);
			// video.src = localMediaStream; //object, needs convert to url to work as livefeed
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
		.catch(err => {
			console.error(`OHNO!!!`, err);
		});
}

function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	// console.log(width, height); //type function in console window to get the size of the window
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		//take pixels out (get the info)
		let pixels = ctx.getImageData(0,0, width, height);
		//alter as desired (sliders)
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		// ctx.globalAlpha = 0.1; //slows feed - keeps pixels in image for another 10 frames, adds a 10% transparency on top
		pixels = greenScreen(pixels);
		//return the altered image/data
		ctx.putImageData(pixels, 0, 0);
	}, 16);
}

function takePhoto() {
	//play the sound
	snap.currentTime = 0;
	snap.play();
	//get the canvas data
	const data = canvas.toDataURL('image/jpeg');
	// console.log(data);
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'photo');
	// link.textContent = 'Download Image'; //text link for download
	link.innerHTML = `<img src="${data}" alt="A Photo" />`;
	strip.insertBefore(link, strip.firstChild); //creates a download link
}

function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i = i+=4){
		pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
		pixels.data[i + 1] = pixels.data[i + 1] - 50;//green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5;//blue
	}
	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i = i += 4) {
		pixels.data[i - 150] = pixels.data[i + 0]; //red
		pixels.data[i + 100] = pixels.data[i + 1];//green
		pixels.data[i - 150] = pixels.data[i + 2];//blue
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {}; //holds min and max green values

	document.querySelectorAll('.rgb input').forEach((input) => {
		levels[input.name] = input.value;
	}); //select sliders 
	// console.log(levels);
	// debugger;

	for (i = 0; i < pixels.data.length; i = i + 4) {
		red = pixels.data[i + 0];
		green = pixels.data[i + 1];
		blue = pixels.data[i + 2];
		alpha = pixels.data[i + 3];

		if (red >= levels.rmin
			&& green >= levels.gmin
			&& blue >= levels.bmin
			&& red <= levels.rmax
			&& green <= levels.gmax
			&& blue <= levels.bmax) {
				//take it out! makes it transparent
			pixels.data[i + 3] = 0;
		}
	}
	return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);