


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
    return (arr.offsetTop) <= $("#qContainer").scrollTop();
}


function getsectionpos(sections){

//    sections.each( function( index, element ){
//        console.log( $( this ).position()['top'] );
//    });

    tmp = [...sections].reverse().findIndex(getLab )
    if (tmp >=0){
        zz = sections.length - 1 - tmp ;
    }else
    {
        zz = 0 ;
    }

    console.log(sections[zz].firstElementChild.textContent);
    $('#section-top').html('<b>' + sections[zz].textContent + '</b>' ); //sections[zz].firstElementChild.textContent + ' ' +
}


function scrollFunction() {
    const sections = $(".template__section");
    //console.log($("#qContainer").scrollTop() );
    getsectionpos(sections);


    if ($("#qContainer").scrollTop() >= 0  && $("#qContainer").scrollTop() <110 ) {
    //console.log($('#qheader').text);
        $("#qHeader").height(150- $("#qContainer").scrollTop());
        $("#qHeader").css("opacity", "1");
        $("#qHeader").css("blur", "0px");
        $("#stats-container").height(88- $("#qContainer").scrollTop());
    } else {
        $("#qHeader").height(40);
        $("#stats-container").height(0);
        $("#qHeader").css("opacity", "0.9");
        $("#qHeader").css("blur", "20px");
    }
}