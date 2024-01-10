$(document).ready(function() {
  main();
});

function main() {
  $('#randomize').click(function() {
      onPress();
  });

  $('#direct').click(function() {
      openDirectFromResult();
  });

  $('#browser').click(function() {
    openBrowserFromResult();
});

}

function onPress() {
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page');

  $.ajax({
      type: "GET",
      url: "../../php/BeatmapRandomizer.php",
      success: function(response) {
          console.log(response);
          let result = JSON.parse(response);
          console.log(result.beatmapset_id);
          $('#direct').data('beatmapset_id', result.beatmapset_id);
          $('#browser').data('beatmapset_id', result.beatmapset_id);
          showImage(result);
      },
      error: function(xhr, status, error) {
          failed();
      }
  });
}

// elemente aus MongoDB werden hinzugefügt
function showImage(result) {
  $("#beatmapimg").attr("src", "https://assets.ppy.sh/beatmaps/" + result.beatmapset_id + "/covers/card.jpg");
  $("#BeatmapName").text(result.title);
  $("#TitleP").text(result.title);
  $("#ArtistP").text(result.creator);
  dfdf
}

// In osu!direct öffnen
function openDirectFromResult() {
  let id = $('#direct').data('beatmapset_id');
  if (id) {
      console.log(id);
      window.open("osu://b/" + id);
  } else {
      console.error("Beatmapset ID not available.");
  }
}

// im browser öffnen
function openBrowserFromResult() {
  let id = $('#browser').data('beatmapset_id');
  if (id) {
      console.log(id);
      window.location.href = "https://osu.ppy.sh/beatmaps/" + id;
  } else {
      console.error("Beatmapset ID not available.");
  }
}
