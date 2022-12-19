//seteamos tiempo
setTime(30000, 31000);
//id de la guia
identifier = '1-L1KL7AD6K4FEDGLJFG7C';
idguia = 6543;
//guia_local = true;
borrar_no_tq = true;
var ruta = "script";
var atributo = "box";


function marcarRoca(wrapper, input, value) {
    observeElement(input, "value", value);
    input.value = value;
    sendDataIframeIA(wrapper, value);
}

configureSet((form, submissions, keywords) => {

    return new Promise((resolve) => {
        const submissions_api = query => {
            return Object.values(Object.values(submissions).filter((el) => trato_especial(query.name, 100) == (trato_especial(Object.values(el.content)[0], 100))));
        }

        jsawesome.forEach(wrapper => {
            var name = find_query(wrapper, ruta, atributo);
            var fill = submissions_api({ 'name': name });
            var filldata = {};
            Object.assign(filldata, fill[0]?.content);
            var p1 = name;
            var p2 = Object?.values(filldata)[0];
            var tq_id = fill[0]?.id;

            if (p1 == p2) {
                console.log("existe");
                wrapper.dataset.tqid = tq_id;
                create_btn_roll_back_single(wrapper);
                wrapper.style.backgroundColor = "Aqua";
                wrapper.classList.add("tq_found");
                if (Object?.values(filldata)[2]=='nothing_to_box') {
                    document.getElementsByName(wrapper.id+"[nothing_to_box]")[0].click();
                }else{
                    let input = wrapper.querySelectorAll("input:not(input[type=button])");
                    marcarRoca(wrapper, input[0], Object?.values(filldata)[1]);
                }
            } else {
                console.log("no existe");
                if (mode.toLowerCase().includes("quiz")) {
                    tq_for_update.push(wrapper);
                }
                if (mode.toLowerCase().includes("work")) {
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
        let query = find_query(wrapper, ruta, atributo);
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

    if (!validar() && idguia) {
        tqs = [];
        wrap_restante().forEach(wrapper => {
            let query = find_query(wrapper, ruta, atributo);
            tqs.push(query);
        });
        console.log("tqs for API carlete", tqs);
        await requestData_carlete().then(json => {
            //      console.log(json);
            if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {
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
    }
    //   auto_init_inicia_remote_view();
}

configLogica_notq_wm((wrapper) => {
    /*marcarRoca(wrapper,
        wrapper.querySelectorAll("input:not(input[type=button])")[0],
        '[{"id":"0a81e571-80bd-47eb-9da3-50ecbfb431ca","number":1,"type":"box","coordinates":{"x":233,"y":213,"w":38,"h":66}}]');*/
});

function autofillp(wrapper, ruta, atributo, r, color) {
    var pregunta = r.pregunta;
    var repuesta1 = r.respuesta;
    let existe = false;
    var query = find_query(wrapper, ruta, atributo);
    var cohodenada = "";
    var nothing_to_box = "";

    if (trato_especial(pregunta) == trato_especial(query)) {
        for (var k = 0; k < Object.keys(repuesta1).length; k++) {
            switch (Object.keys(repuesta1)[k]) {
                case "input":
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
                            existe = true;
                            nothing_to_box="nothing_to_box";
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
                    "data": [pregunta, cohodenada, nothing_to_box]
                }];
                /**para guardar todo lo demas**/
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