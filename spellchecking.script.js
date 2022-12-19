//seteamos tiempo
setTime(60000, 60000);

identifier = '1-47G6B376M77919C864CK';

idguia = 598391;

var ruta = "div.radios.cml_field > h2";
var atributo = "textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = BG_LOGICA;
    let name = trato_especial_json(wrap.querySelector('div.radios.cml_field > h2').textContent.replace("Consider this query:", "").replace("(required)", ""));

console.log(encodeURIComponent(name));
    let radios = wrap.querySelectorAll('input[type=radio]');
    let campo = wrap.querySelector('input[type=text]');
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.google.com/search?q="+encodeURIComponent(name),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        onload: function(response) {
            let doc = parser.parseFromString(response.responseText, "text/html");
            let titulo = doc.querySelectorAll('.gL9Hy')[1];

            console.log(titulo);

            if (titulo == undefined) {
                wrap.style.backgroundColor = 'silver';
            }

            if (titulo != undefined) {
                radios[2].checked = true;
                radios[2].click();
                campo.value = titulo?.textContent;
            } else {
                radios[0].checked = true;
                radios[0].click();
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

 configLogica_notq_qm((wrap) => {
    logica_notq_wm(wrap);
 });

 configNada_in_wm((wrap) => {
   logica_notq_wm(wrap);
 });