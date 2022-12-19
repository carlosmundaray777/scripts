//seteamos tiempo
setTime(20000,25000);
//id de la guia
identifier = '1-6128H5MD4AMDC93K15C6';

idguia=989572;

limitar_task = 4;

var ruta="div:nth-child(1) > div > div > img";

var atributo="src";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";
    document.getElementsByName(`${wrap.id}[related_temp]`)[1].click();
});



// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });