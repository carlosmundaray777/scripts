//seteamos tiempo
setTime(60000,60000);
//id de la guia
identifier = '1-6B64A3B6JM39CCA34EB7';

idguia=4122877;
//borrar_no_tq = true;
//limitar_task = 4;

var ruta="div.row.row-fluid > div:nth-child(1) > div > div > p";

var atributo="textContent";




configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

            document.getElementsByName(wrap.id+"[emoji_validation]")[3].click();
            document.getElementsByName(wrap.id+"[demographic_not_given]")[0].click();
            document.getElementsByName(wrap.id+"[gender]")[0].click();
            document.getElementsByName(wrap.id+"[age]")[1].click();
            document.getElementsByName(wrap.id+"[icon_aptness]")[4].click();
            document.getElementsByName(wrap.id+"[title_aptness]")[4].click();


/*
                var pares_content1 = wrap.querySelectorAll(".ratings.cml_field");
                for(var preg1 of pares_content1.entries()) {
                        let radios = preg1[1].querySelectorAll(".ratings.cml_field input");
                        let st=4;
                        radios[st].checked=1;
                        radios[st].click();
                }


                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st="11";
                    let indice=st.charAt(preg[0])-1;
                     if(indice!==-1){
                     radios[indice].checked=1;
                     radios[indice].click();
                     }
                }



                var segundo=wrap.querySelector(".cml_row select");

                for(var i=0; i<segundo.length; i++){
                        var r1=trato_especial(segundo.options[i].value);
                        var r2=trato_especial("18-29 yrs");
                        if(r2==r1 && r2!=""){
                            segundo.selectedIndex=i;
                            segundo.selected = true;
                        }

                }*/



                
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });
/*
 configNada_in_wm((wrap) => {
 logica_notq_wm(wrap);
 });*/



