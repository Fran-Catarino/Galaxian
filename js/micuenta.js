window.addEventListener("load", function() {

    let nombre = sessionStorage.getItem("user-name")
    
    document.querySelector('.saludo').innerHTML = 'Hi ' + nombre + ' you dont have an account yet. Wait for Programacion 2!!';

})