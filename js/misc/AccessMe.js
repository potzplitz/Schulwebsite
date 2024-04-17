$(document).ready(function() {
  checkToken();
});

function checkToken() {
  console.log("Token überprüfen...");
  $.ajax({
      type: "GET",
      url: "../../php/refreshchecker.php", 
      success: function(response) {
          console.log("Token überprüft.");
          accessMe();
      },
      error: function(xhr, status, error) {
          console.log("Fehler beim Überprüfen des Tokens:", error);
          failed();
      }
  });
}

function accessMe() {
  console.log("Zugriff auf Benutzerdaten...");
  $.ajax({
      type: "GET",
      url: "../../php/MeRequest.php", 
      success: function(response) {
          console.log("Benutzerdaten erhalten:", response);
          phraseJsonMe(response); 
      },
      error: function(xhr, status, error) {
          console.log("Fehler beim Zugriff auf Benutzerdaten:", error);
          failed();
      }
  });
}

function phraseJsonMe(JsonString) {
  console.log("Verarbeitung der Benutzerdaten...");
  let parsedData = JSON.parse(JsonString);
  let avatarUrl = parsedData.avatar_url;
  let name = parsedData.username;
  let rank = parsedData.rank_history.data[89];
  let uid = parsedData.id;
  addValueMe(avatarUrl, name, rank, uid);
}

function failed() {
  console.log("Authentifizierung fehlgeschlagen.");
  $("#apiName").text("Anmelden");
  $(".account").css('background-color' , 'rgb(105, 7, 7)');
  $('.account').wrap('<a href="https://osu.ppy.sh/oauth/authorize?client_id=28681&redirect_uri=http://localhost/php/callback.php&response_type=code&scope=identify%20public"></a>');
}

function addValueMe(BildURL, PlayerName, rank, uid) {
  console.log("Hinzufügen von Benutzerdaten auf der Website...");
  var bildElement = document.getElementById('accountPic');
  bildElement.src = BildURL;

  $("#apiName").text(PlayerName + "        #" + rank);

  let externalLink = '../../html/profileviewer/pv.html?name=' + PlayerName;

  $('.account').on('click', function(event) {
      window.location.href = externalLink;
  });
}
