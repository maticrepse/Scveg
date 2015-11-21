/**
 * Created by maticrepse on 21/11/15.
 */
var pageWidth = 550;
var stevecSlik=0;
var maxID=3;
var idSlik=0;
$(window).ready(function(){
    var width = window.innerWidth;
    var padding = width-pageWidth;
    if(padding<1){
        padding=0;
    }
    $(".container-fluid").css("padding-left", padding/2);
    $(".container-fluid").css("padding-right", padding/2);
    $("#mainContainer").css("width", pageWidth);
});
$(window).resize(function(){
    var width = window.innerWidth;
    var padding = width-pageWidth;
    if(padding<1){
        padding=0;
    }
    $(".container-fluid").css("padding-left", padding/2);
    $(".container-fluid").css("padding-right", padding/2);
    $("#mainContainer").css("width", pageWidth);
});

function prestaviActive(vrednost){
    if(vrednost=="home"){
        $("#home").addClass("active");
        $("#profile").removeClass("active");
        $("#logout").removeClass("active");
    }else if(vrednost=="profile"){
        $("#home").removeClass("active");
        $("#profile").addClass("active");
        $("#logout").removeClass("active");
    }else if(vrednost=="logout"){
        $("#home").removeClass("active");
        $("#profile").removeClass("active");
        $("#logout").addClass("active");
    }
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            stevecSlik++;
            idSlik++;
            $('#slikce').append("<img class='uploadSlike col-lg-3' src='#' id='slika"+idSlik+"'><a href='#' id='zapri"+idSlik+"' class='close col-lg-1 uploadSlike' aria-label='close' onclick=zbrisiSliko('"+idSlik+"')>&times;</a>");
            $('#slika'+idSlik).attr('src', e.target.result);
            if(stevecSlik==maxID){
                $("#dodajSliko").addClass("disabled").attr("disabled", true);
                $("#inputDodajSliko").addClass("disabled").attr("disabled", true);

            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function zbrisiSliko(id){
    $("#slika"+id).remove();
    $("#zapri"+id).remove();
    stevecSlik--;
    if(stevecSlik<maxID){
        console.log("Drakc");
        $("#dodajSliko").attr("disabled", false);
        $("#inputDodajSliko").attr("disabled", false);
        $("#dodajSliko").removeClass("disabled");
        $("#inputDodajSliko").removeClass("disabled");
    }
}