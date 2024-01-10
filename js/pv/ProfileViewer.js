function apiPhrase() {
    const value = getParameterValue('name');
    let meinTextfeld = document.getElementById('searchField');
    let wertAusTextfeld = meinTextfeld.value;
    $.ajax({
        type: "GET",
        url: "../../php/ProfileRequest.php", 
        data: { user: wertAusTextfeld },
        success: function(response) {
            parse(response);
        },
        error: function(xhr, status, error) {
            failed();
        }
    });
}

function parse(string) {
    let parsedData = JSON.parse(string);

    $(".pvProfilePicture").attr("src", parsedData.avatar_url);
    $("#PlayerName").text(parsedData.username + " [" + parsedData.country_code + "]");
    $("#titel").text("Profil von " + parsedData.username);
    $("#GlobalRankP").text("Globaler Rang: " + parsedData.rank_history.data[89]);
    $("#CountryRankP").text("Landesrangliste: " + parsedData.statistics.country_rank);
    $("#pp").text("(" + parsedData.statistics.pp + "pp)");
    $(".bannerImg").attr("src", parsedData.cover.url);

    if (parsedData.badges.length >= 3) {

    $(".badge1img").attr("src", parsedData.badges[0]['image@2x_url']);
    $(".badge2img").attr("src", parsedData.badges[1]['image@2x_url']);
    $(".badge3img").attr("src", parsedData.badges[2]['image@2x_url']);

    } else {

    $(".badge1img").attr("src", null);    
    $(".badge2img").attr("src", null);
    $(".badge3img").attr("src", null);

    }
    $("#userInfoP").text("Genauigkeit: " + (parsedData.statistics.hit_accuracy).toFixed(2) + "% • Spiele gespielt: " + parsedData.statistics.play_count + " • höchste Combo: " + parsedData.statistics.maximum_combo);
   const hours = Math.round(parsedData.statistics.play_time / 3600);
    $("#PlayTimeP").text("Spielzeit: " + hours + " Stunden");
    $('.playerinfo').on('click', function(event) {
        event.preventDefault();
        window.location.href = 'https://osu.ppy.sh/users/' + parsedData.id;
    });  
    graph(parsedData.rank_history.data)
    ShowObjects();
}

function graph(jsonString) {

    const dataObj = jsonString; 
    const labels = Object.keys(dataObj); 
    const dataValues = Object.values(dataObj); 
    const ctx = document.createElement('canvas');
    const chartContainer = document.getElementById('chartContainer'); 
    const chartCanvas = chartContainer.querySelector('canvas'); 
    if (chartCanvas) {
        chartContainer.removeChild(chartCanvas);
    }
    document.getElementById('chartContainer').appendChild(ctx); 
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rang',
                data: dataValues.reverse(),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    reverse: true
                }
            }
        }
    });
}

function getParameterValue(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

function getParameterValueTextFeld() {
    let meinTextfeld = document.getElementById('searchField');
    let wertAusTextfeld = meinTextfeld.value;
    return(wertAusTextfeld);
}
function performSearch() {   
    const value = getParameterValueTextFeld();
        
        $.ajax({
            type: "GET",
            url: "../../php/ProfileRequest.php",
            data: { user: value },
            success: function(response) {
                parse(response);
            },
            error: function(xhr, status, error) {
                failed();
            }
        });
}
function searchWithParameter() {
    const value = getParameterValue('name');
    if (value) {     
        $.ajax({
            type: "GET",
            url: "../../php/ProfileRequest.php",
            data: { user: value },
            success: function(response) {
                parse(response);
            },
            error: function(xhr, status, error) {
                failed();
            }
        });
    }
}

$(document).ready(function() {  
    searchWithParameter();   
    $("#searchButton").click(function() {
        performSearch(); 
    });
});

function ShowObjects() {
    $('#visible').css('visibility', 'visible');    
}