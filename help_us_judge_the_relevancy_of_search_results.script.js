//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-59BD8E6MLH3HGAFC6M68';

idguia=8590757;

var ruta="div.html-element-wrapper";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st="1";
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



