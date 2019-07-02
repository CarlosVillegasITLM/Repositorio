'use strict'

var registerURL = 'http://api.events.indqtech.com/users';
var loginURL = 'http://api.events.indqtech.com/users/login';

var login_user = {email:"", password:""};
var register_user = {firstName:"", lastName:"", email:"", password:"", gender:""};
var session_user = {id: "", token: "", firstName: "", lastName: ""};

var firstName = "";
var lastName = "";
var email = "";
var password = "";
var confirmacion = "";
var gender = "";

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

/* *************************************************************************************************** */
$('#login').click(function() {
    email = document.getElementById("login-email").value;
    password = document.getElementById("login-password").value;

    login_user.email = email;
    login_user.password = password;

    fetch(loginURL, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(login_user), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error(error))
    .then(response => console.log(response));
});


/* *************************************************************************************************** */
$('#register').click(function(){
    firstName = document.getElementById("firstname").value;
    lastName = document.getElementById("lastname").value;
    email = document.getElementById("register-email").value;
    password = document.getElementById("register-password").value;
    confirmacion = document.getElementById('confirm-password').value;
    gender = document.getElementsByClassName('register-form')[0].gender.value;
    console.log(gender);
    if(!validar_email(email)){
        alert("El correo electrónico ingresado es incorrecto");
        event.preventDefault();
    } else if(!validar_longitud(password, confirmacion)){
        alert("La contraseña debe tener un mínimo de 8 caracteres");
        event.preventDefault();
    } else if(!validar_confirmacion(password, confirmacion)){
        alert("La contraseña no coincide");
        event.preventDefault();
    } else {
 
        register_user.firstName = firstName;
        register_user.lastName = lastName;
        register_user.email = email;
        register_user.password = password;
        register_user.gender = gender;

        fetch(registerURL, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(register_user), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error(error))
        .then(response => console.log(response));
        event.preventDefault();
    }
});

/* VALIDACION ACEPTA SOLO LETRAS */
$(".letras").keypress(function (key) {
    //window.console.log(key.charCode); //muestra charcode en consola
    if ((key.charCode < 97 || key.charCode > 122) //letras mayusculas
        && (key.charCode < 65 || key.charCode > 90) //letras minusculas
        && (key.charCode != 45) //retroceso
        && (key.charCode != 241) //ñ
        && (key.charCode != 209) //Ñ
        && (key.charCode != 32) //espacio
        && (key.charCode != 225) //á
        && (key.charCode != 233) //é
        && (key.charCode != 237) //í
        && (key.charCode != 243) //ó
        && (key.charCode != 250) //ú
        && (key.charCode != 193) //Á
        && (key.charCode != 201) //É
        && (key.charCode != 205) //Í
        && (key.charCode != 211) //Ó
        && (key.charCode != 218) //Ú
        )

    return false;
});

function validar_email(email){
    //var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
}

function validar_longitud(password, confirmacion){
    if(password < 8 || confirmacion < 8){
        return false;
    } else {
        return true;
    }
}

function validar_confirmacion(password, confirmacion){
    if(password == confirmacion){
        return true;
    } else {
        return false;
    }
}