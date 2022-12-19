//seteamos tiempo
setTime(60000, 70000);

if (get("user_id") == 15) {
    configureCola();
}
identifier = "rate-guia";
idguia = 1983071;

var ruta = "div > div:nth-child(1) > img";
var atributo = "src";

var tq_for_update = [];

configLogica_notq_wm((wrap) => {
    let id_gif = wrap.querySelector("div img").src.split("/")[4];
    let segundo = wrap.querySelectorAll(".cml_row");

    let sugerencia = document.createElement("div");
    sugerencia.style.textAlign = "center";
    sugerencia.style.background = "white";
    sugerencia.style.marginBottom = "5px";
    sugerencia.style.padding = "5px";
    sugerencia.innerHTML =
        '<label style="font-size: 25px" class="sug"></label>';

    wrap.insertBefore(sugerencia, wrap.firstChild);

    api_sugerencia(`https://api.giphy.com/v1/gifs/${id_gif}`, function (xhr) {
        var r = JSON.parse(xhr.respuesta);

        wrap.querySelector(".sug").innerHTML = filtro_sugerencia(
            r.data?.rating
        );

        //if (work_mode) {
            //para el usuario 15 va dejar de marcar la API si la precision baja del 94%
            if (
                get("user_id") != 15 ||
                (get("user_id") == 15 && precision >= 94) ||
                (get("user_id") == 15 &&
                    precision < 94 &&
                    tq_found().length > 0)
            ) {
                if (r.data?.rating) {
                    for (var i = 0; i < segundo.length; i++) {
                        var input = segundo[i].querySelector("input");
                        var r1 = input?.value;
                        var r2 = r.data?.rating;
                        if (r1 == r2) {
                            wrap.style.backgroundColor = BG_LOGICA;
                            input.marcar();
                        }
                    }
                } else {
                    wrap.style.backgroundColor = "silver";
                    document
                        .getElementsByName(wrap.id + "[category]")[0]
                        .click();
                }
            } else {
                iniciar_remote_view();
            }
        //}
    });
});

configLogica_notq_qm((wrap) => {
    logica_notq_wm(wrap);

    if (tq_found().length < all_nodos) {
        iniciar_remote_view();
    }
});

configNada_in_wm((wrap) => {
    logica_notq_wm(wrap);
});

function filtro_sugerencia(opcion) {
    switch (opcion) {
        case "g":
            return `Sugerencia: <b>Level 1 - SAFE</b>  |  RESPUESTA API - ( ${opcion} )`;
            break;
        case "pg":
            return `Sugerencia: <b>Level 2 - MILD</b>  |  RESPUESTA API - ( ${opcion} )`;
            break;
        case "pg-13":
            return `Sugerencia: <b>Level 3 - RISKY</b>  |  RESPUESTA API - ( ${opcion} )`;
            break;
        case "r":
            return `Sugerencia: <b>Level 4 - ALARMING</b>  |  RESPUESTA API - ( ${opcion} )`;
            break;
        case "explicit":
            return `Sugerencia: <b>ESCALATE</b>  |  RESPUESTA API - ( ${opcion} )`;
            break;
        default:
            return `NO SE ENCONTRO SUGERENCIA  |  RESPUESTA API ( ${opcion} )`;
            break;
    }
}

configureSet((task_names) => {
    return new Promise((resolve) => {
        const filterItems = (query) => {
            return Object.values(
                Object.values(task_names).filter((el) =>
                    query.url.includes(el.url)
                )
            );
        };
        jsawesome.forEach((wrapper) => {
            var titleDiv = wrapper.querySelector("div");
            var name = titleDiv.querySelector("img").src;
            var element = titleDiv.querySelector("a");
            element.classList.remove("validates-clicked");

            var fill = filterItems({
                url: name,
            });

            var p1 = name;
            var p2 = fill[0]?.url;

            if (p1.includes(p2)) {
                console.log("existe");
                wrapper.classList.add("tq_found");
                wrapper.style.backgroundColor = "Aqua";
                var idd = wrapper.id;
                var primero = document.getElementsByName(idd + "[category]");
                primero[fill[0].respuesta - 1].checked = 1;
                primero[fill[0].respuesta - 1].click();
            } else {
                console.log("no existe");
            }
        });
        resolve("listo!");
    });
});

configureExecute(async () => {
    let task_names = [];

    if (quiz_mode && enable_rollback) {
        //poner en otro lado, se duplica cuando salta el timeout por que vuelve a ejecutar "execute"
        create_btn_roll_back();
    }

    jsawesome.forEach((wrapper) => {
        let query = find_query(wrapper, ruta, atributo);
        tqs.push(query);
    });

    if (identifier) {
        await requestData("rates")
            .then((json) => {
                Object.entries(json.data).forEach(([key, value]) => {
                    task_names.push(value);
                });
            })
            .catch((error) => executeIfError(error));

        await set_logica(task_names);
    }

    if (!validar() && idguia) {
        // await requestData_carlete().then(json => {
        //     if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {
        //         document.querySelectorAll(`${id_awesome_css}:not(.tq_found)`).forEach(wrapper => {
        //             let resp = json.res;
        //             for (var i = 0; i < resp?.length; i++) {
        //                 var r = resp[i];
        //                 autofillp(wrapper, ruta, atributo, r, 'coral');
        //             }
        //         });
        //     }
        // }).catch(error => executeIfError(error));
        validar(true);
    }

    tq_for_update = document.querySelectorAll(
        `${id_awesome_css}:not(.tq_found)`
    );

    if (quiz_mode && tq_for_update?.length > 0) {
        show_btn_submit();
    }

    auto_init_inicia_remote_view();
});

function send_data() {
    ///si es work mode pero salio TQ no tenemos porque guardar el resto
    var mode_data = mode.includes("quiz") ? 0 : 1;
    var error = false;
    let send_data = [];
    tq_for_update.forEach((tq) => {
        var pares_content = tq.querySelectorAll(".radios.cml_field");
        var url = tq.querySelector("img").src;

        var respuesta = "";

        pares_content.forEach((res) => {
            if (
                !res.parentNode?.parentNode
                    ?.getAttribute("class")
                    ?.includes("_cf_hidden")
            ) {
                let inputs = res.querySelectorAll("input");
                let aux_res = busca_indice(inputs);
                if (aux_res !== undefined) {
                    respuesta += aux_res;
                } else {
                    error = true;
                }
            }
        });
        let data = {
            url: url,
            resp: respuesta,
        };
        send_data.push(data);
    });

    if (error) {
        //    alert("Faltan opciónes por marcar.");
        tq_for_update[0].scrollIntoView({
            behavior: "smooth",
        });
    } else {
        //   console.log(send_data);
        this.setAttribute("disabled", "disabled");
        this.innerText = "Procesando...";
        GM_xmlhttpRequest({
            method: "POST",
            url: BASE_URL + "/rates/store",
            data: JSON.stringify({
                user_id: get("user_id"),
                job_name: jobTitle,
                data: send_data,
                mode: mode_data,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            onload: function (response) {
                console.log("guardando rate", response);
                btn_submit_blue.click();
            },
            onerror: function (resp) {
                console.log("Error create entry");
                console.log(resp.status + " " + resp.statusText);
            },
        });
    }
}

function roll_back() {
    if (confirm("¿Estas seguro de eliminar todas estas TQs?")) {
        let send_data = [];
        jsawesome.forEach((wrapper) => {
            let data = [wrapper.querySelector("img").src];
            send_data.push(data);
        });

        GM_xmlhttpRequest({
            method: "POST",
            url: BASE_URL + "/rates/destroy",
            data: JSON.stringify({
                user_id: get("user_id"),
                job_name: jobTitle,
                data: send_data,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            onload: function (response) {
                //       console.log(response);
                alert("Todas las TQs fueron eliminadas.");
            },
        });
    }
}

function api_sugerencia(url, cb) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            api_key: "ixE5KgfUXzgAKHm5CkSnRxgslVnCimLB",
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        onload: function (response) {
            //     console.log(response.responseText);
            cb({
                url: url,
                respuesta: response.responseText,
            });
        },
    });
}
