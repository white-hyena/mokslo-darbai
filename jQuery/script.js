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

$(function() {
    rezultatai()
});

function prideti() {
    nariai.push({
        nr: nariai.length + 1,
        vardas: $('#inputVardas').val(),
        pavarde: $('#inputPavarde').val(),
        praleista: $('#inputPraleista').val(),
        pasisake: $('#inputPasisake').val()
    });

    isvalyti();
    tikrinamZymimus();
    rezultatai();
}

function isvalyti() {
    $('#inputVardas').val('');
    $('#inputPavarde').val('');
    $('#inputPraleista').val('0');
    $('#inputPasisake').val('0');
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
    const $sarasas = $('#sarasas');

    $sarasas.html('');
    for (let nr in nariai) {
        let $tr = $('<tr></tr>');
        $sarasas.append($tr);

        let $td1 = $('<td></td>');
        $td1.text(nariai[nr].vardas);

        let $td2 = $('<td></td>');
        $td2.text(nariai[nr].pavarde);

        let $td3 = $('<td></td>');
        $td3.html(nariai[nr].praleista + (zymes.praleista && nariai[nr].praleista >= minPraleista ? ` <i class="bi-hand-thumbs-down-fill text-danger"></i>` : ''));

        let $td4 = $('<td></td>');
        $td4.html(nariai[nr].pasisake + (zymes.pasisake && nariai[nr].pasisake >= minPasisake ? ` <i class="bi-hand-thumbs-up-fill text-success"></i>` : ''));

        $tr.append($td1, $td2, $td3, $td4);
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
