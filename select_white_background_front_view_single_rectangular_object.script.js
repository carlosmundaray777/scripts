//seteamos tiempo
setTime(20000,25000);
//id de la guia
identifier = '1-KFK12MFJ669GLJC3HCEK';

idguia=97600;

var ruta="div > div:nth-child(1) > img:nth-child(2)";

var atributo="src";

    configureSet((form,submissions,keywords) => {
       const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial(query.name,100).includes(trato_especial(Object.values(el.content)[0], 100))));
            }

        const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
            }

            jsawesome.forEach(wrapper => {

                var name = wrapper.querySelector("div > div:nth-child(1) > img:nth-child(2)").src;
                var name2 = wrapper.querySelector("div > div:nth-child(1) > img:nth-child(2)").src;
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':name});

                var tq_id = fill[0]?.id;


                var p1=trato_especial(name);
                var p2=trato_especial(Object.values(fill[0]?.content)[0]);

             //   console.log(p1);
             //   console.log(p2);

                if(p1.includes(p2) && p2!=""){
                //    console.log("existe");
                    wrapper.style.backgroundColor = "Aqua";
                    wrapper.classList.add("tq_found");
                    wrapper.dataset.tqid = tq_id;
                    create_btn_roll_back_single(wrapper);

                    for(var preg of pares_content.entries()) {
                        let radios = preg[1].querySelectorAll("input");
                        let indice=String(Object.values(fill[0]?.content)[1]).charAt(preg[0])-1;
                        if(indice!==-1){
                            radios[indice].checked=1;
                            radios[indice].click();
                        }
                    }
                }else{
                 //   console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        wrapper.style.backgroundColor = "darkorange";
                        wrapper.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
                        if(typeof(keywordfill[0])!='undefined') {
                            if(typeof(keywordfill[0].respuesta)=="string"){
                                wrapper.style.backgroundColor = "navy";
                                let st=keywordfill[0].respuesta;
                                for(var pregg of pares_content.entries()) {
                                    let radios = pregg[1].querySelectorAll(".radios.cml_field input");
                                    let indice=st.charAt(pregg[0])-1;
                                    if(indice!==-1){
                                        radios[indice].checked=1;
                                        radios[indice].click();
                                    }
                                }
                            }

                        }
                        else {
                            if(typeof(form[3])!='undefined')
                            {
                                    wrapper.style.backgroundColor = "silver";
                                    let st=String(form[3]);
                                    for(var pregg of pares_content.entries()) {
                                        let radios = pregg[1].querySelectorAll(".radios.cml_field input");
                                        let indice=st.charAt(pregg[0])-1;
                                        if(indice!==-1){
                                            radios[indice].checked=1;
                                            radios[indice].click();
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

            if(mode.includes("quiz") && tq_for_update.length > 0){
                show_btn_submit();
            }

            if(mode.includes("quiz")){
                create_btn_roll_back();
            }

      }).catch(error => executeIfError(error));


    jsawesome.forEach(wrapper => {
        let query=find_query(wrapper,ruta,atributo);
        tqs.push(query);
    });

    setTimeout(function () {
            requestData_carlete().then(json => {

            if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

                jsawesome.forEach(wrapper => {
                    if (!wrapper.classList.contains('tq_found')) {
                        let resp=json.res;
                        for(var i=0; i<resp?.length; i++){
                            var r=resp[i];
                            let color="coral";
                            autofillpp(wrapper,ruta,atributo,r,color);
                        }
                    }
                });

            }

            }).catch(error => executeIfError(error));
    }, 5000);

    });

    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".radios.cml_field");
            var url = tq.querySelector("div > div:nth-child(1) > img:nth-child(2)").src;
            var respuesta="";

            pares_content.forEach(res=>{
                if(!res.parentNode?.parentNode?.getAttribute("class")?.includes("_cf_hidden")){
                    let inputs = res.querySelectorAll("input");
                    let aux_res=busca_indice(inputs);
                    if(aux_res!==undefined){
                        respuesta+=aux_res;
                    }else{
                        error=true;
                    }
                }
            });
            let data={"tq_id":tq.id,"data":[url , respuesta]};
            send_data.push(data);
        });

        if(error){
        //    alert("Faltan opciónes por marcar.");
            tq_for_update[0].scrollIntoView({
                behavior: 'smooth'
            });
        }else{
         //   console.log(send_data);
            this.setAttribute("disabled","disabled");
            this.innerText="Procesando...";
            GM_xmlhttpRequest({
                method: "POST",
                url: BASE_URL+"/guia/store",
                data:JSON.stringify({"user_id":get('user_id'), "identifier":identifier, "job_name":jobTitle, "data":send_data, "mode":mode_data}),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                onload: function(response) {
               //     console.log(response);
                    let json=JSON.parse(response.responseText);
                    if(json.status){
                        btn_submit_blue.click();
                    }
                },
                onerror:function(resp){
                    console.log("Error create entry");
                    console.log(resp.status+' '+resp.statusText);
                }
            });
        }
    }

function autofillpp(wrapper,ruta,atributo,r,color){

        var pregunta=r.pregunta;
        var repuesta1=r.respuesta;
        
        let existe=false;
        var query=find_query(wrapper,ruta,atributo);

        var rp=[];

        if (trato_especial(pregunta)==trato_especial(query)) {

                for(var k=0; k<Object.keys(repuesta1).length; k++){
                    switch (Object.keys(repuesta1)[k]) {
                        case "input":
                      //      console.log("input");

                            var input=wrapper.querySelectorAll("input");
                            var inputall=JSON.parse(repuesta1.input);


                            for(var i=0; i<inputall.length; i++){
                                var inp= input[i];
                                if (inputall[i].valor==true && inputall[i].tipo=="radio") {
                                    inp.checked = 1; 
                                    //inp.click(); 
                                    existe=true;
                                    rp.push(i+1);
                                }
                                if (inputall[i].tipo=="text") { 
                                    inp.value=inputall[i].valor; 
                                    existe=true;
                                }
                            }
                            break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                            case "select":
                  //              console.log('select');
                            break;
                            case "textarea":
                                var textarea=wrapper.querySelectorAll("textarea");
                                var textareaall=JSON.parse(repuesta1.textarea);
                                    for(var i=0; i<textareaall.length; i++){
                                        var inp= textarea[i];
                                            if (textareaall[i].tipo=="TEXTAREA") { 
                                                inp.value=String(textareaall[i].valor); 
                                                inp.focus(); 
                                                inp.click(); 
                                            }
                                    }
                                    break;  
                            }
                    }
                    if(existe){
                        wrapper.style.backgroundColor = color;
                        wrapper.classList.add("tq_found");
                        if(color=="coral"){
                            var name1 = pregunta;
                            let data=[{"tq_id":wrapper.id,"data":[name1 , rp.join()]}];

                            GM_xmlhttpRequest({
                                method: "POST",
                                url: BASE_URL+"/guia/store",
                                data:JSON.stringify({"user_id":get('user_id'), "identifier":identifier, "job_name":jobTitle, "data":data, "mode":1}),
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                onload: function(response) {
                           //             console.log(response);
                                },
                                onerror:function(resp){
                                    console.log("Error create entry");
                                    console.log(resp.status+' '+resp.statusText);
                                    }
                                });

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



