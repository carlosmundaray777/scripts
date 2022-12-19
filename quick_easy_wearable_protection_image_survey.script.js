//seteamos tiempo
setTime(60000*3,65000*3);
//id de la guia
identifier = 'NA';
guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {

            document.getElementsByName(wrapper.id+"[01_age]")[1].click();
            document.getElementsByName(wrapper.id+"[02_income]")[0].click();
            document.getElementsByName(wrapper.id+"[03_gender]")[0].click();
            document.getElementsByName(wrapper.id+"[diy_or_pro]")[0].click();
            document.getElementsByName(wrapper.id+"[purchased_wearable_protection]")[1].click();
            document.getElementsByName(wrapper.id+"[07_bought_proection_gear_online]")[1].click();


                var pares_content = wrapper.querySelectorAll(".ratings.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".ratings.cml_field input");
                    let st=getRandomInt(2, 4);
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



