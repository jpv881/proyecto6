// const DESTINOS = ["../images/comienzo.jpg", "../images/vuelo.jpg", "../images/destino.jpg"];
//
// let sliders = (()=>{
//     let cont = 0;
//     setInterval(function(){
//         cont++;console.log("---"+cont);
//         $('#sectionDestinos').css('backgroundImage','url('+DESTINOS[cont]+')');
//         if(cont === 2) cont = -1;console.log(cont)
//     }, 3000);
// })();

$("input[name='password1']").on("keyup", function(){
    validarFormRegistro();
})

$("input[name='password2']").on("keyup", function(){
    validarFormRegistro();
})

function validarFormRegistro(){
    if($("#password1").val() !== $("#password2").val() || $("#password1").val() === "" || $("#password2").val() === ""){
        $("#password1").addClass("inputError");
        $("#password2").addClass("inputError");
        $("#sectionRegistro form button").prop("disabled",true);
    }else {
        if($("#sectionRegistro form button").prop("disabled") === true) $("#sectionRegistro form button").prop("disabled",false);
        if($("#password1").hasClass("inputError")) $("#password1").removeClass("inputError");
        if($("#password2").hasClass("inputError")) $("#password2").removeClass("inputError");
    }
}

