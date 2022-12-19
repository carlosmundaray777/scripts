//seteamos tiempo
setTime(185000,187000);
//id de la guia
identifier = '15-7EFJ7A98KH7JJ678B5ME';

idguia=806020;

guia_local=true;

limitar_task = 7;

var ruta="div:nth-child(1) > video > source";

var atributo="src";

configLogica_notq_wm((wrap) => {
   wrap.querySelectorAll('input[type=radio]')[0].marcar();
});

// configLogica_notq_qm((wrap) => {
//    logica_notq_wm(wrap);
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });