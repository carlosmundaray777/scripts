//seteamos tiempo
setTime(62000 * 2, 62000 * 2);
//id de la guia
identifier = '1-H12MK483M1AM333EHMC1';

idguia = 453465;

guia_local = true;

var ruta = "div:nth-child(2) > p";

var atributo = "textContent";

limitar_task = 5;

configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

    // var pares_content = wrap.querySelectorAll(".radios.cml_field");
    // for (var preg of pares_content.entries()) {
    //     console.log(preg);
    //     let radios = preg[1].querySelectorAll(".radios.cml_field input");
    //     let st = "1";
    //     let indice = st.charAt(preg[0]) - 1;
    //     if (indice !== -1) {
    //         radios[indice].checked = 1;
    //         radios[indice].click();
    //     }
    // }
    wrap.querySelectorAll('input[type=radio]')[0].marcar();
    wrap.querySelectorAll('input[type=checkbox]')[0].click();

    // document.getElementsByName(wrap.id + "[2why_is_it_not_good_choose_all__choose_none_of_above_if_good][]")[0].click();
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



