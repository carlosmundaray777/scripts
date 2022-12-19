//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-99MC2C7K3KC4H5LHHHAF';

idguia=31613;

var ruta="div:nth-child(1)";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st="2";
                    let indice=st.charAt(preg[0])-1;
                     if(indice!==-1){
                     radios[indice].checked=1;
                     radios[indice].click();
                     }
                }
              
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



