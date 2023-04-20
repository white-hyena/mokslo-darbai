//pradines narių reikšmės
let nariai = [
    {
        nr: 1,
        vardas: 'Vardenis',
        pavarde: 'Pavardenis',
        praleista: 2,
        pasisake: 15
    },
    {
        nr: 2,
        vardas: 'Petras',
        pavarde: 'Petraitis',
        praleista: 6,
        pasisake: 11
    },
    {
        nr: 3,
        vardas: 'Jonas',
        pavarde: 'Jonaitis',
        praleista: 4,
        pasisake: 7
    },
    {
        nr: 4,
        vardas: 'Jurgis',
        pavarde: 'Jurgaitis',
        praleista: 8,
        pasisake: 21
    },
];
const zymimi = 3;
let minPraleista = 999999;
let minPasisake = 999999;
let zymes = {
    'praleista': false,
    'pasisake': false,
};

window.onload = () => {
    rezultatai();
}

function prideti() {
    const $vardas = document.getElementById('inputVardas');
    const $pavarde = document.getElementById('inputPavarde');
    const $praleista = document.getElementById('inputPraleista');
    const $pasisake = document.getElementById('inputPasisake');

    nariai.push({
        nr: nariai.length + 1,
        vardas: $vardas.value,
        pavarde: $pavarde.value,
        praleista: $praleista.value,
        pasisake: $pasisake.value
    });

    isvalyti();
    tikrinamZymimus();
    rezultatai();
}

function isvalyti() {
    const $vardas = document.getElementById('inputVardas');
    const $pavarde = document.getElementById('inputPavarde');
    const $praleista = document.getElementById('inputPraleista');
    const $pasisake = document.getElementById('inputPasisake');

    $vardas.value = "";
    $pavarde.value = "";
    $praleista.value = "0";
    $pasisake.value = "0";
}

function tikrinamZymimus() {
    // surandam minimalią reiksme praleistoms zymems
    nariai.sort((a, b) => b.praleista - a.praleista);
    if (nariai.length >= zymimi) {
        minPraleista = nariai[zymimi - 1].praleista
    } else {
        minPraleista = nariai[nariai.length - 1].praleista
    }

    // surandam minimalią reiksme pasisakiusiu zymems
    nariai.sort((a, b) => b.pasisake - a.pasisake);
    if (nariai.length >= zymimi) {
        minPasisake = nariai[zymimi - 1].pasisake
    } else {
        minPasisake = nariai[nariai.length - 1].pasisake
    }

    // atstatome rikiavima
    nariai.sort((a, b) => a.nr - b.nr);
}

function rezultatai() {
    const $sarasas = document.getElementById('sarasas');

    $sarasas.innerHTML = '';
    for (let nr in nariai) {
        let $tr = document.createElement('tr');
        $sarasas.append($tr);

        let $td1 = document.createElement('td');
        $td1.innerHTML = nariai[nr].vardas;
        $tr.append($td1);

        let $td2 = document.createElement('td');
        $td2.innerHTML = nariai[nr].pavarde;
        $tr.append($td2);

        let $td3 = document.createElement('td');
        $tr.append($td3);
        $td3.insertAdjacentHTML("afterBegin", nariai[nr].praleista + (zymes.praleista && nariai[nr].praleista >= minPraleista ? ` <i class="bi-hand-thumbs-down-fill text-danger"></i>` : ''));

        let $td4 = document.createElement('td');
        $tr.append($td4);
        $td4.insertAdjacentHTML("afterBegin", nariai[nr].pasisake + (zymes.pasisake && nariai[nr].pasisake >= minPasisake ? ` <i class="bi-hand-thumbs-up-fill text-success"></i>` : ''));
    }
}

function pazymetiPraleista() {
    zymes.praleista = ! zymes.praleista;
    tikrinamZymimus();
    rezultatai();
}

function pazymetiPasisakyta() {
    zymes.pasisake = ! zymes.pasisake;
    tikrinamZymimus();
    rezultatai();
}
