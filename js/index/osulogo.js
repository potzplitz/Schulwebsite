$(document).ready(function(){
    let clickCount = 0;
    let originalLogo = $(".pulse_ring").css('left');
    let originalButton = $(".osu_buttons").css('right');
    let canClick = true;

    $(".pulse_ring").click(function(){
        //Verhindert die mehrfachausführung Teil 1
        if(canClick){
            canClick = false;

            if(clickCount < 1){
                //Verschiebt den Kreis
                $(this).animate({
                    left: '-=600px'
                }, 500);

                //Verschiebt die Buttons
                $(".osu_buttons").animate({
                    right: '-=200'
                }, 500);

                //Macht Sichtbar
                $(".osu_buttons img").each(function(){
                    $(this).animate({opacity: 1}, 250);
                });

                clickCount = clickCount + 1;
            }else{
                //Verschiebe Kreis zurück
                $(this).animate({
                    left: originalLogo
                }, 500);

                //Verschiebe Buttons zurück
                $(".osu_buttons").animate({
                    right: originalButton
                }, 500);

                //Macht Unsichtbar
                $(".osu_buttons img").each(function(){
                    $(this).animate({opacity: 0}, 550);
                });

                clickCount = clickCount - 1;
            }

            //Verhindert die mehrfachausführung Teil 2
            setTimeout(function(){
                canClick = true;
            }, 500);
        }
    });
});