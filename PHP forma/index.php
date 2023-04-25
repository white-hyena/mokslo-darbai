<?php
    // Pradedame sesiją, kad išsaugoti įvedamas reikšmes
    session_start();

    $frakcijos = [
        1 => "Darbo partijos frakcija",
        2 => "Demokratų frakcija „Vardan Lietuvos“",
        3 => "Laisvės frakcija",
        4 => "Liberalų sąjūdžio frakcija",
        5 => "Lietuvos socialdemokratų partijos frakcija",
        6 => "Lietuvos valstiečių ir žaliųjų sąjungos frakcija",
        7 => "Mišri Seimo narių grupė",
        8 => "Tėvynės sąjungos-Lietuvos krikščionių demokratų frakcija",
    ];

    if (!$_SESSION["lankomumas"]) {
        $_SESSION["lankomumas"] = [
            1 => [
                'dienos' => 5,
                'nariai' => [
                    [
                        'vardas' => 'Kebabas',
                        'praleido' => 2,
                    ],
                    [
                        'vardas' => 'Beliašas',
                        'praleido' => 3,
                    ],
                ],
            ],
            2 => [
                'dienos' => 4,
                'nariai' => [
                    [
                        'vardas' => 'Testas',
                        'praleido' => 4,
                    ],
                ],
            ],
        ];
    }

    if ($_POST) {
        $inputFrakcija = $_POST['inputFrakcija'];
        $inputNarys = $_POST['inputNarys'];
        $inputPraleistos = $_POST['inputPraleistos'];
        // paimamas nariu sąrasas pateiktoje frakcijoje
        $sarasas = $_SESSION["lankomumas"][$inputFrakcija];

        if (!$sarasas) {
            $_SESSION["lankomumas"][$inputFrakcija] = [
                'dienos' => $inputPraleistos,
                'nariai' => [
                    [
                        'vardas' => $inputNarys,
                        'praleido' => $inputPraleistos,
                    ],
                ],
            ];
            $sarasas = $_SESSION["lankomumas"][$inputFrakcija];
        } else {
            $esamasNarys = null;

            // surandame narį frakcijos sarase ir atnaujiname jo lankomuma
            foreach ($sarasas['nariai'] as $key => $narys) {
                if ($narys['vardas'] === $inputNarys) {
                    $esamasNarys = $narys;
                    $esamasNarys['praleido'] = $inputPraleistos;
                    $sarasas['nariai'][$key] = $esamasNarys;
                    break;
                }
            }

            // sukuriame nauja nari, nes tokio nebuvo frakcijos sarase
            if (!$esamasNarys) {
                $sarasas['nariai'][] = [
                    'vardas' => $inputNarys,
                    'praleido' => $inputPraleistos,
                ];
            }
        }

        $sarasas['dienos'] = 0;
        foreach ($sarasas['nariai'] as $narys) {
            $sarasas['dienos'] += (int)$narys['praleido'];
        }

        $_SESSION["lankomumas"][$inputFrakcija] = $sarasas;
    }
?>

<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PHP pradžia - forma</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>
<body>
<div class="container">
    <div class="card mt-4">
        <div class="card-header">
            Duomenų įvedimas
        </div>
        <div class="card-body">
            <form action="?" method="post">
                <div class="form-floating mb-3">
                    <select class="form-select" id="inputFrakcija" name="inputFrakcija" aria-label="Frakcija">
                        <?php foreach ($frakcijos as $reiksme => $pavadinimas) {
                            echo "<option value='$reiksme'>$pavadinimas</option>";
                        } ?>
                    </select>
                    <label for="inputFrakcija">Frakcija</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="inputNarys" name="inputNarys" placeholder="Frakcijos narys (-ė)">
                    <label for="inputNarys" class="col-sm-2 col-form-label">Frakcijos narys (-ė)</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="inputPraleistos" name="inputPraleistos" placeholder="Praleistų dienų" value="1" min="1">
                    <label for="inputPraleistos" class="col-sm-2 col-form-label">Praleistų dienų</label>
                </div>
                <div class="float-end">
                    <button class="btn btn-danger" type="reset">Išvalyti</button>
                    <button class="btn btn-primary" type="submit">Išsaugoti</button>
                </div>
            </form>
        </div>
    </div>
    <div class="card mt-4">
        <div class="card-header">
            Partijos lankomumo statistika
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush" id="rezultatai">
                <?php
                    foreach ($_SESSION["lankomumas"] as $inputFrakcija => $duomenys) {
                        echo "<li class='list-group-item d-flex justify-content-between align-items-start'>";
                        echo "<div class='ms-2 me-auto'>";
                        echo "<div class='fw-bold'>$frakcijos[$inputFrakcija]</div>";
                        foreach ($duomenys['nariai'] as $inputNarys) {
                            echo "<ul>";
                            echo "<li>{$inputNarys['vardas']}: {$inputNarys['praleido']}</li>";
                            echo "</ul>";
                        }
                        echo "</div>";
                        echo "<span class='badge bg-primary rounded-pill'>{$duomenys['dienos']}</span>";
                        echo "</li>";
                    }
                ?>
            </ul>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
</body>
</html>
