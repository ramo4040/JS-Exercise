const text = document.querySelector('p');
const textEdit = text.innerText.trim();

document.querySelector('input').addEventListener('input', () => {
    const words = document.querySelector('input').value;
    const escapedWords = words.replace(/(\W)/g, '\\$1');
    const pattern = new RegExp(`(${escapedWords})`, 'gi');
    text.innerHTML = textEdit.replace(pattern, '<mark>$1</mark>');
});

