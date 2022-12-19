//seteamos tiempo
setTime(40000,40000);
//id de la guia
identifier = '1-AM987M4M48CJMFLJEEHD';


idguia=284692;


var ruta="div.html-element-wrapper > b";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st=String(getRandomInt(1, 8));
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



