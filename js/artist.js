window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let artistId = queryString.get("artistID");

    function truncateString(str, num, add) {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) {
          return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, add) + '...'
    }

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId)
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(res) {

            console.log(res)

            document.querySelector(".text-container h2").innerHTML = res.name;

            let artistId = res.id;

            document.querySelector(".text-container p").innerHTML = res.nb_fan + " fans";

            document.querySelector(".infoArtist img").src = res.picture_xl;

            console.log(res.tracklist)

            document.querySelector('.play-artist').addEventListener('click', function() {

                console.log("hola")
                document.querySelector('.reprod-container').innerHTML = `
                <iframe class="reprod" scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=false&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=radio&id=artist-` + artistId + `&app_id=1" width="700" height="350"></iframe>
                `
                document.querySelector(".reprod").style.display = "block";
            })

            document.querySelector('.reprod-container').addEventListener('mouseover', function() {
                document.querySelector(".reprod").style.display = "none";
            })

            fetch('https://cors-anywhere.herokuapp.com/' + res.tracklist)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(info) {
                    topTracksArray = info.data

                    for (let i = 0; i < 5; i++) {
                        
                        let trackTitle = topTracksArray[i].title;

                        let trackAlbum = topTracksArray[i].album.title;

                        if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                            if (trackAlbum != trackAlbum.toUpperCase()){
                                console.log("es minis");
                                trackAlbum = truncateString(trackAlbum, 57, 56);
                            } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                console.log("es mayus")
                                trackAlbum = truncateString(trackAlbum, 38, 37);
                            }   
                            
                            if (trackTitle != trackTitle.toUpperCase()){
                                console.log("es minis");
                                trackTitle = truncateString(trackTitle, 40, 39);
                            } else if (trackTitle == trackTitle.toUpperCase()) {
                                console.log("es mayus")
                                trackTitle = truncateString(trackTitle, 28, 27);
                            }
        
                            console.log(trackAlbum);
        
                        } else if (window.matchMedia("(min-width: 1024px)").matches) {
        
                            if (trackAlbum != trackAlbum.toUpperCase()){
                                console.log("es minis");
                                trackAlbum = truncateString(trackAlbum, 42, 41);
                            } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                console.log("es mayus")
                                trackAlbum = truncateString(trackAlbum, 25, 24);
                            } 

                            if (trackTitle != trackTitle.toUpperCase()){
                                console.log("es minis");
                                trackTitle = truncateString(trackTitle, 24, 23);
                            } else if (trackTitle == trackTitle.toUpperCase()) {
                                console.log("es mayus")
                                trackTitle = truncateString(trackTitle, 22, 21);
                            }
        
                            console.log(trackAlbum);
        
                        } else {
        
                            if (trackAlbum != trackAlbum.toUpperCase()){
                                console.log("es minis");
                                trackAlbum = truncateString(trackAlbum, 40, 39);
                            } else if (trackAlbum == trackAlbum.toUpperCase()) {
                                console.log("es mayus")
                                trackAlbum = truncateString(trackAlbum, 30, 29);
                            }

                            if (trackTitle != trackTitle.toUpperCase()){
                                console.log("es minis");
                                trackTitle = truncateString(trackTitle, 27, 26);
                            } else if (trackTitle == trackTitle.toUpperCase()) {
                                console.log("es mayus")
                                trackTitle = truncateString(trackTitle, 25, 24);
                            }
                        }

                        let trackAlbumId = topTracksArray[i].album.id;

                        let trackDuration = topTracksArray[i].duration;

                        let minutes = trackDuration/60
                        minutes = Math.floor(minutes)
                        let seconds = trackDuration %60
                        if(seconds<10){
                            seconds = '0' + seconds
                        }

                        trackItem = `
                        <article class="songs">
                            <h3>` + (i+1) + `</h3>
                            <div>
                                <a href="track.html"><h2>` + trackTitle + `</h2></a>
                                <a href="album.html?albumID=` + trackAlbumId + `"><h5>` + trackAlbum + `</h5></a>
                            </div>
                            <h4>` + minutes + `:` + seconds + `</h4>   
                        </article>
                        `;

                        document.querySelector(".list-of-songs").innerHTML += trackItem;
                    }
                }
            )
        }
    )

})
