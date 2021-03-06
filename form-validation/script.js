const form = document.getElementById('form');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordMatch = false;

function validateForm() {
	// Using Constraint API
	isValid = form.checkValidity();

	// Style main message for an error
	if (!isValid) {
		message.textContent = 'Please fill out all fields.';
		message.style.color = 'red';
		messageContainer.style.borderColor = 'red';
		return; // Stop procedeing and break out of function if isValid is false
	}

	// Check to see if passwords match
	if (password.value === confirmPassword.value) {
		passwordMatch = true;
		password.style.borderColor = 'green';
		confirmPassword.style.borderColor = 'green';
	} else {
		passwordMatch = false;
		message.textContent = 'Make sure passwords match.';
		message.style.color = 'red';
		messageContainer.style.borderColor = 'red';
		password.style.borderColor = 'red';
		confirmPassword.style.borderColor = 'red';
	}

	// If form is valid and passwords match
	if (isValid && passwordMatch) {
		message.textContent = 'Successfully Registered!';
		message.style.color = 'green';
		messageContainer.style.borderColor = 'green';
	}
}

function storeFormData() {
	const user = {
		name: form.name.value,
		phone: form.phone.value,
		email: form.email.value,
		website: form.website.value,
		password: form.password.value,
	};
	// Do something with user data
	console.log(user);
}

function processFormData(e) {
	e.preventDefault();
	// Validate Form
	validateForm();
	// Submist Data if Valid
	if (isValid && passwordMatch) {
		storeFormData();
	}
}

// Event Listner
form.addEventListener('submit', processFormData);
