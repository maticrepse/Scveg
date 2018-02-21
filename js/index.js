/**
 * Created by maticrepse on 21/11/15.
 */
var pageWidth = 550;
var stevecSlik=0;
var maxID=3;
var idSlik=1;
var slika1=null;
var slika2=null;
var slika3=null;
var removed1=true;
var removed2=true;
var removed3=true;
var stevecObjav=0;
$(window).ready(function(){
    var width = window.innerWidth;
    var padding = width-pageWidth;
    if(padding<1){
        padding=0;
    }
    $(".container-fluid").css("padding-left", padding/2);
    $(".container-fluid").css("padding-right", padding/2);
    if(width>549){
        $("#mainContainer").css("width", pageWidth);
    }else{
        $("#mainContainer").css("width", width);
        $("#dodajObjavo").css("margin-left", (width-140)/2);
        $(".modal-dialog").css("width", width-50);
        $(".modal-dialog").css("margin-left", 25);
    }
    if(width<768){
        $(".mediaHr").show();
        $("#slikaProfila").css("width", "20%");
        $("#slikaProfila").css("margin-left", "40%");
        $("#slikaProfila").css("margin-right", "40%");
    }else{
        $(".mediaHr").hide();
    }


});
$(window).resize(function(){
    var width = window.innerWidth;
    var padding = width-pageWidth;
    if(padding<1){
        padding=0;
    }
    $(".container-fluid").css("padding-left", padding/2);
    $(".container-fluid").css("padding-right", padding/2);
    if(width>549){
        $("#mainContainer").css("width", pageWidth);
    }else{
        $("#mainContainer").css("width", width);
        $("#dodajObjavo").css("margin-left", (width-140)/2);
        $(".modal-dialog").css("width", width-50);
        $(".modal-dialog").css("margin-left", 25);
    }
    if(width<768){
        $(".mediaHr").show();
        $("#slikaProfila").css("width", "20%");
        $("#slikaProfila").css("margin-left", "40%");
        $("#slikaProfila").css("margin-right", "40%");
    }else{
        $(".mediaHr").hide();
    }
});

function prestaviActive(vrednost){
    if(vrednost=="home"){
        $("#tab1").show();
        $("#tab2").hide();
        $("#tab3").hide();
        $("#tab4").hide();
        $("#home").addClass("active");
        $("#profile").removeClass("active");
        $("#logout").removeClass("active");
        $("#search").removeClass("active");
    }else if(vrednost=="profile"){
        $("#tab2").show();
        $("#tab1").hide();
        $("#tab3").hide();
        $("#tab4").hide();
        $("#home").removeClass("active");
        $("#profile").addClass("active");
        $("#logout").removeClass("active");
        $("#search").removeClass("active");
    }else if(vrednost=="logout"){
        $("#tab3").show();
        $("#tab2").hide();
        $("#tab1").hide();
        $("#tab4").hide();
        $("#home").removeClass("active");
        $("#profile").removeClass("active");
        $("#logout").addClass("active");
        $("#search").removeClass("active");
    }else if(vrednost=="search"){
        $("#tab3").hide();
        $("#tab2").hide();
        $("#tab1").hide();
        $("#tab4").show();
        $("#home").removeClass("active");
        $("#profile").removeClass("active");
        $("#logout").removeClass("active");
        $("#search").addClass("active");
        $("#prestaviTab").click();
    }
}
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            stevecSlik++;
            idSlik++;
            $('#slikce').append("<img class='uploadSlike col-lg-3 col-sm-3 col-xs-3' src='#' id='slika"+idSlik+"'><a href='#' id='zapri"+idSlik+"' class='close col-lg-1 col-sm-1 col-xs-1 uploadSlike' aria-label='close' onclick=zbrisiSliko('"+idSlik+"')>&times;</a>");
            var resultat= e.target.result;
            if(removed1){
                slika1 = resultat;
                $('#slika'+idSlik).attr('src', slika1);
                removed1=false;
            } else if(removed2){
                slika2 = resultat;
                $('#slika'+idSlik).attr('src', slika2);
                removed2=false;
            } else if(removed3){
                slika3 = resultat;
                $('#slika'+idSlik).attr('src', slika3);
                removed3=false;
            }
            if(stevecSlik==maxID){
                $("#dodajSliko").addClass("disabled");
                $("#inputDodajSliko").attr("disabled", true);

            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function zbrisiSliko(id){
    var src = $("#slika"+id).attr("src");
    $("#slika"+id).remove();
    $("#zapri"+id).remove();
    stevecSlik--;
    if(stevecSlik<maxID){
        $("#inputDodajSliko").attr("disabled", false);
        $("#dodajSliko").removeClass("disabled");
    }
    if(slika1==src && !removed1){
        slika1=null;
        removed1=true;
    } else if(slika2==src && !removed2){
        slika2=null;
        removed2=true;
    } else if(slika3 == src&& !removed3){
        slika3=null;
        removed3=true;
    }
}
$(document).ready(function(){
    $("#dodajObjavo").click(function(){
        $("#objavi").attr("disabled", true);
    });
    var inputVal="";
    $("#comment").on('input',function(e){
        inputVal = $(this).val();
        if(inputVal==""){
            $("#objavi").attr("disabled", true);
        }else{
            $("#objavi").attr("disabled", false);
        }
    });
    $("#searchBar").keydown(function(e){
        //iskaje
    });
    //newsFeed
    $("#objavi").click(function(){
        var country = geoplugin_countryName();
        var zone = geoplugin_region();
        var city = geoplugin_city();
        var inputStart=inputVal;
        //inputVal=inputVal.replace(/[^a-ž0-9A-Ž@]/g, " ");
        var stevec=0;
        while(inputStart.indexOf("@")!=-1) {
            var index = inputStart.indexOf("@");
            var index2=index+1;
            var regex=/[^a-ž0-9A-Ž]/g;

            while(index2<inputStart.length && !regex.test(inputStart.substr(index2, 1))){
                index2++;
            }
            if(index+1!=index2){
                var length = (index2-index);
                var replace = inputStart.substr(index,length);
                var replace2 = inputStart.substr(index+1,length-1);
                var afna = "afna";
                inputVal = inputVal.substr(0,index) +"<a class='afna' onclick=isci('"+afna+replace2+"')>"+replace+"</a>" + inputVal.substr(index2);
                inputStart = inputStart.replace(replace, "<a class='afna' onclick=isci('"+afna+replace2+"')>"+replace+"</a>");
                inputStart = inputStart.replace("@",".");
            }else{
                inputStart = inputStart.replace("@",".");

            }

        }
        var inputStart=inputVal;
        //inputVal=inputVal.replace(/[^a-ž0-9A-Ž@]/g, " ");
        var stevec=0;
        while(inputStart.indexOf("#")!=-1) {
            var index = inputStart.indexOf("#");
            var index2=index+1;
            var regex=/[^a-ž0-9A-Ž]/g;

            while(index2<inputStart.length && !regex.test(inputStart.substr(index2, 1))){
                index2++;
            }
            if(index+1!=index2){
                var length = (index2-index);
                var replace = inputStart.substr(index,length);
                var replace2 = inputStart.substr(index+1,length-1);
                var hash="hash";
                inputVal = inputVal.substr(0,index) +"<a class='afna' onclick=isci('"+hash+replace2+"')>"+replace+"</a>" + inputVal.substr(index2);
                inputStart = inputStart.replace(replace, "<a class='afna' onclick=isci('"+hash+replace2+"')>"+replace+"</a>");

                inputStart = inputStart.replace("#",".");
            }else{
                inputStart = inputStart.replace("#",".");

            }

        }
        if(stevecSlik==0){
            stevecObjav++;
            var datum = new Date();
            var dan = datum.getDate();
            var mesec = datum.getMonth()+1;
            var leto = datum.getYear() -100 +2000;
            $("#newsFeed").prepend('<div class="panel panel-success"> <div class="panel-heading" id="objava'+stevecObjav+'"> <img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span><span class="glyphicon glyphicon-map-marker">   </span><span class="lokacija">'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12 textInput">'+inputVal+' </div> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            $("#mojeObjave").prepend('<div class="panel panel-success"> <div class="panel-heading" id="mojaObjava'+stevecObjav+'"> <img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span> <span class="glyphicon glyphicon-map-marker">   </span><span class="lokacija">'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12 textInput">'+inputVal+' </div> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            idSlik=0;
            $("#slikce").empty();
            $("#comment").val("");
            inputVal="";
            $(".panelBodyPhoto").css("margin-left", (518-450)/2);
            //objava brez slik
        }else if(stevecSlik==1){

            var src;
            if(!removed1){
                src=slika1;
                slika1=null;
                removed1=true;
            } else if(!removed2){
                src=slika2;
                slika2=null;
                removed2=true;
            } else if(!removed3){
                src=slika3;
                slika3=null;
                removed3=true;
            }
            stevecObjav++;
            var datum = new Date();
            var dan = datum.getDate();
            var mesec = datum.getMonth()+1;
            var leto = datum.getYear() -100 +2000;
            $("#newsFeed").prepend('<div class="panel panel-success"><div class="panel-heading" id="objava'+stevecObjav+'"><img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span><span class="glyphicon glyphicon-map-marker"> </span>   <span class="lokacija">'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12 textInput">'+inputVal+'</div> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src+'" class="panelBodyPhoto"> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            $("#mojeObjave").prepend('<div class="panel panel-success"><div class="panel-heading" id="mojaObjava'+stevecObjav+'"><img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span> <span class="glyphicon glyphicon-map-marker">   </span><span class="lokacija">'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12 textInput">'+inputVal+'</div> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src+'" class="panelBodyPhoto"> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            stevecSlik=0;
            idSlik=0;
            $("#slikce").empty();
            $("#comment").val("");
            inputVal="";
            $(".panelBodyPhoto").css("margin-left", (518-450)/2);
            //objava z eno sliko
        }else if(stevecSlik==2){
            var src1;
            var src2;
            if(!removed1){
                src1=slika1;
                slika1=null;
                removed1=true;
            }else if(!removed2){
                src1=slika2;
                slika2=null;
                removed2=true;
            } else if(!removed3){
                src1=slika3;
                slika3=null;
                removed3=true;
            }
            if(!removed1){
                src2=slika1;
                slika1=null;
                removed1=true;
            }else if(!removed2){
                src2=slika2;
                slika2=null;
                removed2=true;
            } else if(!removed3){
                src2=slika3;
                slika3=null;
                removed3=true;
            }
            stevecObjav++;
            var datum = new Date();
            var dan = datum.getDate();
            var mesec = datum.getMonth()+1;
            var leto = datum.getYear() -100 +2000;
            $("#newsFeed").prepend('<div class="panel panel-success"><div class="panel-heading" id="objava'+stevecObjav+'"><img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span> <span class="lokacija"><span class="glyphicon glyphicon-map-marker">   </span>'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12 textInput">'+inputVal+'</div> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src1+'" class="panelBodyPhoto"> </div><div class="row">&nbsp</div><div class="row"> <img src="'+src2+'" class="panelBodyPhoto"> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            $("#mojeObjave").prepend('<div class="panel panel-success"><div class="panel-heading" id="mojaObjava'+stevecObjav+'"><img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span><span class="glyphicon glyphicon-map-marker">   </span><span class="lokacija">'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12 textInput">'+inputVal+'</div> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src1+'" class="panelBodyPhoto"> </div><div class="row">&nbsp</div><div class="row"> <img src="'+src2+'" class="panelBodyPhoto"> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            stevecSlik=0;
            idSlik=0;
            $("#slikce").empty();
            $("#comment").val("");
            inputVal="";
            $(".panelBodyPhoto").css("margin-left", (518-450)/2);
            //objava z dvema slikama
        }else if(stevecSlik==3){
            var src1;
            var src2;
            var src3;
            if(!removed1){
                src1=slika1;
                slika1=null;
                removed1=true;
            }else if(!removed2){
                src1=slika2;
                slika2=null;
                removed2=true;
            } else if(!removed3){
                src1=slika3;
                slika3=null;
                removed3=true;
            }
            if(!removed1){
                src2=slika1;
                slika1=null;
                removed1=true;
            }else if(!removed2){
                src2=slika2;
                slika2=null;
                removed2=true;
            } else if(!removed3){
                src2=slika3;
                slika3=null;
                removed3=true;
            }
            if(!removed1){
                src3=slika1;
                slika1=null;
                removed1=true;
            }else if(!removed2){
                src3=slika2;
                slika2=null;
                removed2=true;
            } else if(!removed3){
                src3=slika3;
                slika3=null;
                removed3=true;
            }
            stevecObjav++;
            var datum = new Date();
            var dan = datum.getDate();
            var mesec = datum.getMonth()+1;
            var leto = datum.getYear() -100 +2000;
            $("#newsFeed").prepend('<div class="panel panel-success"><div class="panel-heading" id="objava'+stevecObjav+'"><img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span> <span class="lokacija"><span class="glyphicon glyphicon-map-marker">   </span>'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12">'+inputVal+'</div> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src1+'" class="panelBodyPhoto"> </div><div class="row">&nbsp</div><div class="row"> <img src="'+src2+'" class="panelBodyPhoto"> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src3+'" class="panelBodyPhoto"> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            $("#mojeObjave").prepend('<div class="panel panel-success"><div class="panel-heading" id="mojaObjava'+stevecObjav+'"><img src="images/stockUserPhoto.png" class="newsFeedUserPhoto"><span class="headerName"> Janez Novak</span> <span class="lokacija"><span class="glyphicon glyphicon-map-marker">   </span>'+city+', '+country+'</span></div> <div class="panel-body"> <div class="row"> <div class="col-lg-12">'+inputVal+'</div> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src1+'" class="panelBodyPhoto"> </div><div class="row">&nbsp</div><div class="row"> <img src="'+src2+'" class="panelBodyPhoto"> </div> <div class="row">&nbsp</div> <div class="row"> <img src="'+src3+'" class="panelBodyPhoto"> </div> </div> <div class="panel-footer">'+dan+'.'+mesec+'.'+leto+'</div> </div>');
            stevecSlik=0;
            idSlik=0;
            $("#slikce").empty();
            $("#comment").val("");
            inputVal="";
            $(".panelBodyPhoto").css("margin-left", (518-450)/2);
            $("#inputDodajSliko").attr("disabled", false);
            $("#dodajSliko").removeClass("disabled");
            //objava z tremi slikami
        }
    });
});
function isci(kaj){
    if(kaj.substr(0,4)=="afna"){
        $("#searchBar").focus();
        $("#searchBar").val("@"+kaj.substr(4));
    }else{
        $("#searchBar").focus();
        $("#searchBar").val("#"+kaj.substr(4));
    }
}
