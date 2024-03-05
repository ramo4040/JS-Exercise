const form = document.forms[0];

const pageData = {
  div: document.querySelector('.--scroll'),
  p: document.querySelector('#infoSignUp'),
  next: document.querySelector('.next'),
  prev: document.querySelector('.prev'),
  submit: document.querySelector('.submit'),

  message: [
    'Enter your UserName and choose a Email to setup your account.',
    'For your security, please enter your password and then confirm it.',
    'One Last Step 😃'
  ],

  value: 0,
  max: 2,

  slide: function (direction) {

    if (direction == 'next' && this.value < this.max || direction == 'prev' && this.value >= 1) {
      this.value += direction == 'next' ? 1 : -1;
      this.div.style.transform = `translateX(-${(this.value) * 100}%)`;
    }

    this.p.textContent = this.message[this.value];
    this.div.setAttribute('data-page', this.value);
    this.prev.classList.toggle('hidden', pageData.value === 0);
    this.next.classList.toggle('hidden', this.value == 2);
    this.submit.classList.toggle('hidden', this.value != 2);

  }
};

pageData.next.addEventListener('click', () => {
  const inputs = {
    '0': [form.fname, form.lname],
    '1': [form.email, form.password]
  };
  const currentPage = pageData.div.getAttribute('data-page');

  if (inputs[currentPage].every(e => e.checkValidity())) {
    pageData.slide('next');
  } else {
    inputs[currentPage].forEach(e => e.classList.add('invalid'));
  }
});

pageData.prev.addEventListener('click', () => pageData.slide('prev'));


let input = [
  {
    type: "text",
    required: '',
    pattern: '^[a-zA-Z]{3,24}$'
  },
  {
    type: "text",
    required: '',
    pattern: '^[a-zA-Z]{3,24}$'
  },
  {
    type: "email",
    required: '',
    pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+'
  },
  {
    type: "password",
    required: '',
    pattern: '.{8,}'
  }
];

const validate = () => {
  Array.from(form.elements).slice(0, 4).forEach((e, i) => {
    for (const [att, value] of Object.entries(input[i])) {
      e.setAttribute(att, value);
    }
  });

  return form.checkValidity();
};


form.onsubmit = validate
form.submit = false

