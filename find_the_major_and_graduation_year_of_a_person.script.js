//seteamos tiempo
setTime(60000*20,60000*21);
//id de la guia
identifier = '1-M88LM9LM4L2HLB5KLEAE';

var base_url_pernalete="http://143.244.159.211";
var id_guia_pernalete=144303;

var token_guia_pernalete="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiamhvaW5uZXJ2aTI1NiIsImZlY2hhIjoiMjAyMi0wMS0xOVQxNjoyODoxMS44MzBaIiwicm9sIjoidGFza2VycyIsIm5vbWJyZSI6Ikpob2lubmVyIiwiYXBlbGxpZG8iOiJWaWVsbWEiLCJpZGRpc2NvcmQiOiI1NzkzMTA0ODkyOTM4MTU4MTgiLCJzZXNpb25saW1pdCI6IjE1IiwiaWF0IjoxNjQyNjA5NjkxLCJleHAiOjE2NDI2OTYwOTF9.1Np0uCeDQtRpdTa9vHhB7XvvO_WIDdFZbO316uL09tE";


    configureSet((form,submissions,keywords) => {

       const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(Object.values(el?.content)[0]).includes(trato_especial_s(query?.name))));
            }

        const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelector("div.row-fluid > div > div > table").textContent;
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var checkboxes = wrapper.querySelectorAll(".checkboxes.cml_field");
                var text = wrapper.querySelectorAll("[type='text']");

                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name});

                var p1=trato_especial_s(name);
                var p2=trato_especial_s(Object.values(fill[0]?.content)[0]);

                /*console.log(text);
                console.log(name);
                console.log(p1);
                console.log(p2);*/

                if(p2.includes(p1) && p2!=""){
                //    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;
                    pares_content?.forEach(tq =>{
                        var labels = tq.querySelectorAll("label");
                            labels?.forEach(label =>{
                                var input = label.querySelector("input");
                                var r1=trato_especial(input.value);
                                var r2=trato_especial(Object.values(fill[0]?.content)[1]);
                                    if(r1.includes(r2) && r2!=""){
                                        if(input.type=="radio"){input.checked=1}
                                        input.click();
                                    }
                            });
                    });

                    

                    checkboxes?.forEach(tq =>{
                        var labels = tq.querySelectorAll("label");
                            labels?.forEach(label =>{
                                let input = label.querySelector("input");
                                let guias=Object.values(fill[0]?.content)[2]?.split(">")
                                    guias?.forEach(guia =>{
                                        var r1=input.value;
                                        var r2=guia;
                                        if(r1==r2){
                                            input.click();
                                        }
                                    });
                            });
                    });
                   

                    text?.forEach(input =>{
                                               
                        if(input.name.includes("degree_major")) {
                            if(!input.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                input.value=Object.values(fill[0]?.content)[3];
                            }
                        }
                        if(input.name.includes("graduation_year")) {
                            if(!input.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                input.value=Object.values(fill[0]?.content)[4];
                            }
                        }
                    });


                }else{
                 //   console.log("no existe");


                        GM_xmlhttpRequest({
                        method: "POST",
                            url: base_url_pernalete+"/findtq",
                                data:JSON.stringify ({"idguia": id_guia_pernalete,"pregunta": name}),
                                    headers:    {
                                        "access-token": token_guia_pernalete,
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    },
                                        onload: function(response) {
                                            console.log(response);
                                            var json=JSON.parse(response.responseText)||0;
                                            console.log(json);
                                            if (!JSON.parse(response.responseText).errors && response.status==200 && json.mensaje!="TQ no encontrada") {

                                                var resp=JSON.parse(json.res[0].respuesta2.input);

                                                console.log(resp);

                                                if(resp){

                                                    wrapper.style.backgroundColor = "coral";
                                                    tq_for_update.push(wrapper);

                                                    setTimeout(function tiempo(){


                                                    resp.forEach(tqs =>{

                                                        switch(tqs.tipo) {
                                                            case "radio":
                                                                        pares_content?.forEach(tq =>{
                                                                            var labels = tq.querySelectorAll("label");
                                                                            labels.forEach(label =>{
                                                                                var input = label.querySelector("input");
                                                                                var r1=trato_especial(input.value);
                                                                                var r2=trato_especial(tqs?.valor);
                                                                                if(r1.includes(r2) && r2!=""){
                                                                                    if(input.type=="radio"){input.checked=1}
                                                                                    input.click();
                                                                                }
                                                                            });
                                                                        });
                                                            break;
                                                            case "checkbox":
                                                                    checkboxes?.forEach(tq =>{
                                                                        var labels = tq.querySelectorAll("label");
                                                                        labels.forEach(label =>{
                                                                            var input = label.querySelector("input");
                                                                            var r1=trato_especial(input.value);
                                                                            var r2=trato_especial(tqs?.valor);
                                                                            if(r1.includes(r2) && r2!=""){
                                                                                if(tqs.tipo=="checkbox"){input.click();}
                                                                            }
                                                                        });
                                                                    });
                                                            break;
                                                            case "text":

                                                                    let t = resp.filter((el)=>el.tipo=="text");
                                        
                                                                    text?.forEach(input =>{
                                                                                                           
                                                                        if(input.name.includes("degree_major")) {
                                                                            if(!input.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                                                                input.value=t[0].valor;
                                                                            }
                                                                        }
                                                                        if(input.name.includes("graduation_year")) {
                                                                            if(!input.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                                                                input.value=t[1].valor;
                                                                            }
                                                                        }
                                                                    });

                                                             break;
                                                              default:
                                                                // code block
                                                            }

 


                                                    }); 

                                                    }, 500);
                                                }

                                            }else{
                                                wrapper.style.backgroundColor = "darkorange";
                                                if(mode.toLowerCase().includes("quiz")){
                                                    tq_for_update.push(wrapper);
                                                }
                                                
                                            }
                                        },
                                        onerror:function(resp){
                                                console.log("Error");
                                                console.log(resp.status+' '+resp.statusText);
                                        },
                                        ontimeout:function(resp){
                                                console.log('Timeout');
                                        }
                        });
                }
            });   
    });

    configureExecute(() => {

      requestData().then(json => {

        console.log(json);

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
            var name = trato_especial_json_s(tq.querySelector("div.row-fluid > div > div > table").textContent);

            var radios = tq.querySelectorAll(".radios.cml_field");
            var checkboxes = tq.querySelectorAll(".checkboxes.cml_field");
            let degree_major = tq.querySelector("[name='"+tq.id+"[degree_major][]']");
            let graduation_year = tq.querySelector("[name='"+tq.id+"[graduation_year]']");


            var respuesta="";
            var respuesta2=[];
            var degree_majors="";
            var graduation_years="";



                radios.forEach(radio=>{

                    let checked=radio.querySelectorAll("input");


                    for(var entry of checked) {
                        if(entry.checked){
                            respuesta=String(entry.parentNode.innerText).trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
                            if(entry?.value=="yes"){
                               
                            }
                        }
                    }
                    checkboxes.forEach(tqq =>{
                        var labels = tqq.querySelectorAll("label");
                        labels.forEach(label =>{
                                var input = label.querySelector("input");
                                if(input.checked){
                                    respuesta2.push(input.value);
                                }
                                    
                        });
                    });

                    degree_majors=degree_major.value!="undefined"?degree_major.value:"";
                    graduation_years=graduation_year.value!="undefined"?graduation_year.value:"";


                });


            if(respuesta.length!==0){
                let data={"tq_id":tq.id,"data":[name, respuesta,respuesta2.join(">"), degree_majors, graduation_years]};
                send_data.push(data);
            }else{
                error=true;
            }

        });

        console.log(send_data);

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

    function trato_especial_json_s(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim().replace(/\s+/gi,' '));
    }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



