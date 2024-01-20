$(document).ready(function() {
    accessMe();
  });
  
  // MeRequest.php wird aufgerufen und so auf die osu!api zugegriffen
  function accessMe() {
        $.ajax({
            type: "GET",
            url: "../../php/MeRequest.php", 
            success: function(response) {
                    phraseJsonMe(response); 
            },
            error: function(xhr, status, error) {
               failed();
            }
        });
  }

 // daten der api werden verarbeitet
  function phraseJsonMe(JsonString) {

    console.log(JsonString);
  let parsedData = JSON.parse(JsonString);
  let avatarUrl = parsedData.avatar_url;
  let name = parsedData.username;
  let rank = parsedData.rank_history.data[89];
  let uid = parsedData.id;
  
  addValueMe(avatarUrl, name, rank, uid);

  }
  
  // wenn die authentifizierung fehlgeschlagen hat, wird dazu aufgefordert, sich erneut zu authentifizieren.
  function failed() {
  
    $("#apiName").text("Anmelden");
    $(".account").css('background-color' , 'rgb(105, 7, 7)');
    $('.account').wrap('<a href="https://osu.ppy.sh/oauth/authorize?client_id=28681&redirect_uri=http://localhost/php/callback.php&response_type=code&scope=identify%20public"></a>');

  }

  // verarbeitete daten werden auf der website hinzugefügt
  function addValueMe(BildURL, PlayerName, rank, uid) {


  var bildElement = document.getElementById('accountPic');
  bildElement.src = BildURL;

  $("#apiName").text(PlayerName + "        #" + rank);

  let externalLink = '../../html/profileviewer/pv.html?name=' + PlayerName;

  $('.account').on('click', function(event) {
    window.location.href = externalLink;
});

  }