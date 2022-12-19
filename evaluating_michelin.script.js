//seteamos tiempo
setTime(60000,60000);
//id de la guia
identifier = 'sin_guia';


idguia=284692;


var ruta="div";

var atributo="textContent";


configNada_in_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".cml_field input");
                    let st="232232232232";
                    let indice=st.charAt(preg[0])-1;
                     if(indice!==-1){
                     //radios[indice].checked=1;
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



