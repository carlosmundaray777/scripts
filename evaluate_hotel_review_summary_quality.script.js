//seteamos tiempo
setTime(60000*3,65000*3);
//id de la guia
identifier = 'NA';

guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {

                var pares_content = wrapper.querySelectorAll(".ratings.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".ratings.cml_field input");
                    let st=getRandomInt(3, 5);
                    radios[st].checked=1;
                    radios[st].click();
                }

        });

    });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



