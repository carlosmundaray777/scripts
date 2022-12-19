//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-EC9767FCHHH5FB9J17MC';

idguia=673445;

var ruta="div.html-element-wrapper";
var atributo="textContent";


configLogica_notq_wm((wrap) => {
    console.log(wrap);
    wrap.style.backgroundColor = BG_LOGICA;
    let name = wrap.querySelector('a').textContent.split("download-data")[0];
    let date = wrap.querySelectorAll('span')[2].textContent.split("(")[0].replace(" ","");
    let url_p=name+"downloaddatapartial?partial=true&index=0&countryCode=&iso=&startDate="+date+"&endDate="+date+"&frequency=null&downloadPartial=false&csvDownload=false&newDates=true";
    let radios = wrap.querySelectorAll('input[type=checkbox]');
    let campo = wrap.querySelector('input[type=text]');
    GM_xmlhttpRequest({
        method: "GET",
        url: url_p,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        onload: function(response) {
            let doc = parser.parseFromString(response.responseText, "text/html");
            let titulo = doc.querySelector('table');
            let data_pid = (titulo)!=null?titulo.querySelectorAll('td')[4]:null;

            if (titulo == null || data_pid == null) {
                wrap.style.backgroundColor = 'silver';
            }

            if (data_pid != null && titulo != null) {
                campo.value = trunc(data_pid.textContent.replace("$",""),2);
            } else {
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


function trunc (x, posiciones = 0) {
  var s = x.toString()
  var l = s.length
  var decimalLength = s.indexOf('.') + 1

  if (l - decimalLength <= posiciones){
    return x
  }
  // Parte decimal del número
  var isNeg  = x < 0
  var decimal =  x % 1
  var entera  = isNeg ? Math.ceil(x) : Math.floor(x)
  // Parte decimal como número entero
  // Ejemplo: parte decimal = 0.77
  // decimalFormated = 0.77 * (10^posiciones)
  // si posiciones es 2 ==> 0.77 * 100
  // si posiciones es 3 ==> 0.77 * 1000
  var decimalFormated = Math.floor(
    Math.abs(decimal) * Math.pow(10, posiciones)
  )
  // Sustraemos del número original la parte decimal
  // y le sumamos la parte decimal que hemos formateado
  var finalNum = entera + 
    ((decimalFormated / Math.pow(10, posiciones))*(isNeg ? -1 : 1))
  
  return finalNum
}

configLogica_notq_qm((wrap) => {
   logica_notq_wm(wrap);
});

configNada_in_wm((wrap) => {
   logica_notq_wm(wrap);
});




