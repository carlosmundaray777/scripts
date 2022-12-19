//seteamos tiempo
setTime(60000 * 5, 65000 * 5);
//id de la guia
identifier = '1-LB22DJGG353GJ2BGE9EF';

idguia = 311443;

var ruta = "div.html-element-wrapper > table";
var atributo = "textContent";

var tq_for_update = [];

configureSet((form, submissions, keywords) => {
    return new Promise((resolve) => {
        const submissions_api = query => {
            return Object.values(Object.values(submissions).filter((el) => trato_especial_s(Object.values(el.content)[0]).includes(trato_especial_s(query.name))));
        }

        const keyword = query => {
            return Object.values(Object.values(keywords).filter((el) => query.name.toLowerCase().replace(/ /g, "").includes(el.name.toLowerCase().replace(/ /g, ""))));
        }

        jsawesome.forEach(wrapper => {

            var titleDiv = wrapper;
            var name = titleDiv.querySelector("div.html-element-wrapper > table").textContent;
            var name2 = titleDiv.querySelector("div.html-element-wrapper > table > tbody ").querySelectorAll("tr")[2].textContent.trim();

            

            //console.log(name2);

            var fill = submissions_api({ 'name': name });
            var keywordfill = keyword({ 'name': name2 });

            var tq_id = fill[0]?.id;

            var p1 = trato_especial_s(name);
            var p2 = trato_especial_s(Object.values(fill[0]?.content)[0]);

            var elements = titleDiv.querySelectorAll("a");
            elements.forEach(element => {
                element.classList.remove("validates-clicked");
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = wrapper.id + "[_clicks][]";
                input.value = element.href;
                wrapper.appendChild(input);
            });


            if (p2.includes(p1) && p2 != "") {

                wrapper.dataset.tqid = tq_id;

                console.log("existe");
                wrapper.classList.add("tq_found");
                var r = JSON.parse(Object.values(fill[0]?.content)[1]);
                let color = "Aqua";
                autofillp(wrapper, ruta, atributo, r, color);
                existe(wrapper);


            } else {
                console.log("no existe");

                if (mode.toLowerCase().includes("quiz")) {
                    tq_for_update.push(wrapper);
                }

                if (mode.toLowerCase().includes("work")) {
                    if (!wrapper.classList.contains('tq_found')) {


                        if (typeof (keywordfill[0]) != 'undefined') {
                            if (typeof (keywordfill[0].respuesta) == "string") {


                                titleDiv.style.backgroundColor = "navy";
                                titleDiv.scrollIntoView({ block: "center" });
                                wrapper.classList.add("tq_keyword_found");
                                let st = keywordfill[0].respuesta;

                                console.log(keywordfill[0].name);
                                console.log(st);

                                var primera2 = wrapper.querySelectorAll(".cml_field");
                                setTimeout(function tiempo() {
                                    primera2.forEach(tq => {
                                        var labels = tq.querySelectorAll("label");
                                        if (!tq.getAttribute("class").includes("_cf_hidden")) {
                                            labels.forEach(label => {
                                                var r1 = trato_especial_s(label.textContent);
                                                var r2 = trato_especial_s(st);
                                                if (r1.includes(r2)) {
                                                    var input = label.querySelector("input");
                                                    if (input.type == "radio") { input.checked = 1 }
                                                    input.click();
                                                }
                                            });
                                        }
                                    });
                                }, 500);
                            }
                        }
                    }

                }


            }
        });
        resolve('listo!');
    });
});
configLogica_notq_wm((wrapper) => {
    var pares_content = wrapper.querySelectorAll(".checkboxes.cml_field");
    var titleDiv = wrapper;
    if (typeof (form[3]) != 'undefined') {
        if (typeof (form[3]) == "string") {
            // titleDiv.style.backgroundColor = "silver";
            titleDiv.scrollIntoView({ block: "center" });
            let st = String(form[3]);
            for (var pregg of pares_content.entries()) {
                let radios = pregg[1].querySelectorAll(".checkboxes.cml_field input");
                let indice = getRandomInt(1, 7);
                if (indice !== -1) {
                    //radios[indice].checked=1;
                    radios[indice].click();
                }
            }
        } else {
            titleDiv.style.backgroundColor = "yellow";
            titleDiv.scrollIntoView({ block: "center" });
        }
    }

});
// configureExecute(() => {
//     setTimeout(function () {
//         requestData().then(json => {

//             Object.entries(json.form).forEach(([key, value]) => {
//                 form.push(value);
//             });
//             Object.entries(json.submissions).forEach(([key, value]) => {
//                 submissions.push(value);
//             });
//             Object.entries(json.keywords).forEach(([key, value]) => {
//                 keywords.push(value);
//             });
//             set_logica(form, submissions, keywords);

//             setTimeout(function () {

//                 if (mode.includes("quiz")) {
//                     create_btn_roll_back();
//                     show_btn_submit();
//                 }

//             }, 1000);


//         }).catch(error => executeIfError(error));

//     }, 3000);

//     jsawesome.forEach(wrapper => {
//         let query = find_query(wrapper, ruta, atributo);
//         tqs.push(query);
//     });

//     requestData_carlete().then(json => {
//         console.log(json);

//         if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

//             jsawesome.forEach(wrapper => {
//                 if (!wrapper.classList.contains('tq_found')) {
//                     let resp = json.res;
//                     for (var i = 0; i < resp?.length; i++) {
//                         var r = resp[i];
//                         let color = "coral";
//                         autofillp(wrapper, ruta, atributo, r, color);
//                     }
//                 }
//             });

//         }

//     }).catch(error => executeIfError(error));
// });

function existe(wrapper) {
    wrapper.classList.add("tq");
}

function no_existe(wrapper) {
    wrapper.classList.add("no_tq");
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



