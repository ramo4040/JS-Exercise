class SignUpForm {
    constructor(form) {
        this.form = form;
        this.inputState()
    }
    //----------error handling ----------
    handleError(input, event) {
        const { name, value, nextElementSibling } = input
        const errorMsg = this.state(name, value)

        if (input.type != 'checkbox') {

            if (errorMsg && event) {
                nextElementSibling.classList.replace('bi-check', 'bi-x')
                nextElementSibling.classList.remove('hidden')
                input.parentElement.nextElementSibling.innerText = errorMsg
            }

            if (!errorMsg) {
                nextElementSibling.classList.replace('bi-x', 'bi-check')
                nextElementSibling.classList.remove('hidden')
                input.parentElement.nextElementSibling.innerText = errorMsg
            }
        }

        if (name == 'agree' && errorMsg) {
            input.classList.add('error')
        }

        return errorMsg
    }

    inputState() {
        //----------event listeners to first 4 inputs for validation----------
        Array.from(this.form).slice(0, 4).forEach((input) => {
            input.addEventListener('input', () => this.handleError(input))
            input.addEventListener('focusout', () => this.handleError(input, 'inputEvent'))
        })
        //----------event listeners to checkbox for validation----------
        this.form.agree.addEventListener('change', (e) => e.target.classList.toggle('error', !e.target.checked))
    }

    //----------validation rules for each input----------
    state(name, value) {
        switch (name) {
            case 'fname':
                return value === '' || !/^[a-zA-Z]{3,24}\s[a-zA-Z]{3,24}/.test(value) ? 'Invalid name, use only letters (a-z, A-Z).' : '';

            case 'email':
                return value === '' || !/^[a-zA-Z0-9\-_.]+@[a-z]+\.[a-z]+$/.test(value) ? 'Invalid email format.' : '';

            case 'phone':
                return value === '' || !/^\+(212)0\d{9}$/.test(value) ? 'Invalid phone number, must start with +212.' : '';

            case 'password':
                return value === '' || value.length < 8 ? 'Password must be at least 8 characters long.' : '';

            case 'agree':
                return !this.form[name].checked
        }
    }

    check() {
        this.isValid = true
        Array.from(this.form).slice(0, 5).forEach(input => {
            this.handleError(input, 'inputEvent') ? this.isValid = false : null
        })
        return this.isValid
    }
}



const form = document.forms['signUp'];
const signupForm = new SignUpForm(form.elements);

form.onsubmit = () => signupForm.check()

