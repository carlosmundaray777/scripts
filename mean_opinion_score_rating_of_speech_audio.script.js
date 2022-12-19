//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-BH2G8G5FK69DH46FJF6L';

var ruta="div.html-element-wrapper";
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


 configNada_in_wm((wrap) => {
    logica_notq_wm(wrap);
 });