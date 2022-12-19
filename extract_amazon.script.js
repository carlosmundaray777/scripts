//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-LBG5KJJ3BC44D63B7JDM';

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
                var txt = wrapper.querySelector(".row-fluid").querySelector("span").textContent;
 

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");

                var elements = titleDiv.querySelectorAll("a");
                elements.forEach(element => {
                    element.classList.remove("validates-clicked");
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = wrapper.id+"[_clicks][]";
                    input.value=element.href;
                    wrapper.appendChild(input);
                });

                var fill = submissions_api({'name':txt});
                var filldata = {};
                Object.assign(filldata, fill[0]?.content);

                var q1=trato_especial(txt);
                var q2=trato_especial(Object?.values(filldata)[0]);

                var respuesta1=Object?.values(filldata)[1]?.split(">");
                var respuesta2=Object?.values(filldata)[4]?.split(">");





                if(q1==q2 && q2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    wrapper.classList.add("tq_found");
                    tq_found++;


                    //primera etapa

                    var primera=wrapper.querySelectorAll(".radios.cml_field")[0].querySelectorAll("label");
                    for(var i1=0; i1<primera.length; i1++){
                        var input1= primera[i1].querySelector("input");
                        var r11=trato_especial(primera[i1]?.textContent);
                        var r21=trato_especial(respuesta1[0]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var primera1=wrapper.querySelectorAll(".radios.cml_field")[1].querySelectorAll("label");
                    for(var i1=0; i1<primera1.length; i1++){
                        var input1= primera1[i1].querySelector("input");
                        var r11=trato_especial(primera1[i1]?.textContent);
                        var r21=trato_especial(respuesta1[1]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var primera2=wrapper.querySelectorAll(".radios.cml_field")[2].querySelectorAll("label");
                    for(var i1=0; i1<primera2.length; i1++){
                        var input1= primera2[i1].querySelector("input");
                        var r11=trato_especial(primera2[i1]?.textContent);
                        var r21=trato_especial(respuesta1[2]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var inputp=document.getElementsByName(wrapper.id+'[hardcover_rank]');
                    if(trato_especial(respuesta1[1])=="yes"){
                        inputp[0].value=Object.values(filldata)[2];
                    }

                    var inputp2=document.getElementsByName(wrapper.id+'[hardcover_isbn10]');
                    if(trato_especial(respuesta1[2])=="yes"){
                        inputp2[0].value=Object.values(filldata)[3];
                    }


                    //segunda etapa

                    var segunda=wrapper.querySelectorAll(".radios.cml_field")[3].querySelectorAll("label");
                    for(var i1=0; i1<segunda.length; i1++){
                        var input1= segunda[i1].querySelector("input");
                        var r11=trato_especial(segunda[i1]?.textContent);
                        var r21=trato_especial(respuesta2[0]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var segunda1=wrapper.querySelectorAll(".radios.cml_field")[4].querySelectorAll("label");
                    for(var i1=0; i1<segunda1.length; i1++){
                        var input1= segunda1[i1].querySelector("input");
                        var r11=trato_especial(segunda1[i1]?.textContent);
                        var r21=trato_especial(respuesta2[1]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var segunda2=wrapper.querySelectorAll(".radios.cml_field")[5].querySelectorAll("label");
                    for(var i1=0; i1<segunda2.length; i1++){
                        var input1= segunda2[i1].querySelector("input");
                        var r11=trato_especial(segunda2[i1]?.textContent);
                        var r21=trato_especial(respuesta2[2]);
                        if(r21.includes(r11)){
                            input1.checked=1;
                            input1.click();
                        }
                    }

                    var inputpp=document.getElementsByName(wrapper.id+'[paperback_rank]');
                    if(trato_especial(respuesta2[1])=="yes"){
                        inputpp[0].value=Object.values(filldata)[5];
                    }

                    var inputpp2=document.getElementsByName(wrapper.id+'[paperback_isbn10]');
                    if(trato_especial(respuesta2[2])=="yes"){
                        inputpp2[0].value=Object.values(filldata)[6];
                    }

                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
                        tq_for_update_no_existe.push(wrapper);
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

                        setTimeout(function () { 

                            var tq_found=document.querySelectorAll(".tq_found");

                            if(mode.includes("work") && tq_found?.length >= 1){

                                tq_for_update_no_existe.forEach(wrapper=>{
                                    if (!wrapper.classList.contains('tq_found')) {
                                        wrapper.style.backgroundColor = "silver";
                                        /*const element = document.querySelector("#"+wrapper.id);
                                        element.classList.add("_cf_hidden");*/ 

                                        document.getElementsByName(wrapper.id+"[hardcover_found_yn]")[1].click();
                                        document.getElementsByName(wrapper.id+"[paperback_found_yn]")[1].click();

                                    }    
                                });
                            }
                            
                        }, 3000);

      }).catch(error => executeIfError(error));

    });
/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



