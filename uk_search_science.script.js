//seteamos tiempo
setTime(10000,14000);
//id de la guia
identifier = '1-9EB3F57146AD8F74B5CF';

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {
          const submissions_api = query => {
               return Object.values(Object.values(submissions).filter((el) =>trato_especial(Object.values(el.content)[0],100).indexOf(trato_especial(query.name,100)) > -1 && trato_especial(Object.values(el.content)[1],100).indexOf(trato_especial(query.name2,100)) > -1));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
          }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var query = wrapper.querySelectorAll(".row-fluid .special")[0].textContent;
                var result = wrapper.querySelectorAll(".row-fluid .special")[1].textContent;
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");

                var fill = submissions_api({'name':query,'name2':result});
                var keywordfill = keyword({'name':name});

                var q1=trato_especial(query, 100);
                var q2=trato_especial(Object.values(fill[0]?.content)[0], 100);

                var r1=trato_especial(result, 100);
                var r2=trato_especial(Object.values(fill[0]?.content)[1], 100);


                if((q1==q2) && (r1==r2)){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    for(var preg of pares_content.entries()) {
                        let radios = preg[1].querySelectorAll(".radios.cml_field input");
                        let indice=String(Object.values(fill[0]?.content)[2]).charAt(preg[0])-1;
                        console.log(indice);
                        if(indice!==-1){
                            radios[indice].checked=1;
                            radios[indice].click();
                        }
                    }


                }else{
                    console.log("no existe");

                    if(typeof(form[3])!='undefined')
                    {
                            if(typeof(form[3])=="string"){
                                titleDiv.style.backgroundColor = "silver";
                                titleDiv.scrollIntoView({ block: "center" });
                                let st=String(form[3]);
                                for(var pregg of pares_content.entries()) {
                                    let radios = pregg[1].querySelectorAll(".radios.cml_field input");
                                    let indice=st.charAt(pregg[0])-1;
                                        if(indice!==-1){
                                            radios[indice].checked=1;
                                            radios[indice].click();
                                        }
                                }
                            }else{
                                    titleDiv.style.backgroundColor = "yellow";
                                    titleDiv.scrollIntoView({ block: "center" });
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



