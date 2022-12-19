//seteamos tiempo
setTime(40000,45000);

guia_existe = true;

configureExecute(() => {
    wrap_restante().forEach(wrapper => {
        
        console.log(wrapper);
    });
});