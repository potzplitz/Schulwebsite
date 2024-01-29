$(document).ready(function() {
  main();
});

function main() {
  $('#randomize').click(function() { // wenn der button #randomize gedrückt wird wid onPress() ausgeführt
      onPress();
  });

  $('#direct').click(function() { // wenn der button #direct gedrückt wird wid openDirectFromResult() ausgeführt
      openDirectFromResult();
  });

  $('#browser').click(function() { // wenn der button #browser gedrückt wird wid openBrowserFromResult() ausgeführt
    openBrowserFromResult();
});

}

// wenn generieren button gedrückt wird, werden daten aus der Datenbank geholt
function onPress() {
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page');

  $.ajax({
      type: "GET",
      url: "http://10.1.213.16:8080",
      success: function(response) {
          console.log(response);
          let result = JSON.parse(response);
          console.log(result.beatmapset_id);
          $('#direct').data('beatmapset_id', result.beatmapset_id);
          $('#browser').data('beatmapset_id', result.beatmapset_id);
          showImage(result);
      },
      error: function(xhr, status, error) {
          console.log("fail");
      }
  });
}

// elemente aus MongoDB werden hinzugefügt
function showImage(result) {
  $("#beatmapimg").attr("src", "https://assets.ppy.sh/beatmaps/" + result.beatmapset_id + "/covers/card.jpg");
  $("#BeatmapName").text(result.title);
  $("#TitleP").text(result.title);
  $("#ArtistP").text(result.creator);
  $("#ArtistP").text(result.creator);
  
  // beatmap info

  $("#sr").text("Star rating: " + result.difficulty_rating + "⭐");
  $("#ar").text("Approach Rate: " + result.ar);
  $("#bpm").text("BPM: " + result.bpm);
  $("#length").text("Länge: " + result.hit_length + " sek.");

  // tags
  $("#tags").text("Tags: " + result.tags);

  // pp

  $("#ppDT").text("DT 100%: " + result.ppdata.dt.pp.p_100.toFixed(2) + " 99%: " + result.ppdata.dt.pp.p_99.toFixed(2) + " 98%: " + result.ppdata.dt.pp.p_98.toFixed(2));
  $("#ppHD").text("HD 100%: " + result.ppdata.hd.pp.p_100.toFixed(2) + " 99%: " + result.ppdata.hd.pp.p_99.toFixed(2) + " 98%: " + result.ppdata.hd.pp.p_98.toFixed(2));
  $("#ppHR").text("HR 100%: " + result.ppdata.hr.pp.p_100.toFixed(2) + " 99%: " + result.ppdata.hr.pp.p_99.toFixed(2) + " 98%: " + result.ppdata.hr.pp.p_98.toFixed(2));
  

  console.log(result.ppdata);

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
      window.location.href = "https://osu.ppy.sh/beatmapsets/" + id;
  } else {
      console.error("Beatmapset ID not available.");
  }
}
