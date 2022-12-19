//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-MD6J95BJHHCH87E994CA';

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
               return Object.values(Object.values(submissions).filter((el) =>trato_especial(Object.values(el.content)[0],100).indexOf(trato_especial(query.name,100)) > -1 && trato_especial(Object.values(el.content)[1],100).indexOf(trato_especial(query.name2,100)) > -1));
          }

            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var business1 = wrapper.querySelectorAll("h2")[0].textContent.replace("Business:", "");
                var business2 = wrapper.querySelectorAll("h2")[1].textContent.replace("Address:", "");

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':business1,'name2':business2});
                var filldata = {};
                Object.assign(filldata, fill[0]?.content);

                var q1=trato_especial(business1, 100);
                var q2=trato_especial(Object?.values(filldata)[0]);

                var r1=trato_especial(business2, 100);
                var r2=trato_especial(Object?.values(filldata)[1]);

                if((q1==q2) && (r1==r2) && r2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    wrapper.classList.add("tq_found");

                    var primera=wrapper.querySelectorAll(".radios.cml_field")[0].querySelectorAll("label");

                    for(var i1=0; i1<primera.length; i1++){
                        var input1= primera[i1].querySelector("input");
                        var r11=trato_especial(primera[i1]?.textContent);
                        var r21=trato_especial(Object.values(filldata)[2]);

                        if(r21.indexOf(r11) > -1){
                            input1.checked=1;
                            input1.click();
                        }

                    }


                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){

                       var status=true;

                        let type=document.querySelectorAll("[name='"+wrapper.id+"[best_match]']");
                        type.forEach(val =>{
                            var empresa=val.parentNode.textContent;
                            var direccion=val.parentNode.parentNode.parentNode.querySelectorAll(".cml-gray");
                            direccion.forEach(val1 =>{

                                var texto=r1?.toString().toLowerCase().replace(/[a-zA-z]/g, "").replace(/[&\/\\#,+()$~%.'":*?<>{}|!-]/g, '').replace(/ /g, "");
                                var texto2=val1.textContent?.toString().toLowerCase().replace(/[a-zA-z]/g, "").replace(/[&\/\\#,+()$~%.'":*?<>{}|!-]/g, '').replace(/ /g, "");


                                if(trato_especial(empresa,100).includes(trato_especial(q1,100)) && (trato_especial(texto,10)==trato_especial(texto2,10))){
                                    titleDiv.style.backgroundColor = "navy";
                                    titleDiv.scrollIntoView({ block: "center" });
                                    val.parentNode.click();
                                    val.checked=1;
                                    status=false;
                                }
                            });
                        });

                        if(status){
                                    if(typeof(form[3])=="string"){
                                        titleDiv.style.backgroundColor = "silver";
                                        titleDiv.scrollIntoView({ block: "center" });
                                        let st_no_tq=String(form[3]);
                                        var primera_no_tq=wrapper.querySelectorAll(".radios.cml_field")[0].querySelectorAll("label");

                                        for(var i1_no_tq=0; i1_no_tq<primera_no_tq.length; i1_no_tq++){
                                            var input1_no_tq= primera_no_tq[i1_no_tq].querySelector("input");
                                            var r11_no_tq=trato_especial(primera_no_tq[i1_no_tq]?.textContent);
                                            var r21_no_tq=trato_especial(st_no_tq);

                                            if(r21_no_tq.includes(r11_no_tq)){
                                                input1_no_tq.click();
                                                input1_no_tq.checked=1;
                                            }

                                        }
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


            setTimeout(function () {

                if(mode.includes("quiz")){
                    create_btn_roll_back();
                    show_btn_submit();
                }

            }, 1000);


      }).catch(error => executeIfError(error));



        /*requestData_carlete().then(json => {
            console.log(json);

        if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

            jsawesome.forEach(wrapper => {
                    if (!wrapper.classList.contains('tq_found')) {
                    let resp=json.res;
                    for(var i=0; i<resp?.length; i++){
                        var r=resp[i];
                        let color="coral";
                        autofillp(wrapper,ruta,atributo,r,color);
                    }
                }
            });

        }

        }).catch(error => executeIfError(error));*/

      

    });

        function send_data(){
            ///si es work mode pero salio TQ no tememos porque guardar el resto
            var mode_data=mode.includes("quiz")?0:1;

            var error=false;
            let send_data=[];
            tq_for_update.forEach(tq=>{
                var pares_content = tq.querySelectorAll(".radios.cml_field")[0].querySelectorAll("label");
                var business1 = tq.querySelectorAll("h2")[0].textContent.replace("Business:", "").trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
                var business2 = tq.querySelectorAll("h2")[1].textContent.replace("Address:", "").trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
                var respuesta="";

                pares_content.forEach(res=>{
                    let inputs = res.querySelectorAll("[name='"+tq.id+"[best_match]']");
                    for(var entry of inputs) {
                        if(entry.checked){
                            respuesta= String(entry.parentNode.innerText).trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
                        }
                    }
                });

                if(respuesta.length!==0){
                let data={"tq_id":tq.id,"data":[business1 , business2 , respuesta]};
                send_data.push(data);
                }else{
                  error=true;
                }

            });



            if(error){
                alert("Por favor seleccione todas las opciones");
            }else{


                this.setAttribute("disabled","disabled");
                this.innerText="Procesando...";
                GM_xmlhttpRequest({
                    method: "POST",
                    url: BASE_URL+"/guia/store",
                    data:JSON.stringify({"user_id": get('user_id'),"worker_id":777, "identifier":identifier, "job_name":jobTitle, "data":send_data, "mode":mode_data}),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    onload: function(response) {
                        console.log(response);
                        let json=JSON.parse(response.responseText);
                        if(json.status){
                            submit.click();
                        }
                    },
                    onerror:function(resp){
                        console.log("Error create entry");
                        console.log(resp.status+' '+resp.statusText);
                    }
                });

            }

        }



/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);


