import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input[name="email"]'),
  messageInput: document.querySelector('textarea[name="message"]'),
};
const FORM_STATE_STORAGE_KEY = 'feedback-form-state';

refs.feedbackForm.addEventListener('input', saveFormStateToLocalStorage);
refs.feedbackForm.addEventListener('submit', clearFormDataOnSubmit);

setFormStateFromLocalStorage();

function setFormStateFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem(FORM_STATE_STORAGE_KEY));

  if (!savedData) {
    return;
  }

  refs.emailInput.value = savedData.email;
  refs.messageInput.value = savedData.message;
}

function clearFormDataOnSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();

  console.log(JSON.parse(localStorage.getItem(FORM_STATE_STORAGE_KEY)));
  localStorage.removeItem(FORM_STATE_STORAGE_KEY);
}

function saveFormStateToLocalStorage(event) {
  const target = event.currentTarget.elements;

  const formData = {
    email: target.email.value,
    message: target.message.value,
  };

  throttle(
    () => localStorage.setItem(FORM_STATE_STORAGE_KEY, JSON.stringify(formData)),
    500
  ).call();
}
