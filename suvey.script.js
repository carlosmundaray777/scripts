//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '1-7GBMEK1M835J7GJ24JFA';

var tq_for_update = [];

    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>trato_especial_s(query.name).includes(trato_especial_s(Object.values(el.content)[0]))));
          }

    jsawesome.forEach(wrapper => {
            var titleDiv = wrapper;
            let h2=wrapper.querySelectorAll(".legend");
            var r_radio=[];
            h2.forEach(hh2 => {


                        var name = hh2.textContent;

                        var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                        var fill = submissions_api({'name':name});

                        var p1=trato_especial_s(name);
                        var p2=trato_especial_s(Object.values(fill[0]?.content)[0]);

                        if(p1.includes(p2) && p2!=""){
                            //console.log("existe");
                            hh2.style.backgroundColor = "Aqua";
                            console.log(name);
                            console.log(Object.values(fill[0]?.content)[0]);
                            console.log(Object.values(fill[0]?.content)[1]);
                            console.log("--------------------------------");
                        if (hh2.textContent.toLowerCase().includes("what is your age")) {
                            //console.log("what is your age");
                            let pares_content = hh2.parentNode.querySelectorAll("label");
                            for(let preg of pares_content.entries()) {
                                let spl=preg[1].textContent.split("-");
                                let edad=Object.values(fill[0]?.content)[1]*1;
                                if(spl[0] <= edad && spl[1] >= edad){
                                    preg[1].click();
                                }
                            }
                        }else{


                            let pares_content = hh2.parentNode.querySelectorAll("input , textarea, select");
        
                            for(let preg of pares_content.entries()) {
                                if(preg[1].type=="radio" || preg[1].type=="checkbox"){
                                    let numero=Object.values(fill[0]?.content)[1]*1;


                                    if ((preg[0]+1)==numero) {
                                        preg[1].click();
                                    }
                                }else if(preg[1].type=="text"){

                                     preg[1].value=String(Object.values(fill[0]?.content)[1]);

                                }else if(preg[1].type=="textarea"){
                                     preg[1].value=String(Object.values(fill[0]?.content)[1]);

                                }else if(preg[1].type.includes("select")){
                                    console.log("select");
                                    var select = hh2.parentNode.querySelectorAll("select");

                                    for (var i = 0; i < select.length; i++) {
                                            var segundo = select[i];
                                            for (var io = 0; io < segundo.length; io++) {
                                                var r1 = segundo.options[io].value;
                                                segundo.parentNode.parentNode.classList?.remove('_cf_hidden');
                                                var r2 = String(Object.values(fill[0]?.content)[1]);
                                                if (r2 == r1 && r2 != "") {
                                                    segundo.selectedIndex = io;
                                                    segundo.selected = true;
                                                }
                                            }
                                    }
                                }
             
                            }






                        }






                        }else{
                           // console.log("no existe");
                            hh2.style.backgroundColor = "darkorange";
                        }

                    });



                    var pares_content = wrapper.querySelectorAll(".ratings.cml_field");
                    for(var preg of pares_content.entries()) {
                        let radios = preg[1].querySelectorAll(".ratings.cml_field input");
                        let st=getRandomInt(2, 5);
                        radios[st].checked=1;
                        radios[st].click();
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
    });

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function trato_especial_s(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim()
                       .replace(/[^a-zA-Z0-9]+/g, "")
                      );
    }

    function trato_especial_s_json(text="",longitud=5){
                return String(text?.toString().trim().replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/[^a-zA-Z0-9]+/g, ""));
    }
/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



