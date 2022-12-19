//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-93JD4AH57KB7LGCBC6L5';

idguia=189052;

var ruta="p:nth-child(3) > a";

var atributo="href";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st="1113111";
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

 /*configLogica_notq_qm((wrap) => {
    logica_notq_wm(wrap);
 });*/



