//seteamos tiempo
setTime(65000,68000);
//id de la guia
identifier = '15-KKC35J825FE58G6L5D6F';

idguia=711474;

limitar_task = 3;

var ruta="h3 > i";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
   let not_fluent = wrap.querySelectorAll('table')[0];
   let not_humanlike = wrap.querySelectorAll('table')[1];

   let indice = marcar_rand(not_fluent.querySelectorAll('input[type=radio]'));
   not_humanlike.querySelectorAll('input[type=radio]')[indice].marcar();
});

// configLogica_notq_qm((wrap) => {
//    logica_notq_wm(wrap);
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });