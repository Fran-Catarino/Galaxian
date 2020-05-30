window.addEventListener("load", function() {

    let queryString = new URLSearchParams(location.search);

    let artistId = queryString.get("artistID");

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

            document.querySelector(".text-container p").innerHTML = res.nb_fan + " fans";

            document.querySelector(".infoArtist img").src = res.picture_xl;

            console.log(res.tracklist)

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
                                <h5>` + trackAlbum + `</h5>
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
