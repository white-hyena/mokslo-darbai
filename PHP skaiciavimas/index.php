<?php
    // Pradedame sesiją, kad išsaugoti įvedamas reikšmes
    session_start();

    // Jei užkrauname puslapį pirmą kartą, pareikiame šiuos pradinius duomenis
    if (!$_SESSION["skaiciai"]) {
        $_SESSION["skaiciai"] = [12, 39, 842, 506];
    }

    // Kai pridedame numerį, pridedame jį prie sesijos skaičių
    if ($_POST) {
        $_SESSION["skaiciai"][] = $_POST['inputNumeris'];
    }

    // paskaičiuojame naują skaičių
    function naujasSkaicius($skaicius)
    {
        $skaitmenys = str_split((string)$skaicius);
        $naujiSkaitmenys = array_map(function ($skaitmuo) {
            return (int)$skaitmuo ** 2;
        }, $skaitmenys);

        return implode('', $naujiSkaitmenys);
    }
?>

<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PHP pradžia - skaičiavimas</title>
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
            <!-- https://stackoverflow.com/questions/5826784/how-do-i-make-a-php-form-that-submits-to-self-->
            <form action="?" method="post">
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="labelNumeris" name="inputNumeris" placeholder="Naujas numeris">
                    <label for="labelNumeris" class="col-form-label">Naujas numeris</label>
                </div>
                <button class="btn btn-success" type="submit">Pridėti numerį</button>
            </form>
        </div>
    </div>
    <div class="card mt-4">
        <div class="card-header">
            Rezultatai
        </div>
        <div class="card-body row">
            <div class="col-6">
                <h4>Pirminiai skaičiai</h4>
                <ul>
                    <?php
                        // išvedame originalius skaičius
                        foreach ($_SESSION["skaiciai"] as $skaicius) {
                            echo "<li>$skaicius</li>";
                        }
                    ?>
                </ul>
            </div>
            <div class="col-6">
                <h4>Nauji skaičiai</h4>
                <ul>
                    <?php
                        // išvedame paskaičiuotus naujus skaičius
                        foreach ($_SESSION["skaiciai"] as $skaicius) {
                            $naujas = naujasSkaicius($skaicius);
                            echo "<li>$naujas</li>";
                        }
                    ?>
                </ul>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
</body>
</html>
