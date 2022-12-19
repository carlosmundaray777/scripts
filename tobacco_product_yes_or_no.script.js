//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-C3H5DDK9LMEM3M4F72LL';

idguia=4143265;

var ruta="div.html-element-wrapper > table";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".cml_field input");
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

 /*configNada_in_wm((wrap) => {
    logica_notq_wm(wrap);
 });*/



