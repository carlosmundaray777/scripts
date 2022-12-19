//seteamos tiempo
setTime(11000,12000);
//id de la guia
identifier = '1-AJ36AF35E937GC4CG1EJ';

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial(query.name)==(trato_especial(Object.values(el.content)[0]))));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
          }

            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var txt = wrapper.querySelector(".html-element-wrapper").textContent;
 

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':txt});
                var filldata = {};
                Object.assign(filldata, fill[0]?.content);

                var q1=trato_especial(txt);
                var q2=trato_especial(Object?.values(filldata)[0]);

                if(q1==q2 && q2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    var primera=wrapper.querySelectorAll(".radios.cml_field")[0].querySelectorAll("label");
                    for(var i1=0; i1<primera.length; i1++){
                        var input1= primera[i1].querySelector("input");
                        var r11=trato_especial(primera[i1]?.textContent);
                        var r21=trato_especial(Object.values(filldata)[1]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var primera2=wrapper.querySelectorAll(".radios.cml_field")[1].querySelectorAll("label");
                    for(var i2=0; i2<primera2.length; i2++){
                        var input2= primera2[i2].querySelector("input");
                        var r12=trato_especial(primera2[i2]?.textContent);
                        var r22=trato_especial(Object.values(filldata)[2]);
                        if(r22.includes(r12)){
                            input2.checked=1;
                            input2.click();
                        }
                    }

                    var inputp=document.getElementsByName(wrapper.id+'[what_isare_the_source_communitycommunities]');
                    var inputp2=document.getElementsByName(wrapper.id+'[what_isare_the_target_communitycommunities]');

                    if(trato_especial(Object.values(filldata)[1])=="yes"){
                        inputp[0].value=Object.values(filldata)[3];
                    }

                    if(trato_especial(Object.values(filldata)[2])=="yes"){
                        inputp2[0].value=Object.values(filldata)[4];
                    }

                    var primera3=wrapper.querySelectorAll(".radios.cml_field")[2].querySelectorAll("label");

                    for(var i3=0; i3<primera3.length; i3++){
                        var input3= primera3[i3].querySelector("input");
                        var r13=trato_especial(primera3[i3]?.textContent);
                        var r23=trato_especial(Object.values(filldata)[5]);
                        if(r23.includes(r13)){
                            input3.checked=1;
                            input3.click();
                        }
                    }


                    var primera4=wrapper.querySelectorAll(".radios.cml_field")[3].querySelectorAll("label");

                    for(var i4=0; i4<primera4.length; i4++){
                        var input4= primera4[i4].querySelector("input");
                        var r14=trato_especial(primera4[i4]?.textContent);
                        var r24=trato_especial(Object.values(filldata)[6]);
                        if(r24.includes(r14)){
                            input4.checked=1;
                            input4.click();
                        }
                    }

                    var primera5=wrapper.querySelectorAll(".checkboxes.cml_field")[0].querySelectorAll("label");
                    var emocion=String(Object.values(filldata)[7]).split(">");
                    for(var i5=0; i5<primera5.length; i5++){
                        emocion.forEach(emoc => {
                            var input5= primera5[i5].querySelector("input");
                            var r15=trato_especial(primera5[i5]?.textContent);
                            var r25=trato_especial(emoc);
                            if(r25.includes(r15)){
                                input5.click();
                            }
                        });
                    }

                    var primera6=wrapper.querySelectorAll(".radios.cml_field")[4].querySelectorAll("label");

                    for(var i6=0; i6<primera6.length; i6++){
                        var input6= primera6[i6].querySelector("input");
                        var r16=trato_especial(primera6[i6]?.textContent);
                        var r26=trato_especial(Object.values(filldata)[8]);
                        if(r26.includes(r16)){
                            input6.checked=1;
                            input6.click();
                        }
                    }

                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){

                            titleDiv.style.backgroundColor = "silver";
                            titleDiv.scrollIntoView({ block: "center" });

                            var idd= wrapper.id;

                            var primerod1 = document.getElementsByName(idd+"[is_any_source_community_identifiable]");
                            if(typeof primerod1[0] !== "undefined"){
                                primerod1[1].checked=1;
                                primerod1[1].click();
                            }


                            var primerod2 = document.getElementsByName(idd+"[is_any_target_community_identifiable]");
                            if(typeof primerod2[0] !== "undefined"){
                                primerod2[1].checked=1;
                                primerod2[1].click();
                            }

                            var primero = document.getElementsByName(idd+"[do_you_think_the_author_has_the_intention_of_causing_harm_to_a_particular_group]");
                            var segundo = document.getElementsByName(idd+"[are_the_emotions_described_above_strong_enough_to_encourage_the_reader_to_take_action]");

                            if(typeof primero[0] !== "undefined"){
                                primero[2].checked=1;
                                primero[2].click();
                            }
                            if(typeof segundo[0] !== "undefined"){
                                segundo[0].checked=1;
                                segundo[0].click();
                            }
                    }


                }



            });
    });

    configureExecute(() => {

      requestData().then(json => {

            Object.entries(json.form).forEach(([key, value]) => {
                          form.push(value);
                      });
            Object.entries(json.submissions).forEach(([key, value]) => {
                          submissions.push(value);
                      });
            Object.entries(json.keywords).forEach(([key, value]) => {
                          keywords.push(value);
                      });
            set_logica(form,submissions,keywords);

      }).catch(error => executeIfError(error));

    });
/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



