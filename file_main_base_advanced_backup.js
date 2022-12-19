if (window.location.href.includes("localhost")) {
    var SERVER_URL = "http://localhost:8000"; //para consumir API
    var URL_FETCH = "http://localhost/akatsukis/scripts/";
    var BASE_URL = "http://localhost:8000/api";
} else {
    var SERVER_URL = "https://app.webmallshop.com";
    var URL_FETCH = SERVER_URL + "/scripts/";
    var BASE_URL = "https://app.webmallshop.com/api";
}

//SERVER_URL = "https://app.webmallshop.com"; URL_FETCH = SERVER_URL+"/scripts/"; BASE_URL='https://app.webmallshop.com/api';

var base_url_p = "http://143.110.156.118";

var frase = "supermariobros";

var idextension =
    "U2FsdGVkX1+lDhrVFt6hJzu67sOfe67xlFajok+uGVerYwPvST+Ja/L66Yz3dggAQWz2IKNk0u2LSx6TtLigxJXTl+RQhQEV7I1GxFpPtBsHXW3UcxOuXXaexc8v4qCkspVbWe8e4N+4b+F8ma2T0HQLEArDLVTGY1NuBGypGeiGzLTzVRObh6F5DfRyhhjWRrwAoV4FzI4vu6PQ5Ia0innL6vO0NTw+gmnOh2hfqzXpLdRIGgkIDE7bQ4ckUrbUPXGMrqHe/qv8b3L2Q2K/eUXwaVfVRzOWhZPcdE7C/eLamp5cmGRkqUC1UTalK/yqLjz4Lz0HT3b7Q4eQA2BzbP9AtVxwaIdCSmzBpjshoY67AGVQkdP8xnCjX1olpqfQUq6/3T/zbcww11f8O6HdCZAkhUn1cDUO85lIOT9OUEVv1MVRMmZ0R6AGfCwAomsX";

var ETag =
    "U2FsdGVkX19Z8RY1tLHYLY7fmoH1XmfLjlHc/Qt58/XTDOaMv7CiU2xD0Cg38Ykvhxb2gdvaZN+dEZtquBNFuX/TxSiuQ/1cRUzwOCUWFLGJjk+xpUZOii2q36z3NMk5c9YMGcVYRssnrDafDQENOkLBeNFpstExNt85TqLal3q+BjQv17rfCy6Yw+0SzqcXgVH7rNxYEZ9oX/1ra302Scv78JfRNTMqWxeko7SgtTX2IeNOKazeaR1933idZjO1LO8caqbZ6UoWdRbqK7pUB8S/3BilwWZ8FgOeCffjLQxu34e/cj/L4FaiLOEj/JqpUaqqvuZc6QYoQQfakRR6r8DHw4Q3EFGP7V94w9zGbxeIsIp9vAZTg6dg9AbsE4p3uY31lsExSRDukvB8FHw5JOdcYk8kfQVSfVckSJ9abpboSOZmMNVntxhnqAlqd5M3LgwX9W+9H/gS5EZP/xmtGdO2HuNpmWzkCKPv43B8VKA/K6e6XsORXATlBeYu0IfgQ2PDqwjevG34MDeXERdzqqJXHnlwCJkEhdPVk60owELMgECKFhwEMDdtcqDXfW/qAuTp/i/cfNLjb1vdq49K+IU1ggE1+bCplk+81GQTe8NddyCePq4Jm0KkdFuXDMJv8lTaJ4PNXDGlgaDKCl78NolKs3kltdBRgycBU6tsZGPd6Q5IE/f4vgg32GqhONE4Rtw6jKIFwgx75DEIXsTTAuxtr7nECF4q2XZEHoGQG5rbFslMKGEalWkrDu1CKJgoEQicJy/l9I0Z4H0rxmnmayzcWN8smX3LF/G1Ejhl1HIvoHYRTib4S9uEWmhLF0VXMga4hmgomMQrOrCc/7gvmMSajdZDDLLpjicIcsE8Qp7KpuwPnu6iLCBMXXrxJElyS7Aqysu9lw+j4k0X14fHRI83TkuAzU0P0iz253boeUhvfrvOAEi56/obx1EDieOIkdrZ5G+5ROU/P9Vy88rb1B9OZ34n5uorjC+BKOp5tjBjBAvMz1nWxqk/TQBJhjgtITHOqyiYJ5JT7fHcctop5cc/1rviHRtUOTBiaOweAt9SmRWverNmTJtSr26SLTLM8DZu5tfPY9/ERirWuHrGovqkkf1lCpJaOWE8hSTZJ5M0GbwaZ3132RuXdB59f12A5Zf19tgT9AcC125zd+A/Oh3JO0BG4CqA/tjmyShf7C6cnDhL6KZUBiaWcje/GEZVh3quz2ddM2MW1vEAaH0U/lKu44kRlNDJVW7R0VSLJ8Y3N0ZzwJt4fgLyO4hiTwzqyD9tQa7gBy/kAvaw5mN3PAYXudBDPAmcpqSLfwDJJd76rq2CuqvgsXa+jnUf+kbyW5fue7SHpETcopOPrmxYFYcWm132MIbtT/AonwSXC0RgTGD6Z5smpt4dQ7USf5x07fhup6C1tqLJGCCxcziaBr2M/0Jfsq4JxXxaRE4atsk=";

var WORK_DOMAIN = "view.appen.io",
    IA_DOMAIN = "ia.appen.com";

/**********Prototipos************/
HTMLInputElement.prototype.marcar = function () {
    this.checked = true;
    this.click();
};

var win = null;

var BG_LOGICA = "#0075ff";
var BG_BASE = "#e9e9e9";

var time_min = 500000;
var time_max = 600000;

var no_submit = false;

var intentos_time = 0;
var n_intentos_submit = 5;
var next_time = 5000;
var time_life_value = 0;

var form = [];
var submissions = [];
var keywords = [];

var identifier = false;
var idguia = false;
var guia_local = false;
var tqs = [];

var limit = null;
var guia_existe = false;
var url_default = "guia";

var jobTitle = document
    .querySelector(".job-title")
    ?.innerText?.replace("ProFill", "");
var id_awesome_css = ".jsawesome";
var jsawesome = document.querySelectorAll(id_awesome_css);
var mode = document.querySelector(".gauges h4")?.innerText.toLowerCase();
var btn_submit_blue = document.querySelector(".btn-cf-blue");
var jobId = document.querySelector("#assignment-job-id")?.textContent;

var all_nodos = jsawesome.length;

var borrar_no_tq = false;

var quiz_mode = mode?.toLowerCase().includes("quiz") ? true : false;
var work_mode = mode?.toLowerCase().includes("work") ? true : false;

var precision = work_mode
    ? parseInt(
          document
              .querySelector(".accuracy-gauge h4")
              ?.textContent.replace(/[^0-9]/g, "")
      )
    : false;

var tq_for_update = [];

var limitar_task = false;
var cantidad_task = document
    .querySelector(".completed-gauge")
    ?.textContent.match(/(\d+)/g)[0];

var enable_rollback = true;
var enable_submit = true;

var limite_alcanzado = false;

var localforage = null;
var CryptoJS = null;
var cola_activa = false;
var reloj_iniciado = false;
var remote_view = true;
var is_init_remote = false;
var socket_remote_task = null;
var parser = new DOMParser();

var query_html_events =
    "input[type=radio], input[type=checkbox], .multiple_add, .multiple_remove, input[type=text], textarea, select, .rotateLeft, .zoomOut, .fit, .zoomIn, .rotateRight";
var query_mapping =
    "input[type=radio], input[type=checkbox], input[type=text], textarea, select";

/**soporte eliminar proximamente**/
var tq_for_update_no_existe = [];
var remover_tq = function () {
    tq_for_update_no_existe.forEach((tq) => {
        const element = document.querySelector("#" + tq.id);
        element.classList.add("_cf_hidden");
    });
};
/**soporte eliminar proximamente**/

/**********funciones globales (para todos los scripts)*********************/
var GM_xmlhttpRequest = function () {};

var get = function () {};

var set = function () {};

var GM_openInTab = function () {};

var GM_deleteValue = function () {};

var fetchInject = function () {};

var io = function () {};

var logica_notq_qm = null;

var nada_in_wm = null;

var logica_notq_wm = null;

/*************************ZONA REMOTE VIEW*******************************/
window.addEventListener("DOMContentLoaded", function () {
    //inicializar algunas variables propias de la zona remote view
    jsawesome = document.querySelectorAll(id_awesome_css);

    if (window.location.href.includes("remote_views")) {
        //url del sistema samantha
        document.head.appendChild(document.createElement("style")).innerHTML =
            'input[type="text"] { box-sizing: content-box; }';

        /*********************ZONA REMOTE VIEW SOCKET***************************/
        var socket = io("http://localhost:3000", {
            transports: ["websocket"],
            query: {
                //room: master_room,
            },
        });

        socket.on("connect", function () {
            socket.emit("init");
        });

        socket.on("html_update", (data) => {
            data.forEach((wrap_data) => {
                let nodo = document.querySelector(`#${wrap_data.id}`);
                nodo.innerHTML = wrap_data.wrap_html;
                apply_mapping(wrap_data);
                //como se reemplaza el html se pierden los eventos
                add_event_copia_html(nodo, wrap_data.wrap_html);
            });
        });

        /*****************ZONA REMOTE VIEW FUNCIONES******************/
        function apply_mapping(wrap_data) {
            wrap_data.mapping.forEach((data) => {
                let wrap = document.querySelector(`div#${wrap_data.id}`);

                let element = wrap.querySelectorAll(query_mapping);

                if (
                    data.type == "text" ||
                    data.type == "textarea" ||
                    data.type == "select-one"
                ) {
                    element[data.index].value = data.value;
                }

                if (data.type == "radio" || data.type == "checkbox") {
                    element[data.index].click();
                }
            });
        }

        function add_event_copia_html(nodo, html_server) {
            let elements = nodo.querySelectorAll(query_html_events);

            elements.forEach((input, index) => {
                if (input.type == "text" || input.type == "textarea") {
                    input.addEventListener("keyup", (e) => {
                        e.preventDefault();
                        socket.emit("coord", {
                            id: nodo.id,
                            mode: "text",
                            index: index,
                            text: input.value,
                        });
                    });
                } else if (input.type == "select-one") {
                    input.addEventListener("change", (e) => {
                        e.preventDefault();
                        socket.emit("coord", {
                            id: nodo.id,
                            mode: "select",
                            index: index,
                            text: input.value,
                        });
                    });
                } else {
                    //si no, trato todos los demas como botones
                    input.addEventListener("click", (e) => {
                        e.preventDefault();
                        socket.emit("coord", {
                            id: nodo.id,
                            mode: "point",
                            index: index,
                        });
                    });
                }
            });
            /********corremos los eventos especificos******/
            soporte_para_script_especifico(nodo, html_server);
        }

        function soporte_para_script_especifico(nodo, html_server) {
            /**************CONTROLES DEL VISOR DE DOCUMENT************/
            try {
                nodo.querySelector(".guillotine-canvas").style = "";
                nodo.querySelector(".guillotine-canvas").className = "";
                nodo.querySelector(".guillotine-window").style = "";
                nodo.querySelector(".guillotine-window").className = "";

                jQuery(nodo.querySelector(".img-polaroid")).guillotine({
                    eventOnChange: "guillotinechange", //el evento que permite movimiento de imagen
                });

                rescueAtrr(html_server, ".guillotine-canvas", "style", nodo); //obtengo la posición de la imagen y la aplico a nodo

                //evento especial para reflejar el moviento de la imagen al servidor
                nodo.querySelector(".img-polaroid").addEventListener(
                    "mouseup",
                    (e) => {
                        reflejo(
                            nodo.id,
                            ".guillotine-canvas",
                            "style",
                            nodo
                                .querySelector(".guillotine-canvas")
                                .getAttribute("style")
                        );
                    }
                );
            } catch (error) {
                // console.error(error);
            }
        }

        function rescueAtrr(html, id, atrr, nodo) {
            let doc = parser.parseFromString(html, "text/html");
            nodo.querySelector(id).setAttribute(
                atrr,
                doc.querySelector(id).getAttribute(atrr)
            );
        }

        function reflejo(nodo_id, elemento, atributo, valor) {
            socket.emit("reflejo", {
                nodo_id: nodo_id,
                element: elemento,
                atrr: atributo,
                value: valor,
            });
        }
    }
});

/******************INICIALIZAR REMOTE VIEW*****************/
function iniciar_remote_view() {
    /*
        if (!is_init_remote) {
            console.log('inicia socket remoto');
            socket_remote_task = io("http://localhost:3000", {
                transports: ["websocket"],
                query: {
                    room: get('user_id'),
                    titulo: jobTitle,
                    modo: mode,
                    job_id: jobId,
                    tqs: tq_found().length,
                    reloj_tiempo: reloj_tiempo(),
                    cuenta_id: get('cuenta_id'),
                    user_id: get('user_id'),
                    email: get('appen_email'),
                    vps_name: get('vps_name'),
                    time_life: get_time_life(),
                    doc_title: document.title
                }
            });
    
            socket_remote_task.on('init', cb_data => {
                let data_array = [];
                jsawesome.forEach(wrap => {
                    data_array.push(build_data(wrap));
                });
                send_html(data_array);
            });
    
            socket_remote_task.on('coord', data => {
                //RECIBE LOS CLICKS Y LOS TEXTOS DEL HTML COPIA AL ORIGINAL
                let wrap = document.querySelector(`#${data.id}`);
                let inputs = wrap.querySelectorAll(query_html_events);
    
                if (data.mode == 'point') {
                    inputs[data.index].click();
    
                    inputs[data.index].scrollIntoView({
                        block: "center",
                        behavior: "smooth"
                    });
                    //si estoy haciendo click puede cambiar el html por ende debo reflejarlo
                    send_html([build_data(wrap)]);
    
                } else {
                    //si estoy tipeando no actualizo html
                    inputs[data.index].value = data.text;
                }
            });
    
            socket_remote_task.on('reflejo', data => {
                document.querySelector(`#${data.nodo_id}`).querySelector(data.element).setAttribute(data.atrr, data.value);
            });
    
    
            // setTimeout(() => {
    
            //     /*************GUARDAR EL HTML*******************/
    //     var data_html = document.querySelector('*').cloneNode(true); // este es un clon de todo el html para no afecta el original
    //     //aqui agrego la libreria de socket
    //     add_link(data_html, 'https://swap.webmallshop.com/socket.io/socket.io.js');
    //     let no_src = ['NREUM', 'channels_v2', 'builder_worker', 'image_annotation', 'jquery.guillotine.js', 'ga.js', 'nr-1215.min.js', 'jquery3-noconflict'];
    //     let no_text = ['NREUM', 'setTime('];
    //     //remuevo algunos script que se van a auto-generar y pueden aparecer duplicados, o scripts innecesarios.
    //     data_html.querySelectorAll('head > script').forEach((script) => {
    //         no_src.forEach(block => {
    //             if (script.src.includes(block)) {
    //                 script.remove();
    //             }
    //         });
    //         no_text.forEach(block_text => {
    //             if (script.innerText.includes(block_text) && !script.innerText.includes('window.location.href.includes("localhost")')) {
    //                 script.remove();
    //             }
    //         });
    //     });
    //     //finalmente lo guardo.
    //     GM_xmlhttpRequest({
    //         method: "POST",
    //         url: "http://localhost:8000/api/save_temp_job",
    //         timeout: 50000,
    //         data: JSON.stringify({
    //             "data_html": data_html.innerHTML
    //         }),
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         onload: function(response) {
    //             console.log(response);
    //         },
    //         onerror: function(resp) {
    //             console.log("Error");
    //             console.log(resp.status + ' ' + resp.statusText);
    //         },
    //         ontimeout: function(resp) {
    //             console.log('Timeout');
    //         }
    //     });
    // }, 3000);
    /*
            function send_html(array_send) {
                socket_remote_task.emit("html_update", array_send);
            }
    
            function build_data(wrap) {
                return {
                    'id': wrap.id,
                    'mapping': mapping(wrap),
                    'wrap_html': document.querySelector(`#${wrap.id}`).innerHTML
                };
            }
            /********GUARDAR TODOS LOS CLICK DE LOS INPUTS Y CAMPOS DE TEXTO********************/
    /*     function mapping(wrap) {
             let mapping_elements = [];
             let element = wrap.querySelectorAll(query_mapping);
 
             element.forEach((input, index) => {
                 if (input.type == 'text' || input.type == 'textarea' || input.type == 'select-one') {
                     if (input.value.length > 0) {
                         mapping_elements.push({
                             "type": input.type,
                             "value": input.value,
                             "index": index
                         });
                     }
                 }
 
                 if (input.type == "radio" || input.type == "checkbox") {
                     if (input.checked) {
                         mapping_elements.push({
                             "type": input.type,
                             "value": input.value,
                             "index": index
                         });
                     }
                 }
             });
 
             return mapping_elements;
         }
         is_init_remote = true;
     }*/
}

function enscryptar(data) {
    return CryptoJS.AES.encrypt(data, frase).toString();
}
function enscryptarObj(objeto) {
    return CryptoJS.AES.encrypt(JSON.stringify(objeto), frase).toString();
}

function desenscryptar(data) {
    return CryptoJS.AES.decrypt(data, frase).toString(CryptoJS.enc.Utf8);
}
function desenscryptarObj(objeto) {
    return JSON.parse(
        CryptoJS.AES.decrypt(objeto, frase).toString(CryptoJS.enc.Utf8)
    );
}

function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function waitTime(segundos) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, 1000 * segundos);
    });
}

function hexToRgb(color_hex) {
    return (
        (color_hex = parseInt(color_hex, 16)),
        [
            (color_hex >> 16) & 255,
            (color_hex >> 8) & 255,
            color_hex & 255,
        ].join()
    );
}

async function ensureDomIsLoaded() {
    do {
        if (document.readyState === "complete") {
            return true;
        }
        await waitTime(1);
    } while (true);
}

function configureCola() {
    cola_activa = true;
}

function chargeScript(uri) {
    let tag = document.createElement("script");
    tag.type = "text/javascript";
    tag.src = uri;
    tag.async = false;
    return tag;
}

function add_link(padre, url, top = false) {
    if (top) {
        return padre
            .querySelector("head")
            .insertBefore(chargeScript(url), padre.querySelector(top));
    }
    return padre.querySelector("head").append(chargeScript(url));
}

function timeOut(funcion) {
    setTimeout(function () {
        funcion();
    }, time_rand());
}

function observeElement(
    element,
    property,
    forceValue = null,
    callback = null,
    delay = 0
) {
    let elementPrototype = Object.getPrototypeOf(element);
    if (elementPrototype.hasOwnProperty(property)) {
        let descriptor = Object.getOwnPropertyDescriptor(
            elementPrototype,
            property
        );
        Object.defineProperty(element, property, {
            get: function () {
                return descriptor.get.apply(this, arguments);
            },
            set: function () {
                if (forceValue != null) {
                    arguments[0] = forceValue;
                }
                let oldValue = this[property];
                descriptor.set.apply(this, arguments);
                let newValue = this[property];
                if (typeof callback == "function") {
                    setTimeout(callback.bind(this, oldValue, newValue), delay);
                }
                return newValue;
            },
        });
    }
}

function sendDataIframeIA(
    wrapper,
    annotations,
    request = "setAnnotationPreview",
    properties = { classList: [] }
) {
    wrapper.querySelector("iframe").contentWindow.postMessage(
        {
            sam: {
                key: wrapper.id,
                request: request,
                object: {
                    annotations: JSON.parse(annotations),
                    properties: properties,
                },
            },
        },
        "*"
    );
}

var set_logica = function (form, submissions, keywords) {
    return new Promise((resolve) => {
        const submissions_api = (query) => {
            return Object.values(
                Object.values(submissions).filter((el) =>
                    trato_especial_s(Object.values(el.content)[0]).includes(
                        trato_especial_s(query.name)
                    )
                )
            );
        };

        const keyword = (query) => {
            return Object.values(
                Object.values(keywords).filter((el) =>
                    query.name
                        .toLowerCase()
                        .replace(/ /g, "")
                        .includes(el.name.toLowerCase().replace(/ /g, ""))
                )
            );
        };

        jsawesome.forEach((wrapper) => {
            var titleDiv = wrapper;
            var name = find_query(wrapper, ruta, atributo);

            var fill = submissions_api({
                name: name,
            });

            var keywordfill = keyword({
                name: name?.trim(),
            });

            var tq_id = fill[0]?.id;

            var p1 = trato_especial_s(name);
            var p2 = trato_especial_s(Object.values(fill[0]?.content)[0]);

            var elements = titleDiv.querySelectorAll("a");
            elements.forEach((element) => {
                element.classList.remove("validates-clicked");
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = wrapper.id + "[_clicks][]";
                input.value = element.href;
                wrapper.appendChild(input);
            });

            if (p2.includes(p1) && p2 != "") {
                console.log("existe");
                wrapper.dataset.tqid = tq_id;
                var r = JSON.parse(Object.values(fill[0]?.content)[1]);
                autofillp(wrapper, ruta, atributo, r, "Aqua");
            } else {
                console.log("no existe");
                if (quiz_mode) {
                    tq_for_update.push(wrapper);
                }

                if (work_mode) {
                    //palabras claves
                    if (typeof keywordfill[0] != "undefined") {
                        if (typeof keywordfill[0].respuesta == "string") {
                            wrapper.classList.add("tq_keyword_found");
                            wrapper.style.backgroundColor = "navy";
                            let st = keywordfill[0].respuesta;
                            console.log(
                                `keyword: ${keywordfill[0].name} - ${keywordfill[0].respuesta}`
                            );

                            var pares_content =
                                wrapper.querySelectorAll(".cml_field");
                            for (var pregg of pares_content.entries()) {
                                let radios = pregg[1].querySelectorAll(
                                    "div.cml_field:not(._cf_hidden) input[type=radio], input[type=checkbox]"
                                );
                                let indice = st.charAt(pregg[0]) - 1;
                                if (indice !== -1) {
                                    radios[indice]?.click();
                                }
                            }
                        }
                    }
                }
            }
        });
        resolve(true);
    });
};

var execute = async function () {
    if (quiz_mode && enable_rollback) {
        //poner en otro lado, se duplica cuando salta el timeout por que vuelve a ejecutar "execute"
        create_btn_roll_back();
    }
    // if (quiz_mode && enable_submit) {
    //   show_btn_submit();
    // }

    // job_units.querySelectorAll('img').forEach(elem => {
    //     return (elem.getAttribute('src'));
    // });

    // job_units.querySelectorAll('.row-fluid p').forEach(elem => {
    //     return (elem.textContent);
    // });

    // wrap_restante().forEach(wrapper => {
    //     let query = find_query(wrapper, ruta, atributo);
    //     tqs.push(query);
    // });

    // console.log("tqs for API SAM", tqs);
    if (identifier) {
        if (guia_local) {
            await requestDataLocal()
                .then((json) => {
                    Object.entries(json.form).forEach(([key, value]) => {
                        form.push(value);
                    });
                    Object.entries(json.submissions).forEach(([key, value]) => {
                        submissions.push(value);
                    });
                    Object.entries(json.keywords).forEach(([key, value]) => {
                        keywords.push(value);
                    });
                })
                .catch((error) => executeIfError(error));
        } else {
            await requestData()
                .then((json) => {
                    Object.entries(json.form).forEach(([key, value]) => {
                        form.push(value);
                    });
                    Object.entries(json.submissions).forEach(([key, value]) => {
                        submissions.push(value);
                    });
                    Object.entries(json.keywords).forEach(([key, value]) => {
                        keywords.push(value);
                    });
                })
                .catch((error) => executeIfError(error));
        }
        await set_logica(form, submissions, keywords);
    }

    if (!validar() && idguia) {
        tqs = [];
        wrap_restante().forEach((wrapper) => {
            let query = find_query(wrapper, ruta, atributo);
            tqs.push(query);
        });
        // console.log("tqs for API carlete", tqs);
        // await requestData_carlete()
        //     .then((json) => {
        //         //      console.log(json);
        //         if (
        //             !(
        //                 json.mensaje.includes("TQs no encontradas") ||
        //                 json.mensaje.includes("Token invalido")
        //             )
        //         ) {
        //             wrap_restante().forEach((wrapper) => {
        //                 let resp = json.res;
        //                 for (var i = 0; i < resp?.length; i++) {
        //                     var r = resp[i];
        //                     autofillp(wrapper, ruta, atributo, r, "coral");
        //                 }
        //             });
        //         }
        //     })
        //     .catch((error) => executeIfError(error));
        validar(true);
    }
    //   auto_init_inicia_remote_view();
};

function validar(final = false) {
    if (
        (quiz_mode && tq_found().length == all_nodos) ||
        (work_mode && tq_found().length >= 1)
    ) {
        finalizar();
        return true;
    }
    if (!idguia || (idguia && final)) {
        wrap_restante().forEach((wrapper) => {
            wrapper.style.backgroundColor = BG_BASE;
            if (quiz_mode) {
                /**cuidado esta funcion se ejecuta si no se consigue nada en quiz mode o falta algunas TQ, es preferible dejar en blanco**/
                if (logica_notq_qm != null) logica_notq_qm(wrapper);
                wrapper.style.backgroundColor = "darkorange";
            }
            if (work_mode) {
                /**cuidado esta funcion se ejecuta si no se consigue nada en work mode, es preferible dejar en blanco**/
                if (nada_in_wm != null) nada_in_wm(wrapper);
            }
        });
    }
    return false;
}
function finalizar() {
    if (quiz_mode) {
        //auto guardar las que no estaban en guia
        //esperar que se haga submit
        console.log("esperando submit");
    }
    if (work_mode) {
        wrap_restante().forEach((wrapper) => {
            wrapper.style.backgroundColor = "silver";
            if (borrar_no_tq) {
                let element = document.querySelector(`#${wrapper.id}`);
                element.classList.add("_cf_hidden");
            }
            //aqui puedes configurar la TQ por defecto, el comportamiento del script para la No TQ, si vas hacer comparaciones scraping etc.
            else if (logica_notq_wm != null) logica_notq_wm(wrapper);
        });
    }
}

function wrap_restante() {
    return document.querySelectorAll(
        `${id_awesome_css}:not(.tq_found, .tq_keyword_found)`
    );
}
function tq_found() {
    return document.querySelectorAll(".tq_found");
}

function tq_keyword_found() {
    return document.querySelectorAll(".tq_keyword_found");
}

function reloj_tiempo() {
    return document.querySelector(".countdown_row.countdown_amount")
        ?.textContent;
}

function auto_init_inicia_remote_view() {
    if (
        (quiz_mode &&
            tq_found().length < all_nodos &&
            logica_notq_qm == null) ||
        (work_mode && tq_found().length == 0 && nada_in_wm == null) ||
        (work_mode &&
            tq_found().length >= 1 &&
            !borrar_no_tq &&
            logica_notq_wm == null)
    ) {
        iniciar_remote_view();
    }
}

function autofillp(wrapper, ruta, atributo, r, color) {
    var pregunta = r.pregunta;
    var repuesta1 = r.respuesta;
    let existe = false;
    var query = find_query(wrapper, ruta, atributo);

    if (trato_especial(pregunta) == trato_especial(query)) {
        for (var k = 0; k < Object.keys(repuesta1).length; k++) {
            switch (Object.keys(repuesta1)[k]) {
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
                        if (inputall[i].tipo == "hidden") {
                            if (inp != undefined) {
                                inp.value = inputall[i]?.valor;
                                existe = true;
                            }
                        }
                    }
                    break; // al encontrar este 'break' no se continuará con el siguiente 'default:'
                case "select":
                    //       console.log('select');

                    var select = wrapper.querySelectorAll("select");
                    var inputall = JSON.parse(
                        typeof repuesta1.select == "object"
                            ? JSON.stringify(repuesta1.select)
                            : repuesta1.select
                    );

                    for (var i = 0; i < inputall.length; i++) {
                        if (
                            inputall[i].tipo == "SELECT" &&
                            inputall[i].valor != ""
                        ) {
                            var segundo = select[i];
                            for (var io = 0; io < segundo.length; io++) {
                                var r1 = segundo.options[io].value;

                                segundo.parentNode.parentNode.classList?.remove(
                                    "_cf_hidden"
                                );

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
                    var textareaall = JSON.parse(
                        JSON.stringify(repuesta1.textarea)
                    );
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

            if (color == "Aqua") {
                create_btn_roll_back_single(wrapper);
            }

            if (color == "coral" && identifier) {
                var name1 = trato_especial_json(pregunta);
                let data = [
                    {
                        tq_id: wrapper.id,
                        data: [name1, JSON.stringify(r)],
                    },
                ];
                /**para guardar RATE**/
                if (identifier == "rate-guia") {
                    let send_data = [];
                    send_data.push({
                        url: wrapper.querySelector("img").src,
                        resp: busca_indice(wrapper.querySelectorAll("input")),
                    });

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: BASE_URL + "/rates/store",
                        data: JSON.stringify({
                            user_id: get("user_id"),
                            job_name: jobTitle,
                            data: send_data,
                            mode: 1,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        onload: function (response) {
                            console.log(
                                "guardando rate from carlete",
                                response
                            );
                        },
                        onerror: function (resp) {
                            console.log("Error create entry");
                            console.log(resp.status + " " + resp.statusText);
                        },
                    });
                }
                /**para guardar todo lo demas**/
                if (identifier != "rate-guia") {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: BASE_URL + "/guia/store",
                        data: JSON.stringify({
                            user_id: get("user_id"),
                            identifier: identifier,
                            job_name: jobTitle,
                            data: data,
                            mode: 1,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        onload: function (response) {
                            console.log(response);
                        },
                        onerror: function (resp) {
                            console.log("Error create entry");
                            console.log(resp.status + " " + resp.statusText);
                        },
                    });
                }
            }
        }
    }
}

async function requestData(url = url_default) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "POST",
            url: BASE_URL + "/" + url,
            timeout: 10000,
            data: JSON.stringify({
                user_id: get("user_id"),
                identifier: identifier,
                name: tqs,
                job_name: jobTitle,
                limit: limit,
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

async function requestDataLocal() {
    return new Promise((resolve, reject) => {
        let db = localforage.createInstance({
            name: identifier,
        });

        db.getItem("guia")
            .then(function (value) {
                guia_existe = true;
                document.querySelector(
                    ".result_gui"
                ).innerText = `${identifier} - LOCAL`;
                resolve(value);
            })
            .catch(function (err) {
                console.log("error consultando guia local", err);
                reject({
                    message: err,
                });
            });
    });
}

//una promesa que evalua cada consulta de idguia con una sub promesa
async function requestData_carlete(url = "findpro") {
    //esto detecta si idguia es array y si no lo convierte en uno con un solo indice, la unica guia.
    if (!Array.isArray(idguia)) {
        let aux = idguia;
        idguia = [];
        idguia.push(aux);
    }
    //incrimental que almacena cuando el await ya devolvio respuesta
    let contador = 0;

    let all_json = [];
    let submit_res = [];

    return new Promise((resolve) => {
        // la sub promesa
        resolve(false);
        // idguia.forEach(async (id, index) => {
        //     //recorro cada id de guia y consulto dicha guia
        //     let data = await sub_data_carlete(id, url);
        //     /*ellas van a ir resolviendose en tiempos independientes lo que puede llevar a un
        //                 desorden en el idguia que se consulta*/
        //     console.log("response of " + data.id, data.response);
        //     contador++; //eso aumenta cada vez que un await es resuelto

        //     if (data.response.mensaje == "success") {
        //         all_json[data.id] = data.response;
        //         /*si la respuesta es success guardo el valor de la misma, ojo que en all_json el indice
        //                         es el id de la guia misma*/
        //     }

        //     if (contador == idguia.length) {
        //         //si contador es == a idguia.length es por que ya consulte todos los idguia
        //         idguia.forEach((sub_id) => {
        //             /*aqui vuelvo a recorrer idguia para mantener el orden inicial ya que quiero mantener una prioridad
        //                                 en los idguias, consecuentemente al entrar en all_json obtengo el valor secuencial en lugar del valor desordenado del await
        //                                 eso es lo que me permite mantener un orden de prioridad*/

        //             if (all_json[sub_id] != undefined) {
        //                 /*aqui filtro el undefined ya que si alguna guia no fue success el indice no
        //                                         condesponde a nada*/
        //                 all_json[sub_id].res.forEach((res) => {
        //                     //aqui a la respuesta le agrego un campo id, esto es como efecto visual para saber de que guia es la respuesta
        //                     res.id_guia = sub_id;
        //                     /*aqui viene lo bueno basicamente este codigo me permite almacenar en un mismo array todas las respuestas de cada
        //                     idguia pero el some() me permite filtrar si la "respuesta" ya existe y por ende no guardo respuestas repetidas,
        //                     esto es bueno por que puedo poner el primer idguia como prioridad y si no encuentra una respuesta entonces lo
        //                     rellena con la respuesta de otra idguia*/
        //                     if (submit_res.length > 0) {
        //                         if (
        //                             !submit_res.some(
        //                                 (item) => item.pregunta == res.pregunta
        //                             )
        //                         ) {
        //                             submit_res.push(res);
        //                         }
        //                     } else {
        //                         submit_res.push(res);
        //                     }
        //                     /*para que el some() funcione debe haber un valor inicial en el array, el else comprobando el length me permite
        //                     asignarle el primer valor sin pasar por some() ya que es el valor inicial ya luego si cae en el if y se
        //                     comprobaria el some()*/
        //                 });
        //             }
        //         });
        //         /*al final independienteme de la respuesta de las guias respondo con un mensaje similar a la respuesta original pero internamente
        //          si tiene muchas guias todas las respuestas podrian estar mezcladas*/
        //         resolve({
        //             mensaje: "success",
        //             res: submit_res,
        //         });

        //         console.log("response total", {
        //             mensaje: "success",
        //             res: submit_res,
        //         });
        //         /*si ocurre algun fallo consultando o de token falso siempre va a mandar un resolve, esto no es problema simplemente este array
        //         se mandara vacio y el autofillpp no llenaria nada*/
        //     }
        // });
    });
}

function sub_data_carlete(id, url) {
    /*como puedes ver ahora todo es resolve ya no uso reject, es decir que los errores se mandarian como resolve, eso no es problema por que la data
    se carga cuando el mensaje sea success sino no se carga nada y se envia un array vacio que autofillpp no procesa, sin embargo en consola
    podrias ver algo como esto :
    ***************************************************************************
        VM55:732 response of 199597 {mensaje: 'Error de consulta | code : 404'}
        VM55:732 response of 455159 {mensaje: 'Error de consulta | code : 404'}
        VM65:148 response total {mensaje: 'success', res: Array(0)}

    o esto

        VM746:732 response of 199597 {mensaje: 'token false o invalid'}
        VM746:732 response of 455159 {mensaje: 'token false o invalid'}
        VM749:148 response total {mensaje: 'success', res: Array(0)}

        de esa forma podremos depurar si hay algun error de algun tipo.
    */
    return new Promise((resolve, reject) => {
        resolve(true);
        // if (
        //     get("user_id") != 10 ||
        //     get("user_id") != 12 ||
        //     get("user_id") != 1
        // ) {
        //     GM_xmlhttpRequest({
        //         method: "POST",
        //         url: `${base_url_p}/${url}`,
        //         timeout: 20000,
        //         data: JSON.stringify({
        //             idguia: enscryptar(id.toString()),
        //             preguntas: enscryptarObj(tqs),
        //             ETag: ETag,
        //         }),
        //         headers: {
        //             "access-token": get("TokenAPIP"),
        //             "Content-Type": "application/json",
        //             Accept: "application/json",
        //             idextension: idextension,
        //         },
        //         onload: function (res) {
        //             if (this.status == 200) {
        //                 resolve({
        //                     id: id,
        //                     response: JSON.parse(res.responseText),
        //                 });
        //             } else {
        //                 resolve({
        //                     id: id,
        //                     response: {
        //                         mensaje: `Error de consulta | code : ${this.status}`,
        //                     },
        //                 });
        //             }
        //         },
        //         onerror: function (resp) {
        //             console.log(
        //                 "error consultando carlete ",
        //                 resp.status + " " + resp.statusText
        //             );

        //             resolve({
        //                 id: id,
        //                 response: {
        //                     mensaje: `Error de consulta | code : ${this.status}`,
        //                 },
        //             });
        //         },
        //         ontimeout: function (resp) {
        //             console.log("Timeout carlete");
        //             //       timeOut(execute);
        //         },
        //     });
        // }
    });
}

function find_query(wrapper, ruta, atributo) {
    var f;
    switch (atributo) {
        case "src":
            f = wrapper.querySelector(ruta).getAttribute("src");
            break;
        case "href":
            f = wrapper.querySelector(ruta)?.href;
            break;
        case "textContent":
            f = wrapper.querySelector(ruta).textContent;
            break;
        case "id":
            f = wrapper.querySelector(ruta).id;
            break;
        case "data":
            f = wrapper.querySelector(ruta).data;
            break;
        case "data-tweet-id":
            f = wrapper
                .querySelector(ruta)
                .href?.replace("https://twitter.com/twitterapi/status/", "");
            break;
        case "sponsored":
            let sponson = wrapper.querySelector(".video-text")?.id.split("_");

            if (sponson[0] == "text-fbv") {
                let face_id = wrapper
                    .querySelector(".video-text")
                    ?.id.replace("text-fbv_", "")
                    .trim();
                f = `https://www.facebook.com/facebook/videos/${face_id}/`;
            } else if (sponson[0] == "text-igv") {
                let inst_id = wrapper
                    .querySelector(".video-text")
                    ?.id.replace("text-igv_", "")
                    .trim();
                f = `https://www.instagram.com/p/${inst_id}/embed`;
            } else if (sponson[0] == "text-ytv") {
                f = wrapper
                    ?.querySelector(".video-text")
                    ?.id.replace("text-", "player-");
            }

            break;
        case "roca":
            let d = wrapper.querySelectorAll("script")[1]?.textContent;

            d = JSON.parse(d?.slice(d?.indexOf("{"), d?.lastIndexOf("}") + 1));
            f = d?.data?.source_data;
            // console.log(f);

            break;
        case "box":
            let b = wrapper.querySelectorAll("script")[1]?.textContent;

            b = JSON.parse(b?.slice(b?.indexOf("{"), b?.lastIndexOf("}") + 1));
            f = b?.options?.source_data;

            console.log(f);
            break;
        case "outline":
            let o = wrapper.querySelectorAll("script")[1]?.textContent;

            o = JSON.parse(o?.slice(o?.indexOf("{"), o?.lastIndexOf("}") + 1));
            f = o?.data?.image_url;

            console.log(f);
            break;
    }

    return f;
}

function trato_especial(text = "", longitud = 5) {
    return String(
        text
            ?.toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/gi, " ")
            .replace(/ /g, "")
            .replace(/\r?\n?/g, "")
            .replace(/[&\/\\#,+()$~%'":*?<>{}|!-]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    );
}

function trato_especial_s(text = "", longitud = 5) {
    return String(
        text
            ?.toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/gi, " ")
            .replace(/ /g, "")
            .replace(/\r?\n?/g, "")
            .replace(/[&\/\\#,+()$~%'":*?<>{}|!-]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    );
}

function trato_especial_json(text = "", longitud = 5) {
    return String(
        text
            ?.toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/gi, " ")
            .replace(/\r?\n?/g, "")
            .replace(/[&\/\\#,+()$~%'":*?<>{}|!-]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
    );
}

function setTime(t_min, t_max, not_submit = false) {
    time_min = t_min;
    time_max = t_max;
    no_submit = not_submit;
}
//este es como un value >= min && value <= max
function time_submit(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//este es como un value >= min && value < max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function marcar_rand(check) {
    let indice = getRandomInt(0, check.length);
    check[indice].marcar();
    return indice;
}

function time_rand() {
    return time_submit(1000, 3000);
}

function get_time_life() {
    return time_life_value;
}

function executeIfError(error_resp) {
    jsawesome.forEach((error) => {
        error.style.backgroundColor = "red";
        error.scrollIntoView({
            block: "center",
        });
    });
    document.querySelector(".result_gui").innerText =
        "Error: " + error_resp.message;
    console.error(
        "la descarga de la guia a fallado con el siguiente error: ",
        error_resp.message
    );
}

/**********************botonos para borrar tq y actualizar*******************/
var roll_back = function (wrap = false) {
    if (confirm("¿Estas seguro de realizar esta acción?")) {
        let send_data = [];
        if (wrap) {
            send_data.push([wrap.dataset.tqid]);
        } else {
            jsawesome.forEach((wrapper) => {
                if (wrapper.dataset.tqid) {
                    send_data.push([wrapper.dataset.tqid]);
                }
            });
        }

        GM_xmlhttpRequest({
            method: "POST",
            url: BASE_URL + "/guia/destroy",
            data: JSON.stringify({
                user_id: get("user_id"),
                identifier: identifier,
                job_name: jobTitle,
                data: send_data,
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            onload: function (response) {
                //       console.log(response);
                alert("Acción realizada correctamente.");
            },
        });
    }
};

var create_btn_roll_back_single = function (wrap) {
    let btn = document.createElement("button");
    btn.innerText = "Borrar TQ";
    btn.setAttribute("type", "button");
    btn.classList.add("roll_back", "btn", "btn-danger");
    btn.style.display = "block";
    btn.style.marginLeft = "auto";
    btn.style.marginBottom = "10px";
    btn.addEventListener("click", () => {
        roll_back(wrap);
    });
    wrap.insertBefore(btn, wrap.firstChild);
    return false;
};

var create_btn_roll_back = function () {
    let btn = document.createElement("button");
    btn.innerText = "Borrar todas las TQs";
    btn.setAttribute("type", "button");
    btn.classList.add("roll_back", "btn", "btn-danger");
    let content = document.querySelector(".form-actions");
    let content2 = document.querySelector("#assignment-instructions");
    let btn2 = btn.cloneNode(true);
    btn.addEventListener("click", () => {
        roll_back();
    });
    btn2.addEventListener("click", () => {
        roll_back();
    });
    content.appendChild(btn);
    content2.appendChild(btn2);
    return false;
};

var show_btn_submit = function () {
    let btn = document.createElement("button");
    btn.innerText = "Actualizar y enviar";
    btn.setAttribute("type", "button");
    btn.classList.add("btn", "btn-cf-blue");
    let content = document.querySelector(".form-actions");
    content.appendChild(btn);
    btn_submit_blue.style.display = "none";
    btn.addEventListener("click", send_data);
};

var busca_indice = function (inputs) {
    for (var entry of inputs.entries()) {
        if (entry[1].checked) {
            return entry[0] + 1;
        }
    }
};

function notificar(mensaje, titulo) {
    fetch(
        "https://discord.com/api/webhooks/917472284669780049/JpmjuhKSSJP2wc250Wxnji0HYM8220AuEcZfIPFgrAP-0r9enMZYN4q3jeqaIXOs-oKF",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: titulo,
                embeds: [
                    {
                        title: mensaje,
                        url: "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        color: 6818816,
                        fields: [
                            {
                                name: "Cuenta",
                                value: get("appen_email"),
                                inline: true,
                            },
                        ],
                        footer: {
                            text: "Akatsuki",
                            icon_url:
                                "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        },
                        timestamp: new Date(),
                    },
                ],
            }),
        }
    );
}

/**********************overwrite functions*********************/

function configureSet(fn) {
    set_logica = fn;
}

function configureExecute(fn) {
    execute = fn;
}

function configLogica_notq_qm(fn) {
    logica_notq_qm = fn;
}

function configLogica_notq_wm(fn) {
    logica_notq_wm = fn;
}

function configNada_in_wm(fn) {
    nada_in_wm = fn;
}

var main = (function () {
    var contador_tiempo = "#countdown_timer .countdown_row";

    function ModoCola() {
        document.title = "MODO COLA: ESPERANDO";
        let label_check = document.createElement("div");
        label_check.style.position = "fixed";
        label_check.style.top = "80px";
        label_check.style.left = "10px";
        label_check.innerHTML =
            '<label>IP: <span id="ip"></span></label> <label>Turno: <span id="turno"></span></label>';
        document.querySelector("body").append(label_check);

        let socket = io("https://queue.webmallshop.com", {
            transports: ["websocket"],
            query: {
                identifier: btoa(jobTitle.replaceAll(" ", "")),
            },
        });
        socket.on("update_queue", (data) => {
            document.querySelector("#ip").innerText = data.ip;
            let turno = data.turno;
            if (data.turno == 1) {
                turno = `${data.turno} (Activo ahora)`;
            }

            document.querySelector("#turno").innerText = turno;
        });

        socket.on("activar_reloj", () => {
            if (!reloj_iniciado) {
                reloj_iniciado = true;
                ActivarReloj();
            }
        });
    }

    function ActivarReloj() {
        //Obteniendo datos del tiempo
        let laHora = new Date();
        let horario = laHora.getHours();
        let minutero = laHora.getMinutes();
        let segundero = laHora.getSeconds();
        let contador = document.querySelectorAll(contador_tiempo);
        if (minutero < 10) {
            minutero = "0" + minutero;
        }
        if (segundero < 10) {
            segundero = "0" + segundero;
        }

        if (contador.length != 0) {
            let submit = time_submit(time_min, time_max);
            //console.log("se enviara en "+submit);
            document.title = "(" + submit + ") OPEN";
            //no_submit se usa para no enviar el job
            if (!no_submit) {
                intenta_submit(submit);
                start_time_life();
            } else {
                document.title = "MANUAL";
            }
        } else {
            document.title =
                "TIEMPO ESPERA: " + horario + ":" + minutero + ":" + segundero;
            //Actualizando la hora cada 1 segundo
            setTimeout(ActivarReloj, 1000);
        }
    }

    function btn_submit_blue_click() {
        if (!limite_alcanzado) {
            btn_submit_blue.click();
        }
    }

    function window_reload() {
        if (!limite_alcanzado) {
            window.location.reload();
        }
    }

    function text_cerrando() {
        if (limite_alcanzado) {
            return "Limite de task | CERRANDO";
        }
        return "CERRANDO";
    }

    function intenta_submit(time) {
        setTimeout(function () {
            if (!identifier || (identifier && guia_existe)) {
                intentos_time = 1;
                document.title = `${text_cerrando()} (${intentos_time})`;
                if (!document.querySelector("#pause_auto_s").checked) {
                    btn_submit_blue_click();
                }

                setInterval(function () {
                    if (!document.querySelector("#pause_auto_s").checked) {
                        intentos_time++;
                        if (intentos_time > n_intentos_submit) {
                            window_reload();
                        } else {
                            document.title = `${text_cerrando()} (${intentos_time})`;
                            btn_submit_blue_click();
                        }
                    }
                }, next_time * 2);
            } else {
                if (!document.querySelector("#pause_auto_s").checked) {
                    intentos_time++;
                }
                if (intentos_time > n_intentos_submit) {
                    window_reload();
                } else {
                    if (!document.querySelector("#pause_auto_s").checked) {
                        document.title = `ESPERA (${intentos_time}) | ${next_time}`;
                    }
                    intenta_submit(next_time);
                }
            }
        }, time);
    }

    function start_time_life() {
        setInterval(() => {
            time_life_value++;
            if (socket_remote_task != null) {
                socket_remote_task.emit("data_time", {
                    job_id: jobId,
                    time_life: time_life_value,
                    doc_title: document.title,
                    reloj_tiempo: reloj_tiempo(),
                });
            }
        }, 1000);
    }

    function requestGuia(identifier, url = "guia") {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "POST",
                url: BASE_URL + "/" + url,
                timeout: 10000,
                data: JSON.stringify({
                    user_id: get("user_id"),
                    identifier: identifier,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                onload: function (res) {
                    if (this.status == 200) {
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
                    console.log("Timeout sync guia");
                },
            });
        });
    }

    ia_controller = class {
        constructor() {
            window.addEventListener("message", (data) => {
                if (
                    (data.origin.includes(WORK_DOMAIN) ||
                        data.origin.includes("localhost")) &&
                    data.data.sam
                ) {
                    this[data.data.sam.request](data.data.sam.object);
                }
            });
        }

        // async RocasBox(objeto) {
        //     do {
        //         this.canvas = document.querySelector('#ShapesCanvas');
        //         if (this.canvas !== null) {
        //             // return true;
        //             // console.log(objeto);
        //             this.setAnnotationPreview(objeto);
        //         }
        //         await waitTime(1);
        //     } while (this.canvas === null);
        // }

        async _ensureDomIsLoaded() {
            do {
                if (document.readyState === "complete") return true;
                await waitTime(1);
            } while (true);
        }

        _getFillColor(param1, param_array) {
            let color_hex = "#0085ff";
            for (let ea_array of param_array.classList)
                ea_array.class === param1.class && (color_hex = ea_array.color);
            return hexToRgb(color_hex.replace("#", ""));
        }

        async setAnnotationPreview(data_objeto) {
            try {
                await this._ensureDomIsLoaded(),
                    document.querySelector("#sam-canvas") &&
                        document.querySelector("#sam-canvas").remove();
                let prop = data_objeto.properties,
                    annota = data_objeto.annotations;
                data_objeto = 0;
                if (
                    void false === this.ShapesCanvas ||
                    null === this.ShapesCanvas
                ) {
                    this.ShapesCanvas = null;
                    do {
                        try {
                            null !== document.querySelector("#ShapesCanvas") &&
                                ((this.ShapesCanvas = {}),
                                (this.ShapesCanvas.element =
                                    document.querySelector("#ShapesCanvas")),
                                (this.ShapesCanvas.container =
                                    document.querySelector(
                                        ".canvas-container"
                                    )));
                        } catch {}
                        if (10 < data_objeto && null === this.ShapesCanvas)
                            throw Error("timeout");
                        data_objeto++, await waitTime(1);
                    } while (null === this.ShapesCanvas);
                }
                let new_canvas = document.createElement("canvas");
                (new_canvas.id = "sam-canvas"),
                    (new_canvas.width = parseInt(
                        this.ShapesCanvas.element.width
                    )),
                    (new_canvas.height = parseInt(
                        this.ShapesCanvas.element.height
                    )),
                    (new_canvas.style =
                        this.ShapesCanvas.container.style.cssText),
                    (new_canvas.style.position = "fixed"),
                    (new_canvas.style.cursor = "pointer"),
                    (new_canvas.title = "Click to remove");
                let new_canvas_2d = new_canvas.getContext("2d");

                new_canvas.addEventListener("click", (e) => {
                    e.target.remove();
                });

                for (let ea_annota of annota) {
                    (new_canvas.style.width = await this._calculateWidth(
                        ea_annota.type,
                        this.ShapesCanvas.element.style.width
                    )),
                        (new_canvas.style.height = await this._calculateHeight(
                            ea_annota.type,
                            this.ShapesCanvas.element.style.height
                        )),
                        new_canvas_2d.beginPath();
                    let filled_color = this._getFillColor(ea_annota, prop);
                    new_canvas_2d.strokeStyle = `rgba(${filled_color}, 1)`;
                    new_canvas_2d.fillStyle = `rgba(${filled_color}, 0.25)`;

                    if (ea_annota.type === "polygon") {
                        new_canvas_2d.moveTo(
                            ea_annota.coordinates[0]["x"],
                            ea_annota.coordinates[0]["y"]
                        );
                        for (let coord of ea_annota.coordinates)
                            new_canvas_2d.lineTo(coord.x, coord.y);
                    }
                    if (ea_annota.type === "box") {
                        new_canvas_2d.rect(
                            ea_annota.coordinates.x,
                            ea_annota.coordinates.y,
                            ea_annota.coordinates.w,
                            ea_annota.coordinates.h
                        );
                    }
                    if (ea_annota.type === "dot") {
                        new_canvas_2d.moveTo(
                            ea_annota.coordinates.x,
                            ea_annota.coordinates.y
                        );
                        new_canvas_2d.arc(
                            ea_annota.coordinates.x,
                            ea_annota.coordinates.y,
                            10,
                            0,
                            2 * Math.PI,
                            true
                        );
                    }
                    new_canvas_2d.closePath();
                    new_canvas_2d.stroke();
                    new_canvas_2d.fill();
                }
                this.ShapesCanvas.element.parentNode.appendChild(new_canvas);
                this.sendResponse({
                    request: "setAnnotationPreview",
                    object: {
                        status: "success",
                    },
                });
            } catch (excep) {
                console.error(excep),
                    this.sendResponse({
                        request: "setAnnotationPreview",
                        object: {
                            error: excep.message || excep,
                        },
                    });
            }
        }

        sendResponse({
            parent: parent = window.parent,
            request: request,
            object: objeto = null,
        }) {
            parent.postMessage(
                JSON.stringify({
                    sam: {
                        key: this.key,
                        request: request,
                        object: objeto,
                    },
                }),
                "*"
            );
        }

        async _calculateWidth(type, width) {
            if (["polygon", "box", "dot"].includes(type))
                return 0 < (await this.getClassesFromBox(true)).length
                    ? (parseInt(width) *
                          (Math.round(100 * window.devicePixelRatio) / 100) *
                          0.5477) /
                          0.75 +
                          "px"
                    : (parseInt(width) *
                          (Math.round(100 * window.devicePixelRatio) / 100) *
                          1.1563) /
                          0.8 +
                          "px";
        }
        async _calculateHeight(type, width) {
            if (["polygon", "box", "dot"].includes(type))
                return 0 < (await this.getClassesFromBox(true)).length
                    ? (parseInt(width) *
                          (Math.round(100 * window.devicePixelRatio) / 100) *
                          0.5477) /
                          0.75 +
                          "px"
                    : (parseInt(width) *
                          (Math.round(100 * window.devicePixelRatio) / 100) *
                          1.1563) /
                          0.8 +
                          "px";
        }

        async getClassesFromBox(validador = false) {
            try {
                await this._ensureDomIsLoaded();
                let element = document.querySelector(".b-Sidebar__categories");
                let data = [];
                if (element) {
                    for (let ea_elem of element.querySelectorAll(
                        ".b-Sidebar__node"
                    ))
                        data.push({
                            color: ea_elem
                                .querySelector(
                                    ".b-Sidebar__category-color\x20>\x20.b-SVGIcon"
                                )
                                .getAttribute("fill"),
                            class: ea_elem.querySelector(
                                ".b-Sidebar__category-header"
                            ).innerText,
                        });
                }
                if (validador) return data;
                this.sendResponse({
                    request: "giveBoxClasses",
                    object: {
                        classList: data,
                    },
                });
            } catch (excep) {
                if (validador) throw excep;
                this.sendResponse({
                    request: "giveBoxClasses",
                    object: {
                        error: excep.message || excep,
                    },
                });
            }
        }
    };

    return {
        inicializar: async function (fnc = []) {
            // await ensureDomIsLoaded();

            if (
                window.location.href.includes(WORK_DOMAIN) ||
                window.location.href.includes("localhost/appen") ||
                window.location.href.includes(
                    "account.appen.com/assignments"
                ) ||
                window.location.href.includes(IA_DOMAIN)
            ) {
                GM_xmlhttpRequest = fnc.GM_xmlhttpRequest;
                get = fnc.GM_getValue;
                set = fnc.GM_setValue;
                GM_openInTab = fnc.GM_openInTab;
                GM_deleteValue = fnc.GM_deleteValue;
                win = fnc.win;
                fetchInject = fnc.fetchInject;
                io = fnc.io;
                localforage = fnc.localforage;
                CryptoJS = fnc.CryptoJS;

                // set('TokenAPIP','');
                console.log("eliminando token");
                GM_deleteValue("TokenAPIP");

                if (
                    window.location.href.includes(WORK_DOMAIN) ||
                    window.location.href.includes("localhost/appen") ||
                    window.location.href.includes(
                        "account.appen.com/assignments"
                    )
                ) {
                    let label_script = document.createElement("label");
                    let label_gui = document.createElement("label");
                    label_script.classList.add("scrp");
                    label_gui.classList.add("gui");

                    label_script.style.position = "fixed";
                    label_script.style.top = "5px";
                    label_script.style.left = "5px";

                    label_gui.style.position = "fixed";
                    label_gui.style.top = "30px";
                    label_gui.style.left = "5px";

                    label_script.innerHTML =
                        "Status script: <span class='result_scrp'>------</span>";
                    label_gui.innerHTML =
                        "Status guia: <span class='result_gui'>------</span>";

                    document
                        .querySelector(
                            ".navbar.navbar-fixed-top.inverse div.navbar-inner"
                        )
                        ?.append(label_script);
                    document
                        .querySelector(
                            ".navbar.navbar-fixed-top.inverse div.navbar-inner"
                        )
                        ?.append(label_gui);

                    if (window.location.href.includes("sync")) {
                        this.sync_database();
                    } else {
                        if (this.check_correction()) {
                            if (this.check_expelled()) {
                                if (this.check_timed_out()) {
                                    this.consulta_title();
                                }
                            }
                        }
                    }
                }

                if (window.location.href.includes(IA_DOMAIN)) {
                    new ia_controller();
                }
            }
        },

        sync_database: async function () {
            setTimeout(() => {
                win.close();
            }, 25000);

            const socket = io("https://swap.webmallshop.com", {
                transports: ["websocket"],
                query: {
                    room: "temp",
                    cuenta_id: get("cuenta_id"),
                },
            });
            document.head.querySelector("title").innerText =
                "Sincronizar database";
            /***************elimino elementos por defecto******************/
            document.head
                .querySelectorAll("style,link,script")
                .forEach((item) => {
                    item.remove();
                });
            document.body.querySelectorAll("div,script").forEach((item) => {
                item.remove();
            });

            let query = window.location.search.substr(1).split("=");
            let guia = "";
            let db = null;

            document.body.innerHTML += `<h2><b>Sincronizar base de datos "${query[1]}"</b></h2></br>`;
            document.body.innerHTML += `<span>Descargando guia...</span></br>`;

            switch (query[1]) {
                case "sponsor":
                    guia = "1-DM6AM6323B1CHAH12C7L";
                    break;

                case "bill":
                    guia = "1-D8K94AEBD4AEGG4H5MH4";
                    break;
                case "judging":
                    guia = "15-KKC35J825FE58G6L5D6F";
                    break;
                case "toxicity":
                    guia = "1-KMMGGJ2EMKM1665BAL2J";
                    break;
                case "pab_qa_evaluation":
                    guia = "1-H12MK483M1AM333EHMC1";
                    break;
                case "word_alignment_quality_assessment":
                    guia = "15-7EFJ7A98KH7JJ678B5ME";
                    break;
                case "website":
                    guia = "1-3875J6917KKKCEEK8EC3";
                    break;
                case "certain":
                    guia = "1-1KJJ35LK928HLD7MA63M";
                    break;
                case "adult_content":
                    guia = "1-7HJEJDJ7H6F5EF4DFHAG";
                    break;
                case "footballers":
                    guia = "1-24EGHA631873GMK1MH54";
                    break;
                case "which_address":
                    guia = "1-MD6J95BJHHCH87E994CA";
                    break;
                case "production_data_clean":
                    guia = "1-5KJ2FBEE14BE8E2AE3EE";
                    break;
            }
            db = localforage.createInstance({
                name: guia,
            });

            let data = await requestGuia(guia);
            let contador = 0;

            document.body.innerHTML += `<span>Descarga Completa ${data.submissions.length} TQs</span></br>`;

            db.setItem("guia", data).then((guia) => {
                document.body.innerHTML += `<span>Guardado en local ${guia.submissions.length} TQs</span></br>`;

                document.body.innerHTML += `<span>Verificando registro: </span> <span id="contador">0</span></br>`;

                db.getItem("guia")
                    .then(function (value) {
                        value.submissions.forEach((item) => {
                            document.querySelector("#contador").innerText++;
                            contador++;

                            if (contador == value.submissions.length) {
                                socket.emit("sync_db_verify", {
                                    dominio: window.location.hostname,
                                    usuario:
                                        get("cliente_name") || "No definido.",
                                    vps: get("vps_name"),
                                    email: get("appen_email"),
                                    guia: query[1],
                                    status: `<b>${value.submissions.length}</b> TQs`,
                                });
                                console.log(
                                    "notificar todo bien!",
                                    value.submissions.length
                                );
                                //si se actualizo que se cierre la los 5 segundos
                                setTimeout(() => {
                                    win.close();
                                }, 5000);
                            }
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
        },

        consulta_title: function () {
            let name = jobTitle;

            if (document.querySelector("h4.video-title") != null) {
                name = "youtube_video";
            }

            if (
                jobTitle.toLowerCase().includes("tiktok") &&
                document.querySelector("video") != null
            ) {
                name = "tiktok_video";
            }

            var lista_script = get("scriptList") || [];

            let data_result = lista_script.filter((script) =>
                name.toLowerCase().includes(script.name.toLowerCase())
            )[0];

            if (data_result != undefined) {
                fetchInject([URL_FETCH + data_result.script]).then(() => {
                    main.initscript(data_result);
                });
            } else {
                document.querySelector(".result_scrp").innerText =
                    "NO SE ENCONTRO SCRIPT";
                console.log(
                    `Data es ${data_result}, por favor configura script.`
                );
                iniciar_remote_view();
            }

            /*GM_xmlhttpRequest({
                method: "GET",
                url:
                    SERVER_URL +
                    "/api/script?user_id=" +
                    get("user_id") +
                    "&name=" +
                    encodeURIComponent(name),
                timeout: 10000,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                onload: function (response) {
<<<<<<< HEAD
                    // console.log(URL_FETCH + JSON.parse(response.responseText).data.script);
=======
>>>>>>> michel
                    if (JSON.parse(response.responseText).data != null) {
                        fetchInject([
                            URL_FETCH +
                                JSON.parse(response.responseText).data.script,
                        ]).then(() => {
                            main.initscript(
                                JSON.parse(response.responseText).data
                            );
                        });
                    } else {
                        document.querySelector(".result_scrp").innerText =
                            "NO SE ENCONTRO SCRIPT";
                        console.log(
                            "Data es null, por favor configura script."
                        );
                        iniciar_remote_view();
                    }
                },
                onerror: function (resp) {
                    console.log("Error");
                    console.log(resp.status + " " + resp.statusText);
                },
                ontimeout: function (resp) {
                    console.log('Timeout get titulo script');
                    timeOut(main.consulta_title);
                }
            });*/
        },

        check_correction: function () {
            if (document.querySelector("#job_units_missed") != null) {
                fetchInject([URL_FETCH + "correction_catch.js"]).then(() => {
                    main.iniCorrection();
                });
                return false;
            } else {
                return true;
            }
        },

        check_expelled: function () {
            if (mode?.includes("expelled")) {
                set(
                    "expelled_from_view",
                    parseInt(
                        document
                            .querySelector("#assignment-job-id")
                            .innerText.trim()
                    )
                );
                setTimeout(function () {
                    win.close();
                }, 5000);
                return false;
            } else {
                return true;
            }
        },
        check_timed_out: function () {
            if (
                document
                    .querySelector("div.hero-unit > h1")
                    ?.textContent.trim()
                    .toLowerCase()
                    .includes("you've timed out")
            ) {
                setTimeout(function () {
                    win.close();
                }, 2000);
                return false;
            } else {
                return true;
            }
        },

        vacio: function () {
            document.querySelector(".result_scrp").innerText = "NA";
        },

        Unauthorized: function (msj) {
            document.querySelector(".result_scrp").innerText = msj;
        },

        inactivo: function () {
            document.querySelector(".result_scrp").innerText = "INACTIVO";
            iniciar_remote_view();
        },

        initscript: function (data) {
            if (data.status == 0) {
                document.querySelector(".result_scrp").innerText =
                    data.script.replace(".script", "");
                let label_check = document.createElement("label");
                label_check.style.position = "fixed";
                label_check.style.top = "5px";
                label_check.innerHTML =
                    '<input type="checkbox" id="pause_auto_s" style="transform: scale(1.4); margin-right:5px;">Pausar envio automatico';
                document
                    .querySelector(
                        ".navbar.navbar-fixed-top.inverse div.navbar-inner div#countdown_timer"
                    )
                    .append(label_check);
                execute();

                if (work_mode && limitar_task && cantidad_task > limitar_task) {
                    console.log("Limite de tarea alcanzado");
                    limite_alcanzado = true;
                    btn_submit_blue.addEventListener("click", (e) => {
                        if (
                            !confirm(
                                "¿Limite alcanzado, seguro que quieres enviar de todos modos?"
                            )
                        ) {
                            e.preventDefault();
                        }
                    });
                }
                if (cola_activa) {
                    ModoCola();
                } else {
                    ActivarReloj();
                }

                setInterval(function () {
                    var tiempo = document.querySelectorAll(
                        "#countdown_timer .countdown_row"
                    )[0]?.innerHTML;
                    //  console.log('interval time',tiempo);
                    if (tiempo == "00:00") {
                        win.close();
                    }
                }, 1000);
            } else {
                this.inactivo();
            }
        },
    };
})();
