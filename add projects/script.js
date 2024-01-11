
function toggleAdd() {
    const DisplayAdd = document.querySelector('.info');
    DisplayAdd.classList.toggle('info-diplay');
}

function getInfo() {
    let name = document.getElementById('name').value
    var randomColor = getRandomColor();

    if (name == '') {
        console.log('error');
    } else {

        let newProjectDiv = document.createElement('div');
        let nice = document.createElement('li');

        newProjectDiv.classList.add('projects-div');

        newProjectDiv.innerHTML = `<div class="projects-div-content" style="background-color: ${randomColor}; box-shadow: 0px 2rem 4rem -2rem ${randomColor};">${name.trim()[0]}</div>
        <h3>${name}</h3> `;

        nice.innerHTML = `<p>${name}</p>`;

        nice.style.setProperty('--after-background', randomColor);

        document.querySelector('.project-cards').appendChild(newProjectDiv);

        document.querySelector('.project-ul').appendChild(nice);

        document.getElementById('name').value = ''
        toggleAdd()
    }

}

function getRandomColor() {
    let color = ['#58aeff', '#ff8158', '#ffb658', '#b058ff', '#9ad045', '#ff589c']
    let randomNumber = Math.floor(Math.random() * color.length)
    return color[randomNumber];
}
