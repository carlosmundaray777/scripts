//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-GBJ3FKDF8M8GM7FK5DJ2';

var ruta_smtv="div.html-element-wrapper";
var atributo_smtv="textContent";

    configureSet((form,submissions,keywords) => {

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
  
                    var r = Object.values(fill[0]?.content)[1];

                    autofillp_smatv(wrapper, ruta_smtv, atributo_smtv, p1, r, color);
                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        wrapper.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }


                    if (mode.toLowerCase().includes("work")) {
                        wrapper.style.backgroundColor = "silver";
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

                if(mode.includes("quiz")){
                    create_btn_roll_back();
                }


                var tq_found=document.querySelectorAll(".tq_found");

                if(mode.includes("work") && tq_found?.length >= 1){
                        tq_for_update_no_existe.forEach(wrapper=>{
                            var pares_content = wrapper.querySelectorAll("input");
                            if (!wrapper.classList.contains('tq_found')) {
                                wrapper.style.backgroundColor = "silver";
                                let st=String("11");
                          var pares_content =
                                wrapper.querySelectorAll(".cml_field");
                            for (var pregg of pares_content.entries()) {
                                let radios = pregg[1].querySelectorAll(
                                    "div.cml_field:not(._cf_hidden) input[type=radio], input[type=checkbox]"
                                );
                                let indice = st.charAt(pregg[0]) - 1;
                                if (indice !== -1) {
                                    radios[indice]?.click();
                                }
                            }
                            }    
                        });
                }
            }, 3000);


      }).catch(error => executeIfError(error));
    });

function autofillp_smatv(wrapper, ruta, atributo, preguntas, respuestas, color) {
    var pregunta = preguntas;
    var repuesta1 = JSON.parse(
                        typeof respuestas == "object"
                            ? JSON.stringify(respuestas)
                            : respuestas
                    );;

    let existe = false;
    var query2 = find_query(wrapper, ruta, atributo);


    if (trato_especial(pregunta) == trato_especial(query2)) {
        if (repuesta1 !=undefined) {
        for (var k = 0; k < Object.keys(repuesta1).length; k++) {

            console.log(repuesta1[k].type);
            switch (repuesta1[k].type) {
                case "radio":

                    //console.log("radio");
                    let pares_content = wrapper.querySelectorAll("input");
        
                    for(let preg of pares_content.entries()) {
                        if(preg[1].type=="radio" || preg[1].type=="checkbox"){
                            let numero=repuesta1[k]?.position;
                           if ((preg[0])==numero) {
                                preg[1]?.click();
                            }
                        }

                    }
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case "select":
                    console.log('select');


                    break;
                case "textarea":
                    console.log('textarea');

                    break;
            }
        }

    }

}

}



/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



