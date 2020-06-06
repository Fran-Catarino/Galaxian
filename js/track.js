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
            let artistId = informacion.artist.id
            let albumId = informacion.album.id

            let songItem = '<article class="cancion"><a href="track.html?trackID='+ trackId +'">' + songTitle + '</a><a class="duracion">' + minutes + ':' + seconds + '</p><a class="artista" href="artist.html?artistID='+ artistId +'" >' + songArtist + '</a> <a class="album" href="album.html?albumID=' + albumId +'">' + albumDeCancion + '</a></article>';

            document.querySelector(".canciones").innerHTML = songItem;
            
        }
    )
    
})
