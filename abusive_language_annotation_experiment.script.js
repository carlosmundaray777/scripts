//seteamos tiempo
setTime(15000,20000);
//id de la guia
identifier = '1-KMMGGJ2EMKM1665BAL2J';

idguia=[948594,27319];

var ruta="div.html-element-wrapper";

var atributo="textContent";

    configureSet((form,submissions,keywords) => {

        const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(query.name,100).includes(trato_especial_s(Object.values(el.content)[0], 100))));
            }

        const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelectorAll(".html-element-wrapper")[0].textContent;
                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var primera=wrapper.querySelector(".cml_row select");
                var caja_down=wrapper.querySelectorAll('.textarea textarea');
                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name?.replace("Please read the following text carefully:","")});

                var p1=trato_especial_s(name,100);
                var p2=trato_especial_s(Object.values(fill[0]?.content)[0], 100);

               // console.log(p1);
               //console.log(p2);

                if(p1.includes(p2) && p2!=""){
                //    console.log("existe");
                    wrapper.style.backgroundColor = "Aqua";
                    wrapper.classList.add("tq_found");
                    tq_found++;

                setTimeout(function tiempo(){

                    for(var i=0; i<primera.length; i++){
                        var r1=trato_especial(primera.options[i].value,100);
                        var r2=trato_especial(Object.values(fill[0]?.content)[1], 100);
                        if(r2==r1 && r2!=""){
                            primera.selectedIndex=i;
                            primera.selected = true;
                        }

                    }

                        caja_down.forEach(tq =>{
                            if(!tq.parentNode.getAttribute("class").includes("_cf_hidden")){
                                tq.focus({preventScroll:true});
                                tq.value=String(Object.values(fill[0]?.content)[2]);
                            }
                        });

                }, 500);

                }else{
                 //   console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
                        if(typeof(keywordfill[0])!='undefined') {
                            if(typeof(keywordfill[0].respuesta)=="string"){
                                wrapper.style.backgroundColor = "navy";
                                let sp=keywordfill[0].name;
                                let st=keywordfill[0].respuesta;

                                setTimeout(function tiempo(){

                                    for(var i=0; i<primera.length; i++){
                                        var r1=trato_especial(primera.options[i].value,100);
                                        var r2=trato_especial(st, 100);
                                        if(r2==r1 && r2!=""){
                                            primera.selectedIndex=i;
                                            primera.selected = true;
                                        }

                                    }

                                        caja_down.forEach(tq =>{
                                            if(!tq.parentNode.getAttribute("class").includes("_cf_hidden")){
                                                tq.focus({preventScroll:true});
                                                tq.value=String(sp);
                                            }
                                        });

                                }, 500);
                            }

                        }
                        else {
                            if(typeof(form[3])!='undefined')
                            {
                                if(typeof(form[3])=="string"){
                                    titleDiv.style.backgroundColor = "silver";
                                    titleDiv.scrollIntoView({ block: "center" });
                                    let st=String(form[3]);
                                    setTimeout(function tiempo(){

                                        for(var i=0; i<primera.length; i++){
                                            var r1=trato_especial(primera.options[i].value,100);
                                            var r2=trato_especial(st, 100);
                                            if(r2==r1 && r2!=""){
                                                primera.selectedIndex=i;
                                                primera.selected = true;
                                            }

                                        }

                                           caja_down.forEach(tq =>{
                                                if(!tq.parentNode.getAttribute("class").includes("_cf_hidden")){
                                                    tq.focus({preventScroll:true});
                                                    tq.value=String("N/A");
                                                }
                                            });

                                    }, 500);
                                }else{
                                    titleDiv.style.backgroundColor = "yellow";
                                    titleDiv.scrollIntoView({ block: "center" });
                                }
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

            if(mode.includes("quiz") && tq_for_update.length > 0){
                show_btn_submit();
            }

            if(mode.includes("quiz")){
                create_btn_roll_back();
            }

      }).catch(error => executeIfError(error));

    jsawesome.forEach(wrapper => {
        let query=find_query(wrapper,ruta,atributo);
        tqs.push(query);
    });

setTimeout(function(){
        requestData_carlete().then(json => {
            console.log(json);

        if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

            jsawesome.forEach(wrapper => {
                let resp=json.res;
                for(var i=0; i<resp?.length; i++){
                    var r=resp[i];
                    let color="coral";
                    if (!wrapper.classList.contains('tq_found')) {
                        autofillp(wrapper,ruta,atributo,r,color);
                    }
                }
            });

        }

        }).catch(error => executeIfError(error));
}, 3000);



    });

function autofillp(wrapper, ruta, atributo, r, color) {
    var pregunta = r.pregunta;
    var repuesta1 = r.respuesta;
    let existe = false;
    var query = find_query(wrapper, ruta, atributo);
    var select_respuesta=null;

    if (trato_especial(pregunta) == trato_especial(query)) {
        for (var k = 0; k < Object.keys(repuesta1).length; k++) {
            switch (Object.keys(repuesta1)[k]) {
                case "input":
                    //    console.log("input");
                    var input = wrapper.querySelectorAll("input:not(input[type=button])");
                    var inputall = JSON.parse(repuesta1.input);

                    for (var i = 0; i < inputall.length; i++) {
                        var inp = input[i];
                        if (inputall[i].valor == true && inputall[i].tipo == "radio") {
                            inp.checked = 1;
                            inp.click();
                            existe = true;
                        }
                        if (inputall[i].valor == true && inputall[i].tipo == "checkbox") {
                            inp.click();
                        }
                        if (inputall[i].tipo == "text") {
                            inp.value = inputall[i].valor;
                            existe = true;
                        }
                    }
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case "select":
                    //       console.log('select');

                    var select = wrapper.querySelectorAll("select");
                    var inputall = JSON.parse(repuesta1.select);



                    for (var i = 0; i < inputall.length; i++) {

                        if (inputall[i].tipo == "SELECT" && inputall[i].valor != "") {
                            var segundo = select[i];
                            for (var io = 0; io < segundo.length; io++) {
                                var r1 = segundo.options[io].value;


                                segundo.parentNode.parentNode.classList?.remove('_cf_hidden');

                                var r2 = inputall[i].valor;
                                if (r2 == r1 && r2 != "") {
                                    segundo.selectedIndex = io;
                                    segundo.selected = true;
                                    existe = true;
                                    select_respuesta=segundo?.options[segundo?.selectedIndex]?.text;

                                }

                            }
                        }
                    }

                    break;
                case "textarea":
                    var textarea = wrapper.querySelectorAll("textarea");
                    var textareaall = JSON.parse(repuesta1.textarea);
                    for (var i = 0; i < textareaall.length; i++) {
                        var inp = textarea[i];
                        if (textareaall[i].tipo == "TEXTAREA") {
                            inp.value = String(textareaall[i].valor);
                            inp.focus();
                            inp.click();
                            existe = true;
                        }
                    }
                    break;
            }
        }
        if (existe) {
            wrapper.style.backgroundColor = color;
            wrapper.classList.add("tq_found");

                            var name1 = pregunta;
                            let data=[{"tq_id":wrapper.id,"data":[name1 , select_respuesta,""]}];

                            if(select_respuesta!=null){

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


    function send_data(){
        ///si es work mode pero salio TQ no tenemos porque guardar el resto
        var mode_data=mode.includes("quiz")?0:1;
        var error=false;
        let send_data=[];
        tq_for_update.forEach(tq=>{
            var pares_content = tq.querySelectorAll(".cml_row");
            var name = trato_especial_s_json(tq.querySelectorAll(".html-element-wrapper")[0].textContent);
            var respuesta="";
            let inputs = pares_content[0].querySelector("select");
            if(inputs?.options[inputs?.selectedIndex]?.text!=""){
                respuesta=inputs?.options[inputs?.selectedIndex]?.text;
            }else{
                error=true;
            }

            let data={"tq_id":tq.id,"data":[name, respuesta, ""]};
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
                return String(text?.toString().replace(/[^a-zA-Z0-9]+/g, " "));
    }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



