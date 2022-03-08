import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const emailField = document.querySelector('input');
const messageField = document.querySelector('textarea');

const inputCatcher = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
    
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      email: email.value,
      message: message.value,
    }),
  );
};

form.addEventListener('input', throttle(inputCatcher, 500));

const inputVal = localStorage.getItem('feedback-form-state');
const parsedInputVal = JSON.parse(inputVal);

console.log(parsedInputVal);

if (parsedInputVal.email !== "") {
    emailField.value = parsedInputVal.email;
}

if (parsedInputVal.message !== '') {
  messageField.value = parsedInputVal.message;
}

const submitHandler = (event) => {
    const {
      elements: { email, message },
    } = event.currentTarget;

    console.log(`Email: ${email.value}, Message: ${message.value}`);
    event.currentTarget.reset();
}

form.addEventListener('submit', submitHandler);