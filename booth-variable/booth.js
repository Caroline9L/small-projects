const root = document.documentElement
const range = document.querySelector('.booth-slider')

//as slider range's value changes, do something 
range.addEventListener('input', handleSlider)

function handleSlider(e) {
	let value = e.target.value
	root.style.setProperty('--slider', value)
}

const inputs = document.querySelectorAll('.color-box > input')
//as the value in the input changes, do something.
inputs.forEach(input => {
	input.addEventListener('input', handleInputChange)
})

function handleInputChange(e) {
	let value = e.target.value
	let inputId = e.target.parentNode.id
	let inputBg = `--bg-${inputId}`
	root.style.setProperty(inputBg, value)
}