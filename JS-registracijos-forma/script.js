let lankomumas = {};

window.onload = function() {
    const $amzius = document.getElementById('inputMetai');

    $amzius.addEventListener('change', tikrinamAmziu);
}

function tikrinamAmziu(e) {
    let amzius = (new Date()).getFullYear() - e.target.value;
    const $lydintis = document.getElementById('inputLydintisDiv');

    if (amzius < 18) {
        $lydintis.classList.remove('visually-hidden');
    } else {
        $lydintis.classList.add('visually-hidden');
    }
}

function prideti() {
    const $vardas = document.getElementById('inputVardas');
    const $pavarde = document.getElementById('inputPavarde');
    const $metai = document.getElementById('inputMetai');
    const $lydintis = document.getElementById('inputLydintis');

    if (!(tinka($vardas) && tinka($pavarde) && tinka($metai) && tinka($lydintis))) {
        // nesaugome ir laukiame pataisymų
        return;
    }

    irasomeCSV($vardas.value(), $pavarde.value(), $metai.value(), $lydintis.value())
}

function tinka(target) {
    if (target.classList.contains('visually-hidden')) {
        return true;
    }

    if (!target.value) {
        target.classList.add('is-invalid');
        //prideti klaidos pranešimą

        return false;
    }

    target.classList.add('is-valid');

    return true;
}

function irasomeCSV(vardas, pavarde, metai, lydintis) {
    const fr = new FileWriter();
}