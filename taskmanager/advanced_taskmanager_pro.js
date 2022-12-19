var win = null;

var SERVER_URL = "http://localhost:8000"; //para consumir API
var URL_FETCH = "http://localhost/akatsukis/scripts/taskmanager/"; //para solicitar recursos

SERVER_URL = "https://app.webmallshop.com";
URL_FETCH = SERVER_URL + "/scripts/taskmanager/";

API_URI = "http://localhost:3000/api";

const FECA_PROXY_URL = "https://feca-proxy.appen.com";
const ACCOUNT_URL = "https://account.appen.com";

const url = window.location.href;
const url_last_s = url.lastIndexOf("/");
const base_url = url.substring(0, url_last_s + 1);

const notificarExcepcion_url =
    "https://discord.com/api/webhooks/899343507028860938/4dVC6UBBhxZf9EeYEyxpOo9rvoK0dYRmQKfeYVd5P5e0kNKXwzBpDF82InILZ-A310uq";
const notificarBaneo_url =
    "https://discord.com/api/webhooks/917472092998500353/CKfv85GQbJGH1bPkU6NfD9QpfsCMcI95cfprNjjXnrgJmyuNtW3FltjH-FumW5iE1VOp";
const notificarDebug_url =
    "https://discord.com/api/webhooks/917472284669780049/JpmjuhKSSJP2wc250Wxnji0HYM8220AuEcZfIPFgrAP-0r9enMZYN4q3jeqaIXOs-oKF";

var user_discord = {};
//michel
user_discord[15] = {
    id: "236233928669659146",
    url: "https://discord.com/api/webhooks/922667834880966696/dLcczEm15p58bZpu2MIbfKtIeYecRweRg3tVWQdUAkd02xr-xM-JauRd73jkcZ39KH1Q",
};
//carlos
user_discord[1] = {
    id: "324377461372485633",
    url: "https://discord.com/api/webhooks/922668361970765824/NOLtyb5WUAUGoe3OceyjUF5jzU6N5BO9bblGh_97R7_4Az_rhzhpRxC4A1gMI5FbUDb0",
};
//obed
user_discord[12] = {
    id: "638404846172766219",
    url: "https://discord.com/api/webhooks/922668451049390100/WzPr4U1_wvJgNelBhZmpXsz7G65ZM2xCR2PmIX2eRp9-z4nPzrpiTcot6aQmq0OuFSpI",
};
//jhoniner
user_discord[10] = {
    id: "579310489293815818",
    url: "https://discord.com/api/webhooks/922668548390793257/ieVYSQMNExLtQhcbNh7cLs5SCHcDuemFxOts8AG6Of4DkSr1yKlk3KMK4C7NLashCk3M",
};

var usuario_temp = null;

const parser = new DOMParser();

var allow_create_task = true;

var count_annotate_login = 0;
var count_account_login = 0;
var max_login = 3;
var n_login_an = 0;
var n_login_akon = 0;
var continue_task_search = true;

var resquest_count = 0;
var error_resquest_count = 0;
var timeout_resquest_count = 0;

var loop_iframe_time = 5000;
var autoCloseTime = 300000;

var data_tareas = "";
var tareas_filtradas = "";
var lista_incluidos = "";
var socket_include_list = "";
var tareas_previas = "";
var is_in_prev_task = "";
var task_socket_emit = [];

var page_data = null;
var doc = null;

var saldo_actual = 0;

// var email_vpn_notifications = "2121.smithwill@gmail.com";
var email_vpn_notifications = "carlos.mendoza.79@hotmail.com";
var email_nac_notifications = "chefjavierixto44@gmail.com";
//var email_nac_notifications = "donaldstone777@hotmail.com";
var is_notify_vpn = false;
var is_notify_nac = false;
var all_tabs = [];
var last_request = 0;

var socket = null;

var white_list = [
    "facebook",
    "stereotypes",
    "chinese social",
    "please tell us if the companies",
    "Magazines",
    "ebook",
    "Clasificación De Texto: Acuerdo O Desacuerdo",
    "科技产品故障和客户问题反馈",
    "funny products",
    "relevant job results to search queries",
    "ingredient entity annotation",
    "toxic spans",
    "Find The Sentiment Of Comments",
    "classify phrases",
    "Easy As It Gets. Just Classify Sites According To Guide",
    "scientific directions",
    "amount and unit of measure annotation",
    "similarity task for search keywords",
    "skill paraphrases",
    "Entity Highlighting",
    "implicitly offensive",
    "Internal",
    "signature annotation",
    "classify 3p",
];

nac_list = [
    { task: "Find Urls For A Business In A Certain Site", socket: true },
    { task: "Ccd Eval Round", socket: true },
    { task: "classify web", socket: true },
    {
        task: "Priority Work: Venus Vs. Mars : Help Us Find The Gender Of These People",
        socket: true,
    },
    { task: "Annotate And Categorize", socket: true },
    { task: "Data Procurement Assistance", socket: true },
    {
        task: "Priority Work - Quick Job: Find Website Links For Corporations",
        socket: true,
    },
    {
        task: "Outline",
        socket: true,
    },
    {
        task: "Russian Company Information",
        socket: true,
    },
    {
        task: "Document Identification",
        socket: true,
    },
];

var main = (function () {
    /*************AREA DEL SOCKET****************/
    function iniciar_socket_client() {
        if (get("appen_email").includes(email_vpn_notifications)) {
            is_notify_vpn = true;
        }

        if (get("appen_email").includes(email_nac_notifications)) {
            is_notify_nac = true;
        }

        socket = io("https://remote.gosamy.online", {
            transports: ["websocket"],
            query: {
                room: get("cliente_name")?.toLowerCase().replaceAll(" ", "_"),
                is_notify_vpn: is_notify_vpn,
                is_notify_nac: is_notify_nac,
                cuenta_id: get("cuenta_id"),
            },
        });

        socket.on("sync-db", (guia) => {
            GM_openInTab(
                `https://view.appen.io/assignments/sync?db=${guia}`,
                false
            );
        });

        socket.on("id-email", (callback) => {
            callback(get("appen_email"));
        });

        socket.on("crear-buscador-task", (array_data) => {
            if (allow_create_task) {
                socket_include_list = get("includeList") || [];
                array_data.forEach((data) => {
                    socket_include_list.forEach((elemts) => {
                        if (
                            data.tarea_nombre
                                .toLowerCase()
                                .includes(elemts.task.toLowerCase())
                        ) {
                            if (
                                !buscador_existe(data.tarea_id, data.link_tarea)
                            ) {
                                if (elemts.active) {
                                    crear_buscador(
                                        data.tarea_nombre,
                                        data.link_tarea,
                                        data.tarea_id
                                    );
                                }
                            } else {
                                if (!elemts.active) {
                                    document
                                        .querySelector(
                                            ".buscador_" + data.tarea_id
                                        )
                                        ?.querySelector(".cerrar_card")
                                        .click();
                                }
                            }
                        }
                    });
                });
            }
        });

        socket.on("saldo", async (data) => {
            emitir_saldo_actual(data.master);
        });

        socket.on("reload", () => {
            reload_with_check_tabs();
            /*if (get("user_id")==1) {GM_deleteValue('exceptionList');}*/
        });

        socket.on("cobrar-cuenta", async () => {
            let metodo_de_pago = withdraw_methods();
            let saldo = await saldo_socket();
            let token = await token_csrf();

            metodo_de_pago
                .then((metodo_paypal) => {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: FECA_PROXY_URL + "/v1/withdraws",
                        data: JSON.stringify({
                            amount: saldo,
                            withdraw_method_id: metodo_paypal,
                        }),
                        headers: {
                            "x-csrf-token": token,
                            "Content-Type": "application/json",
                        },
                        onload: function (respons) {
                            emitir_saldo_actual(null);
                        },
                    });
                })
                .catch((error) => {
                    cobro_error(error.message);
                });
        });
    }

    async function emitir_saldo_actual(master) {
        try {
            socket.emit("puente-saldo", {
                master_room: master,
                cuenta_id: get("cuenta_id"),
                appen_email: get("appen_email"),
                request: await pago_pendiente(),
                saldo: (await saldo_socket()) / 100,
            });
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                emitir_saldo_actual(master);
            }, 5000);
        }
    }

    function cobro_error(mensaje) {
        socket.emit("cobro-error", {
            cuenta_id: get("cuenta_id"),
            mensaje: mensaje,
        });
    }

    function pago_pendiente() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: FECA_PROXY_URL + "/v1/users/payments",
                onload: function (response) {
                    if (response.status == 200) {
                        let json = JSON.parse(response.responseText);
                        if (json.pending.length > 0) {
                            resolve(json.pending[0]);
                        } else {
                            resolve(false);
                        }
                    } else {
                        reject({
                            message: `Error consultando pago pendiente ${this.status}`,
                        });
                    }
                },
            });
        });
    }

    function token_csrf() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: FECA_PROXY_URL + "/v1/authentication/csrf",
                onload: function (response) {
                    if (response.status == 200) {
                        let json = JSON.parse(response.responseText);
                        resolve(json.csrfToken);
                    } else {
                        reject({
                            message: this.status,
                        });
                    }
                },
            });
        });
    }

    function withdraw_methods() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: FECA_PROXY_URL + "/v1/withdraw_methods",
                onload: function (response) {
                    if (response.status == 200) {
                        let json = JSON.parse(response.responseText);
                        if (json.length > 0) {
                            resolve(json[0].id);
                        } else {
                            reject({
                                message: "Sin Paypal",
                            });
                        }
                    } else {
                        reject({
                            message: this.status,
                        });
                    }
                },
            });
        });
    }

    function saldo_socket() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: FECA_PROXY_URL + "/v1/users/payments_summary",
                onload: function (response) {
                    if (response.status == 200) {
                        let json = JSON.parse(response.responseText);
                        resolve(json.available);
                    } else {
                        reject({
                            message: `Error consultando saldo ${this.status}`,
                        });
                    }
                },
            });
        });
    }

    /**********funciones globales*********************/
    function add_html() {
        let request = null;
        let long = url.length;
        let template = url
            .substring(url_last_s + 1, long)
            .toLowerCase()
            .replace("-", "_");
        /*********Cargo el html del notificador en el body***************/
        switch (template) {
            case "taskmanager_login":
                template = "taskmanager_pro_login";
                break;
            case "taskmanager":
                template = "taskmanager_pro";
                break;
            case "taskmanager_notificador":
                template = "taskmanager_pro";
                break;
            case "taskmanager_setup":
                template = "taskmanager_pro_setup";
                break;
        }

        request = fetch(`${URL_FETCH + template}.html`, { cache: "no-store" })
            .then((res) => res.text())
            .then((res_html) => (document.body.innerHTML = res_html));
        return request;
    }

    function authorization() {
        if (get("user_id") != null && get("shared_key") != null) {
            return true;
        }
        return false;
    }

    function redireccionar(url_re = "") {
        window.location = base_url + url_re;
    }

    function notificarError(func, error) {
        notificarUser(
            error,
            "Ocurrió un error " + func + " <@&917476144054427668> "
        );
    }

    function notificarUser(mensaje, titulo) {
        fetch(user_discord[get("user_id")].url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content:
                    titulo + " <@" + user_discord[get("user_id")].id + "> ",
                embeds: [
                    {
                        title: mensaje,
                        url: "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        color: 6818816,
                        fields: [
                            {
                                name: "VPS",
                                value: get("vps_name"),
                                inline: true,
                            },
                            {
                                name: "Cuenta",
                                value: get("appen_email"),
                                inline: true,
                            },
                            {
                                name: "Dueño",
                                value: get("cliente_name"),
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
        });
    }

    function notificarDebug(titulo, body) {
        fetch(notificarDebug_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `${titulo} @here`,
                embeds: [
                    {
                        title: `${body}`,
                        color: 6818816,
                        footer: {
                            text: "Akatsuki",
                            icon_url:
                                "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        },
                        timestamp: "2021-08-16T02:58:00.000Z",
                    },
                ],
            }),
        });
    }

    function notificarExcepcion(task_name, task_id, tipo) {
        fetch(notificarExcepcion_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `Se agrego una nueva excepción para \"*${get(
                    "cliente_name"
                )}*\" @here`,
                embeds: [
                    {
                        title: task_name,
                        url: "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        color: 6818816,
                        fields: [
                            {
                                name: "Task ID",
                                value: task_id,
                                inline: true,
                            },
                            {
                                name: "VPS",
                                value: get("vps_name"),
                                inline: true,
                            },
                            {
                                name: "Cuenta",
                                value: get("appen_email"),
                                inline: true,
                            },
                            {
                                name: "Tipo de excepción",
                                value: tipo,
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
        });
    }

    function notificarBaneo() {
        fetch(notificarBaneo_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `${get("cliente_name")} CUENTA BANNED ${get(
                    "appen_email"
                )} @here`,
                embeds: [
                    {
                        title: `Cuenta BANNED \"*${get(
                            "appen_email"
                        )}* - *${get("cliente_name")}*\"`,
                        url: "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        color: 6818816,
                        fields: [
                            {
                                name: "VPS",
                                value: get("vps_name"),
                                inline: true,
                            },
                            {
                                name: "Cuenta",
                                value: get("appen_email"),
                                inline: true,
                            },
                            {
                                name: "Dueño",
                                value: get("cliente_name"),
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
        });
    }

    function notificarWhite(task, task_link, prev_name = "") {
        notificarTask(
            "https://discord.com/api/webhooks/920496667285917726/QvBGSpAGyzeyioLtT1b8J-HdocSLUuEpc4KnQUWLigleJEDBRQRq2-hbqOjX-ktrpKlx",
            task,
            task_link,
            prev_name
        );
    }
    function notificarNormal(task, task_link, prev_name = "") {
        notificarTask(
            "https://discord.com/api/webhooks/920497349602705409/ZXQmaS3qgxtiX0GHm_SZHPawijvPuRCurLQgjF8TnxoC_v8TQLBkwkeWyafgFp1dobIQ",
            task,
            task_link,
            prev_name
        );
    }
    function notificarFiltro(task, task_link, prev_name = "") {
        notificarTask(
            "https://discord.com/api/webhooks/920497146766192693/eyO0L-lRptQGdyfoSO3cmmarYH0y5xWn7stQOGUM3vlik_NPARnqspjySwINwVJZlwjC",
            task,
            task_link,
            prev_name
        );
    }

    function notificarTask(url, task_var, task_link, prev_name = "") {
        let task_id = task_var[0]; //0 id
        let task_nombre = task_var[1]; //1 nombre
        let task_nivel = task_var[2]; //2 nivel
        let task_pago = task_var[4]; //4 pago
        let task_num = task_var[5]; //5 numero de tareas
        let secret_key_task = task_var[12]; //12 secrect get
        let link_nivel = "";
        task_pago = task_pago / 100;

        if (task_nivel == 1) {
            link_nivel =
                "https://account.appen.com/assets/l-lvl-1-334670863fc97f5e792b3afca6d7b1659bd799243a911d4d85c1694ac1a3b76a.png";
        }

        if (task_nivel == 2) {
            link_nivel =
                "https://account.appen.com/assets/l-lvl-2-7fd1f2632c95ca2d38d4691df73336f025da84f86d8db9a03ccf8d839c2c90c3.png";
        }

        if (task_nivel == 3) {
            link_nivel =
                "https://account.appen.com/assets/l-lvl-3-fe8ba02c5854b60417464dfd975843bcb675400c5f7ee404554859a83c4b3b34.png";
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: `${prev_name} ${task_id} ${task_nombre} ${task_pago}$  #${task_num} task @here`,
                embeds: [
                    {
                        title: task_nombre,
                        url: task_link,
                        color: 6818816,
                        fields: [
                            {
                                name: "# Task",
                                value: task_num,
                                inline: true,
                            },
                            {
                                name: "ID",
                                value: task_id,
                                inline: true,
                            },
                            {
                                name: "PAY/TASK",
                                value: `${task_pago}$`,
                                inline: true,
                            },
                        ],
                        footer: {
                            text: "Akatsuki",
                            icon_url:
                                "https://www.wallpaperuse.com/wallp/64-646749_m.png",
                        },
                        timestamp: new Date(),
                        thumbnail: {
                            url: link_nivel,
                        },
                    },
                ],
            }),
        });
    }

    var GM_xmlhttpRequest = function () {};
    var set = function () {};
    var get = function () {};
    var GM_openInTab = function () {};
    var GM_deleteValue = function () {};
    var fetchInject = function () {};
    var io = function () {};

    /*************************zona taskmanager*********************************/
    function aumentar_contador(id, value) {
        document.querySelector(id).innerText = value;
    }

    function add_exception(new_rule) {
        //    console.log(new_rule);
        let temp_rule = get("exceptionList") || [];
        let existe = false;

        temp_rule.forEach((rule) => {
            if (rule.id == new_rule.id) {
                existe = true;

                if (rule.active == false) {
                    rule.active = true;
                }
            }
        });

        if (!existe) {
            temp_rule.push(new_rule);
            notificarExcepcion(new_rule.task, new_rule.id, new_rule.type);
        }
        set("exceptionList", temp_rule);
    }

    function existe_in_history(task_id) {
        let task_history = get("task_history");
        let valor = "TITULO NO DISPONIBLE";
        task_history.forEach((task) => {
            if (task.id == task_id) {
                valor = task.task;
            }
        });
        return valor;
    }

    function play_all() {
        let parent = document.querySelectorAll(".card_buscador");
        if (parent.length > 0) {
            parent.forEach((card) => {
                if (!card.className.includes("task_open")) {
                    if (card.querySelector("input[type=checkbox]").checked) {
                        card.querySelector(".hide_btn_buscador").click();
                    }
                }
            });
        }
    }

    function consulta_saldo(callback = null, with_login = true) {
        //  console.log('Iniciando consulta_saldo');
        GM_xmlhttpRequest({
            method: "GET",
            url: FECA_PROXY_URL + "/v1/users/payments_summary",
            //    'timeout':50000,
            onload: function (response) {
                if (response.status == 200) {
                    let json = JSON.parse(response.responseText);
                    //       console.log("Listo para mostrar saldo",json);
                    document.querySelector(".saldo").innerHTML =
                        json.available / 100 + "$";
                    saldo_actual = json.available / 100;
                    if (callback != null) {
                        //          console.log("ejecuntado callback de consultar saldo");
                        callback();
                    }
                }
                if (response.status == 401) {
                    if (with_login) {
                        notificarError(
                            `consultando saldo MODO - status, se ejecutara annotate_login`,
                            `Estado CODE: ${response.status} Estado TEXT: ${response.statusText}`
                        );
                        //console.log("No autorizado, iniciando login");
                        annotate_login(consulta_saldo, callback);
                    }
                }
            },
            onerror: function (resp) {
                //      console.log(resp.status+' '+resp.statusText);
            },
            ontimeout: function (resp) {
                //     console.log("timeout");
                consulta_saldo(callback, with_login);
            },
        });
        return saldo_actual;
    }

    function update_config() {
        fetch(
            `${SERVER_URL}/api/include_list?user_id=${get(
                "user_id"
            )}&cuenta_id=${get("cuenta_id")}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    return false;
                }
            })
            .then((res) => {
                if (res != false) {
                    //    console.log(res);
                    if (res.config == null) {
                        set("openTabBackground", false);
                        set("autoClose", false);
                    } else {
                        set("openTabBackground", !!res.config.open_background);
                        set("autoClose", !!res.config.autoclose);
                    }

                    if (res.data.length == 0) {
                        alert("No existe una lista de include configurada");
                    } else {
                        let datos = [];
                        res.data.forEach((item) => {
                            datos.push({
                                task: item.name,
                                active: !!item.cuenta_id,
                            });
                        });
                        set("includeList", datos);
                    }
                } else {
                    //   alert("Token invalido presiona aceptar para relogear");
                    //    window.location.reload();
                }
            });

        // fetch(`${API_URI}/titles`, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json",
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         set(
        //             "title-list",
        //             res.map((title) => ({
        //                 id: title._id,
        //                 title: title.title,
        //                 guide_id: title.guide_id,
        //                 setup_guide_id: title.setup_guide_id,
        //             }))
        //         );
        //     });

        fetch(
            `${SERVER_URL}/api/script_list?user_id=${get(
                "user_id"
            )}&cuenta_id=${get("cuenta_id")}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    return false;
                }
            })
            .then((res) => {
                if (res != false) {
                    if (res.data.length == 0) {
                        alert("No existe una lista de script configurada");
                    } else {
                        let datos = [];
                        res.data.forEach((item) => {
                            datos.push({
                                name: item.name,
                                script: item.script,
                                status: !!item.status,
                            });
                        });
                        set("scriptList", datos);
                    }
                } else {
                    //   alert("Token invalido presiona aceptar para relogear");
                    //    window.location.reload();
                }
            });
    }

    function registro_saldo() {
        fetch(SERVER_URL + "/api/balance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                user_id: get("user_id"),
                cuenta_id: get("cuenta_id"),
                balance: consulta_saldo(null, false),
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                //     console.log('actualizando saldo');
            });
    }

    /*****************************appen login******************************/
    async function requestDataLogin() {
        let request = fetch(SERVER_URL + "/api/cuenta/share_key", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                user_id: get("user_id"),
                share_key: atob(get("shared_key")),
                email: get("appen_email"),
            }),
        });
        let respuesta = await request;
        let datos = await respuesta.json();

        if (respuesta.status == 200 && respuesta.ok == true) {
            //       console.log("consulto shared_key");
            return datos;
        } else {
            const message = `Un error ha ocurrido: ${respuesta.status}`;
            throw new Error(message);
        }
    }

    function msj_baneo(url) {
        if (url.includes("banned_user")) {
            //     console.log('Cuenta baneada');
            document
                .querySelector(".mensaje-status-banned")
                .classList.remove("ocultar");
            notificarBaneo();

            fetch(SERVER_URL + "/api/banned", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    user_id: get("user_id"),
                    cuenta_id: get("cuenta_id"),
                }),
            })
                .then((res) => res.text())
                .then((res) => {
                    //   console.log(res);
                });

            registro_saldo();
        }
    }

    function notifystatus(new_status) {
        fetch(SERVER_URL + "/api/notifyStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                user_id: get("user_id"),
                cuenta_id: get("cuenta_id"),
                status: new_status,
            }),
        })
            .then((res) => res.text())
            .then((res) => {
                //   console.log(res);
            });
    }

    function registrar_session(link, callback, secundaryFnc) {
        //    console.log('Registrando sesión...');
        GM_xmlhttpRequest({
            method: "GET",
            url: link,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            onload: function (res) {
                let rsp = JSON.parse(res.responseText);
                if (rsp.id != undefined) {
                    //    console.log(rsp.id,"inicio sesion con exito.");
                    count_annotate_login = 0;
                    aumentar_contador(".n_login", ++n_login_an);
                    //    console.log('callback extra',callback);
                    if (callback != null) {
                        callback(secundaryFnc);
                    }
                } else {
                    //    console.log("usuario y contraseña incorrecta");
                    count_annotate_login++;
                    if (count_annotate_login == max_login) {
                        //      console.log("mucho intentos");
                        document
                            .querySelector(".mensaje-status-annotate")
                            .classList.remove("ocultar");
                        notificarUser(
                            "Se agotaron los intentos pra iniciar sesión en annotate.appen.com",
                            `${get(
                                "cliente_name"
                            )} Login fail annotate.appen.com <@&917476144054427668>`
                        );
                        notifystatus(2); //2 es login error
                    }
                    setTimeout(function () {
                        annotate_login(callback, secundaryFnc);
                    }, 3000);
                }
            },
            onerror: function (res) {
                notificarError(
                    `sincronizando sesión MODO - onerror`,
                    `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                );
            },
            ontimeout: function (res) {
                notificarError(
                    `sincronizando sesión MODO - ontimeout`,
                    `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                );
            },
        });
    }

    function annotate_login(callback = null, secundaryFnc = null) {
        if (count_annotate_login < max_login) {
            requestDataLogin()
                .then((json) => {
                    let email = json.success.email;
                    let password = json.success.password;

                    fetch(`${FECA_PROXY_URL}/auth/keycloak`)
                        .then((res) => {
                            if (res.status == 200) {
                                return res.json();
                            } else {
                                notificarError(
                                    `consultando ${FECA_PROXY_URL}/auth/keycloak MODO - status, se volvera a intentar`,
                                    `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                                );
                                setTimeout(function () {
                                    annotate_login(callback, secundaryFnc);
                                }, 10000);
                                return false;
                            }
                        })
                        .then((res) => {
                            console.log("url de keycloak", res.redirectUrl);
                            if (res != false) {
                                /* if(res.redirectUrl.includes('microsoftonline')){
                                 console.log("link diferente",res.redirectUrl);
                                 notificarUser(res.redirectUrl,`el link devuelto por ${FECA_PROXY_URL+'/auth/keycloak'} es diferente`);
     
                             }*/
                                GM_xmlhttpRequest({
                                    method: "GET",
                                    url: res.redirectUrl,
                                    //   'timeout':10000,
                                    onload: function (response) {
                                        let doc = parser.parseFromString(
                                            response.responseText,
                                            "text/html"
                                        );

                                        if (doc.querySelector("form") != null) {
                                            //             console.log('Iniciando sesión por formulario');
                                            let param = new URLSearchParams({
                                                username: email,
                                                password: password,
                                                credentialId: "",
                                            });
                                            GM_xmlhttpRequest({
                                                method: "POST",
                                                url: doc.querySelector("form")
                                                    .action,
                                                data: param.toString(),
                                                headers: {
                                                    "Content-Type":
                                                        "application/x-www-form-urlencoded",
                                                },
                                                onload: function (res) {
                                                    registrar_session(
                                                        FECA_PROXY_URL +
                                                            "/auth/keycloak/callback?" +
                                                            res.finalUrl.split(
                                                                "?"
                                                            )[1],
                                                        callback,
                                                        secundaryFnc
                                                    );
                                                },
                                                onerror: function (res) {
                                                    notificarError(
                                                        `iniciando sesión en annotate_login MODO - onerror, se volvera a intentar`,
                                                        `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                                                    );
                                                    setTimeout(function () {
                                                        annotate_login(
                                                            callback,
                                                            secundaryFnc
                                                        );
                                                    }, 10000);
                                                },
                                                ontimeout: function (res) {
                                                    notificarError(
                                                        `iniciando sesión en annotate_login MODO - ontimeout, se volvera a intentar`,
                                                        `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                                                    );
                                                    setTimeout(function () {
                                                        annotate_login(
                                                            callback,
                                                            secundaryFnc
                                                        );
                                                    }, 10000);
                                                },
                                            });
                                        } else {
                                            //       console.log('Iniciar sesión directamente');
                                            registrar_session(
                                                FECA_PROXY_URL +
                                                    "/auth/keycloak/callback?" +
                                                    response.finalUrl.split(
                                                        "?"
                                                    )[1],
                                                callback,
                                                secundaryFnc
                                            );
                                        }
                                    },
                                    onerror: function (res) {
                                        notificarError(
                                            `cargando el formulario de login en background MODO - onerror, se volvera a intentar`,
                                            `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                                        );
                                        setTimeout(function () {
                                            annotate_login(
                                                callback,
                                                secundaryFnc
                                            );
                                        }, 10000);
                                    },
                                    ontimeout: function (res) {
                                        notificarError(
                                            `cargando el formulario de login en background MODO - ontimeout, se volvera a intentar`,
                                            `Estado CODE: ${res.status} Estado TEXT: ${res.statusText}`
                                        );
                                        setTimeout(function () {
                                            annotate_login(
                                                callback,
                                                secundaryFnc
                                            );
                                        }, 10000);
                                    },
                                });
                            }
                        })
                        .catch((err) => {
                            notificarError(
                                `consultando ${FECA_PROXY_URL}/auth/keycloak MODO - CATCH, se volvera a intentar`,
                                `Estado Catch: ${err}`
                            );
                            setTimeout(function () {
                                annotate_login(callback, secundaryFnc);
                            }, 10000);
                        });
                })
                .catch((error) => {
                    alert(
                        "Esta clave compartida no es la que usaste para encriptar tu clave."
                    );
                });
        }
    }

    function account_login(link, loop_iframe) {
        if (count_account_login < max_login) {
            requestDataLogin()
                .then((json) => {
                    let email = json.success.email;
                    let password = json.success.password;

                    GM_xmlhttpRequest({
                        method: "GET",
                        url: link,
                        //    'timeout':10000,
                        onload: function (response) {
                            let doc = parser.parseFromString(
                                response.responseText,
                                "text/html"
                            );
                            let param = new URLSearchParams({
                                username: email,
                                password: password,
                                credentialId: "",
                            });
                            GM_xmlhttpRequest({
                                method: "POST",
                                url: doc.querySelector("form").action,
                                data: param.toString(),
                                headers: {
                                    "Content-Type":
                                        "application/x-www-form-urlencoded",
                                },
                                onload: function (res) {
                                    //          console.log("ultima url",res.finalUrl);

                                    msj_baneo(res.finalUrl);

                                    if (
                                        res.finalUrl.includes("login-actions")
                                    ) {
                                        //             console.log("probablemente usuario y contraseña incorrecta");
                                        count_account_login++;
                                        if (count_account_login == max_login) {
                                            //                  console.log("mucho intento");
                                            document
                                                .querySelector(
                                                    ".mensaje-status-account"
                                                )
                                                .classList.remove("ocultar");
                                            notificarUser(
                                                "Se agotaron los intentos pra iniciar sesión en account.appen.com",
                                                `${get(
                                                    "cliente_name"
                                                )} Login fail account.appen.com <@&917476144054427668>`
                                            );
                                            notifystatus(2); //2 es login error
                                        }
                                    } else {
                                        count_account_login = 0;
                                    }

                                    if (!res.finalUrl.includes("banned_user")) {
                                        if (!continue_task_search) {
                                            continue_task_search = true;
                                            setTimeout(
                                                loop_iframe,
                                                loop_iframe_time
                                            );
                                        }
                                        play_all();
                                    }
                                },
                                onerror: function (resp) {
                                    notificarError(
                                        `iniciando sesión en account_login MODO - onerror`,
                                        `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                                    );
                                },
                                ontimeout: function (resp) {
                                    notificarError(
                                        `iniciando sesión en account_login MODO - ontimeout`,
                                        `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                                    );
                                },
                            });
                        },
                        onerror: function (resp) {
                            notificarError(
                                `cargando el formulario de login (BG) en account_login MODO - onerror`,
                                `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                            );
                        },
                        ontimeout: function (resp) {
                            notificarError(
                                `cargando el formulario de login (BG) en account_login MODO - ontimeout`,
                                `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                            );
                        },
                    });
                })
                .catch((error) => {
                    alert(
                        "Esta clave compartida no es la que usaste para encriptar tu clave."
                    );
                });
        }
    }

    /**************************zona iframe list********************************/
    function iframe() {
        if (get("appen_email").includes(email_vpn_notifications)) {
            is_notify_vpn = true;
        }
        if (get("appen_email").includes(email_nac_notifications)) {
            is_notify_nac = true;
        }
        setTimeout(function loop_iframe() {
            if (continue_task_search) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: FECA_PROXY_URL + "/v1/tasks/iframe_url",
                    responseType: "json",
                    timeout: 10000,
                    onload: function (resp) {
                        if (resp.status == 200) {
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: resp.response.url,
                                timeout: 10000,
                                onload: function (res) {
                                    if (res.status == 200) {
                                        aumentar_contador(
                                            ".rs",
                                            ++resquest_count
                                        );
                                        //       console.log('loop_iframe');

                                        doc = parser.parseFromString(
                                            res.responseText,
                                            "text/html"
                                        );
                                        page_data = doc.querySelector(
                                            "#task-listing-datatable"
                                        );

                                        if (page_data != null) {
                                            data_tareas = JSON.parse(
                                                page_data.dataset.tasks
                                            );
                                            task_history(data_tareas);

                                            tareas_filtradas =
                                                filtrarExceptionList(
                                                    data_tareas
                                                );
                                            lista_incluidos =
                                                get("includeList") || [];

                                            if (
                                                is_notify_vpn ||
                                                is_notify_nac
                                            ) {
                                                tareas_previas =
                                                    get("previousTaskList") ||
                                                    [];

                                                if (
                                                    tareas_previas.length == 0
                                                ) {
                                                    set(
                                                        "previousTaskList",
                                                        tareas_filtradas
                                                    );
                                                }
                                                is_in_prev_task = false;
                                                task_socket_emit = [];

                                                if (
                                                    get("notificacion") != null
                                                ) {
                                                    let notify_temp =
                                                        get("notificacion");
                                                    if (
                                                        notify_temp.length > 0
                                                    ) {
                                                        notify_temp.forEach(
                                                            (item) => {
                                                                //60 minutos
                                                                if (
                                                                    new Date() -
                                                                        item.date >=
                                                                    60 *
                                                                        60 *
                                                                        1000
                                                                ) {
                                                                    //eliminar de la lista las tareas que se notificaron pasados los 10 minutos
                                                                    notify_temp =
                                                                        notify_temp.filter(
                                                                            (
                                                                                task
                                                                            ) =>
                                                                                task.task !==
                                                                                item.task
                                                                        );
                                                                }
                                                            }
                                                        );
                                                        set(
                                                            "notificacion",
                                                            notify_temp
                                                        );
                                                    }
                                                }
                                            }
                                            //aqui selecciono cada uno de los indices de los elementos de la tarea correspondientes a sus datos
                                            tareas_filtradas.forEach((task) => {
                                                let tarea_id = task[0]; //0 id
                                                let tarea_nombre = task[1]; //1 nombre
                                                let tarea_nivel = task[2]; //2 el nivel
                                                let tarea_pago = task[4]; //4 tarea_pago
                                                let tarea_num = task[5]; //5 numero de tareas
                                                let secret_key_get = task[12]; //12 secrect get
                                                let link_tarea = `https://account.appen.com/channels/feca/tasks/${tarea_id}?secret=${secret_key_get}`;

                                                if (
                                                    is_notify_vpn ||
                                                    is_notify_nac
                                                ) {
                                                    tareas_previas.forEach(
                                                        (element) => {
                                                            if (
                                                                tarea_id ===
                                                                element[0]
                                                            ) {
                                                                is_in_prev_task = true;
                                                            }
                                                        }
                                                    );

                                                    if (!is_in_prev_task) {
                                                        if (is_notify_vpn) {
                                                            let encontro = false;
                                                            let is_youtube = false;

                                                            if (
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "youtube video"
                                                                    ) ||
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "is this video"
                                                                    ) ||
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "are these video"
                                                                    ) ||
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "does this video"
                                                                    ) ||
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "do these video"
                                                                    ) ||
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "is this youtube"
                                                                    ) ||
                                                                tarea_nombre
                                                                    .toLowerCase()
                                                                    .includes(
                                                                        "son estos videos de you"
                                                                    )
                                                            ) {
                                                                is_youtube = true;
                                                            }

                                                            if (
                                                                tarea_nivel ==
                                                                    0 &&
                                                                tarea_num == 0
                                                            ) {
                                                                //filtradas y lv 0 nuevas.
                                                                if (
                                                                    is_youtube ||
                                                                    tarea_nombre
                                                                        .toLowerCase()
                                                                        .includes(
                                                                            "tiktok"
                                                                        )
                                                                ) {
                                                                    notificarFiltro(
                                                                        task,
                                                                        link_tarea,
                                                                        "FILTRO"
                                                                    );
                                                                    notificarNormal(
                                                                        task,
                                                                        link_tarea,
                                                                        "FILTRO"
                                                                    );
                                                                } else {
                                                                    if (
                                                                        !tarea_nombre
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                "welcome to appen"
                                                                            )
                                                                    ) {
                                                                        notificarNormal(
                                                                            task,
                                                                            link_tarea,
                                                                            "Filtro/LV-0"
                                                                        );
                                                                    }
                                                                }
                                                            }

                                                            if (
                                                                tarea_nivel >
                                                                    0 &&
                                                                tarea_num == 0
                                                            ) {
                                                                //  if(tarea_num==0 && is_youtube==false || tarea_num>=100 && is_youtube==true){
                                                                white_list.forEach(
                                                                    (
                                                                        elemts
                                                                    ) => {
                                                                        if (
                                                                            tarea_nombre
                                                                                .toLowerCase()
                                                                                .includes(
                                                                                    elemts.toLowerCase()
                                                                                )
                                                                        ) {
                                                                            notificarWhite(
                                                                                task,
                                                                                link_tarea,
                                                                                "WHITE"
                                                                            );
                                                                            notificarNormal(
                                                                                task,
                                                                                link_tarea,
                                                                                "WHITE"
                                                                            );
                                                                            encontro = true;
                                                                        }
                                                                    }
                                                                );

                                                                if (!encontro) {
                                                                    if (
                                                                        !tarea_nombre
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                "market research job"
                                                                            )
                                                                    ) {
                                                                        verificar_notificacion(
                                                                            task,
                                                                            link_tarea,
                                                                            tarea_id,
                                                                            "NEW JOB"
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (is_notify_nac) {
                                                            ////////////NOTIFICAR NACIONALES//////////////
                                                            nac_list.forEach(
                                                                (nac) => {
                                                                    if (
                                                                        tarea_nombre
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                nac.task.toLowerCase()
                                                                            )
                                                                    ) {
                                                                        if (
                                                                            tarea_num ==
                                                                            0
                                                                        ) {
                                                                            ///notificar solo cuando es tarea_num = 0, eso si no va a cambiar
                                                                            verificar_notificacion(
                                                                                task,
                                                                                link_tarea,
                                                                                tarea_id,
                                                                                "JOB NACIONAL"
                                                                            );
                                                                        }
                                                                    }
                                                                }
                                                            );
                                                        }
                                                    } else {
                                                        is_in_prev_task = false;
                                                    }
                                                }

                                                if (is_notify_nac) {
                                                    ////////////PEGAR LINK//////////////
                                                    nac_list.forEach((nac) => {
                                                        if (
                                                            tarea_nombre
                                                                .toLowerCase()
                                                                .includes(
                                                                    nac.task.toLowerCase()
                                                                )
                                                        ) {
                                                            if (nac.socket) {
                                                                //si es true
                                                                task_socket_emit.push(
                                                                    {
                                                                        tarea_nombre:
                                                                            tarea_nombre,
                                                                        link_tarea:
                                                                            link_tarea,
                                                                        tarea_id:
                                                                            tarea_id,
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    });
                                                }

                                                if (allow_create_task) {
                                                    if (
                                                        !tarea_nombre
                                                            .toLowerCase()
                                                            .includes(
                                                                "orginfer"
                                                            ) ||
                                                        (tarea_nombre
                                                            .toLowerCase()
                                                            .includes(
                                                                "orginfer"
                                                            ) &&
                                                            tarea_num >= 10)
                                                    ) {
                                                        lista_incluidos.forEach(
                                                            (elemts) => {
                                                                if (
                                                                    tarea_nombre
                                                                        .toLowerCase()
                                                                        .includes(
                                                                            elemts.task.toLowerCase()
                                                                        )
                                                                ) {
                                                                    if (
                                                                        !buscador_existe(
                                                                            tarea_id,
                                                                            link_tarea
                                                                        )
                                                                    ) {
                                                                        if (
                                                                            elemts.active
                                                                        ) {
                                                                            crear_buscador(
                                                                                tarea_nombre,
                                                                                link_tarea,
                                                                                tarea_id
                                                                            );
                                                                        }
                                                                    } else {
                                                                        if (
                                                                            !elemts.active
                                                                        ) {
                                                                            document
                                                                                .querySelector(
                                                                                    ".buscador_" +
                                                                                        tarea_id
                                                                                )
                                                                                ?.querySelector(
                                                                                    ".cerrar_card"
                                                                                )
                                                                                .click();
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        );
                                                    }
                                                }
                                            });
                                            //hacer el emit de todo lo que se colecto
                                            if (
                                                is_notify_nac &&
                                                task_socket_emit.length > 0
                                            ) {
                                                socket.emit(
                                                    "pegar-link-task",
                                                    task_socket_emit
                                                );
                                            }

                                            if (
                                                is_notify_vpn ||
                                                is_notify_nac
                                            ) {
                                                set(
                                                    "previousTaskList",
                                                    tareas_filtradas
                                                );
                                            }

                                            setTimeout(
                                                loop_iframe,
                                                loop_iframe_time
                                            );
                                        } else {
                                            document
                                                .querySelector(
                                                    ".mensaje-status-vpn_restricted"
                                                )
                                                .classList.remove("ocultar");
                                            notificarUser(
                                                "VPN detected / Location Restricted",
                                                `${get(
                                                    "cliente_name"
                                                )} VPN detected / Location Restricted <@&917476144054427668>`
                                            );
                                            notifystatus(1); //1 es VPN/restricted
                                        }
                                    } else {
                                        aumentar_contador(
                                            ".re",
                                            ++error_resquest_count
                                        );
                                        //          console.log(res.status+' '+res.statusText);
                                        setTimeout(
                                            loop_iframe,
                                            loop_iframe_time
                                        );
                                    }
                                },
                                onerror: function (resp) {
                                    aumentar_contador(
                                        ".re",
                                        ++error_resquest_count
                                    );
                                    //       console.log(resp.status+' '+resp.statusText);
                                    setTimeout(loop_iframe, loop_iframe_time);
                                },
                                ontimeout: function (resp) {
                                    aumentar_contador(
                                        ".rt",
                                        ++timeout_resquest_count
                                    );
                                    setTimeout(loop_iframe, loop_iframe_time);
                                },
                            });
                        } else if (resp.status === 401) {
                            //notificarError(`consultando loop_iframe (lista de trabajos) status: ${resp.status}, se ejecutara annotate_login`, `Estado CODE: ${resp.status} Estado TEXT:${resp.statusText}`);
                            annotate_login(iframe);
                            //setTimeout(loop_iframe,loop_iframe_time);
                        } else {
                            //notificarError(`consultando loop_iframe (lista de trabajos) status: ${resp.status}, el iframe volvera a intentar`, `Estado CODE: ${resp.status} Estado TEXT:${resp.statusText}`);
                            //por si ni es respuesta correcta ni necesita loggin
                            setTimeout(loop_iframe, loop_iframe_time);
                        }
                    },
                    onerror: function (resp) {
                        //       console.log(resp.status+' '+resp.statusText);
                        setTimeout(loop_iframe, loop_iframe_time);
                    },
                    ontimeout: function (resp) {
                        //         console.log('timeout iframe url');
                        setTimeout(loop_iframe, loop_iframe_time);
                    },
                });
            } else {
                //      console.log("toca loguear en account");
                GM_xmlhttpRequest({
                    url: `${ACCOUNT_URL}/auth/keycloak`,
                    //      'timeout':50000,
                    onload: function (resp) {
                        //  console.log("account login link ",resp.finalUrl);
                        if (resp.status == 200) {
                            if (resp.finalUrl.includes("banned_user")) {
                                msj_baneo(resp.finalUrl);
                            } else if (resp.finalUrl.includes("signature")) {
                                //           console.log('Inicio por Signature');
                                if (!continue_task_search) {
                                    continue_task_search = true;
                                    setTimeout(loop_iframe, loop_iframe_time);
                                }
                                play_all();
                            } else if (
                                resp.finalUrl.includes("openid-connect")
                            ) {
                                //           console.log("Re-formulario",resp.finalUrl);
                                account_login(resp.finalUrl, loop_iframe);
                            } else {
                                if (!continue_task_search) {
                                    continue_task_search = true;
                                    setTimeout(loop_iframe, loop_iframe_time);
                                }
                                play_all();
                            }
                        } else {
                            notificarError(
                                `consultando ${ACCOUNT_URL}/auth/keycloak MODO continue_task_search - status, se volvera a intentar`,
                                `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                            );
                            setTimeout(function () {
                                setTimeout(loop_iframe, loop_iframe_time);
                            }, 10000);
                        }
                    },
                    onerror: function (resp) {
                        notificarError(
                            `consultando ${ACCOUNT_URL}/auth/keycloak MODO continue_task_search - onerror, se volvera a intentar`,
                            `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                        );
                        setTimeout(function () {
                            setTimeout(loop_iframe, loop_iframe_time);
                        }, 10000);
                    },
                    ontimeout: function (resp) {
                        notificarError(
                            `consultando ${ACCOUNT_URL}/auth/keycloak MODO continue_task_search - ontimeout, se volvera a intentar`,
                            `Estado CODE: ${resp.status} Estado TEXT: ${resp.statusText}`
                        );
                        setTimeout(function () {
                            setTimeout(loop_iframe, loop_iframe_time);
                        }, 10000);
                    },
                });
            }
        }, 500);
    }

    function verificar_notificacion(task, link_tarea, tarea_id, name) {
        if (get("notificacion") != null) {
            let notify_temp = get("notificacion");
            if (notify_temp.length > 0) {
                //si hay registro
                if (!notify_temp.some((item) => item.task === tarea_id)) {
                    //si no encuentro la task en la lista la agrego a dicha lista y notifico
                    notify_temp.push({
                        task: tarea_id,
                        date: new Date().getTime(),
                    });
                    set("notificacion", notify_temp);
                    notificarNormal(task, link_tarea, name);
                } else {
                    //si esta en la lista actualizo el tiempo para que no se vuelta a notificar tan pronto
                    notify_temp = notify_temp.filter(
                        (task) => task.task !== tarea_id
                    );
                    notify_temp.push({
                        task: tarea_id,
                        date: new Date().getTime(),
                    });
                    set("notificacion", notify_temp);
                }
            } else {
                //si no hay registros, lleno con la primera task y notifico
                notify_temp.push({
                    task: tarea_id,
                    date: new Date().getTime(),
                });
                set("notificacion", notify_temp);
                notificarNormal(task, link_tarea, name);
            }
        } else {
            //si no existe la variable, la creo
            set("notificacion", []);
        }
    }

    function filtrarExceptionList(tareas) {
        let lista_block = get("exceptionList") || [];
        lista_block.forEach((key) => {
            tareas = tareas.filter((filtro) => {
                if (
                    (key.id == "*" &&
                        filtro[1]
                            .toLowerCase()
                            .includes(key.task.toLowerCase()) &&
                        key.active == true) ||
                    (key.id == filtro[0] && key.active == true)
                ) {
                    //   console.log('remover',key);
                    return false;
                } else {
                    return true;
                }
            });
        });
        return tareas;
    }

    function task_history(task_list) {
        let temp_tlist = get("task_history") || data_task_model(task_list);
        temp_tlist.forEach((temp) => {
            task_list = task_list.filter((filtro) => temp.id != filtro[0]);
        });

        Array.prototype.push.apply(temp_tlist, data_task_model(task_list));
        set("task_history", temp_tlist);
    }

    function data_task_model(task_list) {
        return task_list.map((result) => {
            return { id: result[0], task: result[1] };
        });
    }

    /**************************appen task********************************/
    function buscador_existe(id_tarea, url) {
        // console.log('ejecutando buscador_existe');

        let element = document.querySelector(".buscador_" + id_tarea);
        if (element != null) {
            //  element.querySelector(".count").innerText=parseInt(0);
            element.querySelector(".task_url").setAttribute("href", url);
            element.setAttribute("data-href", url);
            return true;
        }
        return false;
    }

    function disabled_temp(check) {
        check.setAttribute("disabled", "disabled");

        setTimeout(function () {
            check.removeAttribute("disabled");
        }, 3000);
    }

    function crear_buscador(tarea_nombre, tarea_link, tarea_id) {
        let buscador_elem = document.querySelector(".buscador");
        let clon = buscador_elem.cloneNode(true);

        clon.classList.remove("buscador");
        clon.classList.remove("ocultar");
        clon.classList.add("card_buscador");
        clon.classList.add("buscador_" + tarea_id);
        clon.setAttribute("data-href", tarea_link);
        clon.querySelector(".task_id").innerText = `[${tarea_id}]`;
        clon.querySelector(".task_url").setAttribute("href", tarea_link);
        clon.querySelector(".task_url").innerText = tarea_nombre;
        let card_status = clon.querySelector(".status_card");

        let buscando = clon.querySelector(".buscando_val");
        let encontrado = clon.querySelector(".encontrado_val");

        let check_btn = clon.querySelector("input[type=checkbox]");
        let h_btn_buscar = clon.querySelector(".hide_btn_buscador");

        let instancia = {
            buscador: clon,
            task_id: tarea_id,
            check: check_btn,
            btn_buscar: h_btn_buscar,
            buscando: buscando,
            encontrado: encontrado,
            windows: null,
        };

        if (tarea_nombre.length >= 100) {
            clon.querySelector(".task_url").classList.add("text_url_reduce");
        }

        check_btn.addEventListener("change", function () {
            if (this.checked) {
                card_status.innerText = "ACTIVO";
                h_btn_buscar.click();
                //       console.log("instancia windows",instancia.windows);
            } else {
                card_status.innerText = "PAUSADO";
                clon.classList.remove("activo");
                //       console.log("instancia windows",instancia.windows);
                if (instancia.windows != null) {
                    if (!instancia.windows.closed) {
                        instancia.windows.close();
                    }
                }
            }
            disabled_temp(this);
        });

        h_btn_buscar.addEventListener("click", function (e) {
            e.preventDefault();
            if (!clon.className.includes("activo")) {
                clon.classList.add("activo");
                action_for_buscador(instancia);
            }
        });

        clon.querySelector(".cerrar_card").addEventListener(
            "click",
            function (e) {
                e.preventDefault();
                remover_buscador(instancia);
            }
        );

        document.querySelector(".buscador_content").append(clon);
        clon.querySelector(".hide_btn_buscador").click();
    }

    function remover_buscador(instancia) {
        instancia.buscador.classList.remove("activo");
        instancia.buscador.remove();
        instancia.btn_buscar = null;
        if (instancia.windows != null) {
            if (!instancia.windows.closed) {
                instancia.windows.close();
            }
        }
    }

    function action_for_buscador(instancia) {
        let buscador = instancia.buscador;
        let url = null;

        setTimeout(function start() {
            url = buscador.dataset.href;
            if (
                buscador.className.includes("activo") &&
                instancia.check.checked
            ) {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    //      'timeout':15000,
                    onload: function (resp) {
                        //  console.log('consulta task',resp.status,buscador.querySelector('.task_url').innerText,url);
                        //    console.log(instancia.task_id,buscador.querySelector('.task_url').innerText);
                        if (resp.status == 200) {
                            if (resp.finalUrl.includes("view")) {
                                //  if(resp.finalUrl.includes('view') || resp.finalUrl.includes('task')){
                                instancia.encontrado.innerText =
                                    parseInt(instancia.encontrado.innerText) +
                                        1 || 1;
                                buscador.classList.remove("activo");
                                buscador.classList.add("task_open");
                                buscador.classList.add("change_bg");

                                if (!resp.responseText.includes("expelled")) {
                                    let ventana_temp = null;
                                    if (get("openTabBackground")) {
                                        ventana_temp = GM_openInTab(
                                            resp.finalUrl
                                        );
                                    } else {
                                        ventana_temp = GM_openInTab(
                                            resp.finalUrl,
                                            false
                                        );
                                    }
                                    instancia.windows = ventana_temp;

                                    all_tabs.push({
                                        task_id: instancia.task_id,
                                        instancia: instancia,
                                    });

                                    setTimeout(function () {
                                        if (get("autoClose")) {
                                            ventana_temp.close();
                                        }
                                        if (!ventana_temp.closed) {
                                            notificarUser(
                                                `${
                                                    buscador.querySelector(
                                                        ".task_url"
                                                    ).innerText
                                                }`,
                                                `Task abierta desde hace ${
                                                    autoCloseTime / 60 / 1000
                                                } minutos`
                                            );
                                        }
                                    }, autoCloseTime);
                                    ventana_temp.onclose = function () {
                                        //si una tarea da expelled mientras esta en work mode, esto intenta conseguir el titulo del task en el history
                                        //si son tareas como certain que nunca sale en USA pero se puede pegar el link no esta registrada en el historial
                                        //asi que si expelled en workmode dira 'titulo no disponible'
                                        if (!!get("expelled_from_view")) {
                                            let tarea_id =
                                                get("expelled_from_view");
                                            add_exception({
                                                id: tarea_id,
                                                task: existe_in_history(
                                                    tarea_id
                                                ),
                                                type: "EXPELLED",
                                                auto_gen: true,
                                                active: true,
                                            });
                                            document
                                                .querySelector(
                                                    ".buscador_" + tarea_id
                                                )
                                                ?.querySelector(".cerrar_card")
                                                .click();
                                            set("expelled_from_view", false);
                                        }
                                        if (instancia.check.checked) {
                                            if (instancia.btn_buscar != null) {
                                                instancia.btn_buscar.click();
                                            }
                                        }
                                        instancia.windows = null;
                                        buscador.classList.remove("task_open");
                                        all_tabs = all_tabs.filter(
                                            (tabs) =>
                                                tabs.task_id !=
                                                instancia.task_id
                                        );
                                    };
                                } else {
                                    add_exception({
                                        id: instancia.task_id,
                                        task: buscador.querySelector(
                                            ".task_url"
                                        ).innerText,
                                        type: "EXPELLED",
                                        auto_gen: true,
                                        active: true,
                                    });
                                    remover_buscador(instancia);
                                }
                            } else if (resp.responseText.includes("maximum")) {
                                add_exception({
                                    id: instancia.task_id,
                                    task: buscador.querySelector(".task_url")
                                        .innerText,
                                    type: "MAXIMUM",
                                    auto_gen: true,
                                    active: true,
                                });
                                remover_buscador(instancia);
                            } else if (
                                resp.responseText.includes(
                                    "completed all your work"
                                )
                            ) {
                                add_exception({
                                    id: instancia.task_id,
                                    task: buscador.querySelector(".task_url")
                                        .innerText,
                                    type: "COMPLETED",
                                    auto_gen: true,
                                    active: true,
                                });
                                remover_buscador(instancia);
                            } else if (resp.responseText.includes("Expired")) {
                                //remover_buscador(instancia, remover_link_serve);
                                remover_buscador(instancia);
                            } else {
                                if (buscador.className.includes("change_bg")) {
                                    //            console.log('removiendo los bg');
                                    buscador.classList.remove("error_unknown");
                                    buscador.classList.remove(
                                        "error_server_500"
                                    );
                                    buscador.classList.remove("task_open");
                                    buscador.classList.remove("change_bg");
                                }
                                instancia.buscando.innerText =
                                    parseInt(instancia.buscando.innerText) +
                                        1 || 1;
                                setTimeout(start, 6000);
                            }
                        } else if (resp.status == 404) {
                            if (resp.finalUrl.includes("sessions/new")) {
                                buscador.classList.remove("activo");
                                continue_task_search = false;
                            } else {
                                notificarUser(
                                    resp.finalUrl,
                                    `Acción del buscador error ${resp.status}: La URL no es sessions/new`
                                );
                            }
                        } else if (resp.status == 500) {
                            //error internal server
                            buscador.classList.add("error_server_500");
                            buscador.classList.add("change_bg");
                            //no nos vamos a parar por un error en el server solo le vamos a dar mas tiempo a que se recupere la conexion
                            setTimeout(start, 6000);
                        } else {
                            buscador.classList.add("error_unknown");
                            buscador.classList.add("change_bg");
                            //           console.log(resp.status+' '+resp.statusText);
                            setTimeout(start, 6000);
                        }
                    },
                    ontimeout: function () {
                        //          console.log("time out in task");
                        setTimeout(start, 6000);
                    },
                    onerror: function () {
                        //         console.log("error in task");
                        setTimeout(start, 6000);
                    },
                });
            }
        });
    }

    /******************zona login********************/
    var activar_frames = function () {
        document.querySelector(".container-fluid").classList.remove("ocultar");
        if (get("user_id") == null) {
            document.querySelector(".panel_login").classList.remove("ocultar");
        } else if (get("user_id") != null && get("shared_key") == null) {
            cargar_select_cuenta();
            document.querySelector(".panel_select").classList.remove("ocultar");
        }
    };

    var cargar_select_cuenta = function () {
        fetch(SERVER_URL + "/api/cuenta?user_id=" + get("user_id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    return false;
                }
            })
            .then((res) => {
                if (res != false) {
                    select = document.querySelector(".cuenta_appen");
                    res.success.forEach((ele) => {
                        let texto = ele.email;
                        if (ele.cantidad > 0) {
                            texto = ele.email + " (" + ele.cantidad + ")";
                        }
                        var opt = document.createElement("option");
                        opt.value = ele.id;
                        opt.setAttribute("data-email", ele.email);
                        opt.innerHTML = texto;
                        select.appendChild(opt);
                    });
                }
            });
    };

    var add_btn_func_login = function () {
        document
            .querySelector("#form-login-sam")
            .addEventListener("submit", function (e) {
                e.preventDefault();

                let email = document.querySelector(".username").value;
                let password = document.querySelector(".password").value;

                fetch(SERVER_URL + "/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email: email, password: password }),
                })
                    .then((res) => {
                        if (res.status == 200) {
                            return res.json();
                        } else {
                            return false;
                        }
                    })
                    .then((res) => {
                        if (res != false) {
                            if (res.success != undefined) {
                                set("user_email", email);
                                set("user_id", res.success.id);
                                set("token", res.success.token);
                                set("cliente_name", res.success.cliente_name);
                                window.location.reload();
                            } else {
                                alert("Usuario ó contraseña incorrecta.");
                            }
                        } else {
                            alert("Usuario ó contraseña incorrecta.");
                        }
                    });
            });

        document
            .querySelector(".btn_start")
            .addEventListener("click", function (e) {
                e.preventDefault();

                let vps_name = document.querySelector(".vps_name");
                let cuenta_appen = document.querySelector(".cuenta_appen");
                let shared_key = document.querySelector(".shared_key");

                let id = cuenta_appen.querySelector(":checked").value;
                let email =
                    cuenta_appen.querySelector(":checked").dataset.email;

                if (vps_name.value == "") {
                    alert("Agrega un nombre para identificar tu VPS.");
                } else if (cuenta_appen.value == "0") {
                    alert("Selecciona tu cuenta de Appen.");
                } else if (shared_key.value == "") {
                    alert("Ingresa la clave compartida.");
                } else if (shared_key.value.length != 16) {
                    alert("La clave compartida es de 16 caracteres.");
                } else {
                    fetch(SERVER_URL + "/api/cuenta/store", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            vps_name: vps_name.value.toUpperCase(),
                            cuenta_id: id,
                            hash: "",
                        }),
                    })
                        .then((res) => {
                            if (res.status == 200) {
                                return res.json();
                            } else {
                                return false;
                            }
                        })
                        .then((res) => {
                            if (res != false) {
                                set("vps_id", res.id);
                                set("cuenta_id", res.cuenta_id);
                                set("vps_name", res.name);
                                set("appen_email", email);
                                set("shared_key", btoa(shared_key.value));
                                window.location.reload();
                            } else {
                                alert(
                                    "Token invalido presiona aceptar para relogear"
                                );
                                window.location.reload();
                            }
                        });
                }
            });
    };
    var time_submit = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var not_notify = function () {
        return document.querySelectorAll(".notify:not(.ocultar)").length == 0;
    };

    var reload_with_check_tabs = function () {
        all_tabs.forEach((tab) => {
            tab.instancia.check.click();
        });
        setTimeout(() => {
            win.location.reload();
        }, 1000);
    };

    return {
        inicializar: async function (fnc = []) {
            GM_xmlhttpRequest = fnc.GM_xmlhttpRequest;
            get = fnc.GM_getValue;
            set = fnc.GM_setValue;
            GM_openInTab = fnc.GM_openInTab;
            GM_deleteValue = fnc.GM_deleteValue;
            win = fnc.win;
            fetchInject = fnc.fetchInject;
            io = fnc.io;

            document.head.querySelector("title").innerText = "Task Manager";
            /***************elimino elementos por defecto******************/
            document.head
                .querySelectorAll("style,link,script")
                .forEach((item) => {
                    item.remove();
                });
            document.body.querySelectorAll("div,script").forEach((item) => {
                item.remove();
            });
            /******Creo mi propia etiqueta head y cargo el css*************/
            let etiqueta_css = document.createElement("style");
            etiqueta_css.setAttribute("type", "text/css");
            fetch(URL_FETCH + "taskmanager_pro.css", { cache: "no-store" })
                .then((res) => res.text())
                .then((res_css) => (etiqueta_css.innerHTML = res_css));
            document.head.append(etiqueta_css);

            //espero que cargue el html ya que seguramente lo necesite para poder manipular los elementos
            await add_html();
            if (url.includes("taskManager-login")) {
                //si estoy autorizado no es necesario logear, si se fuerza la url debe redireccionar
                if (!authorization()) {
                    this.login();
                } else {
                    redireccionar("taskManager");
                }
                //para todo lo demas si estoy autorizado avanzo, si no debo redireccionar a login
            } else if (url.includes("taskManager-setup")) {
                if (authorization()) {
                    this.setup();
                    document
                        .querySelector(".container-fluid")
                        .classList.remove("ocultar");
                } else {
                    redireccionar("taskManager-login");
                }
            } else if (
                url.includes("taskManager") ||
                url.includes("notificador")
            ) {
                if (authorization()) {
                    this.taskmanager();
                    document
                        .querySelector(".container-fluid")
                        .classList.remove("ocultar");
                } else {
                    redireccionar("taskManager-login");
                }
            }
        },

        login: function () {
            activar_frames();
            add_btn_func_login();
        },

        taskmanager: function () {
            if (url.includes("notificador")) {
                allow_create_task = false;
            }

            document.head.querySelector("title").innerText = get("vps_name");
            //inicializa la conexion al socket
            iniciar_socket_client();
            //update inicial y arranque de iframe
            consulta_saldo(iframe);
            setTimeout(() => {
                update_config();
            }, time_submit(1000, 8000));

            setTimeout(() => {
                if (not_notify()) {
                    notifystatus(0);
                }
            }, time_submit(35000, 60000));

            /////////////UPDATES CONTINUOS/////////////////////
            setInterval(function () {
                consulta_saldo(null, false); //el saldo
                update_config(); //la config y el include

                if (not_notify()) {
                    if (request_success.textContent == last_request) {
                        reload_with_check_tabs();
                    } else {
                        last_request = request_success.textContent;
                    }
                }
            }, time_submit(1 * 60 * 1000, 4 * 60 * 1000));

            //resetear variables prescindibles
            GM_deleteValue("task_history");

            document.querySelector(".cliente_name").innerText =
                get("cliente_name");
            document.querySelector(".server_name").innerText =
                get("vps_name") + ":";
            document.querySelector(".cuenta_a").innerText = get("appen_email");

            document
                .querySelector(".btn_setup")
                .addEventListener("click", function (e) {
                    e.preventDefault();
                    redireccionar("taskManager-setup");
                });
        },

        setup: function () {
            let auto_close = document.querySelector(".auto_close");
            if (!get("autoClose")) {
                auto_close.classList.add("status_false");
            }
            auto_close.innerText = get("autoClose") ? "ACTIVO" : "INACTIVO";

            let segundo_plano = document.querySelector(".segundo_plano");
            if (!get("openTabBackground")) {
                segundo_plano.classList.add("status_false");
            }
            segundo_plano.innerText = get("openTabBackground")
                ? "ACTIVO"
                : "INACTIVO";

            tbody = document
                .querySelector(".tabla_include")
                .querySelector("tbody");
            let include_list = get("includeList") || [];

            let n_include = 0;
            include_list.forEach((item) => {
                let tr = document.createElement("tr");

                let td_n = document.createElement("td");
                let td_task = document.createElement("td");
                let td_active = document.createElement("td");
                td_n.innerText = ++n_include;
                td_task.innerText = item.task;
                td_active.innerText = item.active ? "ACTIVO" : "INACTIVO";

                td_task.classList.add("titulo_task");
                td_n.classList.add("table_n");
                td_active.classList.add("status_true");
                if (!item.active) td_active.classList.add("status_false");

                tr.appendChild(td_n);
                tr.appendChild(td_task);
                tr.appendChild(td_active);

                tbody.appendChild(tr);
            });

            tbody = document
                .querySelector(".tabla_excepciones")
                .querySelector("tbody");
            let execption_list = get("exceptionList") || [];

            let n_execption = 0;
            execption_list.forEach((item) => {
                let tr = document.createElement("tr");

                let num = document.createElement("td");
                let id = document.createElement("td");
                let titulo = document.createElement("td");
                let tipo = document.createElement("td");
                let auto_gen = document.createElement("td");
                let status = document.createElement("td");

                num.innerText = ++n_execption;
                id.innerText = item.id;
                titulo.innerText = item.task;
                tipo.innerText = item.type;

                auto_gen.innerText = item.auto_gen ? "SI" : "NO";

                status.innerText = item.active ? "ACTIVO" : "INACTIVO";

                status.classList.add("status_true");

                if (!item.active) {
                    status.classList.add("status_false");
                }

                titulo.classList.add("titulo_task");
                num.classList.add("table_n");

                tr.appendChild(num);
                tr.appendChild(id);
                tr.appendChild(titulo);
                tr.appendChild(tipo);
                tr.appendChild(auto_gen);
                tr.appendChild(status);

                tbody.appendChild(tr);
            });

            document
                .querySelector(".btn_back")
                .addEventListener("click", function (e) {
                    e.preventDefault();
                    redireccionar("taskManager");
                });

            document
                .querySelector(".btn_cerrar_ses")
                .addEventListener("click", function (e) {
                    e.preventDefault();
                    if (confirm("¿Esta seguro de cerrar la sesión?")) {
                        alert("Debes cerrar sesión en appen manualmente.");

                        GM_deleteValue("shared_key");
                        GM_deleteValue("vps_name");
                        GM_deleteValue("vps_id");
                        GM_deleteValue("cliente_name");
                        GM_deleteValue("user_email");
                        GM_deleteValue("cuenta_id");
                        GM_deleteValue("task_history");
                        GM_deleteValue("appen_email");
                        GM_deleteValue("token");
                        GM_deleteValue("user_id");

                        GM_deleteValue("autoClose");
                        GM_deleteValue("includeList");
                        GM_deleteValue("scriptList");
                        GM_deleteValue("openTabBackground");
                        GM_deleteValue("exceptionList");
                        GM_deleteValue("expelled_from_view");

                        window.location.reload();
                    }
                });
        },
    };
})();
