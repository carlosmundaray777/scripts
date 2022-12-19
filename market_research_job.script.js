//seteamos tiempo
setTime(10000,12000);
//id de la guia
identifier = 'NA';

guia_existe = true;

const site_url =  [
                    {'id':89622991672,'url':'https://www.toptal.com/magento'},
                    {'id':92617584129,'url':'https://www.toptal.com/c-plus-plus'},
                    {'id':93111380494,'url':'https://www.toptal.com/erp'},
                    {'id':93621869218,'url':'https://www.toptal.com/backbone-js'},
                    {'id':93561398031,'url':'https://www.toptal.com/authorize-net'},
                    {'id':90684782324,'url':'https://www.toptal.com/algorithms'},
                    {'id':93157240611,'url':'https://www.toptal.com/phonegap'},
                    {'id':90578006005,'url':'https://www.toptal.com/gis'},
                    {'id':93076615529,'url':'https://www.toptal.com/app'},
                    {'id':93282576497,'url':'https://www.toptal.com/qt'},
                    {'id':90132666942,'url':'https://www.toptal.com/software'},
                    {'id':92149553985,'url':'https://www.toptal.com/tntnet'},
                    {'id':91941531380,'url':'https://www.toptal.com/cakephp'},
                    {'id':92968452025,'url':'https://www.toptal.com/cakephp'},
                    {'id':90944953414,'url':'https://www.toptal.com/zend'},
                    {'id':91761620808,'url':'https://www.toptal.com/java'},
                    {'id':92419805800,'url':'https://www.toptal.com/java'},
                    {'id':92338808641,'url':'https://www.toptal.com/python'},
                    {'id':91153006390,'url':'https://www.toptal.com/python'},
                    {'id':90485612598,'url':'https://www.toptal.com/python'},
                    {'id':91208636281,'url':'https://www.toptal.com/python'},
                    {'id':89893073606,'url':'https://www.toptal.com/full-stack-nodejs'},
                    {'id':92029474835,'url':'https://www.toptal.com/web'},
                    {'id':91511719918,'url':'https://www.toptal.com/api-developers'},
                    {'id':91116637419,'url':'https://www.toptal.com/api-developers'},
                    {'id':93021868802,'url':'https://www.toptal.com/salesforce'},
                    {'id':92154684478,'url':'https://www.toptal.com/ruby-on-rails'},
                    {'id':93390400732,'url':'https://www.toptal.com/ruby-on-rails'},
                    {'id':92850559962,'url':'https://www.toptal.com/ruby-on-rails'},
                    {'id':91691897010,'url':'https://www.toptal.com/ruby-on-rails'},
                    {'id':93501308608,'url':'https://www.toptal.com/front-end'},
                    {'id':90412800818,'url':'https://www.toptal.com/front-end'},
                    {'id':89937690258,'url':'https://www.toptal.com/emberjs'},
                    {'id':89477943485,'url':'https://www.toptal.com/c'},
                    {'id':90454197007,'url':'https://www.toptal.com/asp-dot-net'},
                    {'id':89378303279,'url':'https://www.toptal.com/asp-dot-net'},
                    {'id':91223738263,'url':'https://www.toptal.com/asp-dot-net'},
                    {'id':93176342389,'url':'https://www.toptal.com/designers/responsive'},
                    {'id':92372578800,'url':'https://www.toptal.com/android'},
                    {'id':90550467832,'url':'https://www.toptal.com/ajax'},
                    {'id':90475432389,'url':'https://www.toptal.com/ajax'},
                    {'id':92118644833,'url':'https://www.toptal.com/drupal'},
                    {'id':93137954600,'url':'https://www.toptal.com/drupal'},
                    {'id':91914472842,'url':'https://www.toptal.com/lamp'},
                    {'id':90900167219,'url':'https://www.toptal.com/scala'},
                    {'id':90023407488,'url':'https://www.toptal.com'},
                    {'id':91489924554,'url':'https://www.toptal.com'},
                    {'id':89582314686,'url':'https://www.toptal.com'},
                    {'id':90200884931,'url':'https://www.toptal.com/sql-server/sql-database-tuning-for-developers'},
                    {'id':89538128370,'url':'https://www.toptal.com/sql-server/sql-database-tuning-for-developers'},
                    {'id':91025103053,'url':'https://www.toptal.com/sql-server/sql-database-tuning-for-developers'},
                    {'id':91905554583,'url':'https://www.toptal.com/designers/ui'},
                    {'id':90659397052,'url':'https://www.toptal.com/designers/ui'},
                    {'id':90525320397,'url':'https://www.toptal.com/matlab'},
                    {'id':91289368886,'url':'https://www.toptal.com/python'},
                    {'id':93196220025,'url':'https://www.toptal.com/c-sharp'},
                    {'id':93079592009,'url':'https://www.toptal.com/app'},
                    {'id':92794067684,'url':'https://www.toptal.com/sql-server/sql-database-tuning-for-developers'},
                    {'id':91614841556,'url':'https://www.toptal.com/sql-server/sql-database-tuning-for-developers'},
                    {'id':93015435734,'url':'https://www.toptal.com/cms'},
                    {'id':91470422133,'url':'https://www.toptal.com/cms'},
                    {'id':93141583883,'url':'https://www.toptal.com/freelance'},
                    {'id':93389626229,'url':'https://www.toptal.com/freelance'},
                    {'id':91446481168,'url':'https://www.toptal.com/freelance'},
                    {'id':89996374520,'url':'https://www.toptal.com/freelance'},
                    {'id':92695534131,'url':'https://www.toptal.com/freelance'},
                    {'id':91765016016,'url':'https://www.toptal.com/angular-js'},
                    {'id':89754798529,'url':'https://www.toptal.com/angular-js'},
                    {'id':90868591585,'url':'https://www.toptal.com/javascript'},
                    {'id':91494440914,'url':'https://www.toptal.com/javascript'},
                    {'id':91592536035,'url':'https://www.toptal.com/lms'},
                    {'id':89452861337,'url':'https://www.toptal.com/lms'},
                    {'id':92380650712,'url':'https://www.toptal.com/twitter'},
                    {'id':91878744503,'url':'https://www.toptal.com/zend'},
                    {'id':89931663136,'url':'https://www.toptal.com/freelance'},
                    {'id':92462585104,'url':'https://www.toptal.com/finance/excel-experts'},
                    {'id':91158321508,'url':'https://www.wordstream.com/blog/ws/2017/06/16/working-remotely'},
                    {'id':90842753396,'url':'https://www.toptal.com/ios'},
                    {'id':89885827669,'url':'https://www.toptal.com/ios'},
                    {'id':92227901475,'url':'https://www.toptal.com/ios'},
                    {'id':91562739303,'url':'https://www.toptal.com/sql-server/sql-database-tuning-for-developers'},
                    {'id':91269819395,'url':'https://www.toptal.com/ios-app-development'},
                    {'id':90253656609,'url':'https://www.toptal.com/java/building-modern-web-applications-with-angularjs-and-play-framework'},
                    {'id':92588906506,'url':'https://www.toptal.com/php'},
                    {'id':93036211579,'url':'https://www.toptal.com/php'},
                    {'id':90429650400,'url':'https://www.toptal.com/php'},
                    {'id':91626111701,'url':'https://www.toptal.com/php'},
                    {'id':90701628652,'url':'https://www.toptal.com/php'},
                    {'id':93489219606,'url':'https://www.toptal.com/php'},
                    {'id':91230057367,'url':'https://www.toptal.com/php'},
                    {'id':89623473496,'url':'https://www.toptal.com/wordpress'},
                    {'id':93515435804,'url':'https://www.toptal.com/wordpress'},
                    {'id':90526343805,'url':'https://www.toptal.com/wordpress'},
                    {'id':91915654193,'url':'https://www.toptal.com/wordpress'},
                    {'id':92825190080,'url':'https://www.toptal.com/wordpress'},
                    {'id':90537526837,'url':'https://www.toptal.com/nodejs'},
                    {'id':89723710173,'url':'https://www.toptal.com/nodejs'},
                    {'id':90221273974,'url':'https://www.toptal.com/python/an-introduction-to-mocking-in-python'},
                    {'id':90711807413,'url':'https://www.toptal.com/designers/ui'},
                    {'id':90198665766,'url':'https://www.toptal.com/web'},
                    {'id':91364091119,'url':'https://www.toptal.com/data-science'},
                    {'id':92099248991,'url':'https://www.toptal.com/data-science'},
                    {'id':91529643123,'url':'https://www.instagram.com/tasoduval'},
                    {'id':90796272695,'url':'https://www.instagram.com/tasoduval'},
                    {'id':90901793757,'url':'https://www.toptal.com/ruby'},
                    {'id':90172870052,'url':'https://www.toptal.com/ruby'},
                    {'id':93285492351,'url':'https://www.toptal.com/ruby'},
                    {'id':90740288235,'url':'https://www.toptal.com/angular-js'},
                    {'id':91234957368,'url':'https://www.toptal.com/ios'},
                    {'id':93354682800,'url':'https://www.toptal.com/python'},
                    {'id':90585669441,'url':'https://www.toptal.com/python'},
                    {'id':91257614926,'url':'https://www.toptal.com/python'},
                    {'id':89772428310,'url':'https://www.toptal.com/python'},
                    {'id':91409495271,'url':'https://www.toptal.com/erlang'},
                    {'id':90482120285,'url':'https://www.toptal.com/cakephp'},
                    {'id':89860449558,'url':'https://www.toptal.com/cakephp'},
                    {'id':91911901049,'url':'https://www.toptal.com/nodejs'},
                    {'id':91533406802,'url':'https://www.toptal.com/nodejs'},
                    {'id':91630367105,'url':'https://www.toptal.com/nodejs'}
                    ];

  var temp_url = '';
  temp_url = 'https://www.toptal.com';

    String.prototype.hashCode = function() {
        let hash = 0, i = 0, len = this.length;
        while ( i < len ) {
            hash  = ((hash << 5) - hash + this.charCodeAt(i++)) << 0;
        }
        return (hash  + 91474836478) + 1;
    }

    function crear_element_sup(elemt){
        let newNodo = document.createElement("span");

        newNodo.innerText = get_hash(elemt);
            
            newNodo.style.backgroundColor = "aqua";
            var parent = elemt.parentNode;
            parent.insertBefore(newNodo, elemt);
    }

    function set_site(hash){  
        site_url.forEach(site =>{
            if (site.id == hash) {
                temp_url = site.url;
                return true;
            }else{
                return false;
            }
        });
    }


    function get_hash(elemt){
        if (elemt.querySelectorAll('img').length == 0) {
            return elemt.innerText.hashCode();
        }else{
            return elemt.querySelector('img').src.hashCode();
        }
    }

    function RandArray(array){
        var rand = Math.random()*array.length | 0;
        var rValue = array[rand];
        return rValue;
    }


    configureExecute(() => {
      document.querySelector('.result_gui').innerText = 'guia-local'; 
      jsawesome.forEach(wrapper => {
       // let questions = wrapper.querySelectorAll('p:not(.required,.instructions)');
        let questions = wrapper.querySelectorAll('p');
          questions.forEach(elemt => {
            crear_element_sup(elemt);
          });
       // let elements = wrapper.querySelectorAll('p:not(.required,.instructions),input[type=text]');
        let elements = wrapper.querySelectorAll('p,input,table');
        elements.forEach(elemt =>{
            if (elemt.tagName == 'P') {
                set_site(get_hash(elemt)); 
            }   
            if (elemt.className.includes('_text')) {
             //   console.log('background',elemt);
            }
            if (elemt.tagName == 'TABLE') {
             //   console.log('rank',elemt);
            }
            if (elemt.className.includes('_yesno') && elemt.value.toLowerCase() == 'yes') {
             //   console.log('video',elemt);
            }
            if (elemt.className.includes('url')) {
            //    temp_url = RandArray(site_url).url;
                elemt.value = temp_url;
            }
        });

        //answer_3_text
        let answer_text = wrapper.querySelectorAll(".answer_2_text,.answer_3_text,.answer_4_text,.answer_5_text,.answer_6_text,.answer_7_text");
        answer_text.forEach(answer =>{
            answer.value = 'white';            
        });

         //answer_2_ratings
        let rank_radios = wrapper.querySelectorAll(".answer_2_ratings,.answer_3_ratings,.answer_4_ratings,.answer_5_ratings,.answer_6_ratings,.answer_7_ratings");
        rank_radios.forEach(radio =>{
            if (radio.value == 3) {
                radio.checked = 1;
                radio.click();
            }
        });

        //answer_2_yesno
        let video_radios = wrapper.querySelectorAll(".answer_2_yesno,.answer_3_yesno,.answer_4_yesno,.answer_5_yesno,.answer_6_yesno,.answer_7_yesno");
        video_radios.forEach(radio =>{
            if (radio.value.toLowerCase() == 'yes') {
                radio.checked = 1;
                radio.click();
            }
        });

        //all_steps_are_completed 
        let no_hacer_nada = wrapper.querySelectorAll(".all_steps_are_completed");
        no_hacer_nada.forEach(check =>{
           check.click();
        });
      });
    });