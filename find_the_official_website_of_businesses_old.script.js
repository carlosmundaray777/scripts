//seteamos tiempo
setTime(30000, 35000);
//id de la guia
identifier = "1-5ABALLA3AMCL64L2JHJ9";

idguia = 8249423;

const API_URI = "http://209.145.50.117:3000/api";
let LOCAL_SOCKET = null;

var ruta = "div > div:nth-child(1) > div > p:nth-child(1)";

var atributo = "textContent";

var borrar_no_tq = true;


function iniciar_soscket() {
    LOCAL_SOCKET = io("https://remote.gosamy.online", {
        transports: ["websocket"],
        query: {
            room: "task-app",
            cuenta_id: get("cuenta_id"),
        },
    });
}
var roll_back = function (wrap = false) {
    if (confirm("¿Estas seguro de realizar esta acción?")) {
        GM_xmlhttpRequest({
            method: "DELETE",
            url: `${API_URI}/guide-entrie/${wrap.dataset.tqid}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            onload: function (response) {
                console.log(response);
                alert("Acción realizada correctamente.");
            },
        });
    }
};

configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = "silver";

    /*var pares_content = wrap.querySelectorAll(".cml_field");
    for (var preg of pares_content.entries()) {
        let radios = preg[1].querySelectorAll(".cml_field input");
        let st = "21";
        let indice = st.charAt(preg[0]) - 1;
        if (indice !== -1) {
            radios[indice].checked = 1;
            radios[indice].click();
        }
    }*/
});

async function requestData(url = url_default) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "POST",
            url: `${API_URI}/guide-entrie/findtq`,
            timeout: 10000,
            data: JSON.stringify({
                guide_id: identifier,
                tqs: tqs,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            onload: function (res) {
                if (this.status == 200) {
                    guia_existe = true;
                    document.querySelector(".result_gui").innerText =
                        identifier;
                    resolve(JSON.parse(res.responseText));
                } else {
                    reject({
                        message: this.status,
                    });
                }
            },
            onerror: function (resp) {
                console.log(resp.status + " " + resp.statusText);
                reject({
                    message: this.status,
                });
            },
            ontimeout: function (resp) {
                console.log("Timeout request data");
                //   timeOut(execute);
            },
        });
    });
}

function autofillp(wrapper, ruta, atributo, r, color) {
    var pregunta = r.pregunta;
    var repuesta1 = r.respuesta;
    let existe = false;
    var query = find_query(wrapper, ruta, atributo);
    if (pregunta == query) {
        Object.keys(repuesta1).forEach((respuestas) => {
            switch (respuestas) {
                case "input":
                    var input = wrapper.querySelectorAll(
                        "input:not(input[type=button])"
                    );
                    var inputall = JSON.parse(
                        typeof repuesta1.input == "object"
                            ? JSON.stringify(repuesta1.input)
                            : repuesta1.input
                    );
                    for (var i = 0; i < inputall.length; i++) {
                        var inp = input[i];
                        if (
                            inputall[i].valor == true &&
                            inputall[i].tipo == "radio"
                        ) {
                            inp.checked = 1;
                            inp.click();
                            existe = true;
                        }
                        if (
                            inputall[i].valor == true &&
                            inputall[i].tipo == "checkbox"
                        ) {
                            inp.click();
                            existe = true;
                        }
                        if (inputall[i].tipo == "text") {
                            if (
                                inputall[i].valor?.replace(
                                    "Enter text here...",
                                    ""
                                ) != ""
                            ) {
                                inp.value = inputall[i].valor;
                                existe = true;
                            }
                        }
                    }
                    break;
            }
        });
        if (existe) {
            wrapper.style.backgroundColor = color;
            wrapper.classList.add("tq_found");
            create_btn_roll_back_single(wrapper);
        }
    }
}

var execute = async function () {
    iniciar_soscket();
    // await ensureDomIsLoaded();
    if (quiz_mode && enable_rollback) {
        //poner en otro lado, se duplica cuando salta el timeout por que vuelve a ejecutar "execute"
        create_btn_roll_back();
    }

    var iframes = document.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].dataset.srctq = iframes[i].src;
        iframes[i].src = "about:blank";
        iframes[i].style.display = "none";
    }

    wrap_restante().forEach((wrapper) => {

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


        let query = find_query(wrapper, ruta, atributo);
        tqs.push(query);
    });

    console.log("tqs for API SAM", tqs);
    if (identifier) {
        await requestData()
            .then((json) => {
                jsawesome.forEach((wrapper) => {
                    var name = find_query(wrapper, ruta, atributo);
                    var fill = json.filter((tq) => tq?.pregunta == name)[0];
                    var p1 = name;
                    var p2 = fill?.pregunta;
                    var tq_id = fill?._id;

                    if (p1 == p2) {
                        console.log("existe");
                        wrapper.dataset.tqid = tq_id;
                        wrapper.classList.add("tq_found");

                        autofillp(wrapper, ruta, atributo, fill, fill.origen);
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
            })
            .catch((error) => executeIfError(error));
        if (!validar() && idguia) {
            tqs = [];
            wrap_restante().forEach((wrapper) => {
                let query = find_query(wrapper, ruta, atributo);
                tqs.push(query);
            });
            validar(true);
            /***mando las tq faltantas al sistema de socket para que sean consultadas */
            LOCAL_SOCKET.emit("add-job-list", {
                jobTitle,
                idguia,
                mode,
                tqs,
                identifier,
                time: 50,
            });
        }
    }
};

configureExecute(async () => {
    if (quiz_mode && enable_rollback) {
        //poner en otro lado, se duplica cuando salta el timeout por que vuelve a ejecutar "execute"
        create_btn_roll_back();
    }
    if (!validar() && idguia) {
    wrap_restante().forEach(wrapper => {
        let query = find_query(wrapper, ruta, atributo);
        tqs.push(query);
    });
    if (identifier) {
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

        await set_logica(form, submissions, keywords);
    }

    validar(true);
}

});


// configLogica_notq_qm((wrap) => {
//    // {...}
// });

/*configNada_in_wm((wrap) => {
    logica_notq_wm(wrap);
 });*/

