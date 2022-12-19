//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = 'tiktok-guia';

var pares_de_no_futuro=[];
var tq_mode_work=false;

    configureSet((task_names,keyword) => {

            const filterItems = query => {
                return Object.values(Object.values(task_names).filter((el) =>el.titulo.includes(query.name)));
            }

            const keywords = query => {
                return Object.values(Object.values(keyword).filter((el) =>trato_especial(query.name,100).includes(trato_especial(el.name,100))));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var titulo = wrapper.querySelector(".instrumentation, .Instrumentation")?.getAttribute("data-id")?.replace("inst_","");;
                var video_description = wrapper.querySelector(".video-description")?.innerText;

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = filterItems({'name':titulo});

                var pares = wrapper.querySelectorAll(".radios.cml_field");
                var p1t="https://www.tiktok.com/@tiktok/video/"+titulo;
                var p1="https://www.tiktok.com/video/"+titulo;
                var p2=fill[0]?.titulo;


                get_scrapping(p1t, function(xhr){

                    var keyword = keywords({'name':xhr?.titulo});

                    if(p1.includes(p2) && p2!=""){
                        console.log("existe");
                        titleDiv.style.backgroundColor = "Aqua";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_found++;

                        for(var preg of pares_content.entries()) {
                            let radios = preg[1].querySelectorAll(".radios.cml_field input");
                            let indice=fill[0].respuesta.charAt(preg[0])-1;
                            if(indice!==-1){
                                radios[indice].checked=1;
                                radios[indice].click();
                            }
                        }

                        if(mode.includes("work")){
                            if(fill[0].mode==0){
                                tq_mode_work=true;
                            }
                        }

                    }else{
                        console.log("no existe");

                        if(mode.toLowerCase().includes("quiz")){

                            titleDiv.style.backgroundColor = "darkorange";
                            titleDiv.scrollIntoView({ block: "center" });

                        }else if(mode.toLowerCase().includes("work")){

                            if(typeof(keyword[0])!='undefined')
                            {
                                if(typeof(keyword[0].respuesta)=="string"){
                                    titleDiv.style.backgroundColor = "navy";
                                    titleDiv.scrollIntoView({ block: "center" });
                                    let st=keyword[0].respuesta;
                                    for(var pregg of pares_content.entries()) {
                                        let radios = pregg[1].querySelectorAll(".radios.cml_field input");
                                        let indice=st.charAt(pregg[0])-1;
                                        if(indice!==-1){
                                            radios[indice].checked=1;
                                            radios[indice].click();
                                        }
                                    }
                                }
                            }
                            else
                            {
                                titleDiv.style.backgroundColor = "silver";
                                titleDiv.scrollIntoView({ block: "center" });



                                pares_de_no_futuro.push(pares);
                                pares_de_no_futuro.forEach(pares=>{
                                    pares.forEach(par=>{
                                        let radios = par.querySelectorAll(".radios.cml_field input");
                                        radios[1].checked=1;
                                        radios[1].click();
                                    });
                                });
                            }

                        }

                        tq_for_update.push(wrapper);

                    }

                    var titulo = document.createElement("p");
                    titulo.innerText = xhr?.titulo;
                    titulo.align="center";
                    titulo.style.backgroundColor = "#888";
                    titulo.style.color = "#000";
                    wrapper.querySelector(".video-question-component")?.appendChild(titulo);

                    var br = document.createElement("br");
                    wrapper.querySelector(".video-question-component")?.appendChild(br);

                    var url = document.createElement("p");
                    url.innerText = p1;
                    url.align="center";
                    url.style.backgroundColor = "#ccc";
                    url.style.color = "#000";
                    wrapper.querySelector(".video-question-component")?.appendChild(url);

                    var br2 = document.createElement("br");
                    wrapper.querySelector(".video-question-component")?.appendChild(br2);

                    var link = document.createElement("a");
                    link.innerText = "Ver video";
                    link.href = p1t;
                    link.target="_black";
                    link.align="center";
                    link.style.backgroundColor = "#000";
                    link.style.color = "#fff";
                    wrapper.querySelector(".video-question-component")?.appendChild(link);


                    var elements = titleDiv.querySelectorAll("input");
                    elements.forEach(element => {
                        element.removeAttribute("disabled");
                    });

                    var label = titleDiv.querySelectorAll("label");
                    label.forEach(element => {
                        element.classList.remove("IsDisabled");
                    });

            });
        });
   
    });

    configureExecute(() => {
        jsawesome.forEach(wrapper => {
          var titulo = wrapper.querySelector(".instrumentation, .Instrumentation")?.getAttribute("data-id")?.replace("inst_","");
          tqs.push(titulo);
      });

      requestData('youtubers').then(json => {
        console.log(json);
        let task_names=[];
        let keyword=[];
        Object.entries(json.submissions).forEach(([key, value]) => {
                            task_names.push(value);
                        });

        Object.entries(json.keywords).forEach(([key, value]) => {
                            keyword.push(value);
                        });
        set_logica(task_names, keyword);

        if(mode.includes("quiz") && tq_for_update.length > 0){
            show_btn_submit();
        }

        if(mode.includes("quiz")){
            create_btn_roll_back();
        }

      }).catch(error => executeIfError(error));
    });



    function send_data(){
        ///si es work mode pero salio TQ no tememos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;

        if(tq_mode_work){
            btn_submit_blue.click();
            return false;
        }

        var error=false;
        let send_data=[];
        let data={};
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".radios.cml_field");
            var tq_title = tq.querySelector(".instrumentation , .Instrumentation")?.getAttribute("data-id").replace("inst_","");
            var tq_id_youtube = null;

            if(typeof(tq_id_youtube)==='undefined'){
                tq_id_youtube = null;
            }

            var respuesta="";
            pares_content.forEach(res=>{
                let inputs = res.querySelectorAll("input");
                let aux_res=busca_indice(inputs);
                    if(aux_res!==undefined){
                        respuesta+=aux_res;
                    }else{
                        error=true;
                    }

            });
            if(typeof(tq_title)!='undefined'){
                data={
                    titulo:tq_title,
                    youtube_id:tq_id_youtube,
                    resp:respuesta
                };
                send_data.push(data);
            }


        });


        if(error){
          //  alert("Faltan opciónes por marcar.");
            tq_for_update[0].scrollIntoView({
                behavior: 'smooth'
            });
        }else{
            this.setAttribute("disabled","disabled");
            this.innerText="Procesando...";
            GM_xmlhttpRequest({
                method: "POST",
                url: BASE_URL+"/youtuber_new_create",
                data:JSON.stringify ( {"user_id":get('user_id'),"job_name":jobTitle, "data":send_data, "mode":mode_data} ),
                headers:    {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                onload: function(response) {
                    console.log(response);
                    let json=JSON.parse(response.responseText);
                    btn_submit_blue.click();
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
                if(wrapper.querySelector("video")!=null){
                    let titulo = wrapper.querySelector(".instrumentation , .Instrumentation")?.getAttribute("data-id").replace("inst_","");
                let data={
                    titulo:titulo
                };
                send_data.push(data);
                }
            });

            console.log(send_data);

            GM_xmlhttpRequest({
                method: "POST",
                url: BASE_URL+"/youtuber_new_roll_back",
                data:JSON.stringify ( {"user_id":get('user_id'), "data":send_data, "job_name":jobTitle} ),
                headers:    {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                onload: function(response) {
                    console.log(response);
                    alert("Todas las TQs fueron eliminadas.");
                }
            });
        }
    }


    function get_scrapping(url,cb) {

      GM_xmlhttpRequest({
          method: "GET",
          url: url,
          headers:    {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          onload: function(response) {
                const parser = new DOMParser();
                let doc = parser.parseFromString(response.responseText, "text/html");
              cb({"url":url,"titulo":doc.querySelector("title").textContent})
          }
      });

    }




/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



