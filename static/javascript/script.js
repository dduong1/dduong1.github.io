


function test(){
    console.log("pepe assessment");
}


function postUpdateBox(elem,item, aID){
    $('#' + elem ).empty();
    if (item == 1){
    $('#' + elem ).html('<p class="text-danger">Not in place</p>');
    }else if(item == 2){
    $('#' + elem ).html('<p class="text-warning">In place but not compliant</p>');
    }else if(item == 3){
    $('#' + elem ).html('<p class="text-secondary">Partially compliant with significant adjustments required</p>');
    }else if(item == 4){
    $('#' + elem ).html('<p class="text-info">Partially compliant with minor adjustments required</p>');
    }else if(item == 5){
    $('#' + elem ).html('<p class="text-success">Fully compliant</p>');
    }else if(item == 0){
    $('#' + elem ).html('<p class="text-success">Not applicable</p>');
    }

    $.ajax({
        type: "POST",
        url: "/assessment/postUpdateBox",
        data: {"aID" : aID, "val": item },
        success: function(data) {
            console.log("OK")
        }
    });
}


function postComment(aID){
    txtarea = $('#' + aID + '_comment').val();
    $.ajax({
        type: "POST",
        url: "/assessment/postComment",
        data: {"aID" : aID, "text": txtarea},
        success: function(data) {
            console.log("OK")
        }
    });
}

//function activateScroll(){
//    window.onscroll = function() {scrollFunction()};
//    console.log("activateScroll");
//}

function getLab(arr){
    //console.log($("#qContainer").scrollTop() + "        " + (arr.offsetTop).toString());
    return (arr.offsetTop) <= $("#qContainer").scrollTop()-180;
}


function getsectionpos(sections){

//    sections.each( function( index, element ){
//        console.log( $( this ).position()['top'] );
//    });
    tmp = [...sections].reverse().findIndex(getLab)
    if (tmp >=0){
        zz = sections.length - 1 - tmp ;
        
        // $('#section-top').html('<b>' + sections[zz].textContent + '</b>' ); //sections[zz].firstElementChild.textContent + ' ' +
    }else
    {
        zz = 0 ;
    }
    // console.log(sections[zz].firstElementChild.textContent);
    $('#section-top').html('<b>' + sections[zz].textContent + '</b>' ); 
}


function scrollFunction() {
    const sections = $(".template__section");
    // console.log($("#qContainer").scrollTop() );
    
    // $("#pos").empty();
    // $("#pos").html($("#qContainer").scrollTop());

    if ($("#qContainer").scrollTop() >= -1000  && $("#qContainer").scrollTop() <180 ) { //

        $("#qHeader").height(220- $("#qContainer").scrollTop());        
        $("#qHeader").css("opacity", "1");
        $("#qHeader").css("blur", "0px");
        
        $("#stats-container").height(220- $("#qContainer").scrollTop());
        $('#section-top').empty();
    }

    else if ($("#qContainer").scrollTop() >= 180 && $("#qContainer").scrollTop() < 220){
        var c = 1-($("#qContainer").scrollTop()-180)/39;
        $("#stats-container").css("color","rgba(239, 239, 239,"+ c +")") // " + 1-($("#qContainer").scrollTop()-130)/39 + ")");
        console.log(1-($("#qContainer").scrollTop()-180)/39 );
        $('#section-top').empty();
    }
    // else if ($("#qContainer").scrollTop() >= 220 && $("#qContainer").scrollTop() < 240){
    //     var c = ($("#qContainer").scrollTop()-220)/39;
    //     $("#qHeader").height(40);
    //     $("#stats-container").height(0);
    //     $("#qHeader").css("color", c);
    //     $("#qHeader").css("blur", "20px");

    // }
    else {
        getsectionpos(sections);
        $("#qHeader").height(40);
        $("#stats-container").height(0);
        $("#qHeader").css("opacity", "0.9");
        $("#qHeader").css("blur", "20px");
    }
}
