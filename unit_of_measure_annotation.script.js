//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-F14KK8KKF9EM6L5DH6D2';

var pares_de_no_futuro=[];

    configureSet((form,submissions,keywords) => {

       const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(query.name,100).includes(trato_especial_s(Object.values(el.content)[0], 100))));
            }

        const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelector(".html-element-wrapper").textContent;

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var pares = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name});

                var p1=trato_especial_s(name,100);
                var p2=trato_especial_s(Object.values(fill[0]?.content)[0], 100);

                //console.log(p1);
                //console.log(p2);

                if(p1.includes(p2) && p2!=""){
                //    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;
                    for(var preg of pares_content.entries()) {
                        let radios = preg[1].querySelectorAll(".cml_field input");
                        let indice=String(Object.values(fill[0]?.content)[1]).charAt(preg[0])-1;
                        if(indice!==-1){
                            radios[indice].checked=1;
                            radios[indice].click();
                        }
                    }
                }else{
                 //   console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
                        if(typeof(keywordfill[0])!='undefined') {
                            if(typeof(keywordfill[0].respuesta)=="string"){
                                titleDiv.style.backgroundColor = "navy";
                                titleDiv.scrollIntoView({ block: "center" });
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
                                if(typeof(form[3])=="string"){
                                    titleDiv.style.backgroundColor = "silver";
                                    pares_de_no_futuro.push(pares);
                                    pares_de_no_futuro.forEach(pares=>{
                                        pares.forEach(par=>{
                                            let radios = par.querySelectorAll(".radios.cml_field input");
                                            radios[0].checked=1;
                                            radios[0].click();
                                        });
                                    });
                                }else{
                                    titleDiv.style.backgroundColor = "yellow";
                                    titleDiv.scrollIntoView({ block: "center" });
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
    });

    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".radios.cml_field");
            var name = trato_especial_s_json(tq.querySelector(".html-element-wrapper").textContent);
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
            let data={"tq_id":tq.id,"data":[name, respuesta]};
            send_data.push(data);
        });

        if(error){
        //    alert("Faltan opciónes por marcar.");
            tq_for_update[0].scrollIntoView({
                behavior: 'smooth'
            });
        }else{
            console.log(send_data);
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

     function roll_back(){
        if(confirm("¿Estas seguro de eliminar todas estas TQs?")){
            let send_data=[];
            jsawesome.forEach(wrapper => {
                let data=[wrapper.id];
                send_data.push(data);
            });

            GM_xmlhttpRequest({
                method: "POST",
                url: BASE_URL+"/guia/destroy",
                data:JSON.stringify ( {"user_id":get('user_id'), "identifier":identifier, "job_name":jobTitle, "data":send_data}),
                headers:    {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                onload: function(response) {
             //       console.log(response);
                    alert("Todas las TQs fueron eliminadas.");
                }
            });
        }
    }

      function trato_especial_s(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim()
                       .replace(/\s+/gi,' ')
                       .replace(/ /g, "")
                       .replace(/\r?\n?/g, '')
                       .replace(/[&\/\\#,+()$~%'":*?<>{}|!-]/g, '')
                       .normalize("NFD")
                       .replace(/[\u0300-\u036f]/g, "")
                      );
      }    

      function trato_especial_s_json(text="",longitud=5){
                return String(text?.toString().trim().replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/[^a-zA-Z0-9]+/g, ""));
     }
/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



