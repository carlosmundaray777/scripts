//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = 'NA';
guia_existe = true;
    configureExecute(() => {

        jsawesome.forEach(wrapper => {

            document.getElementsByName(wrapper.id+"[what_is_your_age]")[1].click();
            document.getElementsByName(wrapper.id+"[what_is_the_reason_you_have_not_purchased_cordless_battery_outdoor_power_equipment]")[1].click();
            document.getElementsByName(wrapper.id+"[do_you_do_your_own_lawn_maintenance_]")[0].click();
            document.getElementsByName(wrapper.id+"[what_is_your_household_income]")[0].click();




                                        let st="florida";
                                        var segundo_nT=wrapper.querySelector(".cml_row select");
                                        for(var i_nT=0; i_nT<segundo_nT.length; i_nT++){
                                            var r1_nT=trato_especial(segundo_nT.options[i_nT].value,100);
                                            var r2_nT=trato_especial(st, 100);
                                            if(r2_nT==r1_nT){
                                                segundo_nT.selectedIndex=i_nT;
                                                segundo_nT.selected = true;
                                            }

                                        }

            document.getElementsByName(wrapper.id+"[do_you_rent_or_own_where_you_live]")[0].click();
            document.getElementsByName(wrapper.id+"[what_size_is_your_yard]")[4].click();
            document.getElementsByName(wrapper.id+"[in_the_past_2_years_have_you_shopped_online_using_any_of_the_following_devices]")[0].click();
            document.getElementsByName(wrapper.id+"[have_you_ever_purchased_outdoor_power_equipment_online]")[2].click();
            document.getElementsByName(wrapper.id+"[do_you_consider_yourself_a_pro_or_diyer]")[1].click();
            document.getElementsByName(wrapper.id+"[have_you_ever_purchased_outdoor_power_equipment]")[2].click();
            document.getElementsByName(wrapper.id+"[have_you_ever_purchased_cordless_powered_outdoor_power_equipment]")[2].click();
            document.getElementsByName(wrapper.id+"[what_is_the_reason_you_have_not_purchased_cordless_battery_powered_outdoor_power_equipment]")[0].click();

            document.getElementsByName(wrapper.id+"[when_purchasing_a_mower_what_is_the_most_important_factor]")[0].click();
            document.getElementsByName(wrapper.id+"[when_purchasing_a_trimmer_what_is_the_most_important_factor]")[0].click();
            document.getElementsByName(wrapper.id+"[when_purchasing_a_leaf_blower_what_is_the_most_important_factor]")[0].click();
            document.getElementsByName(wrapper.id+"[when_purchasing_a_pressure_washer_what_is_the_most_important_factor]")[0].click();
            document.getElementsByName(wrapper.id+"[when_purchasing_a_chainsaw_what_is_the_most_important_factor]")[0].click();
            document.getElementsByName(wrapper.id+"[when_looking_at_mower_run_time_which_is_more_important_to_you]")[2].click();
            document.getElementsByName(wrapper.id+"[what_factor_is_most_important_to_you_when_looking_at_mower_run_time]")[0].value=0;
            document.getElementsByName(wrapper.id+"[what_is_the_first_cordless_battery_powered_outdoor_power_equipment_you_are_interested_in_purchasing_if_you_already_have_cordless_battery_powered_outdoor_power_equipment_what_was_the_first_thing_you_purchased]")[6].click();

            document.getElementsByName(wrapper.id+"[what_does_voltage_in_outdoor_power_equipment_mean_to_you_ie_if_something_is_62v_vs_40v_what_is_the_difference]")[0].value="22V";




                /*var pares_content = wrapper.querySelectorAll(".ratings.cml_field");
                for(var preg of pares_content.entries()) {
                    let radios = preg[1].querySelectorAll(".ratings.cml_field input");
                    let st=getRandomInt(2, 4);
                    radios[st].checked=1;
                    radios[st].click();
                }*/



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



