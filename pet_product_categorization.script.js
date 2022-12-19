//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-GL5FB38C6E78AHFFF6CK';

idguia=54247;

var ruta="div.html-element-wrapper > table > tbody > tr";

var atributo="textContent";



 configLogica_notq_wm((wrap) => {
     wrap.style.backgroundColor = "silver"; 
                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st="6";
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



