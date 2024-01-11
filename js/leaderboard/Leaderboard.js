$(document).ready(function() {
    access();
    clickArrowButtons();
});

// rankRequest.php wird aufgerufen und so auf die osu!api zugegriffen
function access() {
    const urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('page'); 

    $.ajax({
        type: "GET",
        url: "../../php/RankRequest.php", 
        success: function(response) {
            console.log(response);
            phraseJson(response); 
            rowClick();
            tableClick(); 
        },
        data: {page: page},
        error: function(xhr, status, error) {
            failed();
        }
    });
}

 // seitenwechselbuttons
function clickArrowButtons() {

    const urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('page'); 

    if((parseInt(page) - 1) <= 0) { // wenn auf seite 0, dann wird der button #backwards ausgeblendet.
        $('#backwards').hide();
    } else {
        $('#backwards').show();
    }

    if((parseInt(page) + 1) >= 200) { // wenn auf seite 200, dann wird der button #forward ausgeblendet.
        $('#forward').hide();
    } else {
        $('#forward').show();
    }

    // seitenzahl wird auf buttons geschrieben
    $('#backwards').text('← Seite ' + (parseInt(page) - 1));
    $('#forward').text('Seite ' + (parseInt(page) + 1) + " →");
    $('#currentpage').text('Seite ' + page);
    
    // event listeners für die buttons
        $('#backwards').click(function() {
            window.location.href = '../../html/leaderboard/Leaderboard.html?page=' + (parseInt(page) - 1);
        });

        $('#forward').click(function() {
            window.location.href = '../../html/leaderboard/Leaderboard.html?page=' + (parseInt(page) + 1);
        });

        $('#firstpage').click(function() {
            window.location.href = '../../html/leaderboard/Leaderboard.html?page=1';
        });

        $('#lastpage').click(function() {
            window.location.href = '../../html/leaderboard/Leaderboard.html?page=200';
        });
}

// daten von der osu! api werden hier verarbeitet
function phraseJson(JsonString) {
    let parsedData = JSON.parse(JsonString);
    let Json = parsedData.ranking;

    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    // verarbeitete elemente werden in die tabelle hinzugefügt
    Json.forEach(entry => {
        const row = tableBody.insertRow();
        const ppCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const rankCell = row.insertCell(2);
        const accCell = row.insertCell(3);

        nameCell.innerHTML = entry.user.username;
        rankCell.innerHTML = "#" + entry.global_rank;
        ppCell.innerHTML = entry.pp;
        accCell.innerHTML = entry.hit_accuracy.toFixed(2) + "%";
    });
}

// wenn ein tabellensatz angeklickt wird, kommt man auf das profil des spielers
function rowClick() {
    $('#dataTable tbody tr').click(function() {
        const playerName = $(this).find('td:eq(1)').text(); 
        const url = '../../html/profileviewer/pv.html?name=' + encodeURIComponent(playerName);

        window.location.href = url;
    });
}