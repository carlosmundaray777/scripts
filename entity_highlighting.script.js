//seteamos tiempo
setTime(31000,35000);
//id de la guia
identifier = '1-2F155MBKEL58G62L4A8A';

    configureSet((form,submissions,keywords) => {

            
            const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial_ss(Object.values(el.content)[0]).includes(trato_especial_ss(query.name))));
            }

            const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
            }

            //    console.log(jsawesome);

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelector(".row-fluid").querySelector(".passage").textContent;
                var no_data_available= titleDiv.querySelector(".row-fluid").querySelectorAll(".slot_to_elicita")[0].textContent;

                //console.log("consol no data",no_data_available);

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var caja_down=wrapper.querySelectorAll('.group.logic-only-if input');

                var fill = submissions_api({'name':name});

                var keywordfill = keyword({'name':name});

                var p1=trato_especial_ss(name);
                var p2=trato_especial_ss(Object.values(fill[0]?.content)[0]);


                console.log(p1);
                console.log(p2);



                if(p2.includes(p1) && p2!=""){
                    //      console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    if(trato_especial_ss(Object.values(fill[0]?.content)[1]).includes("click")){
                        var segundo=wrapper.querySelector(".checkbox.cml_field").querySelector("input");
                        segundo.click();

                    }

                    setTimeout(function tiempo(){
                        caja_down.forEach(tq =>{
                            if(!tq.parentNode.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                tq.focus({preventScroll:true});
                                tq.value=String(Object.values(fill[0]?.content)[2]);
                            }
                        });
                    }, 500);

                }else{

                    if(no_data_available.toLowerCase()=="no data available"){
                        titleDiv.style.backgroundColor = "navy";
                        titleDiv.scrollIntoView({ block: "center" });
                        var segundo=wrapper.querySelector(".checkbox.cml_field").querySelector("input");
                        segundo.click();
                    }

                    if(mode.toLowerCase().includes("quiz") && no_data_available.toLowerCase()!="no data available"){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work") && no_data_available.toLowerCase()!="no data available"){

                        if(typeof(form[3])!='undefined')
                        {
                            if(typeof(form[3])=="string"){
                                titleDiv.style.backgroundColor = "silver";
                                titleDiv.scrollIntoView({ block: "center" });
                                tq_for_update.push(wrapper);
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

            if(tq_for_update.length > 0){
                show_btn_submit();
            }


            create_btn_roll_back();
            

      }).catch(error => executeIfError(error));
    });

    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
                var pares_content = tq.querySelectorAll(".checkbox.cml_field");
                var name = tq.querySelector(".row-fluid").querySelector(".passage").textContent;
                let cajaf = tq.querySelector("[name='"+tq.id+"[locations][]']");
                var respuesta="";
                var checkbox="";

                pares_content.forEach(res=>{
                    let inputs = res.querySelectorAll("[name='"+tq.id+"[notags]']");
                    for(var entry of inputs) {
                       if(entry?.checked){
                               checkbox=String(entry.parentNode.innerText).trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
                       }else{
                               respuesta=cajaf.value;
                       }
                    }
                });
                if(respuesta.length!==0 || checkbox.length!==0){
                let data={"tq_id":tq.id,"data":[name,checkbox,respuesta]};
                send_data.push(data);
                }else{
                  error=true;
                }
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

    function trato_especial_ss(text="",longitud=5){
        return String(text?.toString().toLowerCase().trim().replace(/[^a-z0-9]/gi,''));
    }

    function trato_especial_json(text="",longitud=5){
        return String(text?.toString().trim().replace(/(\r\n\t|\n|\r\t)/gm," "));
    }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



