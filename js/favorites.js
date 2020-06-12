window.addEventListener("load", function() {
    
    function truncateString(str, num, add) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) { 
          return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, add) + '...'
    }

    // Paso 1: Chequeo si hay tracks favoritos

    if(localStorage.getItem("likeTracks") != null) {

        // Paso 2: Leemos los favoritos

        let arrayTracks = localStorage.getItem("likeTracks").split(",")

        // Paso 3: Recorremos el array de favoritos
        for (let i = 0; i < arrayTracks.length; i++) {

            // Paso 4: Traigo de Giphy el detalle del gif
            fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + arrayTracks[i])
            .then(
                function(respuesta) {
                    return respuesta.json();            
                }
            )
            .then(
                function(resultado) {

                    // Acá es donde vamos a trabajar

                    let track = resultado;
                
                    let trackTitle = track.title;

                    let trackId = track.id;

                    let trackExplicit = track.explicit_lyrics;

                    let trackArtist = track.artist.name;
                    
                    let artistId = track.artist.id;

                    let trackAlbum = track.album.title;

                    let albumId = track.album.id;

                    let duration = track.duration;

                    let minutes = duration/60
                    minutes = Math.floor(minutes)

                    let seconds = duration %60

                    if(seconds<10){
                        seconds = '0' + seconds
                    }

                    if (window.matchMedia("(min-width: 1440px)").matches) {
                        
                        if (trackAlbum != trackAlbum.toUpperCase()){
                            console.log("es minis");
                            trackAlbum = truncateString(trackAlbum, 20, 19);
                        } else if (trackAlbum == trackAlbum.toUpperCase()) {
                            console.log("es mayus")
                            trackAlbum = truncateString(trackAlbum, 16, 15);
                        }                    

                        console.log(trackAlbum);

                    } else if (window.matchMedia("(min-width: 1024px)").matches) {

                        if (trackAlbum != trackAlbum.toUpperCase()){
                            console.log("es minis");
                            trackAlbum = truncateString(trackAlbum, 18, 17);
                        } else if (trackAlbum == trackAlbum.toUpperCase()) {
                            console.log("es mayus")
                            trackAlbum = truncateString(trackAlbum, 15, 14);
                        }   

                        if (trackTitle != trackTitle.toUpperCase()){
                            console.log("es minis");
                            trackTitle = truncateString(trackTitle, 23, 22);
                        } else if (trackTitle == trackTitle.toUpperCase()) {
                            console.log("es mayus")
                            trackTitle = truncateString(trackTitle, 20, 19);
                        } 

                        console.log(trackAlbum);

                    } else {

                        trackTitle = truncateString(trackTitle, 25, 24);
                    }

                    let trackImg = track.album.cover_big;

                    if (trackExplicit == true) {
                        
                        let trackItem =
                        `
                        <li class="track-item">
                            <div class="img-container" data-trackid="` + trackId +`">
                                <img class="track-img" src="` + trackImg + `" alt="track-image">
                            </div>
                            <i class="far fa-heart fav"></i>
                            <a href="track.html?trackID=` + trackId + `" class="track-title">` + trackTitle + `</a>
                            <div class="info-mobile">
                                <a href="track.html?trackID=` + trackId + `" class="track">` + trackTitle + `</a>
                                <a href="artist.html?artistID=` + artistId + `" class="artist">` + trackArtist + `</a>
                            </div>
                            <p class="explicit">E</p>
                            <a href="artist.html?artistID=` + artistId + `" class="track-artist">` + trackArtist + `</a>
                            <a href="album.html?albumID=` + albumId + `" class="track-album">` + trackAlbum + `</a>
                            <p class="duration">` + minutes + `:` + seconds + `</p>
                        </li>
                        `
                        document.querySelector(".ul").innerHTML += trackItem;
                    } else {
                        let trackItem =
                        `
                        <li class="track-item">
                            <div class="img-container" data-trackid="` + trackId +`">
                                <img class="track-img" src="` + trackImg + `" alt="track-image">
                            </div>
                            <i class="far fa-heart fav""></i>
                            <a href="track.html?trackID=` + trackId + `" class="track-title">` + trackTitle + `</a>
                            <div class="info-mobile">
                                <a href="track.html?trackID=` + trackId + `" class="track">` + trackTitle + `</a>
                                <a href="artist.html?artistID=` + artistId + `" class="artist">` + trackArtist + `</a>
                            </div>
                            <p></p>
                            <a href="artist.html?artistID=` + artistId + `" class="track-artist">` + trackArtist + `</a>
                            <a href="album.html?albumID=` + albumId + `" class="track-album">` + trackAlbum + `</a>
                            <p class="duration">` + minutes + `:` + seconds + `</p>
                        </li>
                        `
                        document.querySelector(".ul").innerHTML += trackItem;

                    }

                }
            )

        }

    } else {    
        alert("Ey! No hay favs!")
    }
})