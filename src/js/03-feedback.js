import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput() {
  formData = {
    email: `${refs.form.elements.email.value}`,
    message: `${refs.form.elements.message.value}`,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function savedForm() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage !== null) {
    refs.form.elements.email.value = savedMessage.email;
    refs.form.elements.message.value = savedMessage.message;
  }
}

savedForm(formData);
