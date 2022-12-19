//seteamos tiempo
setTime(20000,25000);
//id de la guia
identifier = '1-AKJC25E2MDE6137BLC87';

idguia=291349;

var ruta="center > table";
var atributo="textContent";


var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
               return Object.values(Object.values(submissions).filter((el) =>trato_especial(Object.values(el.content)[0],100).indexOf(trato_especial(query.name,100)) > -1 && trato_especial(Object.values(el.content)[1],100).indexOf(trato_especial(query.name2,100)) > -1));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query?.name?.toLowerCase().replace(/ /g, "").includes(el?.name?.toLowerCase().replace(/ /g, ""))));
          }

            jsawesome.forEach(wrapper => {

                var titleDiv = wrapper;
                var business1 = wrapper.querySelectorAll("table>tbody")[0].querySelectorAll("tr")[1].querySelectorAll("td")[1].textContent;
                var business2 = wrapper.querySelectorAll("table>tbody")[0].querySelectorAll("tr")[2].querySelectorAll("td")[1].textContent;
                 console.log(business2);

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':business1,'name2':business2});

                var q1=trato_especial(business1, 100);
                var q2=trato_especial(Object.values(fill[0]?.content)[0], 100);

                var r1=trato_especial(business2, 100);
                var r2=trato_especial(Object.values(fill[0]?.content)[1], 100);

                if((q1==q2) && (r1==r2)){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    for(var preg of pares_content.entries()) {
                    if(!preg[1].parentNode?.parentNode?.getAttribute("class")?.includes("_cf_hidden")){
                        let radios = preg[1].querySelectorAll(".cml_field input");
                        let indice=String(Object.values(fill[0]?.content)[2]).charAt(preg[0])-1;
                        let properties_match=document.getElementsByName(wrapper.id+"[properties_match]");

                              if(indice!==-1){
                                    if(indice==0){
                                        properties_match[0].value="yes";
                                    }else{
                                        properties_match[0].value="no";
                                    }
                                   radios[indice].checked=1;
                                   radios[indice].click();
                              }
                       }
                    }


                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){

                      if(q1==r1){
                            titleDiv.style.backgroundColor = "navy";
                            titleDiv.scrollIntoView({ block: "center" });
                            for(var pregg of pares_content.entries()) {
                                let radios = pregg[1].querySelectorAll(".cml_field input");
                                let indice=String("111").charAt(pregg[0])-1;
                                let properties_match=document.getElementsByName(wrapper.id+"[properties_match]");
                                if(indice!==-1){
                                    if(indice==0){
                                        properties_match[0].value="yes";
                                    }else{
                                        properties_match[0].value="no";
                                    }
                                    radios[indice].checked=1;
                                    radios[indice].click();
                                }
                            }
                        }else{

                            if(typeof(form[3])!='undefined')
                            {
                                if(typeof(form[3])=="string"){
                                    titleDiv.style.backgroundColor = "silver";
                                    titleDiv.scrollIntoView({ block: "center" });
                                    let st=String(form[3]);
                                    for(var preggg of pares_content.entries()) {
                                        let radios = preggg[1].querySelectorAll(".cml_field input");
                                        let indice=String(st).charAt(preggg[0])-1;
                                        let properties_match=document.getElementsByName(wrapper.id+"[properties_match]");
                                        if(indice!==-1){
                                            if(indice==0){
                                                properties_match[0].value="yes";
                                            }else{
                                                properties_match[0].value="no";
                                            }
                                            radios[indice].checked=1;
                                            radios[indice].click();
                                        }
                                    }
                                }else{
                                    titleDiv.style.backgroundColor = "yellow";
                                    titleDiv.scrollIntoView({ block: "center" });
                                }
                            }

                        }

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

      }).catch(error => executeIfError(error));


    jsawesome.forEach(wrapper => {
        let query=find_query(wrapper,ruta,atributo);
        tqs.push(query);
    });


        requestData_carlete().then(json => {
            console.log(json);

        if (!(json.mensaje.includes("TQs no encontradas") || json.mensaje.includes("Token invalido"))) {

            jsawesome.forEach(wrapper => {
                let resp=json.res;
                for(var i=0; i<resp?.length; i++){
                    var r=resp[i];
                    let color="coral";
                    autofillp(wrapper,ruta,atributo,r,color);
                }
            });

        }

        }).catch(error => executeIfError(error));

      

    });
/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



