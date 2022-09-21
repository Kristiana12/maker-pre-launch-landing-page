//Create 3 Div when screens are more that 590
if (window.innerWidth >= 768) {
  const backgroundEL = document.querySelector('.background');
  let numbersOfDivs = 3;

  for (let i = 0; i < numbersOfDivs; i++) {
    const div = document.createElement('div');
    backgroundEL.appendChild(div);
  }
}

const subscribeSuccess = () => {
  const form = document.forms['subscription'];
  const subscriptionTitle = document.querySelector('.subscribe__title');

  form.style.display = 'none';
  subscriptionTitle.textContent = `Thank you for subscribing!`;
};

const showErrorMessage = (input) => {
  const errorParagraph = document.querySelector('input[type="email"] + p');

  input.classList.add('error');
  errorParagraph.style.display = 'block';
};

const isEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const emailInputValidation = (input, inputValue) => {
  if (inputValue === '') {
    showErrorMessage(input);
  } else if (!isEmail(inputValue)) {
    showErrorMessage(input);
  } else {
    subscribeSuccess();
  }
};

const btnSubmit = document.querySelector('button[type="submit"]');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const inputEmail = document.querySelector('input[type="email"]');
  const emailValue = inputEmail.value;

  emailInputValidation(inputEmail, emailValue);
});
