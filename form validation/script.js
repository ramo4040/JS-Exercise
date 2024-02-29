class FormValidator {
  constructor(form) {
    this.form = form;
    this.checking = {
      fname: false,
      lname: false,
      email: false,
      password: false,
    };
    this.regexPattern = {
      fname: /^[A-Za-z]+$/,
      lname: /^[A-Za-z]+$/,
      email: /^\S+@\S+\.\S+$/,
      password: /^.{8,}$/,
    };
    this.initialize();
    this.showPass()
  }

  handleInputState(input, state) {
    const parentElement = input.parentElement;
    const checkIcon = parentElement.querySelector('.bi-check');
    const xIcon = parentElement.querySelector('.bi-x');

    switch (state) {
      case 'success':
        parentElement.style.borderColor = 'var(--success)';
        checkIcon.classList.remove('hide');
        xIcon.classList.add('hide');
        break;
      case 'error':
        parentElement.style.borderColor = 'var(--error)';
        checkIcon.classList.add('hide');
        xIcon.classList.remove('hide');
        break;
      case 'idle':
        parentElement.style.borderColor = 'var(--idle)';
        checkIcon.classList.add('hide');
        xIcon.classList.add('hide');
        break;
    }
  }

  validate() {
    return !Object.values(this.checking).includes(false);
  }


  initialize() {
    this.form.addEventListener('input', (e) => {
      if (e.target.value === '') {
        this.handleInputState(e.target, 'idle');
        this.checking[e.target.name] = false;
      } else if (!this.regexPattern[e.target.name].test(e.target.value)) {
        this.handleInputState(e.target, 'error');
        this.checking[e.target.name] = false;
      } else {
        this.handleInputState(e.target, 'success');
        this.checking[e.target.name] = true;
      }
    });

    this.form.onsubmit = () => this.validate();
  }

  showPass() {
    let input = this.form.password 
    document.querySelector('.bi-eye').addEventListener('click', (e) => {
      e.target.classList.toggle('bi-eye')
      e.target.classList.toggle('bi-eye-slash')
      input.type = input.type == 'password' ? 'text' : 'password'
    })
  }
}

const form = document.forms['signUp'];
const formValidator = new FormValidator(form);