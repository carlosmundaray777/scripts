//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-6M8LDFJL124MJB17HM3J';

idguia=3919418;

var ruta="div.html-element-wrapper > table > tbody > tr:nth-child(2)";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                
                pares_content.forEach(inputs =>{
                    var labels = inputs.querySelectorAll("label");
                    if(!inputs.getAttribute("class").includes("_cf_hidden")){
                        labels.forEach(label =>{
                            var r1=trato_especial(label.textContent);
                            var r2=trato_especial("no");
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

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



