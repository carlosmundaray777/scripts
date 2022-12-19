//seteamos tiempo
setTime(30000,33000);
//id de la guia
identifier = '1-AJ25AABA3AMBGE3KLECE';

    configureSet((form,submissions,keywords) => {
          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial(query.name,100).includes(trato_especial(Object.values(el.content)[0], 100))));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
          }


          const aletoria = query => { return Object.values(Object.values(submissions)).sort(()=> Math.random() - 0.5); };

            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var name = titleDiv.querySelectorAll(".row-fluid img")[0].src;
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var text=wrapper.querySelectorAll(".text.cml_field input");
                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name});
                var rando = aletoria({'name':name});

                var p1=trato_especial(name,100);
                var p2=trato_especial(Object.values(fill[0]?.content)[0], 100);


                if(p1.includes(p2) && p2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    for(var preg of pares_content.entries()) {

                        let radios = preg[1].querySelectorAll(".cml_field input");
                        let indice=String("12").charAt(preg[0])-1;
                            if(indice!==-1){
                                if(radios.type=="radio"){radios[indice].checked=1;}
                                radios[indice].click();
                            }
                    }

                    if(Object.values(fill[0]?.content)[1]!=null){
                        text[0].click();
                        text[0].value=Object.values(fill[0]?.content)[1]||'';
                    }else{
                       document.getElementsByName(wrapper.id+"[no_po]")[0].click();
                       text[0].parentNode.classList.add('_cf_hidden');
                    }

                    if(Object.values(fill[0]?.content)[2]!=null){
                        text[1].click();
                        text[1].value=Object.values(fill[0]?.content)[2]||'';
                    }else{
                       document.getElementsByName(wrapper.id+"[no_bol]")[0].click();
                       text[1].parentNode.classList.add('_cf_hidden');
                    }

                    text[2].parentNode.classList.add('_cf_hidden');
                    text[2].parentNode.classList.add('_cf_hidden');

                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                    }

                    if(mode.toLowerCase().includes("work")){


                                    for(var pregg of pares_content.entries()) {

                                        let radios = pregg[1].querySelectorAll(".cml_field input");
                                        let indice=String("12").charAt(pregg[0])-1;
                                        if(indice!==-1){
                                            if(radios.type=="radio"){radios[indice].checked=1;}
                                            radios[indice].click();
                                        }
                                    }

                        if(Object.values(rando[0]?.content)[1]!=null){
                            text[0].click();
                            text[0].value=Object.values(rando[0]?.content)[1]||'';
                        }else{
                            document.getElementsByName(wrapper.id+"[no_po]")[0].click();
                            text[0].parentNode.classList.add('_cf_hidden');
                        }

                        if(Object.values(rando[0]?.content)[2]!=null){
                            text[1].click();
                            text[1].value=Object.values(rando[0]?.content)[2]||'';
                        }else{
                            document.getElementsByName(wrapper.id+"[no_bol]")[0].click();
                            text[1].parentNode.classList.add('_cf_hidden');
                        }

                        text[2].parentNode.classList.add('_cf_hidden');
                        text[2].parentNode.classList.add('_cf_hidden');


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



