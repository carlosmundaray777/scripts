//seteamos tiempo
setTime(60000,62000);

identifier = '1-KDK7BG78A61DKL2K3EF3';//verificar esto

idguia=965134;

var ruta="div > div > div > h2:nth-child(6)";

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


// configLogica_notq_wm((wrap) => {

//  });

// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });