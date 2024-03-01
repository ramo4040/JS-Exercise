const form = document.forms['signUp'];

const validate = () => {
  
  let isValid = true
  Array.from(form.elements).forEach(e => {
    const { name, value: valueI } = e;

    if (name != 'agree' && name != 'button') {
      const errorMsg = check(name, valueI);

      if (errorMsg) {
        handleError(e, errorMsg);
        isValid = false
      } else {
        handleError(e, '');
      }
    }

  });

  return isValid;
}

const check = (name, value) => {
  switch (name) {
    case 'fname':
    case 'lname':
      return value === '' || !/^[a-zA-Z]+$/.test(value) ? 'Invalid name, use only letters (a-z, A-Z).' : '';

    case 'email':
      return value === '' || !/^[a-zA-Z0-9\-_.]+@[a-z]+\.[a-z]+$/.test(value) ? 'Invalid email format.' : '';

    case 'gender':
      return value === '' ? 'Please select your gender.' : '';

    case 'phone':
      return value === '' || !/^\+(212)0\d{9}$/.test(value) ? 'Invalid phone number, must start with +212.' : '';

    case 'dob':
      if (!/\d{4}-\d{2}-\d{2}/.test(value)) {
        return 'Invalid date format, use YYYY-MM-DD.';
      }

      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const condition = age < 18 || (age == 18 && today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()))
      return condition ? 'You must be 18 years or older to register.' : '';

    case 'password':
      return value === '' || value.length < 8 ? 'Password must be at least 8 characters long.' : '';

    case 'Cpassword':
      return value === '' ? 'Please fill out this field.' : value !== form.password.value ? 'The passwords do not match.' : '';
  }
}


const handleError = (input, msg) => {
  input.nextElementSibling.innerText = msg;
};

form.onsubmit = () => validate();
