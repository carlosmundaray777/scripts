//seteamos tiempo
setTime(15000, 17000);

identifier = '15-LDK6CMFC81BD16133F43';

idguia = 92187;

var ruta = "table";
var atributo = "textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = BG_LOGICA;
    let name = trato_especial(wrap.querySelector('table > tbody > tr > td > span').textContent);
    let radios = wrap.querySelectorAll('input[type=radio]');
    let campo = wrap.querySelector('input[type=text]');
    GM_xmlhttpRequest({
        method: "GET",
        url: wrap.querySelector('a').href,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        onload: function(response) {
            let doc = parser.parseFromString(response.responseText, "text/html");
            let titulo = doc.querySelector('div.SPZz6b span');
            let data_pid = doc.querySelector('a#wrkpb');
          
            if (titulo == null || data_pid == null) {
                wrap.style.backgroundColor = 'silver';
            }

            if (data_pid != null && titulo != null && trato_especial(titulo.textContent).includes(name)) {
                radios[0].checked = true;
                radios[0].click();
                campo.value = data_pid.dataset.pid;
            } else {
                radios[1].checked = true;
                radios[1].click();
            }
        },
        onerror: function(resp) {
            console.log("Error");
            console.log(resp.status + ' ' + resp.statusText);
        },
        ontimeout: function(resp) {
            console.log('Timeout');
        }
    });
});

// configLogica_notq_qm((wrap) => {
//    logica_notq_wm(wrap);
// });

// configNada_in_wm((wrap) => {
//    logica_notq_wm(wrap);
// });