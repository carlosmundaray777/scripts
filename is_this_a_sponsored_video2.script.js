//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-5ABM65A6341EM66JCKCD';

var ruta_smtv="div.snippets > ul > li > span";

var atributo_smtv="textContent";

    configureSet((form,submissions,keywords) => {
    return new Promise((resolve) => {
          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial(query.name)==(trato_especial(Object.values(el.content)[0]))));
          }


            jsawesome.forEach(wrapper => {
                var query = find_query(wrapper, ruta_smtv, atributo_smtv);
                var fill = submissions_api({'name':query});

                var p1=trato_especial(query);
                var p2=trato_especial(Object.values(fill[0]?.content)[0]);
                var tq_id = fill[0]?.id;


                if(p1==p2){
                    console.log("existe");
                    var color = "Aqua";
                    wrapper.dataset.tqid = tq_id;
                    create_btn_roll_back_single(wrapper);
                    wrapper.style.backgroundColor = color;
                    wrapper.classList.add("tq_found");
  
                    var r = JSON.parse(
                        typeof Object.values(fill[0]?.content)[1] == "object"
                            ? JSON.stringify(Object.values(fill[0]?.content)[1])
                            : Object.values(fill[0]?.content)[1]
                    );

 


                    autofillp_smatv(wrapper, ruta_smtv, atributo_smtv, p1, r, color);
                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        wrapper.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }


                    if (mode.toLowerCase().includes("work")) {
                        //wrapper.style.backgroundColor = "silver";
                        tq_for_update_no_existe.push(wrapper);
                    }


                }
            }); 

        resolve(true);
    });

    });


var execute = async function () {
    await ensureDomIsLoaded();
    console.log("estoy listo");




    wrap_restante().forEach(wrapper => {
        let query = trato_especial(find_query(wrapper, ruta_smtv, atributo_smtv));
        tqs.push(query);
    });

    console.log(tqs);

     console.log("tqs for API SAM", tqs);
    if (identifier) {
            await requestData().then(json => {
                Object.entries(json.form).forEach(([key, value]) => {
                    form.push(value);
                });
                Object.entries(json.submissions).forEach(([key, value]) => {
                    submissions.push(value);
                });
                Object.entries(json.keywords).forEach(([key, value]) => {
                    keywords.push(value);
                });
            }).catch(error => executeIfError(error));
        
        await set_logica(form, submissions, keywords);
    }





    setTimeout(function () {
                var tq_found=document.querySelectorAll(".tq_found");

                if(mode.includes("work")){
                        tq_for_update_no_existe.forEach(wrapper=>{
                            var pares_content = wrapper.querySelectorAll("input");
                            if (!wrapper.classList.contains('tq_found')) {
                                wrapper.style.backgroundColor = "silver";
                                let element = document.querySelector(`#${wrapper.id}`);
                                             element.classList.add("_cf_hidden");

                            }    
                        });
                }

    }, 5000);

    validar(true);
    





    //   auto_init_inicia_remote_view();
}





function autofillp_smatv(wrapper, ruta, atributo, preguntas, respuestas, color) {
    var pregunta = preguntas;
    var repuesta1 = respuestas;

    let existe = false;
    var query2 = find_query(wrapper, ruta, atributo);


    if (trato_especial(pregunta) == trato_especial(query2)) {

        let pares_content = wrapper.querySelectorAll("input");
        for (var k = 0; k < Object.keys(repuesta1).length; k++) {

                    pares_content.forEach(( preg, index) => {

                        if(preg.type=="radio" || preg.type=="checkbox"){


                            if (repuesta1[k].id[1]=="Yes") {
                                document.getElementsByName(wrapper.id+"[is_sponsored]")[0].click();
                            }

                            if (repuesta1[k].id[1]=="No") {
                                document.getElementsByName(wrapper.id+"[is_sponsored]")[1].click();
                            }

                        }else if(preg.type=="text"){

                            document.getElementsByName(wrapper.id+"[sponsor_names][]")[0].value=repuesta1[k].value;
                            

                        }

                    });

        }

    

}

}



/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



