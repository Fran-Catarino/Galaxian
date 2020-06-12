window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let playlistId = queryString.get("playlistID");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre')
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {

            console.log(informacion);

            let arrayGeneros = informacion.data

            for (let i = 1; i < arrayGeneros.length; i++) {
                
                let imagen = arrayGeneros[i].picture_xl
                let nombre = arrayGeneros[i].name
                let idGenero = arrayGeneros[i].id

                console.log(idGenero)
                let generoIndividual = '<a href="genero.html"><p class="imagen"><img src="' + imagen + '" alt="Concentración" class="generos"></img></p><p class="nombre1">' + nombre + '</p></a>'

                document.querySelector(".todosLosGeneros").innerHTML += generoIndividual
                
            }
            
        }
    )
})
    var slideIndex  = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}