window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let playlistId = queryString.get("playlistID");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/'+ playlistId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion){
            console.log(informacion);

            let coverAlbum = informacion.picture_xl
            document.querySelector('.imagen').src = coverAlbum;

            let playlistName = informacion.title
            document.querySelector('.favoritas').innerHTML = playlistName
            let creator = informacion.creator.name
            document.querySelector('.creador').innerHTML = creator

            let cantidadDeCanciones = informacion.nb_tracks
            document.querySelector('.ndc').innerHTML = cantidadDeCanciones + ' canciones';

            let duracion = informacion.duration
            document.querySelector('.minutos').innerHTML = duracion + ' minutos' ;

            let seguidores = informacion.fans
            document.querySelector('.fans').innerHTML = seguidores + ' ' +'seguidores'

            let allSongs = informacion.tracks.data
            console.log(allSongs);

            for (let i = 0; i < allSongs.length; i++) {

                let songTitle = allSongs[i].title;

                let songArtist = allSongs[i].artist.name;

                let songLength = allSongs[i].duration;
                let minutes = songLength/60
                minutes = Math.floor(minutes)
                let seconds = songLength %60
                if(seconds<10){ seconds = '0' + seconds }

                let albumDeCancion = allSongs[i].album.title

                let songItem = '<article class="cancion"><p class="nombre"><a href="track.html">' + songTitle + '</a></p><p class="duracion">' + minutes + ':' + seconds + '</p><p class="artista">' + songArtist + '</p> <p class="album">' + albumDeCancion + '</p></article>'

                document.querySelector(".canciones").innerHTML += songItem

            }


        }
    
    )
})