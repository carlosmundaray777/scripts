//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = 'NA';
guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {

            document.getElementsByName(wrapper.id+"[01_age]")[1].click();
            document.getElementsByName(wrapper.id+"[02_income]")[getRandomInt(0, 3)].click();
            document.getElementsByName(wrapper.id+"[03_gender]")[1].click();
            document.getElementsByName(wrapper.id+"[04_edu]")[3].click();
            document.getElementsByName(wrapper.id+"[05_homeowner]")[1].click();
            document.getElementsByName(wrapper.id+"[06_previous_purchase][]")[getRandomInt(0, 3)].click();
            document.getElementsByName(wrapper.id+"[06_previous_purchase][]")[5].click();
            document.getElementsByName(wrapper.id+"[08_shop_online_method]")[0].click();
            document.getElementsByName(wrapper.id+"[07_long_ago_purchase]")[3].click();
            document.getElementsByName(wrapper.id+"[09_bought_online][]")[6].click();

            document.getElementsByName(wrapper.id+"[11_preferred_image_choice]")[3].click();

            document.getElementsByName(wrapper.id+"[11_preferred_image_choice_b]")[0].value="Because it shows a more real product to the buyer";

            document.getElementsByName(wrapper.id+"[12_match_important]")[0].click();

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



