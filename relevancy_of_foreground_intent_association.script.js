//seteamos tiempo
setTime(20000,25000);
//id de la guia
identifier = '1-D9E6JE16K7MMJJ4H5D9B';

idguia=971992;

var ruta="div:nth-child(1) > div > h2";
var atributo="textContent";

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(Object.values(el.content)[0]).includes(trato_especial_s(query.name))));
          }


            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var name = find_query(wrapper,ruta,atributo);

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
                    wrapper.classList.add("tq_found");
                    var r=JSON.parse(Object.values(fill[0]?.content)[1]);
                    let color="Aqua";
                    autofillp(wrapper,ruta,atributo,r,color);
                    existe(wrapper);

                }else{
                    console.log("no existe");

                    if(mode.toLowerCase().includes("quiz")){
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
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

                var tqs=document.querySelectorAll(".tq");
                var no_tqs=document.querySelectorAll(".no_tq");

                if(mode.includes("quiz")){
                    create_btn_roll_back();
                }


                var tq_found=document.querySelectorAll(".tq_found");

                if(mode.includes("work") && tq_found?.length >= 1){

                    var cantidad_task=document.querySelector(".completed-gauge")?.textContent.match(/(\d+)/g)[0];
                    
                    if (cantidad_task <= 4) {

                        tq_for_update_no_existe.forEach(wrapper=>{
                            if (!wrapper.classList.contains('tq_found')) {
                                wrapper.style.backgroundColor = "silver";
                                let e = wrapper.querySelector("a");
                                document.getElementsByName(wrapper.id+"[relevancy]")[getRandomInt(0, 2)].click();
                            }    
                        });
                    }

                }
            }, 3000);

      }).catch(error => executeIfError(error));


    jsawesome.forEach(wrapper => {
        let query=find_query(wrapper,ruta,atributo);
        tqs.push(query);
    });


        requestData_carlete().then(json => {
            console.log(json);

        if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

            jsawesome.forEach(wrapper => {
                let resp=json.res;
                for(var i=0; i<resp?.length; i++){
                    var r=resp[i];
                    let color="coral";
                    autofillp(wrapper,ruta,atributo,r,color);
                }
            });

        }

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

function autofillp(wrapper,ruta,atributo,r,color){

        var pregunta=r.pregunta;
        var repuesta1=r.respuesta;
        
        let existe=false;
        var query=find_query(wrapper,ruta,atributo);

        if (trato_especial(pregunta)==trato_especial(query)) {

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
                                    existe=true;
                                }
                                if (inputall[i].tipo=="text") { 
                                    inp.value=inputall[i].valor; 
                                    existe=true;
                                }
                            }
                            break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                            case "select":
                                console.log('select');
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



