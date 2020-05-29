window.addEventListener("load", function() {

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127')
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
            console.log(informacion);

            let albumName = informacion.title
            document.querySelector('.favoritas').innerHTML = albumName;

            let artistName = informacion.artist.name
            document.querySelector('.Cantante').innerHTML = artistName;

            let albumPicture = informacion.artist.picture_xl
            document.querySelector('.imagen').src = albumPicture;

            let cantidadDeCanciones = informacion.nb_tracks
            document.querySelector('.ndc').innerHTML = cantidadDeCanciones + ' canciones';

            let duracion = informacion.duration
            document.querySelector('.minutos').innerHTML = duracion + ' minutos' ;

            let fecha = informacion.release_date
            document.querySelector('.fecha').innerHTML = fecha;

            let allSongs = informacion.tracks.data

            console.log(allSongs);
            
            for (let i = 0; i < allSongs.length; i++) {

                let songTitle = allSongs[i].title;

                console.log(songTitle);
                

                let songArtist = allSongs[i].artist.name;

                let songLength = allSongs[i].duration;
                let minutes = songLength/60
                minutes = Math.floor(minutes)
                let seconds = songLength %60
                if(seconds<10){
                    seconds = '0' + seconds
                }

                let songItem = '<article class="cancion"><p class="nombre"><a href="track.html">' + songTitle + '</a></p><p class="duracion">' + minutes + ':' + seconds + '</p><p class="artista">' + songArtist + '</p></article>'

                document.querySelector(".canciones").innerHTML += songItem
                
                
            }






            
            
        }
    )
})