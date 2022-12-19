//seteamos tiempo
setTime(30000, 35000);

identifier = '1-K3FGGK4C6K6A8BGJ5CJ8';

idguia = 960397;

var ruta = "span:nth-child(16)";
var atributo = "textContent";


configLogica_notq_wm((wrap) => {
    wrap.style.backgroundColor = BG_LOGICA;
    let num_npino=wrap.querySelector('span:nth-child(16)').textContent
    let url_npino="https://npino.com/npi/"+num_npino;
    let radios = wrap.querySelectorAll('input[type=radio]');
    let campo = wrap.querySelectorAll('input[type=text]');
    GM_xmlhttpRequest({
        method: "GET",
        url: url_npino,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        onload: function(response) {
            let doc = parser.parseFromString(response.responseText, "text/html");
            let NPI_Number = doc.querySelector('table').querySelectorAll('tr')[0].querySelectorAll('td')[1].textContent;
            let graduation_year = doc.querySelector('table').querySelectorAll('tr')[5].querySelectorAll('td')[1].textContent;
            let medical_school_name = doc.querySelector('table').querySelectorAll('tr')[4].querySelectorAll('td')[1].textContent;
            
            if (NPI_Number == null) {
                wrap.style.backgroundColor = 'silver';
            }

            if (graduation_year != null && trato_especial(NPI_Number).includes(num_npino)) {
                radios[0].checked = true;
                radios[0].click();
                campo[0].value = graduation_year;
                if (medical_school_name!=null) {
                    radios[2].click();
                    campo[1].value = medical_school_name;     
                }else{
                   radios[3].click();
                   radios[5].click();
                }

            } else {
                radios[1].click();
                radios[7].click();
                radios[9].click();
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
 //  logica_notq_wm(wrap);
 // });

// configNada_in_wm((wrap) => {
//    logica_notq_wm(wrap);
// });