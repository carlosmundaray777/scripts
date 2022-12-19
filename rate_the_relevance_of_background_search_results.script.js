//seteamos tiempo
setTime(11000,15000);
//id de la guia
identifier = '1-4D43B5M2M7M1MHH9HA46';


    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(Object.values(el.content)[0]).includes(trato_especial_s(query.name))));
          }

          jsawesome.forEach(wrapper => {

              var titleDiv = wrapper;

              //var url = titleDiv.querySelector("div.html-element-wrapper > img").src;
              var url = titleDiv.querySelector("div.html-element-wrapper").querySelector(".liquid-image").src;

              console.log(url);

                  var pares_content = wrapper.querySelectorAll(".radios.cml_field");

                  var fill = submissions_api({'name':url});

                  var p1=trato_especial_s(url);
                  var p2=trato_especial_s(Object.values(fill[0]?.content)[0]);

                  if(p1.includes(p2) && p2!=""){
                      console.log("existe");
                      titleDiv.style.backgroundColor = "Aqua";
                      tq_found++;

                      var segundo=wrapper.querySelectorAll(".radios.cml_field")[0].querySelectorAll("label");

                      for(var i=0; i<segundo.length; i++){
                          var input= segundo[i].querySelector("input");
                          var r1=trato_especial_s(segundo[i]?.textContent);
                          var r2=trato_especial_s(Object.values(fill[0]?.content)[1]);
                          if(r2.includes(r1)){
                              input.checked=1;
                              input.click();
                          }
                      }

                  }else{
                      console.log("no existe");
                      if(mode.toLowerCase().includes("quiz")){
                          titleDiv.style.backgroundColor = "darkorange";
                          tq_for_update.push(wrapper);
                      }

                      if(mode.toLowerCase().includes("work")){
                        titleDiv.style.backgroundColor = "silver";
                        let c=getRandomInt(0, 4);
                        document.getElementsByName(wrapper.id+"[how_well_does_the_result_image_match_the_query_image]")[c].click();
                      }

                  }



          });  
    });

    configureExecute(() => {

      requestData().then(json => {

        console.log(json);

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

    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".radios.cml_field");
            var name = tq.querySelector(".html-element-wrapper").querySelector(".legend").textContent;
            var respuesta="";

            pares_content.forEach(res=>{
                if(!res.parentNode?.parentNode?.getAttribute("class")?.includes("_cf_hidden")){
                    let inputs = res.querySelectorAll("input");
                    let aux_res=busca_indice(inputs);
                    if(aux_res!==undefined){
                        respuesta+=aux_res;
                    }else{
                        error=true;
                    }
                }
            });
            let data={"tq_id":tq.id,"data":[url , name, respuesta]};
            send_data.push(data);
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



