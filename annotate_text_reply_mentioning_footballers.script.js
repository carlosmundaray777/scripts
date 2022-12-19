//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-24EGHA631873GMK1MH54';

idguia=438719;

var ruta="div.html-element-wrapper";

var atributo="textContent";

    configureSet((form,submissions,keywords) => {

        const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(query.name,100).includes(trato_especial_s(Object.values(el.content)[0], 100))));
            }

        const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().indexOf(el.name.toLowerCase())!=-1));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelectorAll(".html-element-wrapper")[0].textContent;
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");

                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name.trim()});

                var p1=trato_especial_s(name,100);
                var p2=trato_especial_s(Object.values(fill[0]?.content)[0], 100);

                var tq_id = fill[0]?.id;

               //console.log(p1);
               //console.log(p2);
               // console.log(fill);

                if(p1.includes(p2) && p2!=""){

                    wrapper.dataset.tqid = tq_id;
                    create_btn_roll_back_single(wrapper);
                  
                    console.log("existe");
                    wrapper.style.backgroundColor = "Aqua";
                    wrapper.classList.add("tq_found");

                    let guias=Object.values(fill[0]?.content)[1].replace("-", "");

                    for(let preg of pares_content.entries()) {
                        let radios = preg[1].querySelectorAll(".radios.cml_field input");
                        let st=String(guias);
                        let indice=st.charAt(preg[0])-1;
                         if(indice!==-1){
                         radios[indice].checked=1;
                         radios[indice].click();
                         }
                    }

                }else{
                 //   console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
                        if(typeof(keywordfill[0])!='undefined') {
                            if(typeof(keywordfill[0].respuesta)=="string"){
                                wrapper.style.backgroundColor = "navy";
                                let sp=keywordfill[0].name;
                                let st=keywordfill[0].respuesta;

                                setTimeout(function tiempo(){

                                    for(let preg of pares_content.entries()) {
                                        let radios = preg[1].querySelectorAll(".radios.cml_field input");
                                        let st=String(st);
                                        let indice=st.charAt(preg[0])-1;
                                         if(indice!==-1){
                                         radios[indice].checked=1;
                                         radios[indice].click();
                                         }
                                    }                   

                                }, 500);
                            }

                        }
                        else {
                            if(typeof(form[3])!='undefined')
                            {
                                if(typeof(form[3])=="string"){
                                    titleDiv.style.backgroundColor = "silver";
                                    titleDiv.scrollIntoView({ block: "center" });
                                    let st=String(form[3]);

                                    setTimeout(function tiempo(){

                                        for(let preg of pares_content.entries()) {
                                            let radios = preg[1].querySelectorAll(".radios.cml_field input");
                 
                                            let indice=st.charAt(preg[0])-1;
                                             if(indice!==-1){
                                             radios[indice].checked=1;
                                             radios[indice].click();
                                             }
                                        } 

                                    }, 500);
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

            setTimeout(function () {

                if(mode.includes("quiz")){
                    create_btn_roll_back();
                    show_btn_submit();
                }

            }, 1000);

      }).catch(error => executeIfError(error));

    jsawesome.forEach(wrapper => {
        let query=find_query(wrapper,ruta,atributo);
        tqs.push(query);
    });

    setTimeout(function(){
            requestData_carlete().then(json => {
                console.log(json);

            if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

                jsawesome.forEach(wrapper => {
                    let resp=json.res;
                    for(var i=0; i<resp?.length; i++){
                        var r=resp[i];
                        let color="coral";
                        if (!wrapper.classList.contains('tq_found')) {
                            autofillp(wrapper,ruta,atributo,r,color);
                        }
                    }
                });

            }

            }).catch(error => executeIfError(error));
    }, 1000);



    });




    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".cml_row");
            var name = trato_especial_s_json(tq.querySelectorAll(".html-element-wrapper")[0].textContent);

            var respuesta=[];

            for(let preg of pares_content.entries()) {

                let radios = preg[1].querySelectorAll(".radios.cml_field input");

                if(radios[0].classList[0].includes("which_category_best_describes_the_reply") && radios[0].checked){
                        respuesta.push(preg[0]+1);
                }

                if(radios[0].classList[0].includes("is_the_reply_abusive") && radios[0].checked){
                    respuesta.push(radios[0].parentNode.textContent.includes("Yes")?1:2);
                }

            } 

            let data={"tq_id":tq.id,"data":[name, respuesta.join("-")]};
            send_data.push(data);
        });

        //console.log(error);
        //console.log(send_data);

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

    function trato_especial_s(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim()
                       .replace(/[^a-zA-Z0-9]+/g, "")
                       .replace(/ /g, "")
                      );
    }

    function trato_especial_s_json(text="",longitud=5){
                return String(text?.toString().replace(/[^a-zA-Z0-9]+/g, " "));
    }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



