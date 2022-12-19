//seteamos tiempo
setTime(60000,65000);
//id de la guia
identifier = '2-HE91M69EAJ5AHD4DJ6M9';

    configureSet((form,submissions) => {

        const submissions_api = query => {
                return Object.values(Object.values(submissions).filter((el)=>trato_especial(query.name,100)==(trato_especial(Object.values(el.content)[0],100))));
            }

            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelector(".html-element-wrapper").querySelector(".video_sponsor_row > .span11 > h2")?.textContent;

                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':name});

                var caja_down=wrapper.querySelectorAll('.group.logic-only-if input');


                var p1=trato_especial(name,100);
                var p2=trato_especial(Object.values(fill[0]?.content)[0],100);

                if(p1==p2 && p2!=""){
                    console.log("existe");

                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    var primera=wrapper.querySelectorAll(".radios.cml_field")
                    setTimeout(function tiempo(){
                        primera.forEach(tq =>{
                            var labels = tq.querySelectorAll("label");
                            if(!tq.getAttribute("class").includes("_cf_hidden")){
                                labels.forEach(label =>{
                                    var r1=trato_especial(label.textContent,5);
                                    var r2=trato_especial(Object.values(fill[0]?.content)[1],5);
                                    if(r1==r2 && r2!=""){
                                        var input = label.querySelector("input");
                                        if(input.type=="radio"){input.checked=1}
                                        input.click();
                                    }
                                });
                            }
                        });

                        caja_down.forEach(tq =>{
                            console.log(tq.parentNode.parentNode.parentNode.getAttribute("class"));
                            if(!tq.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                tq.focus({preventScroll:true});
                                tq.value=String(Object.values(fill[0]?.content)[2]);
                            }
                        });

                    }, 500);
                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                    }

                    if(mode.toLowerCase().includes("work")){
                        if(typeof(form[3])!='undefined'){
                            if(typeof(form[3])=="string"){
                                titleDiv.style.backgroundColor = "silver";
                                titleDiv.scrollIntoView({ block: "center" });
                                let st=String(form[3]);

                                var primera2=wrapper.querySelectorAll(".radios.cml_field")
                                setTimeout(function tiempo(){
                                    primera2.forEach(tq =>{
                                        var labels = tq.querySelectorAll("label");
                                        if(!tq.getAttribute("class").includes("_cf_hidden")){
                                            labels.forEach(label =>{
                                                var r1=trato_especial(label.textContent,5);
                                                var r2=trato_especial(st,5);
                                                if(r1==r2 && r2!=""){
                                                    var input = label.querySelector("input");
                                                    if(input.type=="radio"){input.checked=1}
                                                    input.click();
                                                }
                                            });
                                        }
                                    });

                                    caja_down.forEach(tq =>{
                                        if(!tq.parentNode.parentNode.parentNode.getAttribute("class").includes("_cf_hidden")){
                                            var palabra=breakDownURL(name.replace("Step 2: Find the Facebook and/or Twitter pages for sponsor",""));
                                            if(palabra){
                                                var url ="https://facebook.com/"+palabra
                                                tq.focus({preventScroll:true});
                                                tq.value=url;
                                            }
                                        }
                                    });

                                }, 500);
                            }else{
                                titleDiv.style.backgroundColor = "yellow";
                                titleDiv.scrollIntoView({ block: "center" });
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
                    set_logica(form,submissions);
      }).catch(error => executeIfError(error));
    });


function breakDownURL(urlx) {
          var text = "";
          var url = urlx.replace("www.", "");
          var urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(url);
          var hostname = urlParts[2]; // www.example.com
          text=(urlParts[2]!="")?urlParts[2].split('.')[0]:trato_especial(urlx,1000);
          return trato_especial(text);
    }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



