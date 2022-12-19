//seteamos tiempo
setTime(60000, 65000);
//id de la guia
identifier = '1-FA5AJHM4DM15BKA8C8GG';
idguia = 268441;
//guia_local = true;
//borrar_no_tq = true;

var ruta="div.html-element-wrapper > div > a";
var atributo="href";


configureSet((form, submissions, keywords) => {

    return new Promise((resolve) => {
        const submissions_api = query => {
            return Object.values(Object.values(submissions).filter((el) => trato_especial(query.name) == (trato_especial(Object.values(el.content)[0]))));
        }

        jsawesome.forEach(wrapper => {
            var name = find_query(wrapper, ruta, atributo);
            var fill = submissions_api({ 'name': name });
            var filldata = {};
            Object.assign(filldata, fill[0]?.content);
            var p1 = trato_especial(name);
            var p2 = trato_especial(Object?.values(filldata)[0]);
            var tq_id = fill[0]?.id;

            if (p1 == p2) {
                console.log("existe");
                wrapper.dataset.tqid = tq_id;
                var color = "Aqua";
                wrapper.classList.add("tq_found");
                var r=JSON.parse(Object?.values(filldata)[1]);
                autofillp(wrapper, ruta, atributo, r, color)
            } else {
                console.log("no existe");
                if (mode?.toLowerCase()?.includes("quiz")) {
                    tq_for_update.push(wrapper);
                }
                if (mode?.toLowerCase()?.includes("work")) {
                    tq_for_update_no_existe.push(wrapper);
                }
            }
        });
        // setTimeout(() => {
        //     jsawesome.forEach(wrapper => {
        //         wrapper.querySelector('input').type = 'text';
        //     });
        // }, 5000);
        resolve(true);
    });
});

var execute = async function () {
    await ensureDomIsLoaded();
    if (quiz_mode && enable_rollback) {
        //poner en otro lado, se duplica cuando salta el timeout por que vuelve a ejecutar "execute"
        create_btn_roll_back();
    }
 

    wrap_restante().forEach(wrapper => {

                var elements = wrapper.querySelectorAll("a");
                elements.forEach(element => {
                    element.classList.remove("validates-clicked");
                   // element.classList.add("validation-passed");
                    var input = document.createElement("input");
                    input.type = "hidden";
                    input.name = wrapper.id+"[_clicks][]";
                    input.value=element.href;
                    wrapper.appendChild(input);

                });

                    var t=JSON.stringify({"null":true,"is_link_working":true,"is_an_event":true,"main_focus":true,"company1_mentioned":true,"company2_mentioned":true,"company_1_role":true,"company_2_role":true,"company1_is_correct":true,"company2_is_correct":true});
                    var input2 = document.createElement("input");
                    input2.type = "hidden";
                    input2.className ="cml_logic_visibility_summary";
                    input2.name = wrapper.id+"[_logic]";
                    input2.value=t;
                    wrapper.appendChild(input2);


            let query = trato_especial(find_query(wrapper, ruta, atributo));
            tqs.push(query);
    });

     console.log("tqs for API SAM", tqs);
    if (identifier) {
        if (guia_local) {
            await requestDataLocal().then(json => {
                Object.entries(json.form).forEach(([key, value]) => {
                    form.push(value);
                });
                Object.entries(json.submissions).forEach(([key, value]) => {
                    submissions.push(value);
                });
                Object.entries(json.keywords).forEach(([key, value]) => {
                    keywords.push(value);
                });
            }).catch(error => executeIfError(error));

        } else {
            await requestData().then(json => {
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
            }).catch(error => executeIfError(error));
        }
        await set_logica(form, submissions, keywords);
    }

    /*if (!validar() && idguia) {
        tqs = [];
        wrap_restante().forEach(wrapper => {
            let query = find_query(wrapper, ruta, atributo);
            tqs.push(query);
        });
        console.log("tqs for API carlete", tqs);
        await requestData_carlete().then(json => {
            //      console.log(json);
            if (!(json?.mensaje?.includes("TQs no encontradas") || json?.mensaje?.includes("Token invalido"))) {
                wrap_restante().forEach(wrapper => {
                    let resp = json.res;
                    for (var i = 0; i < resp?.length; i++) {
                        var r = resp[i];
                        autofillp(wrapper, ruta, atributo, r, 'coral');
                    }
                });
            }
        }).catch(error => executeIfError(error));
        validar(true);
    }*/
    //   auto_init_inicia_remote_view();
}



function autofillp(wrapper, ruta, atributo, r, color) {
    var pregunta = r.pregunta;
    var repuesta1 = r.respuesta;
    let existe = false;
    var query = find_query(wrapper, ruta, atributo);
    var cohodenada = "";

    if (trato_especial(pregunta) == trato_especial(query)) {
        for (var k = 0; k < Object.keys(repuesta1).length; k++) {
            switch (Object.keys(repuesta1)[k]) {
                case "input":
                    var inputp = wrapper.querySelectorAll(".cml_field");
                    
                    for(var pregg of inputp.entries()) {
                    var input = pregg[1].querySelectorAll(".cml_field:not(._cf_hidden) input:not(input[type=button])");
                    var inputall = JSON.parse(repuesta1.input);
                    for (var i = 0; i < inputall.length; i++) {
                        
                        var inp = input[i];
                        if (inputall[i].valor == true && inputall[i].tipo == "radio") {
                            if (inp!=undefined) {
                                inp.checked = 1;
                                inp.click();
                                existe = true;
                            }
                           
                        }
                        if (inputall[i].valor == true && inputall[i].tipo == "checkbox") {
                            inp.click();
                            existe = true;
                        }
                        if (inputall[i].tipo == "text") {
                            if (inputall[i].valor?.replace("Enter text here...", "") != "") {
                                inp.value = inputall[i].valor;
                                existe = true;
                            }
                        }
                        if (inputall[i].tipo == "hidden") {
                            if (inp != undefined) {
                                marcarRoca(wrapper, inp, inputall[i]?.valor);
                                cohodenada = inputall[i]?.valor
                                existe = true;
                            }
                        }
                    }
                    }
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case "select":
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

            if (color == 'Aqua') {
                create_btn_roll_back_single(wrapper);
            }
            if (color == "coral" && identifier) {
                let data = [{
                    "tq_id": wrapper.id,
                    "data": [pregunta, JSON.stringify(r)]
                }];

                if (identifier != 'rate-guia') {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: BASE_URL + "/guia/store",
                        data: JSON.stringify({
                            "user_id": get('user_id'),
                            "identifier": identifier,
                            "job_name": jobTitle,
                            "data": data,
                            "mode": 1
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        onload: function (response) {
                            console.log(response);
                        },
                        onerror: function (resp) {
                            console.log("Error create entry");
                            console.log(resp.status + ' ' + resp.statusText);
                        }
                    });
                }
            }
        }
    }
}