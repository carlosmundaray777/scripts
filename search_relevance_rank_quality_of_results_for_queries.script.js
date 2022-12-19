//seteamos tiempo
setTime(15000,17000);
//id de la guia

identifier = '15-2K1DL4M5MGAB7BC4B2DE';

idguia=618250;

limitar_task = 10;

var ruta="div > div:nth-child(1)";

var atributo="textContent";

configLogica_notq_wm((wrap) => {
   let radios = wrap.querySelectorAll('input[type=radio]');
   radios[1].marcar();
   radios[5].marcar();
});

// configLogica_notq_qm((wrap) => {
//    logica_notq_wm(wrap);
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });