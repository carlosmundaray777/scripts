//seteamos tiempo
setTime(60000*2,65000*2);
//id de la guia
identifier = '1-GDGB529FD7H95JKMAK8G';

idguia=489722;

var ruta="table > tbody > tr > td > h1 > div > a";

var atributo="href";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

    document.getElementsByName(wrap.id+"[content_aptness]")[1].click();
    document.getElementsByName(wrap.id+"[content_allow_yn]")[1].click();
    document.getElementsByName(wrap.id+"[gender]")[0].click();

                var segundo=wrap.querySelector(".cml_row select");

                for(var i=0; i<segundo.length; i++){
                        var r1=trato_especial(segundo.options[i].value);
                        var r2=trato_especial("18-29 yrs");
                        if(r2==r1 && r2!=""){
                            segundo.selectedIndex=i;
                            segundo.selected = true;
                        }

                }
             
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



