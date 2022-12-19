//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-4M56M43514B65LFD474M';

idguia=82216;

limitar_task = 7;

var ruta="div.html-element-wrapper > p:nth-child(5) > span";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st=String(getRandomInt(1, 2));
                    let indice=st.charAt(preg[0])-1;
                     if(indice!==-1){
                     radios[indice].checked=1;
                     radios[indice].click();
                     }
                }

                
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



