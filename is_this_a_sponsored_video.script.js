//seteamos tiempo
setTime(30000, 31000);
//id de la guia
identifier = "100";

const API_URI = "http://209.145.50.117:3000/api";
let LOCAL_SOCKET = null;

var sponson_instagram = document.querySelector(
    ".jsawesome > .tubular-segmentation-widget > .ig-player"
);

if (sponson_instagram == null) {
    idguia = 103969;
} else {
    idguia = 294428;
}

//guia_local = true;
//borrar_no_tq = true;

var ruta = "iframe";
var atributo = "sponsored";

function iniciar_soscket() {
    LOCAL_SOCKET = io("https://remote.gosamy.online", {
        transports: ["websocket"],
        query: {
            room: "task-app",
            cuenta_id: get("cuenta_id"),
        },
    });
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

                    var titulo = document.createElement("p");
                    titulo.innerText = name;
                    titulo.align = "center";
                    titulo.id = `title_${trato_especial(name)}`;
                    titulo.style.backgroundColor = "#888";
                    titulo.style.color = "#000";

                    wrapper
                        .querySelector(".tubular-segmentation-widget")
                        ?.appendChild(titulo);

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

configLogica_notq_wm((wrap) => {
     wrap.style.backgroundColor = "navy";
    if (idguia == 294428) {
        filtro_sponsored(
            ["@","#", "sponsored by:", "sponsored by"],
            wrap
        );
    } else {
        filtro_sponsored(["sponsored by:", "sponsored by"], wrap);
    }
});

configLogica_notq_qm((wrap) => {
     wrap.style.backgroundColor = "navy";
    if (idguia == 294428) {
        filtro_sponsored(
            ["@","#", "sponsored by:", "sponsored by"],
            wrap
        );
    } else {
        filtro_sponsored(["sponsored by:", "sponsored by"], wrap);
    }
});

configNada_in_wm((wrap) => {
    if (idguia == 294428) {
        filtro_sponsored(
            ["@","#", "sponsored by:", "sponsored by"],
            wrap
        );
    } else {
        filtro_sponsored(["sponsored by:", "sponsored by","sponsored","thanks to"], wrap);
    }
});

filtro_sponsored = (coincidencia, parent) => {
    const master_text = parent.querySelector(".video-text.well").dataset.text;
    const identify_final = [".", ",", ":", "!", "\n", " "];
    let parcial = null;
    const busqueda = coincidencia.some((palabra) => {
        if (
            !master_text.toLowerCase().includes("nor sponsored") &&
            !master_text.toLowerCase().includes("not sponsored") &&
            master_text.toLowerCase().includes(palabra)
        ) {
            parcial = master_text
                .slice(
                    master_text.toLowerCase().indexOf(palabra) + palabra.length
                )
                .trim();
            return true;
        }
        return false;
    });

    if (busqueda) {
        let value = null;

        identify_final.some((final) => {
            if (
                parcial.indexOf(final) != -1 &&
                ((final != " " &&
                    parcial.slice(0, parcial.indexOf(final)).split(" ").length <
                        3) ||
                    (final == " " &&
                        parcial.slice(0, parcial.indexOf(final)).split(" ")
                            .length < 2))
            ) {
                value = parcial.slice(0, parcial.indexOf(final)).trim();
                return true;
            }
            return false;
        });
        if (value == null) {
            if (parcial.split(" ").length == 1) {
                value = parcial;
            } else {
                document
                    .getElementsByName(parent.id + "[is_sponsored]")[1]
                    .click();
            }
        }

        document.getElementsByName(parent.id + "[is_sponsored]")[0].click();
        parent.querySelector("input[type=text]").value = value;
    } else {
        document.getElementsByName(parent.id + "[is_sponsored]")[1].click();
    }
};

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
