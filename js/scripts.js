'use strict'

var registerURL = 'http://api.events.indqtech.com/users';
var loginURL = 'http://api.events.indqtech.com/users/login';

var login_user = {email:"", password:""};
var register_user = {firstName:"", lastName:"", email:"", password:"", gender:""};

var firstName = "";
var lastName = "";
var email = "";
var password = "";
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
    console.log(login_user);

    fetch(loginURL, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(login_user), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
});

/* *************************************************************************************************** */
$('#register').click(function(){
    firstName = document.getElementById("firstname").value;
    lastName = document.getElementById("lastname").value;
    email = document.getElementById("register-email").value;
    password = document.getElementById("register-password").value;

    register_user.firstName = firstName;
    register_user.lastName = lastName;
    register_user.email = email;
    register_user.password = password;
    register_user.gender = "male";
    console.log(register_user);

    fetch(registerURL, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(register_user), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
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

/* VALIDACION CORREO ELECTRONICO */
$('#register-email').change(function (){
    var campo = document.getElementById('register-email');
    
    //var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if (emailRegex.test(campo.value)) {
      document.getElementById('register-email').setCustomValidity("");
    } else {
      document.getElementById('register-email').setCustomValidity("El correo electrónico ingresado es incorrecto");
    }
});

/* VALIDACION CONTRASENA */
$('#register-password').change(function (){
    var password = document.getElementById('register-password').value;
    if(password.length < 8){
        document.getElementById('register-password').setCustomValidity("La contraseña debe tener un mínimo de 8 caracteres");
    } else {
        document.getElementById('register-password').setCustomValidity("");
    }
});

/* VALIDACION CONFIRMACION */
$('#confirm-password').change(function (){
    var password = document.getElementById('register-password').value;
    var confirmacion = document.getElementById('confirm-password').value;
    if(confirmacion != password){
        document.getElementById('confirm-password').style.background = "La contraseña no coincide";
    } else {
        document.getElementById('confirm-password').setCustomValidity("");
    }
});