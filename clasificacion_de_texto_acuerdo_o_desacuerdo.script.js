//seteamos tiempo
setTime(10000,13000);
//id de la guia
identifier = '1-BDJ7L9393B9A9MG86D8B';
limit = 150;

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(query.name).includes(trato_especial_s(Object.values(el.content)[0]))));
          }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelector(".html-element-wrapper").textContent;

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':name});

                var p1=trato_especial_s(name);
                var p2=trato_especial_s(Object.values(fill[0]?.content)[0]);

                if(p1.includes(p2) && p2!=""){
                    console.log("existe");

                    titleDiv.style.backgroundColor = "Aqua";
                    tq_found++;

                    var primera=wrapper.querySelectorAll(".radios.cml_field");
                    setTimeout(function tiempo(){
                        primera.forEach(tq =>{
                            var labels = tq.querySelectorAll("label");
                            if(!tq.getAttribute("class").includes("_cf_hidden")){
                                labels.forEach(label =>{
                                    var r1=trato_especial_s(label.textContent,5);
                                    var r2=trato_especial_s(Object.values(fill[0]?.content)[1],5);
                                    if(r1==r2 && r2!=""){
                                        var input = label.querySelector("input");
                                        if(input.type=="radio"){input.checked=1}
                                        input.click();
                                    }
                                });
                            }
                        });
                   }, 500);

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
    
                    var primera=wrapper.querySelectorAll(".radios.cml_field");
                    setTimeout(function tiempo(){
                        primera.forEach(tq =>{
                            var labels = tq.querySelectorAll("label");
                            if(!tq.getAttribute("class").includes("_cf_hidden")){
                                labels.forEach(label =>{
                                    var r1=trato_especial_s(label.textContent);
                                    var r2=trato_especial_s(String(form[3]));
                                    if(r1==r2 && r2!=""){
                                        var input = label.querySelector("input");
                                        if(input.type=="radio"){input.checked=1}
                                        input.click();
                                    }
                                });
                            }
                        });
                   }, 500);

                            }else{
                                titleDiv.style.backgroundColor = "yellow";
                                titleDiv.scrollIntoView({ block: "center" });
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

    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
                var pares_content = tq.querySelectorAll(".radios.cml_field");
                var url = tq.querySelector(".html-element-wrapper").textContent;
                var respuesta="";

                pares_content.forEach(res=>{
                    let inputs = res.querySelectorAll("[name='"+tq.id+"[the_topic_assigned_to_the_text_is_relevant]']");
                    for(var entry of inputs) {
                        if(entry.checked){
                           respuesta=trato_especial_s_json(entry.parentNode.textContent);
                        }
                    }
                });

                if(respuesta.length!==0){
                let data={"tq_id":tq.id,"data":[url,respuesta]};
                send_data.push(data);
                }else{
                  error=true;
                }

        });

        if(error){
            alert("Faltan opciónes por marcar.");
            tq_for_update[0].scrollIntoView({
            behavior: 'smooth'
        });
        }else{
         //   console.log(send_data);
            this.setAttribute("disabled","disabled");
            this.innerText="Procesando...";
            console.log({"user_id":get('user_id'), "identifier":identifier, "job_name":jobTitle, "data":send_data, "mode":mode_data});
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

    function trato_especial_s(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim()
                       .replace(/[^a-zA-Z0-9]+/g, "")
                       .replace(/ /g, "")
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



