//seteamos tiempo
setTime(18000, 20000);
//id de la guia

if (jobTitle.includes("Production Data Clean: Confirm Labeled Object Is Not A Rock")) { 
    identifier = '1-GLFM722DG2L24E3ACK7K';
}else{
    identifier = '1-5KJ2FBEE14BE8E2AE3EE';
    //if(get("user_id")==1){var guia_local = true;}

}


idguia = 7128768;

var ruta = "div > div:nth-child(1) > img";

var atributo = "src";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";


if (jobTitle.includes("Production Data Clean: Confirm Labeled Object Is Not A Rock")) { 
    var palabra="1";
    var pares_content = wrap.querySelectorAll(".radios.cml_field");
    for (var preg of pares_content.entries()) {
        let radios = preg[1].querySelectorAll(".radios.cml_field input");
        let st = palabra;
        let indice = st.charAt(preg[0]) - 1;
        if (indice !== -1) {
            radios[indice].checked = 1;
            radios[indice].click();
        }
    }

}else{
    var palabra="2";
    var pares_content = wrap.querySelectorAll(".radios.cml_field");
    for (var preg of pares_content.entries()) {
        let radios = preg[1].querySelectorAll(".radios.cml_field input");
        let st = palabra;
        let indice = st.charAt(preg[0]) - 1;
        if (indice !== -1) {
            radios[indice].checked = 1;
            radios[indice].click();
        }
    }
}

});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

 configNada_in_wm((wrap) => {
    logica_notq_wm(wrap);
 });

 configLogica_notq_qm((wrap) => {



if (jobTitle.includes("Production Data Clean: Confirm Labeled Object Is Not A Rock")) { 
    var palabra="1";
    var pares_content = wrap.querySelectorAll(".radios.cml_field");
    for (var preg of pares_content.entries()) {
        let radios = preg[1].querySelectorAll(".radios.cml_field input");
        let st = palabra;
        let indice = st.charAt(preg[0]) - 1;
        if (indice !== -1) {
            radios[indice].checked = 1;
            radios[indice].click();
        }
    }

}else{
    var palabra="2";
    var pares_content = wrap.querySelectorAll(".radios.cml_field");
    for (var preg of pares_content.entries()) {
        let radios = preg[1].querySelectorAll(".radios.cml_field input");
        let st = palabra;
        let indice = st.charAt(preg[0]) - 1;
        if (indice !== -1) {
            radios[indice].checked = 1;
            radios[indice].click();
        }
    }
}



 });




