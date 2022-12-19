//seteamos tiempo
setTime(30000,30000);
//id de la guia
identifier = 'youtube-guia';

var pares_de_no_futuro=[];
var tq_mode_work=false;


var tq_for_update = [];
var tq_for_update_no_existe = [];
var titulojob=document.querySelector(".job-title")?.innerText;

if(titulojob?.includes("Do These Youtube Videos Contain Healthcare Content?")){var idguia=914782;}
if(titulojob?.includes("Are These Youtube Videos About Family-Friendly Gaming?")){var idguia=987509;}
if(titulojob?.includes("Are These Youtube Videos Spam Or Scams?")){var idguia=309101;}
//if(titulojob?.includes("Videos About Children")){var idguia=426295;}
if(titulojob?.includes("Is This Youtube Video Overtly Sexual In Nature?")){var idguia=751326;}
if(titulojob?.includes("このYoutube動画はゲームにまつわるコンテンツですか？")){var idguia=229782;}
if(titulojob?.includes("Are These Videos About Women")){var idguia=956035;}
if(titulojob?.includes("Does This Video Contain Graphic, Gory Or Repulsive Content?")){var idguia=756147;}
if(titulojob?.includes("Does This Video Contain Weapon/Gun Use?")){var idguia=454750;}
if(titulojob?.includes("Does This Video Contain Any Sexual Content?")){var idguia=4231565;}
if(titulojob?.includes("Do These Videos Contain Death, Injury Or Physical Harm?")){var idguia=545492;}
if(titulojob?.includes("Are These Videos About Online Piracy?")){var idguia=337424;}
if(titulojob?.includes("Do These Videos Contain Crime Or Human Rights Violations?")){var idguia=923540;}
if(titulojob?.includes("Is This Youtube Video About Terrorism?")){var idguia=818123;}
if(titulojob?.includes("Are These Videos About Winter Holidays?")){var idguia=720737;}
if(titulojob?.includes("Does This Video Show An Desi Person?")){var idguia=816760;}
if(titulojob?.includes("Are These Youtube Videos About Gambling?")){var idguia=4858132;}
if(titulojob?.includes("Are These Youtube Videos About New Age Spirituality?")){var idguia=6456716;}
if(titulojob?.includes("Do These Youtube Videos Contain Politics And/Or Controversial News?")){var idguia=162171;}
if(titulojob?.includes("Is This Youtube Video From A Podcast Or About Podcasts?")){var idguia=7344873;}



var ruta="div.video-content > div.video-checkmark-cont > div.video-info > h4";
var atributo="textContent";


    configureSet((task_names,keyword) => {
        const filterItems = query => {
                return Object.values(Object.values(task_names).filter((el) =>trato_especial(query.name,100)==(trato_especial(el.titulo,100))));
            }

            const keywords = query => {
                return Object.values(Object.values(keyword).filter((el) =>trato_especial(query.name,100).includes(trato_especial(el.name,100))));
            }

            var jsawesome = document.querySelectorAll(".jsawesome");

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var titulo = find_query(wrapper,ruta,atributo);
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = filterItems({'name':titulo});
                var keyword = keywords({'name':titulo});
                var pares = wrapper.querySelectorAll(".group.logic-only-if .video-question-component:not(.skip-video)");
                var p1=trato_especial(titulo,100);
                var p2=trato_especial(fill[0]?.titulo,100);

                if(p1==p2 && p1!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    tq_found++;
                    wrapper.classList.add("tq_found");

                    for(var preg of pares_content.entries()) {
                        let radios1 = preg[1].querySelectorAll(".radios.cml_field input");
                        let indice=fill[0].respuesta.charAt(preg[0])-1;
                        if(indice!==-1){
                            //radios1[indice]?.checked=1;
                            radios1[indice]?.click();
                        }
                    }

                    if(mode?.includes("work")){
                        if(fill[0].mode==0){
                            tq_mode_work=true;
                        }
                    }

                }else{
                    console.log("no existe");

                    if(mode.toLowerCase()?.includes("quiz")){

                        titleDiv.style.backgroundColor = "darkorange";

                    }else if(mode.toLowerCase()?.includes("work")){

                            if(typeof(keyword[0])!='undefined')
                            {
                                if(typeof(keyword[0].respuesta)=="string"){
                                    titleDiv.style.backgroundColor = "navy";
                                    tq_found++;
                                    let st=keyword[0].respuesta;
                                    for(var pregg of pares_content.entries()) {
                                        let radios2 = pregg[1].querySelectorAll(".radios.cml_field input");
                                        let indice=st.charAt(pregg[0])-1;
                                        if(indice!==-1){
                                            //radios2[indice]?.checked=1;
                                            radios2[indice]?.click();
                                        }
                                    }
                               }
                            }
                            else
                            {
                                pares_de_no_futuro.push(pares);
                                tq_for_update_no_existe.push(wrapper);
                            }

                    }

                    tq_for_update.push(wrapper);
                }

            });     
    });

    configureExecute(() => {


      jsawesome.forEach(wrapper => {
          var titulo = find_query(wrapper,ruta,atributo);
          tqs.push(titulo);
      });

      requestData('youtubers').then(json => {

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



setTimeout(function () {

    var tq_found=document.querySelectorAll(".tq_found");

    if(mode.includes("work") && tq_found?.length >= 0){
        tq_for_update_no_existe.forEach(wrapper=>{
            var pares_content = wrapper.querySelectorAll(".radios.cml_field");
            if (!wrapper.classList.contains('tq_found')) {
                wrapper.style.backgroundColor = "silver";
                pares_de_no_futuro.forEach(pares=>{
                    pares.forEach(par=>{
                        let radios3 = par.querySelectorAll(".radios.cml_field input");
                       // radios3[1]?.checked=1;
                        radios3[1]?.click();
                    });
                });
            }    
        });
    }



}, 5000);  




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
            var pares_content = tq.querySelectorAll(".group.logic-only-if .video-question-component:not(.skip-video)");
            var tq_title = tq.querySelector(".video-title")?.innerText.trim().replace(/(\r\n\t|\n|\r\t)/gm,"");
            var tq_id_youtube = tq.querySelector(".video-component>div")?.dataset.ytid;

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
                    //console.log(response);
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
                if(wrapper.querySelector(".video-title")!=null){
                    let titulo = wrapper.querySelector(".video-title").innerText;
                let data={
                    titulo:titulo
                };
                send_data.push(data);
                }
            });

            //console.log(send_data);

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




/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



