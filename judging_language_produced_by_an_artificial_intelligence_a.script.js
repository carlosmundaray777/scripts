//seteamos tiempo
setTime(60000,60000);
//id de la guia
identifier = '15-KKC35J825FE58G6L5D6F';

idguia=829272;

var ruta="div";
var atributo="textContent";

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(Object.values(el.content)[0]).includes(trato_especial_s(query.name))));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
          }

            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var name = find_query(wrapper,ruta,atributo);

                var name2 = wrapper.querySelector("div").textContent;

                var pares_content = wrapper.querySelectorAll("input[type=radio]");


                var fill = submissions_api({'name':name});

                var keywordfill = keyword({'name':name2});

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
          //          console.log("existe");
                    wrapper.style.backgroundColor = "Aqua";
                    wrapper.classList.add("tq_found");
                    var r=JSON.parse(Object.values(fill[0]?.content)[1]);
                    let color="Aqua";
                    autofillpp(wrapper,ruta,atributo,r,color);
                }else{
                   console.log("no existe");

                    if(mode.toLowerCase().includes("work")){

                        if(typeof(keywordfill[0])!='undefined') {
                            if(typeof(keywordfill[0].respuesta)=="string"){

                                let nm=keywordfill[0].name;
                                let st=keywordfill[0].respuesta;

                                let pares_content=wrapper.querySelectorAll(".cml_field");
                                for(var pregg of pares_content.entries()) {

                                    if (pregg[1].querySelector(".legend").textContent.toLowerCase().replace(/ /g, "").includes(st.toLowerCase().replace(/ /g, ""))) {
                                        console.log(nm);
                                        console.log(st);
                                        wrapper.style.backgroundColor = "navy";
                                        let kinput=pregg[1].querySelectorAll("input");
                                        for(var kinputt of kinput.entries()) {
                                             if (kinputt[1].parentNode.textContent.toLowerCase().replace(/ /g, "").includes(nm.toLowerCase().replace(/ /g, ""))) { 
                                                kinputt[1].click()
                                            }
                                        }
                                    }else{

                                        tq_for_update_no_existe.push(wrapper); 

                                    }

                                }
                            }

                        }else{
                            tq_for_update_no_existe.push(wrapper);   
                        }

                    }
                }
            });
  
    });

    configureExecute(() => {


    jsawesome.forEach(wrapper => {
        let query=find_query(wrapper,ruta,atributo);
        tqs.push(query);
    });

      requestDataLocal().then(json => {

     //   console.log(json);

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

                var tq_found=document.querySelectorAll(".tq_found");

                if(mode.includes("work")){


                        tq_for_update_no_existe.forEach(wrapper=>{
                            if (!wrapper.classList.contains('tq_found')) {
                                wrapper.style.backgroundColor = "silver";
                                var pares_content = wrapper.querySelectorAll(".cml_field");
                                for(var preg of pares_content.entries()) {
                                    let radios = preg[1].querySelectorAll(".cml_field input");
                                    let st="1";
                                    let indice=st.charAt(preg[0])-1;
                                     if(indice!==-1){
                                     radios[indice].click();
                                     }
                                }    
                            }    
                        });
                }
            }, 1000);

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
                                    inp.click(); 
                                    existe=true;
                                    rp.push(i);
                                }
                                if (inputall[i].valor==true && inputall[i].tipo=="checkbox") {
                                    inp.click(); 
                                    existe=true;
                                    rp.push(i);
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
                            let data=[{"tq_id":null,"data":[name1 , JSON.stringify(r)]}];

                            console.log(data);
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



