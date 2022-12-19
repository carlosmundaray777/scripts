var main = (function () {
    //base de url de la api
    var BASE_URL = "http://localhost:8000/api";
    BASE_URL = "https://app.webmallshop.com/api";

    var urlt = document.querySelector("#contributor-support-contact-form")
        ? new URL(
              document
                  .querySelector("#contributor-support-contact-form")
                  .getAttribute("data-src")
          )
        : "";
    var jobTitle = urlt
        ? urlt.searchParams.get("ticket[custom_job_title]")
        : "";
    var jsawesome = document.querySelectorAll(".jsawesome");
    var url = null;

    function correcion() {
        //datos formulario
        var id_task =
            document.querySelector("#assignment-job-id").innerText || "";
        var data_html = document.getElementsByTagName("*")[0].innerHTML || "";

        GM_xmlhttpRequest({
            method: "POST",
            url: BASE_URL + "/correction",
            timeout: 50000,
            data: JSON.stringify({
                id_task: id_task,
                job_name: jobTitle,
                data_html: data_html,
                user_id: get("user_id"),
                cuenta_id: get("cuenta_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
            onload: function (response) {
                //    console.log(response);
                win.close();
            },
            onerror: function (resp) {
                //      console.log("Error");
                //     console.log(resp.status+' '+resp.statusText);
                win.close();
            },
            ontimeout: function (resp) {
                //    console.log('Timeout');
                win.close();
            },
        });
    }

    return {
        init: function () {
            jsawesome.forEach((wrapper) => {
                var titleDiv = wrapper.querySelector("div");

                //cuando es rate
                if (
                    jobTitle
                        .toLowerCase()
                        .includes("rate content of animated gifs")
                ) {
                    var url = titleDiv.querySelector("img").src;
                    var span6_2 = wrapper.querySelectorAll(".span6")[1];
                    var cml_row = span6_2.querySelectorAll(".cml_row");

                    var j = 1;
                    var resp = null;
                    cml_row.forEach((cml) => {
                        if (cml.childNodes[0].className == "gold_good") {
                            resp = j;
                        }
                        j++;
                    });

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: BASE_URL + "/auto_correccion_rate",
                        data: JSON.stringify({
                            job_name: jobTitle,
                            url: url,
                            respuesta: resp,
                            user_id: get("user_id"),
                            cuenta_id: get("cuenta_id"),
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        onload: function (response) {
                            //          console.log(response);
                            if (
                                !JSON.parse(response.responseText).errors &&
                                response.status == 200
                            ) {
                                //  win.close();
                                correcion(); //al mismo tiempo que hace auto correcion que la suba al server para comprobarla.
                                //ademas que se cierre cuando la suba.
                            } else {
                                correcion();
                            }
                        },
                        onerror: function (resp) {
                            //          console.log("Error create entry");
                            //         console.log(resp.status+' '+resp.statusText);
                            correcion();
                        },
                    });
                    //cuando es youtube
                } else if (document.querySelector("h4.video-title") != null) {
                    var error = false;
                    let send_data = [];
                    jsawesome.forEach((tq) => {
                        var pares_content = tq.querySelectorAll(".cml_row");
                        var tq_title = tq
                            .querySelector(".video-title")
                            .innerText.trim()
                            .replace(/(\r\n\t|\n|\r\t)/gm, "");
                        var tq_id_youtube = tq.querySelector(
                            ".video-component>div"
                        ).dataset.ytid;

                        if (typeof tq_id_youtube === "undefined") {
                            tq_id_youtube = null;
                        }

                        var respuesta = "";
                        var position = 0;
                        var contador = 0;

                        let p = tq.querySelectorAll(".radios.cml_field");
                        contador = p.length;
                        for (var e of p.entries()) {
                            for (var pl of e[1]
                                .querySelectorAll(".cml_row label")
                                .entries()) {
                                if (
                                    pl[1].className.includes("gold_good") &&
                                    pl[1].className != ""
                                ) {
                                    respuesta = pl[0] + 1;
                                    position = e[0] + 1;
                                }
                            }
                        }
                        let data = {
                            titulo: tq_title,
                            youtube_id: tq_id_youtube,
                            contador: contador,
                            position: position,
                            resp: respuesta,
                        };
                        send_data.push(data);
                    });

                    //   console.log(send_data);

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: BASE_URL + "/auto_corrector_youtube",
                        data: JSON.stringify({
                            job_name: jobTitle,
                            data: send_data,
                            mode: 0,
                            user_id: get("user_id"),
                            cuenta_id: get("cuenta_id"),
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        onload: function (response) {
                            //          console.log(response);
                            if (
                                !JSON.parse(response.responseText).errors &&
                                response.status == 200
                            ) {
                                win.close();
                            } else {
                                correcion();
                            }
                        },
                        onerror: function (resp) {
                            //             console.log("Error create entry");
                            //            console.log(resp.status+' '+resp.statusText);
                            correcion();
                        },
                    });
                } else {
                    correcion();
                }
            });

            document.title = jobTitle;
            var para = document.createElement("P");
            para.innerText = jobTitle;
            para.align = "center";
            para.style.backgroundColor = "navy";
            para.style.color = "#fff";
            document.querySelector("#content").appendChild(para);
        },
    };
})();
