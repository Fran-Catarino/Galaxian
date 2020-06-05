window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let trackId = queryString.get("trackID");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + trackId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
            console.log(informacion);
            
            let titulo = informacion.title
            document.querySelector('.favoritas' ).innerHTML = titulo ;

            let coverTrack = informacion.album.cover_xl
            document.querySelector('.imagen').src = coverTrack;

            let cantante = informacion.artist.name
            document.querySelector('.art').innerHTML = cantante;

            

            
        }
            
            
        
    )
})
