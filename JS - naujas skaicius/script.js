function klauskSkaiciaus() {
    const skaicius = prompt("Įveskite skaičių");
    const naujasSkaicius = gaukNaujaSkaiciu(skaicius);

    pridetiSkaicius(skaicius);
    pridetiNaujaSkaicius(naujasSkaicius);
}

function gaukNaujaSkaiciu(skaicius) {
    let naujasSkaicius = [...skaicius + ''].map(n => n ** 2).join(''); // https://stackoverflow.com/questions/7784620/javascript-number-split-into-individual-digits

    return naujasSkaicius;
}

function pridetiSkaicius(skaicius) {
    const $skaiciuSarasas = document.getElementById('skaiciai');
    let $li = document.createElement("li");
    $li.appendChild(document.createTextNode(skaicius));
    $skaiciuSarasas.appendChild($li);
}

function pridetiNaujaSkaicius(skaicius) {
    const $skaiciuSarasas = document.getElementById('nauji_skaiciai');
    let $li = document.createElement("li");
    $li.appendChild(document.createTextNode(skaicius));
    $skaiciuSarasas.appendChild($li);
}

window.onload = function () {
    const pvzSkaiciai = [2, 15, 83, 147];

    pvzSkaiciai.forEach(n => {
        pridetiSkaicius(n);
        pridetiNaujaSkaicius(gaukNaujaSkaiciu(n));
    })
}