//seteamos tiempo
setTime(60000*2,60000*2);
//id de la guia
identifier = '1-15941KKA4FDCMFF285BG';

var id_guia_p=51860;

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(Object.values(el.content)[0]).includes(trato_especial_s(query.name))));
          }


            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var name = titleDiv.querySelector("table > tbody > tr > td > h1").textContent;

                var fill = submissions_api({'name':name});

                var p1=trato_especial_s(name);
                var p2=trato_especial_s(Object.values(fill[0]?.content)[0]);

                var elements = titleDiv.querySelectorAll("a");
                elements.forEach(element => {
                    element.classList.remove("validates-clicked");
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = wrapper.id+"[_clicks][]";
                    input.value=element.href;
                    wrapper.appendChild(input);
                });
                

                if(p2.includes(p1) && p2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;
                    var r=JSON.parse(Object.values(fill[0]?.content)[1]);
                    autofill(wrapper,r,false);
                    existe(wrapper);

                }else{
                    console.log("no existe");

                    if(mode.toLowerCase().includes("quiz")){
                        wrapper.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }

                    

                    GM_xmlhttpRequest({
                        method: "POST",
                            url: base_url_p+"/findtq",
                                data:JSON.stringify ({"idguia": id_guia_p,"pregunta": name}),
                                    headers:    {
                                        "access-token": token_guia_p,
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    },
                                        onload: function(response) {

                                        var json=JSON.parse(response.responseText)||0;

                                        if (!JSON.parse(response.responseText).errors && response.status==200 && !(json.mensaje.includes("TQ no encontrada") || json.mensaje.includes("Token invalido"))) {
                                             
                                                let resp=json.res;
                                                wrapper.style.backgroundColor = "coral";
                                                for(var i=0; i<resp.length; i++){
                                                    var r=resp[i];
                                                    autofill(wrapper,r,true);
                                                    existe(wrapper);
                                                }
                                                
                                         }else{
                                            if(mode.toLowerCase().includes("work")){
                                                wrapper.style.backgroundColor = "silver";
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

                var tqs=document.querySelectorAll(".tq");
                var no_tqs=document.querySelectorAll(".no_tq");

                if(mode.includes("quiz")){
                    create_btn_roll_back();
                }
            }, 2000);

      }).catch(error => executeIfError(error));
    });

function existe(wrapper){
        wrapper.classList.add("tq");
}

function no_existe(wrapper){
        wrapper.classList.add("no_tq");
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function autofill(wrapper,r, grabar=false){

            var pregunta=r.pregunta;
            var repuesta1=r.respuesta;

            for(var k=0; k<Object.keys(repuesta1).length; k++){
                switch (Object.keys(repuesta1)[k]) {
                    case "input":
                        console.log("input");

                        var input=wrapper.querySelectorAll("input");
                        var inputall=JSON.parse(repuesta1.input);

                        for(var i=0; i<inputall.length; i++){
                            var inp= input[i];
                            if (inputall[i].valor==true && inputall[i].tipo=="radio") {
                                inp.checked = 1; 
                                inp.click(); 
                            }
                            if (inputall[i].valor==true && inputall[i].tipo=="checkbox") {
                                inp.click(); 
                            }
                            if (inputall[i].tipo=="text") { 
                                inp.value=inputall[i].valor; 
                            }
                        }
                        break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                        case "select":
                            console.log('select');
                        
                        var select=wrapper.querySelectorAll("select");
                        var inputall=JSON.parse(repuesta1.select);

                        for(var i=0; i<inputall.length; i++){
                            if (inputall[i].tipo=="SELECT") {
                                var segundo=wrapper.querySelector("select");
                                for(var io=0; io<segundo.length; io++){
                                    var r1=segundo.options[io].value;
                                    var r2=inputall[i].valor;
                                    if(r2==r1 && r2!=""){
                                        segundo.selectedIndex=io;
                                        segundo.selected = true;
                                    }

                                }
                            }
                        }

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


            if (grabar){

                var name1 = trato_especial_json(pregunta);
                let data=[{"tq_id":wrapper.id,"data":[name1 , JSON.stringify(r)]}];

                GM_xmlhttpRequest({
                    method: "POST",
                    url: BASE_URL+"/guia/store",
                    data:JSON.stringify({"user_id":get('user_id'), "identifier":identifier, "job_name":jobTitle, "data":data, "mode":1}),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    onload: function(response) {
                            console.log(response);
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

      function trato_especial_json(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim()
                       .replace(/\s+/gi,' ')
                       .replace(/\r?\n?/g, '')
                       .replace(/[&\/\\#,+()$~%'":*?<>{}|!-]/g, '')
                       .normalize("NFD")
                       .replace(/[\u0300-\u036f]/g, "")
                      );
      }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



