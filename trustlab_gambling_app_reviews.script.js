//seteamos tiempo
setTime(60000*5,60000*5);
//id de la guia
identifier = '1-9F6M6HE1G89D8LKGM6AK';

idguia=2842675;
//borrar_no_tq = true;
//limitar_task = 4;

var ruta="div.row.row-fluid > div.span6.well > div > div";

var atributo="textContent";




configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

    document.getElementsByName(wrap.id+"[demographic_not_given]")[0].click();
    document.getElementsByName(wrap.id+"[gender]")[0].click();
    document.getElementsByName(wrap.id+"[age]")[0].click();
    document.getElementsByName(wrap.id+"[spent_money]")[3].click();
    document.getElementsByName(wrap.id+"[pays_out]")[3].click();
    document.getElementsByName(wrap.id+"[trustworthy]")[0].click();
    document.getElementsByName(wrap.id+"[satisified]")[1].click();
    document.getElementsByName(wrap.id+"[complaint]")[1].click();
    document.getElementsByName(wrap.id+"[scam_type]")[2].click();

                  
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });
/*
 configNada_in_wm((wrap) => {
 logica_notq_wm(wrap);
 });*/



