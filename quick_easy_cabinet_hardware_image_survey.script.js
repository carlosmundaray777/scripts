//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = 'NA';
guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {

            document.getElementsByName(wrapper.id+"[01_age]")[1]?.click();
            document.getElementsByName(wrapper.id+"[02_income]")[0]?.click();
            document.getElementsByName(wrapper.id+"[03_gender]")[0]?.click();

            document.getElementsByName(wrapper.id+"[diy_or_pro]")[0]?.click();
            document.getElementsByName(wrapper.id+"[06_purchase_cabinet_hardware]")[1]?.click();
            document.getElementsByName(wrapper.id+"[07_bought_ch_online]")[1]?.click();

            document.getElementsByName(wrapper.id+"[04_homeowner]")[1]?.click();
            document.getElementsByName(wrapper.id+"[07_housing]")[3]?.click();
            document.getElementsByName(wrapper.id+"[07_purchase_type]")[3]?.click();
            document.getElementsByName(wrapper.id+"[06_purchase_type]")[2]?.click();
            document.getElementsByName(wrapper.id+"[07_purchase_type]")[3]?.click();
            document.getElementsByName(wrapper.id+"[09_purchase_type]")[5]?.click();
            document.getElementsByName(wrapper.id+"[010_purchase_type]")[1]?.click();


            if (document.getElementsByName(wrapper.id+"[what_kind_of_food_do_you_like_to_grill_most_often]").length > 0) {

                document.getElementsByName(wrapper.id+"[what_kind_of_food_do_you_like_to_grill_most_often]")[0].value="Beef steak";
            }
            



                var pares_content = wrapper.querySelectorAll(".ratings.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll("input");
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



