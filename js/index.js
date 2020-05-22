window.addEventListener("load", function() { 
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(information) {

            let trackList = information.tracks.data;

            console.log(trackList)

            for (let i = 0; i < 5; i++) {
                                
                let trackTitle = trackList[i].title;

                let trackArtist = trackList[i].artist.name;

                let trackItem = "<li class='track-item'><a class='tNomb' href='track.html'>" + trackTitle + "</a><span> by <a class='aNomb' href='artist.html'>" + trackArtist + "</a></span></li>";

                document.querySelector(".trackList").innerHTML += trackItem;

                console.log(trackArtist)
            }

            let albumList = information.albums.data;
            
            console.log(albumList);

            for (let i = 0; i < albumList.length; i++) {
                               
                let albumTitle = albumList[i].title;

                let albumArtist = albumList[i].artist.name;

                let albumCover = albumList[i].cover_xl;

                let albumItem = '<li><div class="uk-card uk-card-default"><div class="uk-card-media-top"><img src="' + albumCover + '" alt="album N°' + i + '"><a href="#"><i class="fas fa-play-circle"></i></a></div><div class="uk-card-body"><a href="album.html"><h3 class="uk-card-title">' + albumTitle + '</h3></a><span>by </span><a href="artist.html">' + albumArtist + '</a></div></div></li>';

                document.querySelector(".albumList").innerHTML += albumItem;
            }

            let artistList = information.artists.data;

            console.log(artistList);

            for (let i = 0; i < artistList.length; i++) {
                const element = artistList[i];
                
                let artistName = artistList[i].name; 

                let artistPic = artistList[i].picture_xl;

                let artistItem = '<li><div class="uk-card uk-card-default"><div class="uk-card-media-top"><img class="img-artist" src="' + artistPic + '" alt="artist N°' + i + '"></div><div class="uk-card-body artist-body-card"><a href="artist.html"><h3>' + artistName + '</h3></a><span>1 458 632</span><a href="#"> fans</a></div></div></li>';

                document.querySelector(".artistList").innerHTML += artistItem;
            }
        }
    )
})