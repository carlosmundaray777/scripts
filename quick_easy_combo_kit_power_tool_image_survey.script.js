//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = 'NA';
guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {

            document.getElementsByName(wrapper.id+"[01_age]")[1].click();
            document.getElementsByName(wrapper.id+"[02_income]")[0].click();
            document.getElementsByName(wrapper.id+"[03_gender]")[1].click();
            
            document.getElementsByName(wrapper.id+"[04_homeowner]")[1].click();
            document.getElementsByName(wrapper.id+"[05_housing_type]")[3].click();
            document.getElementsByName(wrapper.id+"[06_powertool_owner]")[1].click();
            document.getElementsByName(wrapper.id+"[07_purchase_type]")[3].click();
            document.getElementsByName(wrapper.id+"[08_how_long_owner]")[5].click();
            document.getElementsByName(wrapper.id+"[09_power_tool_spend]")[0].click();
            document.getElementsByName(wrapper.id+"[10_powertool_projects]")[0].click();


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



