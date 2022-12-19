//seteamos tiempo
setTime(11000,15000);
//id de la guia
identifier = 'NA';

guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".radios.cml_field input");
                    let st="1";
                    let indice=st.charAt(preg[0])-1;
                     if(indice!==-1){
                     radios[indice].checked=1;
                     radios[indice].click();
                     }
                }
        });

    });


/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



