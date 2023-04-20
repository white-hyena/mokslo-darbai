let lankomumas = {};

window.onload = function() {
    frakcijosSarasas();
}

function frakcijos() {
    return {
        1: "Darbo partijos frakcija",
        2: "Demokratų frakcija „Vardan Lietuvos“",
        3: "Laisvės frakcija",
        4: "Liberalų sąjūdžio frakcija",
        5: "Lietuvos socialdemokratų partijos frakcija",
        6: "Lietuvos valstiečių ir žaliųjų sąjungos frakcija",
        7: "Mišri Seimo narių grupė",
        8: "Tėvynės sąjungos-Lietuvos krikščionių demokratų frakcija",
    };
}

function frakcijosSarasas() {
    const $inputFrakcija = document.getElementById('inputFrakcija');
    const sarasas = this.frakcijos();

    for (let frakcija in sarasas) {
        let pasirinkimas = document.createElement("option");
        pasirinkimas.value = frakcija;
        pasirinkimas.innerHTML = sarasas[frakcija];
        $inputFrakcija.append(pasirinkimas);
    }
}

function prideti() {
    const $frakcija = document.getElementById('inputFrakcija');
    const $narys = document.getElementById('inputNarys');
    const $praleistos = document.getElementById('inputPraleistos');

    let sarasas = lankomumas[$frakcija.value];
    if (!sarasas) {
        lankomumas[$frakcija.value] = {
            dienos: $praleistos.value,
            nariai: [
                {
                    vardas: $narys.value,
                    praleido: $praleistos.value,
                }
            ]
        }
        sarasas = lankomumas[$frakcija.value];
    } else {
        let esamasNarys = sarasas.nariai.find(narys => {
            return narys.vardas === $narys.value
        });

        if (esamasNarys) {
            esamasNarys.praleido = $praleistos.value;
        } else {
            sarasas.nariai.push({
                vardas: $narys.value,
                praleido: $praleistos.value,
            });
        }
    }

    sarasas.dienos = 0;
    sarasas.nariai.forEach(narys => {
        sarasas.dienos += parseInt(narys.praleido);
    });

    isvalyti();
    rezultatai();
}

function isvalyti() {
    const $frakcija = document.getElementById('inputFrakcija');
    const $narys = document.getElementById('inputNarys');
    const $praleistos = document.getElementById('inputPraleistos');

    $frakcija.selectedIndex = 0;
    $narys.value = "";
    $praleistos.value = "1";
}

function rezultatai() {
    const $rezultatai = document.getElementById('rezultatai');
    const frakcijos = this.frakcijos();

    $rezultatai.innerHTML = '';
    for (let nr in lankomumas) {
        let $li = document.createElement('li');
        $li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');

        let $divName = document.createElement('div');
        $divName.classList.add('fw-bold');
        $divName.innerHTML = frakcijos[nr];

        let $div = document.createElement('div');
        $div.classList.add('ms-2', 'me-auto');
        $div.append($divName);
        $div.append(this.nariuSarasas(lankomumas[nr].nariai))

        let $span = document.createElement('span');
        $span.classList.add('badge', 'bg-primary', 'rounded-pill');
        $span.innerHTML = lankomumas[nr].dienos;

        $li.append($div);
        $li.append($span);
        $rezultatai.append($li);
    }
}

function nariuSarasas(nariai) {
    let $ul = document.createElement('ul');

    for (let nr in nariai) {
        let $li = document.createElement('li');
        $li.innerHTML = nariai[nr].vardas + ': ' + nariai[nr].praleido;
        $ul.append($li);
    }

    return $ul
}