const inputSlider = document.querySelector("[data-lengthSlider]"),
    lengthDisplay = document.querySelector("[data-lengthNumber]"),
    passwordDisplay = document.querySelector("[data-passwordDisplay]"),
    copyBtn = document.querySelector("[data-copy]"),
    uppercaseCheck = document.querySelector("#Uppercase"),
    lowercaseCheck = document.querySelector("#Lowercase"),
    numbersCheck = document.querySelector("#Numbers"),
    symbolsCheck = document.querySelector("#Symbols"),
    generateBtn = document.querySelector('.generateButton'),
    symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/',
    msgSuccess = document.querySelector('.msgSuccess'),
    msgError = document.querySelector('.msgError');

inputSlider.addEventListener('input', (e) => {
    lengthDisplay.innerText = e.target.value;
});

function randomGenerator() {
    const minMax = (min, max) => Math.floor(Math.random() * (max - min) + min);

    return {
        Number: () => minMax(0, 9),
        LowerCase: () => String.fromCharCode(minMax(97, 123)),
        UpperCase: () => String.fromCharCode(minMax(65, 91)),
        Symbols: () => symbols[minMax(0, symbols.length)],
    };
}

const generator = randomGenerator();

generateBtn.addEventListener('click', () => {
    try {
        let arr = [];
        let result = '';

        if (uppercaseCheck.checked) arr.push(generator.UpperCase);
        if (lowercaseCheck.checked) arr.push(generator.LowerCase);
        if (numbersCheck.checked) arr.push(generator.Number);
        if (symbolsCheck.checked) arr.push(generator.Symbols);


        for (let i = 1; i <= inputSlider.value; i++) {
            for (let j = 0; j < 1; j++) {
                let rndm = Math.floor(Math.random() * arr.length)
                result += arr[rndm]();
            }
        }

        passwordDisplay.value = result;
    } catch (e) {
        msgError.style.display = 'flex'

        setTimeout(() => {
            msgError.style.display = 'none'
        }, 3000);
    }

});

copyBtn.addEventListener('click' , () => {
    if (passwordDisplay.value !== '') {
        navigator.clipboard.writeText(passwordDisplay.value);

        msgSuccess.style.display = 'flex'
        setTimeout(() => {
            msgSuccess.style.display = 'none'
        }, 3000);
    }
})

