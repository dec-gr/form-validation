import './style.css';

console.log('boo');

const email = document.querySelector('#email');
const emailError = document.querySelector('#email + .error');

function emailShowError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = 'You need to enter an email address.';
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = 'Entered value needs to be an email address.';
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
}
email.addEventListener('blur', () => {
  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
  } else {
    // If there is still an error, show the correct error
    emailShowError();
  }
});

const zip = document.querySelector('#zip');
const zipError = document.querySelector('#zip + .error');

const isPostCodeValid = (zip1) => {
  console.log('Checking ZIP');
  const constraint = new RegExp(
    '[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}',
    ''
  );
  return constraint.test(zip1);
};

function zipShowError() {
  if (zip.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    zipError.textContent = 'You need to enter an Post Code.';
  } else if (!isPostCodeValid(zip.value)) {
    // If the data is too short,
    // display the following error message.
    zipError.textContent = 'Post Code needs to be in correct format';
  }
}

zip.addEventListener('blur', () => {
  // if (zip.validity.valid) {
  //   zipError.textContent = '';
  // } else {
  //   zipShowError();
  // }
  if (isPostCodeValid(zip.value) && !zip.validity.valueMissing) {
    zipError.textContent = '';
  } else {
    zipShowError();
  }
});

const password1 = document.querySelector('#pass1');
const password1Error = document.querySelector('#pass1 + .error');

const password2 = document.querySelector('#pass2');
const password2Error = document.querySelector('#pass2 + .error');

let passwordsMatch;

password1.addEventListener('input', () => {
  comparePasswordOnChange();
  if (password1.validity.valid) {
    password1Error.textContent = '';
  } else {
    showPasswordError(password1, password1Error);
  }
});

password2.addEventListener('input', () => {
  comparePasswordOnChange();
  if (password2.validity.valid) {
    password2Error.textContent = '';
  } else if (passwordsMatch === false) {
    password2Error.textContent = 'Passwords need to match';
  } else {
    showPasswordError(password2, password2Error);
  }
});

function showPasswordError(password, passwordError) {
  if (password.validity.valueMissing) {
    passwordError.textContent = 'You need to enter a password';
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password1.minLength} characters`;
  }
}

function comparePasswordOnChange() {
  if (password1.value === password2.value) {
    passwordsMatch = true;
  } else {
    passwordsMatch = false;
  }
}
