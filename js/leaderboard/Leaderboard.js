$(document).ready(function() {
    access();
    clickArrowButtons();
});

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

function clickArrowButtons() {

    const urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('page'); 

    if((parseInt(page) - 1) <= 0) {
        $('#backwards').hide();
    } else {
        $('#backwards').show();
    }

    if((parseInt(page) + 1) >= 200) {
        $('#forward').hide();
    } else {
        $('#forward').show();
    }

    $('#backwards').text('← Seite ' + (parseInt(page) - 1));
    $('#forward').text('Seite ' + (parseInt(page) + 1) + " →");
    $('#currentpage').text('Seite ' + page);
    
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

function phraseJson(JsonString) {
    let parsedData = JSON.parse(JsonString);
    let Json = parsedData.ranking;

    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

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

function tableClick() {
    $('#dataTable th').click(function() {
    });
}

function rowClick() {
    $('#dataTable tbody tr').click(function() {
        const playerName = $(this).find('td:eq(1)').text(); 
        const url = '../../html/profileviewer/pv.html?name=' + encodeURIComponent(playerName);

        window.location.href = url;
    });
}