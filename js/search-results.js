window.addEventListener('load', function() {


    let queryString = new URLSearchParams(location.search)

    let loBuscado = queryString.get("searcher");

    console.log(loBuscado)

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

            function truncateString(str, num, add) {
                // If the length of str is less than or equal to num
                // just return str--don't truncate it.
                if (str.length <= num) { 
                  return str
                }
                // Return str truncated with '...' concatenated to the end of str.
                return str.slice(0, add) + '...'
            }

            arrayTracks = informacion.data;

            for (let i = 0; i < arrayTracks.length; i++) {

                let trackTitle = arrayTracks[i].title;

                let trackId = arrayTracks[i].id;

                let trackExplicit = arrayTracks[i].explicit_lyrics;

                let trackArtist = arrayTracks[i].artist.name;
                
                let artistId = arrayTracks[i].artist.id;

                let trackAlbum = arrayTracks[i].album.title;

                let albumId = arrayTracks[i].album.id;

                let duration = arrayTracks[i].duration;

                let minutes = duration/60
                minutes = Math.floor(minutes)

                let seconds = duration %60

                if(seconds<10){
                    seconds = '0' + seconds
                }

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    if (trackAlbum != trackAlbum.toUpperCase()){
                        trackAlbum = truncateString(trackAlbum, 20, 19);
                    } else if (trackAlbum == trackAlbum.toUpperCase()) {
                        trackAlbum = truncateString(trackAlbum, 16, 15);
                    }  

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (trackAlbum != trackAlbum.toUpperCase()){
                        trackAlbum = truncateString(trackAlbum, 18, 17);
                    } else if (trackAlbum == trackAlbum.toUpperCase()) {
                        trackAlbum = truncateString(trackAlbum, 15, 14);
                    }   

                    if (trackTitle != trackTitle.toUpperCase()){
                        trackTitle = truncateString(trackTitle, 23, 22);
                    } else if (trackTitle == trackTitle.toUpperCase()) {
                        trackTitle = truncateString(trackTitle, 20, 19);
                    } 

                } else {

                    trackTitle = truncateString(trackTitle, 25, 24);
                }

                let trackImg = arrayTracks[i].album.cover_big;

                if (trackExplicit == true) {
                    
                    let trackItem =
                    `
                    <li class="track-item">
                        <div class="img-container" data-trackid="` + trackId +`">
                            <img class="track-img" src="` + trackImg + `" alt="track-image">
                        </div>
                        <i class="far fa-heart fav" data-trackid="` + trackId +`></i>
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

                /* PREGUNTAR */
                if (i == 24) {
                    console.log("EL ULTIMO")
                    document.querySelector(".track-item").classList.toggle('el-ultimo');
                }

                let trackItems = document.querySelectorAll(".track-item")
                
                trackItems.forEach (function(cancion) {

                    let fotoAnterior;

                    cancion.addEventListener('mouseover', function() {
                        this.style.backgroundColor = "rgba(53, 47, 68, 0.692)";
                        fotoAnterior = this.children[0].innerHTML;
                        this.children[0].innerHTML = '<i class="fas fa-play-circle play"></i>';                      

                        //* 
                    })
                    cancion.addEventListener('mouseout', function() {
                        this.style.backgroundColor = "";
                        this.children[0].innerHTML =  fotoAnterior;
                    })


                })
            
            }

            corazone

            container = document.querySelectorAll(".img-container");

            console.log(container)

            for (let i = 0; i < container.length; i++) {
                //*console.log(container[i].children[0])  
                  //*onclick y adentro obtener el id "this.getAtri"         
            }



            

            /*
            botonPlayTrack.forEach(function(boton) {

                boton.addEventListener("click", function(e){

                    console.log(this.dataset)
                    document.querySelector('.reprod-container').innerHTML = `
                    <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=tracks&id=` + this.dataset.trackid + `&app_id=1" width="700" height="350"></iframe>
                    `
                    document.querySelector(".reprod").style.display = "block";
                })

            })
            
            */

           let botonesContainer = document.querySelector('.botones'); 
            
           let next = informacion.hasOwnProperty('next');

           let prev = informacion.hasOwnProperty('prev');

           let link = informacion.next;
           
           
        
           
           if (next == true) {
            botonesContainer.innerHTML += '<a class="more" href="search-results.html?searcher=' + dataM + '">More</a>'
           }

           
           l
           let botonMore = document.querySelector('.more');

           

           botonMore.addEventListener('click', function(e) {
               
           })
           
        }
    )

})