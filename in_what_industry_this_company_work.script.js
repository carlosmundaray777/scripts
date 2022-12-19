//seteamos tiempo
setTime(30000,33000);
//id de la guia
identifier = '1-2443D7JJ836L8GHH9MFA';

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {


          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>query.name==(Object.values(el.content)[0])));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
          }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelectorAll(".row-fluid a")[0].href;
                console.log(name);
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");

                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name});

                var p1=name;
                var p2=Object.values(fill[0]?.content)[0];

                if(p1==p2 && p2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;


                    var segundo=wrapper.querySelector(".cml_row select");

                    for(var i=0; i<segundo.length; i++){
                        var r1=trato_especial(segundo.options[i].value,100);
                        var r2=trato_especial(Object.values(fill[0]?.content)[1], 100);
                        if(r2==r1 && r2!=""){
                            segundo.selectedIndex=i;
                            segundo.selected = true;
                        }

                    }

                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
                                if(typeof(form[3])!='undefined')
                                {
                                    if(typeof(form[3])=="string"){
                                        titleDiv.style.backgroundColor = "silver";
                                        titleDiv.scrollIntoView({ block: "center" });

                                        let st=String(form[3]);
                                        var segundo_nT=wrapper.querySelector(".cml_row select");
                                        for(var i_nT=0; i_nT<segundo_nT.length; i_nT++){
                                            var r1_nT=trato_especial(segundo_nT.options[i_nT].text,100);
                                            var r2_nT=trato_especial(st, 100);
                                            if(r2_nT==r1_nT){
                                                segundo_nT.selectedIndex=i_nT;
                                                segundo_nT.selected = true;
                                            }

                                        }

                                    }
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



