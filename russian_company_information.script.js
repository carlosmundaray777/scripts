//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-FJ9J2372J5FEC8H8DB8A';

var ruta_smtv="div.html-element-wrapper";
var atributo_smtv="textContent";

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial(query.name)==(trato_especial(Object.values(el.content)[0]))));
          }


            jsawesome.forEach(wrapper => {
                var query = find_query(wrapper, ruta_smtv, atributo_smtv);
                var fill = submissions_api({'name':query});

                var p1=trato_especial(query);
                var p2=trato_especial(Object.values(fill[0]?.content)[0]);
                var tq_id = fill[0]?.id;

                if(p1==p2){
                    console.log("existe");
                    var color = "Aqua";
                    wrapper.dataset.tqid = tq_id;
                    create_btn_roll_back_single(wrapper);
                    wrapper.style.backgroundColor = color;
                    wrapper.classList.add("tq_found");
  
                    var r = Object.values(fill[0]?.content)[1];

                    autofillp_smatv(wrapper, ruta_smtv, atributo_smtv, p1, r, color);
                }else{
                    console.log("no existe");
                    if(mode?.toLowerCase().includes("quiz")){
                        wrapper.style.backgroundColor = "darkorange";
                        tq_for_update.push(wrapper);
                    }


                    if (mode?.toLowerCase().includes("work")) {
                        wrapper.style.backgroundColor = "silver";
                        tq_for_update_no_existe.push(wrapper);
                    }


                }
            });   
    });

    configureExecute(() => {

      requestData().then(json => {

            Object.entries(json.form).forEach(([key, value]) => {
                          form.push(value);
                      });
            Object.entries(json.submissions).forEach(([key, value]) => {
                          submissions.push(value);
                      });
            Object.entries(json.keywords).forEach(([key, value]) => {
                          keywords.push(value);
                      });
            set_logica(form,submissions,keywords);



            setTimeout(function () {

                if(mode.includes("quiz")){
                    create_btn_roll_back();
                }


                var tq_found=document.querySelectorAll(".tq_found");

                if(mode.includes("work") && tq_found?.length >= 0){
                        tq_for_update_no_existe.forEach(wrapper=>{
                            var pares_content = wrapper.querySelectorAll("input");
                            if (!wrapper.classList.contains('tq_found')) {
                                wrapper.style.backgroundColor = "silver";



let itentificado=wrapper.querySelector("p").textContent;
let name=wrapper.querySelectorAll("p")[2].textContent;


var dataform = new FormData();
dataform.append('dataType', 'json');
dataform.append('phrase', itentificado);


    GM_xmlhttpRequest({
        method: "POST",
        url: "https://www.kartoteka.ru/files/org_search_ajax.php",
        data: dataform, 
        onload: function(response) {

            let data=JSON.parse(response.responseText);



                        if (data[0]?.ogrn!=null) {
                            document.getElementsByName(wrapper.id+"[enter_the_psrn]")[0].value=data[0].ogrn;
                        }else{
                            document.getElementsByName(wrapper.id+"[enter_the_psrn]")[0].value="NA";
                        }

                        if (data[0]?.inn!=null) {
                            document.getElementsByName(wrapper.id+"[paste_the_tin]")[0].value=data[0].inn;
                        }else{
                            document.getElementsByName(wrapper.id+"[paste_the_tin]")[0].value="NA";
                        }                  

if (data[0]?.name!=null) {

    document.getElementsByName(wrapper.id+"[paste_the_psrn]")[0].value=name;
        
    /*GM_xmlhttpRequest({
        method: "GET",
        url: "https://api.mymemory.translated.net/get?q="+data[0]?.name+"&langpair=ru-RU|en-GB",
        data: dataform, 
        onload: function(response) {

            let data=JSON.parse(response.responseText);
            document.getElementsByName(wrapper.id+"[paste_the_psrn]")[0].value=data.responseData.translatedText;

        },
        onerror: function(resp) {
            console.log("Error");
            console.log(resp.status + ' ' + resp.statusText);
        },
        ontimeout: function(resp) {
            console.log('Timeout');
        }
    });*/

}else{

     document.getElementsByName(wrapper.id+"[paste_the_psrn]")[0].value="NA";
}

if (data[0]?.hash!=null) {

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.kartoteka.ru/card/"+data[0]?.hash,
        onload: function(response) {
            let doc = parser.parseFromString(response.responseText, "text/html");
            let company = doc.querySelectorAll('.company-card__main-info-subitem');

            company.forEach(companyinfo => {

                if(companyinfo.querySelectorAll('span')[0].textContent.includes("Первичная регистрация")){
                        var fecha = companyinfo.querySelectorAll('span')[1].textContent;
                        var today = fecha?.split(".");
                        let d=today[0];
                        let m=today[1];
                        let y=today[2];
                        let formate=m+"/"+d+"/"+y;
                             console.log(m);
                        if (m!=undefined || m!="" || m!=null) {
                       
                            document.getElementsByName(wrapper.id+"[paste_the_initial_registration_data]")[0].value=formate; 
                        }else{
                            document.getElementsByName(wrapper.id+"[paste_the_initial_registration_data]")[0].value="NA";
                        }
    
                }else{

                    document.getElementsByName(wrapper.id+"[paste_the_initial_registration_data]")[0].value="NA";
                }


                if(companyinfo.querySelectorAll('span')[0].textContent.includes("Статус")){
                        document.getElementsByName(wrapper.id+"[enter_status_of_company_active_or_inactive]")[0].value=companyinfo.querySelectorAll('span')[1].textContent=="Действующая"?"Active":"Inactive";
                }else{
                    document.getElementsByName(wrapper.id+"[enter_status_of_company_active_or_inactive]")[0].value="NA";
                }


            });

            
        },
        onerror: function(resp) {
            console.log("Error");
            console.log(resp.status + ' ' + resp.statusText);
        },
        ontimeout: function(resp) {
            console.log('Timeout');
        }
    });
}else{

document.getElementsByName(wrapper.id+"[paste_the_initial_registration_data]")[0].value="NA";
document.getElementsByName(wrapper.id+"[enter_status_of_company_active_or_inactive]")[0].value="NA";

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





                            }    
                        });
                }
            }, 3000);


      }).catch(error => executeIfError(error));
    });


function buscarCode(cadena, buscador){
    let invertido = cadena.split("span").reverse().join("span");
    return invertido.substring(invertido.indexOf(buscador), invertido.length).split("span")[2];
}







/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



