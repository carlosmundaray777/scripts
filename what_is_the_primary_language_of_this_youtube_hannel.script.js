//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-HBFL176BEMHLBJ247GJF';

idguia=597550;

var ruta="div:nth-child(1) > p:nth-child(2) > a";

var atributo="href";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

                                        let st="English";
                                        var segundo_nT=wrap.querySelector(".cml_row select");
                                        for(var i_nT=0; i_nT<segundo_nT.length; i_nT++){
                                            var r1_nT=trato_especial(segundo_nT.options[i_nT].value,100);
                                            var r2_nT=trato_especial(st, 100);
                                            if(r2_nT==r1_nT){
                                                segundo_nT.selectedIndex=i_nT;
                                                segundo_nT.selected = true;
                                            }

                                        }




                
});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

// configNada_in_wm((wrap) => {
//   // logica_notq_wm(wrap);
// });



