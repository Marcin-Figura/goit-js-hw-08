import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const emailField = document.querySelector('input');
const messageField = document.querySelector('textarea');

const inputCatcher = (event) => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = form;
    
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


if (parsedInputVal) {
  if (parsedInputVal && parsedInputVal.email !== '') {
    emailField.value = parsedInputVal.email;
  }
}  

if (parsedInputVal) {
  if (parsedInputVal && parsedInputVal.message !== '') {
    messageField.value = parsedInputVal.message;
  }
}  



const submitHandler = (event) => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = form;
  
  console.log(`Email: ${email.value}, Message: ${message.value}`);
  
  form.reset();
  
  localStorage.removeItem('feedback-form-state');
}

form.addEventListener('submit', submitHandler);