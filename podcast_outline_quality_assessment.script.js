//seteamos tiempo
setTime(60000,65000);
//id de la guia
/*identifier = '1-47G6B376M77919C864CK';

idguia=598391;

var ruta="div.radios.cml_field > h2";

var atributo="textContent";*/


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".cml_field input");
                    let st="111111";
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

 configNada_in_wm((wrap) => {
    logica_notq_wm(wrap);
 });



