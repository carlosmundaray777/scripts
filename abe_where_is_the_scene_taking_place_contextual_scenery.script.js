//seteamos tiempo
setTime(60000 * 2, 65000 * 2);
//id de la guia
identifier = '1-KAGEFG4E5L6C5AAB7J1B';

idguia = [7804980, 6346935];

var ruta = "div:nth-child(1) > div:nth-child(1) > img";

var atributo = "src";

//borrar_no_tq = true;

configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";
/*
    document.getElementsByName(wrap.id+"[category_1][]")[0].click();
    document.getElementsByName(wrap.id+"[category_2][]")[0].click();
    document.getElementsByName(wrap.id+"[category_3][]")[0].click();

*/


                    var primera=wrap.querySelectorAll(".checkboxes.cml_field")

                        primera.forEach(tq =>{
                            var labels = tq.querySelectorAll("label");
                            if(!tq.getAttribute("class").includes("_cf_hidden")){
                                labels.forEach(label =>{
                                    var r1=trato_especial(label.textContent);
                                    var r2=trato_especial("none");
                                    if(r1==r2 && r2!=""){
                                        var input = label.querySelector("input");
                                        if(input.type=="radio"){input.checked=1}
                                        input.click();
                                    }
                                });
                            }
                        });


});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

configNada_in_wm((wrap) => {
   logica_notq_wm(wrap);
});



