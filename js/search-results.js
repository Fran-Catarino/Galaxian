window.addEventListener('load', function() {


    let queryString = new URLSearchParams(location.search)

    let loBuscado = queryString.get("searcher");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' + loBuscado)
    .then(
        function(respuesta) {
            return respuesta.json();            
        }
    )
    .then(
        function(informacion) {

            console.log(informacion)

            let numberTracks = informacion.total;

            document.querySelector(".number-tracks").innerHTML = numberTracks + " tracks";

            arrayTracks = informacion.data;

            for (let i = 0; i < arrayTracks.length; i++) {

                let trackTitle = arrayTracks[i].title;

                let trackExplicit = arrayTracks[i].explicit_lyrics;

                let trackArtist = arrayTracks[i].artist.name;

                let trackAlbum = arrayTracks[i].album.title;

                let duration = arrayTracks[i].duration;

                let trackImg = arrayTracks[i].album.cover_big;

                if (trackExplicit == true) {
                    console.log("si")
                    let trackItem =
                    `
                    <li class="track-item">
                        <div class="img-container">
                            <img class="track-img" src="` + trackImg + `" alt="track-image">
                        </div>
                        <a href="" class="fav"><i class="far fa-heart"></i></a>
                        <a href="" class="track-title">` + trackTitle + `</a>
                        <div class="info-mobile">
                            <a href="" class="track">` + trackTitle + `</a>
                            <a href="" class="artist">` + trackArtist + `</a>
                        </div>
                        <p class="explicit">E</p>
                        <a href="" class="track-artist">` + trackArtist + `</a>
                        <a href="" class="track-album">` + trackAlbum + `</a>
                        <p class="duration">` + duration + `</p>
                    </li>
                    `
                    document.querySelector(".ul").innerHTML += trackItem;
                } else {
                    let trackItem =
                    `
                    <li class="track-item">
                        <div class="img-container">
                            <img class="track-img" src="` + trackImg + `" alt="track-image">
                        </div>
                        <a href="" class="fav"><i class="far fa-heart"></i></a>
                        <a href="" class="track-title">` + trackTitle + `</a>
                        <div class="info-mobile">
                            <a href="" class="track">` + trackTitle + `</a>
                            <a href="" class="artist">` + trackArtist + `</a>
                        </div>
                        <p></p>
                        <a href="" class="track-artist">` + trackArtist + `</a>
                        <a href="" class="track-album">` + trackAlbum + `</a>
                        <p class="duration">` + duration + `</p>
                    </li>
                    `
                    document.querySelector(".ul").innerHTML += trackItem;

                }

                let trackItems = document.querySelectorAll(".track-item")

                console.log(trackItems)

                let container = document.querySelectorAll(".img-container");
                
                for (i = 0; i < trackItems.length; i++) {
                    console.log(container[i])
                    trackItems[i].addEventListener('mouseover', function() {
                        this.style.backgroundColor = "rgba(53, 47, 68, 0.692)";
                        container[i].innerHTML = '<a href="index.html" class="play"><i class="fas fa-play-circle"></i></a>'
                    })
                    trackItems[i].addEventListener('mouseout', function() {
                        this.style.backgroundColor = "";
                        container[i].innerHTML = '<img class="track-img" src="' + trackImg + '" alt="track-image">'
                    })
                }
                

                for (i = 0; i < container.length; i++) {
                    
                    container[i].addEventListener('mouseover', function() {
                        console.log("anda")
                        this.innerHTML = '<a href="index.html" class="play"><i class="fas fa-play-circle"></i></a>'
                    })
                    container[i].addEventListener('mouseout', function() {
                        console.log("anda")
                        this.innerHTML = '<img class="track-img" src="' + trackImg + '" alt="track-image">'
                    })
                    
                }
            }
        }
    )



    

})