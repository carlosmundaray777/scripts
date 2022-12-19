//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '15-BHM3F5GA9BG6EK362AB4';

idguia=932804;

var ruta="div > div.html-element-wrapper.data";

var atributo="textContent";

configLogica_notq_wm((wrap) => {
   let inputs = wrap.querySelectorAll('input[type=radio]');
   inputs.forEach(input => {
   	if (input.value == 2) {
   		input.marcar();
   	}
   });
});

// configLogica_notq_qm((wrap) => {
//    logica_notq_wm(wrap);
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });