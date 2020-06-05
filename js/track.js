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
            document.querySelector('.artista').innerHTML = cantante;

            let date = informacion.release_date
            document.querySelector('.date').innerHTML = date;
            
            let songTitle = informacion.title;

            let songArtist = informacion.artist.name;

            let songLength = informacion.duration;

            let minutes = songLength/60
            minutes = Math.floor(minutes);
            let seconds = songLength %60
            if(seconds<10){
                seconds = '0' + seconds
            }
            let albumDeCancion = informacion.album.title

            let songItem = '<article class="cancion"><p class="nombre"><a href="track.html">' + songTitle + '</a></p><p class="duracion">' + minutes + ':' + seconds + '</p><p class="artista">' + songArtist + '</p> <p class="album">' + albumDeCancion + '</p></article>';

            document.querySelector(".canciones").innerHTML = songItem;
            
        }
    )
    
})
