window.addEventListener("load", function() { 

    function noScroll() {
        window.scrollTo(0, 0);
    }
      
    // add listener to disable scroll
    window.addEventListener('scroll', noScroll);

    document.querySelectorAll(".music").forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Remove listener to re-enable scroll
            window.removeEventListener('scroll', noScroll);
        });
    }); 

    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(information) {

            let trackList = information.tracks.data;

            for (let i = 0; i < trackList.length; i++) {

                let trackId = trackList[i].id;
                                
                let trackTitle = trackList[i].title_short;

                let trackArtist = trackList[i].artist.name;

                let trackArtistId = trackList[i].artist.id;

                let trackItem = `
                <li class='track-item'>
                    <a class='tNomb' href='track.html?track=` + trackId +`'>` + trackTitle + `</a>
                    <span> by <a class='aNomb' href='artist.html?artistID=` + trackArtistId + `'>` + trackArtist + `</a></span>
                </li>
                `;

                document.querySelector(".trackList").innerHTML += trackItem;

                /* PREGUNTAR */

                /*
                document.querySelectorAll(".tNomb").forEach(item => {
                    item.addEventListener('click', event => {

                        event.preventDefault();
            
                        document.querySelector(".reprod").innerHTML = `
                        <iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=2f9bc1&layout=dark&size=medium&type=tracks&id=` + trackId + `&app_id=1" width="700" height="350"></iframe>
                        `
                    })
                })

                */
            }

            let albumList = information.albums.data;

            function truncateString(str, num, add) {
                // If the length of str is less than or equal to num
                // just return str--don't truncate it.
                if (str.length <= num) {
                  return str
                }
                // Return str truncated with '...' concatenated to the end of str.
                return str.slice(0, add) + '...'
            }

            for (let i = 0; i < albumList.length; i++) {
                               
                let albumTitle = albumList[i].title;

                let albumArtist = albumList[i].artist.name;

                let albumArtistId = albumList[i].artist.id;

                let albumCover = albumList[i].cover_xl;

                let albumId = albumList[i].id;

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    if (albumTitle != albumTitle.toUpperCase()){
                        console.log("es minis");
                        albumTitle = truncateString(albumTitle, 18, 17);
                    } else if (albumTitle == albumTitle.toUpperCase()) {
                        console.log("es mayus")
                        albumTitle = truncateString(albumTitle, 16, 15);
                    }                    

                    console.log(albumTitle);

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    if (albumTitle != albumTitle.toUpperCase()){
                        console.log("es minis");
                        albumTitle = truncateString(albumTitle, 14, 13);
                    } else if (albumTitle == albumTitle.toUpperCase()) {
                        console.log("es mayus")
                        albumTitle = truncateString(albumTitle, 15, 14);
                    } 

                    console.log(albumTitle);

                } else {

                    albumTitle = truncateString(albumTitle, 25, 24);
                }

                let albumItem = `
                    <li>
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-media-top">
                                <img src="` + albumCover + `" alt="album N°` + i + `">
                                <a href="#"><i class="fas fa-play-circle"></i></a>
                            </div>
                            <div class="uk-card-body">
                                <a href="album.html?albumID=` + albumId + `"><h3 class="uk-card-title">` + albumTitle + `</h3></a>
                                <span>by </span><a href="artist.html?artistID=` + albumArtistId +`">` + albumArtist + `</a>
                            </div>
                        </div>
                    </li>
                `;

                document.querySelector(".albumList").innerHTML += albumItem;

                let botonPlay = document.querySelector(".fa-play-circle");

                console.log(botonPlay)

               
            }

            let artistList = information.artists.data;

            for (let i = 0; i < artistList.length; i++) {
                                
                let artistId = artistList[i].id;

                let artistName = artistList[i].name; 

                let artistPic = artistList[i].picture_xl;
            
                let artistItem = `
                <li>
                    <div class="uk-card uk-card-default">
                        <div class="uk-card-media-top">
                            <img class="img-artist" src="` + artistPic + `" alt="artist N°` + i + `">
                        </div>
                        <div class="uk-card-body artist-body-card">
                            <a href="artist.html?artistID=` + artistId + `"><h3>` + artistName + `</h3></a>
                        </div>
                    </div>
                </li>
                `;

                document.querySelector(".artistList").innerHTML += artistItem;

                fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artistId)
                .then(
                    function(response) {
                        return response.json();
                    }
                )
                .then(
                    function(info) {

                        let cantFans = info.nb_fan;

                        // crea un nuevo span
                        var newSpan = document.createElement("p");
                        // y añade contenido 
                        var newContent = document.createTextNode(cantFans + ' fans'); 
                        newSpan.appendChild(newContent); //añade texto al span creado. 
                        // añade el elemento creado y su contenido al DOM 
                        document.querySelectorAll(".artist-body-card")[i].appendChild(newSpan);

                    }
                )
            }

            let playlistArray = information.playlists.data;

            for (let i = 0; i < playlistArray.length; i++) {
                
                let playlistName = playlistArray[i].title;

                let playlistPic = playlistArray[i].picture_xl;

                let playlistNumTracks = playlistArray[i].nb_tracks;

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    playlistName = truncateString(playlistName, 19, 18);

                    console.log(playlistName);

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    playlistName = truncateString(playlistName, 11, 10);

                    console.log(playlistName);

                } else {

                    playlistName = truncateString(playlistName, 30, 29);

                    console.log(playlistName);

                }

                let playlistItem = `
                <li>
                    <div class="uk-card uk-card-default">
                        <div class="uk-card-media-top">
                            <img src="` + playlistPic + `" alt="` + playlistName + `">
                            <a href="#"><i class="fas fa-play-circle"></i></a>
                        </div> 
                        <div class="uk-card-body">
                            <a href="playlist.html"><h3 class="uk-card-title">` + playlistName + `</h3></a>
                            <span>` + playlistNumTracks + ` tracks</span>
                        </div>
                    </div>
                </li>
                `;

                document.querySelector(".playlistList").innerHTML += playlistItem;

            }
        }
    )

    
})