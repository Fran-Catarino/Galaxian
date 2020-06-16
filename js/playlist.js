window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let playlistId = queryString.get("playlistID");

    function truncateString(str, num, add) {
                    
        if (str.length <= num) {
          return str
        }
        
        return str.slice(0, add) + '...'
    }

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

                let trackId = allSongs[i].id
                
                let artistId = allSongs[i].artist.id
                
                let albumId = allSongs[i].album.id


                if (window.matchMedia("(min-width: 1440px)").matches) {

                    if (songArtist != songArtist.toUpperCase()){
                        console.log("es minis");
                        songArtist = truncateString(songArtist, 21, 20);
                    } else if (songArtist == songArtist.toUpperCase()) {
                        console.log("es mayus")
                        songArtist = truncateString(songArtist, 20,19);
                    }

                    if (albumDeCancion != albumDeCancion.toUpperCase()){
                        console.log("es minis");
                        albumDeCancion = truncateString(albumDeCancion, 21, 20);
                    } else if (albumDeCancion == albumDeCancion.toUpperCase()) {
                        console.log("es mayus")
                        albumDeCancion = truncateString(albumDeCancion, 20,19);
                    }

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 21, 20);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 20,19);
                    }
                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (albumDeCancion != albumDeCancion.toUpperCase()){
                        console.log("es minis");
                        albumDeCancion = truncateString(albumDeCancion, 14, 13);
                    } else if (albumDeCancion == albumDeCancion.toUpperCase()) {
                        console.log("es mayus")
                        albumDeCancion = truncateString(albumDeCancion, 13, 12);
                    } 

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 12, 11);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 11, 10);
                    } 

                    if (songArtist != songArtist.toUpperCase()){
                        console.log("es minis");
                        songArtist = truncateString(songArtist, 12, 11);
                    } else if (songArtist == songArtist.toUpperCase()) {
                        console.log("es mayus")
                        songArtist = truncateString(songArtist, 11, 10);
                    } 
                } else if (window.matchMedia("(min-width: 320px)").matches) {

                    if (songTitle != songTitle.toUpperCase()){
                        console.log("es minis");
                        songTitle = truncateString(songTitle, 16, 15);
                    } else if (songTitle == songTitle.toUpperCase()) {
                        console.log("es mayus")
                        songTitle = truncateString(songTitle, 14, 13);
                    } 
                }

                let songItem = '<article class="cancion"><p class="nombre"> <a href="track.html?trackID=' + trackId +'">' + songTitle + '</a></p><p class="duracion">' + minutes + ':' + seconds + '</p><p class="artista"><a href="artist.html?artistID=' + artistId +'">' + songArtist + '</a></p> <p class="album"> <a href="album.html?albumID=' + albumId +'">' + albumDeCancion + '</a></p></article>'

                document.querySelector(".canciones").innerHTML += songItem

            }

            
        }
    )

})