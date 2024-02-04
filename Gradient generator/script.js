const $color_picker = document.querySelectorAll('.background__picker input'),
    $bg_screen = document.querySelector('.background__screen'),
    $angleRange = document.querySelector('[type="range"]'),
    $svgButton = document.querySelector('.svg'),
    $pngButton = document.querySelector('.png'),
    $codeButton = document.querySelector('.codeCss')


let color = null;

$color_picker.forEach(input => {
    input.addEventListener('input', () => {
        color = input.value;
        const cssVar = input.hasAttribute('data-c1') ? '1' : '2'
        document.documentElement.style.setProperty(`--color${cssVar}`, color);

        document.querySelector(`.inputHex[data-c${cssVar}]`).value = color

        const $groupInpt = document.querySelector(`.group__inpt[data-c${cssVar}]`);
        
        $groupInpt.querySelector('#R').value = parseInt(color.slice(1, 3), 16);
        $groupInpt.querySelector('#G').value = parseInt(color.slice(3, 5), 16);
        $groupInpt.querySelector('#B').value = parseInt(color.slice(5, 7), 16);

    });
});



$angleRange.addEventListener('input' , () => {
    document.querySelector('[data-rangeValue]').innerText = $angleRange.value
    let result = ($angleRange.value / 360 ) * 100
    document.querySelector('.angel__circle').style.background = `conic-gradient(from 360deg at 50% 50%, #48B2FE ${result}%, 0%, var(--blue-1) 0% 0%)`

    $bg_screen.style.background = `linear-gradient(${$angleRange.value}deg, var(--color1) 0%, var(--color2) 100%)`
})


$svgButton.addEventListener('click', () => {
    const computedColor1 = getComputedStyle(document.documentElement).getPropertyValue('--color1');
    const computedColor2 = getComputedStyle(document.documentElement).getPropertyValue('--color2');

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1920px" height="1080px" style="background: linear-gradient(${$angleRange.value}deg, ${computedColor1} 0%, ${computedColor2} 100%) no-repeat"></svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.download = 'background.svg';
    tempLink.click();

    URL.revokeObjectURL(url);
});

$pngButton.addEventListener('click', () => {
    const computedColor1 = getComputedStyle(document.documentElement).getPropertyValue('--color1');
    const computedColor2 = getComputedStyle(document.documentElement).getPropertyValue('--color2');

    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const context = canvas.getContext('2d');

    const gradient = context.createLinearGradient(0, 0, 1920, 1080);
    gradient.addColorStop(0, computedColor1);
    gradient.addColorStop(1, computedColor2);

    context.fillStyle = gradient;
    context.fillRect(0, 0, 1920, 1080);

    const pngDataUrl = canvas.toDataURL('image/png');

    const tempLink = document.createElement('a');
    tempLink.href = pngDataUrl;
    tempLink.download = 'background.png';
    tempLink.click();
    URL.revokeObjectURL(pngDataUrl);
});


$codeButton.addEventListener('click' , () => {
    const bg = getComputedStyle(document.querySelector('.background__screen')).getPropertyValue('background');
    navigator.clipboard.writeText(bg.match(/linear-gradient\(.*?100%\)/gi).join(''));
    
})
