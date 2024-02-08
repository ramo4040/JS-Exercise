let stars = document.querySelectorAll('label')

stars.forEach((label, index1) => {
    label.addEventListener('click', () => {
        console.log(index1);
        stars.forEach((i, index2) => {
            if (index1 >= index2) {
                i.classList.add('active')
            } else {
                i.classList.remove('active')
            }
        })
    })
})