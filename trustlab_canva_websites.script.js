//seteamos tiempo
setTime(60000*5,60000*5);
//id de la guia
identifier = '1-9M9D57J6M3FJML58K6G2';

idguia=7788504;
//borrar_no_tq = true;
//limitar_task = 4;

var ruta="div.row.row-fluid > div > div > div > div > img";

var atributo="src";




configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

    document.getElementsByName(wrap.id+"[demographic_not_given]")[0].click();
    document.getElementsByName(wrap.id+"[gender]")[0].click();
    document.getElementsByName(wrap.id+"[age]")[0].click();
    document.getElementsByName(wrap.id+"[webpage]")[3].click();
    document.getElementsByName(wrap.id+"[mislead]")[0].click();
    document.getElementsByName(wrap.id+"[offensive]")[0].click();
    document.getElementsByName(wrap.id+"[violations][]")[6].click();


                  
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });
/*
 configNada_in_wm((wrap) => {
 logica_notq_wm(wrap);
 });*/



