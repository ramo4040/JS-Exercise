let form = document.querySelector('form');

const handleInput = (name, value, regex, msg) => {
    switch (true) {
        case value === '':
            return `Invalid ${name} : Empty`;

        case !regex.test(value):
            return msg;

        default:
            return '';
    }

};

const check = (name, value) => {
    switch (name) {
        case 'company':
            return handleInput(name, value, /^[a-zA-Z0-9]+$/, 'not matched');

        case 'name':
            return handleInput(name, value, /^[a-zA-Z]+$/, 'not matched');

        case 'email':
            return handleInput(name, value, /^[a-zA-Z0-9\-_.]+@[a-z]+\.[a-z]+$/, 'not matched');

        case 'password':
            return handleInput(name, value, /.{8,}/, 'not matched');
    }
};


const validat = () => {
    let isValid = true;
    let arr = Array.from(form.elements).slice(0, -1);

    arr.forEach(input => {
        
        const { name, value, nextElementSibling } = input;
        const errorMsg = check(name, value);

        if (errorMsg) {
            nextElementSibling.innerText = errorMsg;
            isValid = false;
        } else {
            nextElementSibling.innerText = '';
        }
    });

    return isValid;
};

form.onsubmit = validat;
form.submit = null;
