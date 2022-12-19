//seteamos tiempo
setTime(30000,33000);
//id de la guia
identifier = '1-JGE1BJABFL28BD4AKLB7';

var id_guia_p=390897;

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(Object.values(el.content)[0]).includes(trato_especial_s(query.name))));
          }


            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var name = titleDiv.querySelector("div:nth-child(2) > div > span").textContent;
                let code = name?.replace("Find the Faktor for this ISIN","")?.trim();

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
                    console.log(code);
                    if(mode.toLowerCase().includes("quiz")){
                        wrapper.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }

                    scraping(wrapper,code);
                    
                }
            });
  
    });


function scraping(wrapper, code){

                    GM_xmlhttpRequest({
                        method: "GET",
                            url: "https://www.six-structured-products.com/de/direktsuche?suchbegriff="+code,
                                    headers:    {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    },
                                        onload: function(response) {

                                            console.log(response);

                                            if (response.finalUrl.toString().toLowerCase().includes("zertifikat")) {
                                               setTimeout(function () {
                                                wrapper.style.backgroundColor = "navy";
                                                var link = document.createElement("a");
                                                link.innerText = "Ver Faktor";
                                                link.href = response.finalUrl;
                                                link.target="_black";
                                                link.align="center";
                                                link.style.backgroundColor = "#000";
                                                link.style.color = "#fff";
                                                wrapper.querySelector(".html-element-wrapper").appendChild(link);

                                               
                                                GM_xmlhttpRequest({
                                                    method: "GET",
                                                        url: response.finalUrl,
                                                                headers:    {
                                                                    "Content-Type": "application/json",
                                                                    "Accept": "application/json"
                                                                },
                                                                    onload: function(r) {
                                                                        var cadena=r.responseText;
                                                                        var buscador="Faktor";
                                                                        let num_is=buscarCode(cadena, "Faktor").match(/(\d+)/g);
                                                                        let num=buscarCode(cadena, "Faktor")[0].replace(/[<>td/]/g, '');
                                                                        
                                                                        if (num_is==null) {
                                                                            document.getElementsByName(wrapper.id+"[does_the_website_sow_a_partizipationsfaktor]")[1].click();
                                                                        }else{
                                                                            document.getElementsByName(wrapper.id+"[does_the_website_sow_a_partizipationsfaktor]")[0].click();
                                                                            document.getElementsByName(wrapper.id+"[please_enter_the_partizipationsfaktor]")[0].value=num;  
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

                                               },1000);
                                            }else{
                                                wrapper.style.backgroundColor = "silver"; 
                                               document.getElementsByName(wrapper.id+"[does_the_website_sow_a_partizipationsfaktor]")[1].click();
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

            }, 5000);

      }).catch(error => executeIfError(error));
    });

function buscarCode(cadena, buscador){
    let invertido = cadena.split("tr").reverse().join("tr");
    return invertido.substring(invertido.indexOf(buscador), invertido.length).split("tr")[0];
}

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
                            if (inputall[i].tipo=="text") { 
                                inp.value=inputall[i].valor; 
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



