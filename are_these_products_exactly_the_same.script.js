//seteamos tiempo
setTime(30000,31000);
//id de la guia
identifier = '15-9F336KAL77D3H9E89BF9';
idguia=607658;

limitar_task = 10;

var ruta="div.row-fluid";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
   wrap.querySelectorAll('input[type=radio]')[1].marcar();
});

// configLogica_notq_qm((wrap) => {
//    // {...}
// });

configNada_in_wm((wrap) => {
   logica_notq_wm(wrap);
});