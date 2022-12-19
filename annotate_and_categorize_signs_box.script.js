//seteamos tiempo
setTime(65000,67000);
//id de la guia
identifier = '1-3MAG9CBF21C32FK889EC';

idguia=[265639];

//guia_local = true;


borrar_no_tq = true;

var ruta="script";
var atributo="roca";

configureExecute(() => {
    setTimeout(async () => {
        if (quiz_mode && enable_rollback) {
            //poner en otro lado, se duplica cuando salta el timeout por que vuelve a ejecutar "execute"
            create_btn_roll_back();
        }
    
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
    
        if (!validar() && idguia) {
            tqs = [];
            wrap_restante().forEach(wrapper => {
                let query = find_query(wrapper, ruta, atributo);
                tqs.push(query);
            });
            //console.log(tqs);
    
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
        auto_init_inicia_remote_view();
    }, 10000);
});

