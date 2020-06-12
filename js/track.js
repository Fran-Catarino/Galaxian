window.addEventListener("load", function() {
    let queryString = new URLSearchParams(location.search);

    let trackId = queryString.get("trackID");

    document.querySelector(`.reprod-container`).innerHTML = `<iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=tracks&id=` + trackId + `&app_id=1" width="700" height="350"></iframe>`
    document.querySelector('.reprod').style.display = "block"

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/' + trackId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
            console.log(informacion);

            let coverTrack = informacion.album.cover_xl;
            document.querySelector('.track-cover').src = coverTrack;

            let cantante = informacion.artist.name

            let titulo = informacion.title;

            let albumDeCancion = informacion.album.title;

            let artistId = informacion.artist.id

            let albumId = informacion.album.id

            let trackId = informacion.id;

            let release = informacion.release_date;
            let year = release.slice(0, 4);

            document.querySelector(".released h3").innerHTML = release;

            let infoTrack =
            `
            <h1 class="title">` + titulo +`</h1>
            <h2 class="artistDk">by <a href"artist.html?artistID=` + artistId + `" class="artist-link">` + cantante + `</a></h2>
            <h2 class="details">by <a href"artist.html?artistID=` + artistId + `" class="artist-link2">` + cantante + `</a> • <span class="year">` + year + `</span></h2>
            `

            document.querySelector(".track-info").innerHTML = infoTrack;

            let songLength = informacion.duration;

            let minutes = songLength/60
            minutes = Math.floor(minutes);
            let seconds = songLength %60
            if(seconds<10){
                seconds = '0' + seconds
            }

            let explicit = informacion.explicit_lyrics;

            let songItem;

            if (explicit == true) {
                songItem = 
                `
                <div class="track-item">
                    <a href="track.html?trackID=` + trackId + `" class="track-title">` + titulo + `</a>
                    <div class="info-mobile">
                    <a href="track.html?trackID=` + trackId + `" class="track">` + titulo + `</a>
                        <a href="album.html?albumID=` + albumId + `" class="album">` + albumDeCancion + `</a>
                    </div>
                    <p class="explicit">E</p>
                    <a href="album.html?albumID=` + albumId + `" class="track-album">` + albumDeCancion + `</a>
                    <p class="duration">` + minutes + `:` + seconds + `</p>
                </div>
                `;
            } else {
                songItem = 
                `
                <div class="track-item">
                    <a href="track.html?trackID=` + trackId + `" class="track-title">` + titulo + `</a>
                    <div class="info-mobile">
                    <a href="track.html?trackID=` + trackId + `" class="track">` + titulo + `</a>
                        <a href="album.html?albumID=` + albumId + `" class="album">` + albumDeCancion + `</a>
                    </div>
                    <p></p>
                    <a href="album.html?albumID=` + albumId + `" class="track-album">` + albumDeCancion + `</a>
                    <p class="duration">` + minutes + `:` + seconds + `</p>
                </div>
                `;
            }

            document.querySelector("main").innerHTML += songItem;
            

            document.querySelector(".add-track").addEventListener("click", function(e) {

                e.preventDefault();

                document.querySelector('.add-track p').innerHTML = "Added";

                let boton = document.querySelector('.add-track');

                boton.style.backgroundColor = "#2f9ac17e";

                if (window.matchMedia("(max-width: 375px)").matches) {
                    boton.style.width = "96px"
                } else {
                    boton.style.width = "120px"
                }
                
                let arrayFavorites;
                
                // Me fijo si hay cosas en storage
                if (localStorage.getItem("likeTracks") != null) {
                    //arrayDeGifsFavoritos y le voy a agregar el código el GIF
                    arrayFavorites = localStorage.getItem("likeTracks").split(",")
                    arrayFavorites.push(trackId)
                } else {
                    //TENGO QUE CREAR UN ARRAY NUEVO CON EL CODIGO DEL GIF
                    arrayFavorites = []
                    arrayFavorites.push(trackId)
                }
                
                localStorage.setItem("likeTracks", arrayFavorites);
            })
        }
    )
    
})
