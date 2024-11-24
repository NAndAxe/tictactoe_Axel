let eredmeny;
let otodik_kocka;
window.onload = function () {
    eredmeny = document.getElementById("eredmeny");
    otodik_kocka = document.getElementById("value5");
}
function Mode(event) {
    const clickedId = event.target.id;
    gamemode = clickedId[3];
    console.log("Gamemode: " + gamemode)
}
let kivalasztott;
let gamemode = 0;
let player_turn = 0;
let game_on = true;
let ertekek = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let ertekek_botnak = [...ertekek];
let bot_osszeg = 0;
let megoldás = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [7, 5, 3]];
let bot_tomb = [];

function Game(event) {
    if (game_on) {
        const clickedDivId = event.target.id;
        let div_ertek = document.getElementById(clickedDivId).innerHTML;
        if (player_turn == 8) {
            eredmeny.innerHTML = "A játék döntetlen."
            game_on = false;
        }
        if (player_turn % 2 == 0) {
            if (div_ertek == "") {
                document.getElementById(clickedDivId).innerHTML = 'X';
                player_turn++;
            }
            if (gamemode == 2) {
                for (let k = 0; k < ertekek.length; k++) {
                    if (ertekek[k] == clickedDivId[5]) {
                        ertekek.splice(k, 1)
                    }
                }
                let kivalasztott_i = Math.floor(Math.random() * (ertekek.length));
                let kivalasztott = ertekek[kivalasztott_i];
                bot_tomb.push(parseInt(kivalasztott, 10));
                ertekek.splice(kivalasztott_i, 1);
                document.getElementById("value" + kivalasztott).innerHTML = "O";
                player_turn++;

            }

        }
        else {
            if (div_ertek == "") {
                document.getElementById(clickedDivId).innerHTML = "O";
                player_turn++;
            }
        }
        let szam = 0;
        if (player_turn > 4) {
            szam = parseFloat(clickedDivId[5]);
            let sor = Math.ceil(szam / 3);
            let oszlop = szam % 3;
            if (oszlop == 0) {
                oszlop = 3;
            }
            let osszefuzes = "";
            let osszefuzes2 = "";
            for (let i = 1; i <= 3; i++) {
                let index_2 = (i - 1) * 3 + oszlop;
                osszefuzes2 = osszefuzes2 + document.getElementById("value" + index_2).innerHTML;
                if (sor > 1) {
                    let index = (sor - 1) * 3 + i;
                    osszefuzes = osszefuzes + document.getElementById("value" + index).innerHTML;

                }
                else {
                    let index = i;
                    osszefuzes = osszefuzes + document.getElementById("value" + index).innerHTML;
                }

            }
            if (osszefuzes == "XXX" || osszefuzes2 == "XXX") {
                eredmeny.innerHTML = "A játék nyertese az X (player1).";
                game_on = false;
                return;
            }
            if (osszefuzes == "OOO" || osszefuzes2 == "OOO") {
                eredmeny.innerHTML = "A játék nyertese a O (player2).";
                game_on = false;
            }
        }
        if (document.getElementById("value5").innerHTML != "") {
            if (document.getElementById("value1").innerHTML == document.getElementById("value5").innerHTML &&
                document.getElementById("value1").innerHTML == document.getElementById("value9").innerHTML ||
                document.getElementById("value3").innerHTML == document.getElementById("value5").innerHTML &&
                document.getElementById("value3").innerHTML == document.getElementById("value7").innerHTML) {
                eredmeny.innerHTML = "A játék nyertese a(z)" + document.getElementById("value5").innerHTML;
                game_on = false;
            }
        }
        let harom_par = 0;
        for (let v = 0; v < megoldás.length; v++) {
            for (let y = 0; y < bot_tomb.length; y++) {
                console.log("1megoldás tomb:"+ megoldás[v][0]);
                console.log("2megoldás tomb:"+megoldás[v][1]);
                console.log("3megoldás tomb:"+megoldás[v][2]);
                console.log("bot tomb y:"+ bot_tomb[y]);
                if (megoldás[v][0] == bot_tomb[y]) {
                    harom_par++;
                }
                if (megoldás[v][1] == bot_tomb[y]) {
                    harom_par++;
                }
                if (megoldás[v][2] == bot_tomb[y]) {
                    harom_par++;
                }
                if (harom_par == 3) {
                    eredmeny.innerHTML = "A játék nyertese a O (player2).";
                    game_on = false;
                } 
                console.log("PÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁR: "+harom_par);
            }
            harom_par = 0;
            
        }
    }
}
function Reset() {
    const divs = document.querySelectorAll(".ertekek");
    divs.forEach(elem => {
        elem.innerHTML = "";
    })
    player_turn = 0;
    game_on = true;
    eredmeny.innerHTML = "";
    ertekek = ['1', "2", "3", "4", "5", "6", "7", "8", "9"];
    bot_tomb = [];
}
