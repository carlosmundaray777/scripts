//seteamos tiempo
setTime(30000,35000);
//id de la guia
identifier = '1-MA3GEC662H6DH4D36MA7';

let tq_por_defecto=
        [
             "Bags > Backpacks"
            ,"Bags > Holdalls and weekend bags"
            ,"Bags > Belt bags"
            ,"Bags > Briefcases and work bags"
            ,"clothing > coats > long coats"
            ,"clothing > coats > Parka coats"
            ,"clothing > coats > Short coats"
            ,"clothing > coats > Raincoats and trench coats"
            ,"Clothing > Jackets > Casual jackets"
            ,"Clothing > Jackets > Leather jackets"
            ,"Clothing > Jackets > Waistcoats and gilets"
            ,"Clothing > Jeans > Bootcut jeans"
            ,"Clothing > Jeans > Skinny jeans"
            ,"Clothing > Jeans > Straight-leg jeans"
            ,"Clothing > Shorts > Cargo shorts"
            ,"Clothing > Activewear > Hoodies"
            ,"Clothing > Activewear > Tracksuits"
            ,"jewelry > bracelets"
            ,"jewelry > Necklaces"
            ,"jewelry > Rings"
            ,"shoes > boots > Rain boots"
            ,"Shoes > sneakers > Low-top sneakers"
            ,"Shoes > Sneakers > High-top sneakers"
            ,"clothing > nightwear > Dressing gowns and robes"

        ];



    configureSet((form,submissions,keywords) => {

          const submissions_api = query => {
              return Object.values(Object.values(submissions).filter((el)=>query.name.includes(Object.values(el.content)[0])));
          }

          const keyword = query => {
                return Object.values(Object.values(keywords).filter((el) =>query.name.toLowerCase().includes(el.name.toLowerCase())));
          }

           let tq_df=tq_por_defecto.sort(()=> Math.random() - 0.5);



            jsawesome.forEach(wrapper => {
                var titleDiv = wrapper;
                var name = titleDiv.querySelectorAll(".row-fluid img")[0].src;

                var name2 = titleDiv.querySelectorAll(".span8 a")[0].textContent;


                var pares_content = wrapper.querySelectorAll(".radios.cml_field");
                var fill = submissions_api({'name':name});
                var keywordfill = keyword({'name':name2});


                var p1=trato_especial(name,100);
                var p2=trato_especial(Object.values(fill[0]?.content)[0], 100);

                if(p1==p2 && p2!=""){
                    console.log("existe");
                    titleDiv.style.backgroundColor = "Aqua";
                    titleDiv.scrollIntoView({ block: "center" });
                    tq_found++;

                    marca_tq(Object.values(fill[0]?.content)[2], wrapper);
                }else{
                    console.log("no existe");
                    if(mode.toLowerCase().includes("quiz")){
                        titleDiv.style.backgroundColor = "darkorange";
                        titleDiv.scrollIntoView({ block: "center" });
                        tq_for_update.push(wrapper);
                    }

                    if(mode.toLowerCase().includes("work")){
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
                if(mode.includes("work") && tq_found >= 1){
                    remover_tq();
                }
            }, 1000);


      }).catch(error => executeIfError(error));
    });


      function marca_tq(guia, wrapper){

                  var guias=String(remove(guia)).split('>');

                    let type=document.querySelectorAll("[name='"+wrapper.id+"[type]']");
                    type.forEach(val =>{
                        if(trato_especial(val.parentNode.textContent,100).includes(trato_especial(guias[0],100))){
                            val.parentNode.click();
                            val.checked=1;

                        }
                    });

                    setTimeout(function tiempo(){
                        var segundo=wrapper.querySelectorAll(".row-fluid > .span3")[0].querySelectorAll(".logic-only-if");
                        segundo.forEach(val =>{
                            if(!val.getAttribute("class").includes("_cf_hidden")){
                                let categoria=val.querySelectorAll(".radios.cml_field")[0].querySelectorAll("div.cml_row");
                                categoria.forEach(col =>{
                                    if(col.style.display!="none"){
                                        let input = col.querySelector("input");
                                        if(trato_especial(input.parentNode.textContent,100)==(trato_especial(guias[1],100))){
                                            input.click();
                                        }
                                    }
                         });

                         let sub_categoria=val.querySelectorAll(".checkboxes.cml_field")[0].querySelectorAll("div.cml_row");
                         sub_categoria.forEach(col =>{
                                    if(col.style.display!="none"){
                                        let input = col.querySelector("input");
                                        if(trato_especial(input.parentNode.textContent,100).includes(trato_especial(guias[2],100))){
                                            input.click();
                                        }
                                    }
                          });

                            }
                        });
                    }, 500);
      }

      function busca_indice(){
          setTimeout(function tiempo(){
              let cant_accessories=0;
              let cant_none_data=0;
              let cant=0;
              jsawesome.forEach(wrapper => {
                  if(wrapper.getAttribute("class").includes("falsetq")){

                      var checked_gender = wrapper.querySelector('input[name = "'+wrapper.id+'[category]"]:checked');
                      if(checked_gender != null){
                          if(checked_gender.value.includes('accessories')){
                              cant_accessories++;
                              if(cant_accessories<=2 && cant_accessories>=2){marca_tq(tq_df[0], wrapper);}
                          }
                          if(checked_gender.value.includes('other')){
                              cant_none_data++;
                              if(cant_none_data<=2 && cant_none_data>=2){marca_tq(tq_df[0], wrapper);}
                          }
                      } else {

                          let radio=wrapper.querySelector('input[name = "'+wrapper.id+'[category]"]');
                          radio.parentNode.parentNode.parentNode.classList.add('_cf_hidden');
                          //console.log('Nothing checked');
                      }
                  }
                cant++;
              });

          }, 3000);
      }

      function trato_especial(text="",longitud=5){
                return String(text?.toString().toLowerCase().trim()
                       .replace(/\s+/gi,' ')
                       .replace(/ /g, "")
                       .replace(/\r?\n?/g, '')
                       .replace(/[&\/\\#,+()$~%'":*?<>{}|!-]/g, '')
                       .normalize("NFD")
                       .replace(/[\u0300-\u036f]/g, "")
                      );
      }

      function remove(arr) {
          for (var i = arr.length; i--;) {
              if (arr[i].trim().toLowerCase() == "male" || arr[i].trim().toLowerCase() == "female") {
                   arr.splice(i, 1);
              }
          }
          return arr;
      }

/*******************alternative functions********************/
/*configureActionForError(() =>{
    window.location.reload();
});*/

/****log****/
//console.log(localStorage);



