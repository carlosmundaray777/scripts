//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-F881JF7B5L1HLAA5GJ8D';

    configureSet((form,submissions,keywords) => {

        const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(query.name,100).includes(trato_especial_s(Object.values(el.content)[0], 100))));
            }

        const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper.querySelector("div");
                var query = wrapper.querySelectorAll(".entity_extract_body .entity_extract .passage")[0].innerText.trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var keywordfill = keyword({'name':query});

                    if(typeof(keywordfill[0])!='undefined') {
                        if(typeof(keywordfill[0].respuesta)=="string"){
                            
                            titleDiv.style.backgroundColor = "navy";
                            titleDiv.scrollIntoView({ block: "center" });

                            let st=keywordfill[0].respuesta;
                            var selecionar = wrapper.querySelector(".entity_extract_body .entity_extract .passage");
                            seleccionaTexto(selecionar);

                            setTimeout(function () {
                            var btn = wrapper.querySelectorAll(".entity_types > .btn");
                                btn[0].click();
                            },100);

                        }

                    }else{

                        var iddd= wrapper.id;
                        var primero = document.getElementsByName(iddd+"[notags]");
                        primero[0].click();

                        var segundo = document.getElementsByName(iddd+"[alltox]");
                        segundo[0].click();

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

            /*if(mode.includes("quiz") && tq_for_update.length > 0){
                show_btn_submit();
            }

            if(mode.includes("quiz")){
                create_btn_roll_back();
            }*/

      }).catch(error => executeIfError(error));
    });

      function seleccionaTexto(element){
          var doc = document,
              text = element,
              range,
              selection;

              selection = window.getSelection();
              range = doc.createRange();
              range.selectNodeContents(text);
              selection.removeAllRanges();
              selection.addRange(range);

      }
    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".cml_row");
            var caja_down=tq.querySelector('.textarea textarea');
            var name = trato_especial_s_json(tq.querySelectorAll(".html-element-wrapper")[0].textContent);
            var respuesta="";
            var respuesta2="";

            let inputs = pares_content[0].querySelector("select");
            if(inputs?.options[inputs?.selectedIndex]?.text!="" && caja_down?.value!=""){
                respuesta=inputs?.options[inputs?.selectedIndex]?.text;
                respuesta2=caja_down.value;
            }else{
                error=true;
            }

            let data={"tq_id":tq.id,"data":[name, respuesta, respuesta2]};
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
                       .replace(/[^a-zA-Z0-9]+/g, "")
                       .replace(/ /g, "")
                      );
    }

    function trato_especial_s_json(text="",longitud=5){
                return String(text?.toString().trim().replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/[^a-zA-Z0-9]+/g, " "));
    }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



