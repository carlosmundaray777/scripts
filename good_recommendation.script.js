//seteamos tiempo
setTime(60000*2,65000*2);
//id de la guia
identifier = '1-F1LHKE35G1EFEFA729GC';

idguia=43940;

limitar_task = 4;

var ruta="div.html-element-wrapper > table > tbody > tr:nth-child(1)";

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

            if (document.getElementsByName(wrap.id+"[how_many_days_after_the_first_purchase_should_the_recommendation_be_sent_number_between_1_and_365]").length > 0) {
                document.getElementsByName(wrap.id+"[how_many_days_after_the_first_purchase_should_the_recommendation_be_sent_number_between_1_and_365]")[0].value=1;
            }


                
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



