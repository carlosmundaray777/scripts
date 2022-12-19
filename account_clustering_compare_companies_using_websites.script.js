//seteamos tiempo
setTime(15000,15000);
//id de la guia
identifier = '1-G2A54A5KKAB77L9725J5';

idguia=455140;



var ruta="div.html-element-wrapper > table > tbody";

var atributo="textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

    let name = wrap.querySelectorAll('table > tbody > tr > td > div > strong')[0].textContent;
    let name2 = wrap.querySelectorAll('table > tbody > tr > td > div > strong')[1].textContent;
    var r=0;

    if(name.toLowerCase().includes(name2?.split(" ")[0].toLowerCase())){
        r=1;
    }else{
        r=222;
    }


                var pares_content = wrap.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st=String(r);
                    let indice=st.charAt(preg[0])-1;
                     if(indice!==-1){
                     radios[indice].checked=1;
                     radios[indice].click();
                     }
                }



                
});








