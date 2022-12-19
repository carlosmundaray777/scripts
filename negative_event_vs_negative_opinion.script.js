//seteamos tiempo
setTime(20000,23000);
//id de la guia
identifier = '15-43MAK3KE6EAJL2CKLD8A';

idguia=314960;

//limitar_task = 8;
//borrar_no_tq = true;

var ruta="h2";
var atributo="textContent";


configLogica_notq_wm((wrap) => {
	wrap.querySelectorAll('input[type=radio]')[2].marcar();    
});

// configLogica_notq_qm((wrap) => {
//    logica_notq_wm(wrap);
// });

configNada_in_wm((wrap) => {
  logica_notq_wm(wrap);
});



