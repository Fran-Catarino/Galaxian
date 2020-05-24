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

                let albumCover = albumList[i].cover_xl;

                console.log(albumTitle);

                if (window.matchMedia("(min-width: 1440px)").matches) {
                    
                    let shortAlbumTitle = truncateString(albumTitle, 20, 19);

                    console.log(shortAlbumTitle);

                    let albumItem = '<li><div class="uk-card uk-card-default"><div class="uk-card-media-top"><img src="' + albumCover + '" alt="album N°' + i + '"><a href="#"><i class="fas fa-play-circle"></i></a></div><div class="uk-card-body"><a href="album.html"><h3 class="uk-card-title">' + shortAlbumTitle + '</h3></a><span>by </span><a href="artist.html">' + albumArtist + '</a></div></div></li>';

                    document.querySelector(".albumList").innerHTML += albumItem;

                } else if (window.matchMedia("(min-width: 1024px)").matches) {

                    let shortAlbumTitle = truncateString(albumTitle, 13, 12);

                    console.log(shortAlbumTitle);

                    let albumItem = '<li><div class="uk-card uk-card-default"><div class="uk-card-media-top"><img src="' + albumCover + '" alt="album N°' + i + '"><a href="#"><i class="fas fa-play-circle"></i></a></div><div class="uk-card-body"><a href="album.html"><h3 class="uk-card-title">' + shortAlbumTitle + '</h3></a><span>by </span><a href="artist.html">' + albumArtist + '</a></div></div></li>';

                    document.querySelector(".albumList").innerHTML += albumItem;

                } else {

                    let shortAlbumTitle = truncateString(albumTitle, 30, 29);

                    console.log(shortAlbumTitle);

                    let albumItem = '<li><div class="uk-card uk-card-default"><div class="uk-card-media-top"><img src="' + albumCover + '" alt="album N°' + i + '"><a href="#"><i class="fas fa-play-circle"></i></a></div><div class="uk-card-body"><a href="album.html"><h3 class="uk-card-title">' + shortAlbumTitle + '</h3></a><span>by </span><a href="artist.html">' + albumArtist + '</a></div></div></li>';

                    document.querySelector(".albumList").innerHTML += albumItem;

                }

            }

            let artistList = information.artists.data;

            console.log(artistList);

            for (let i = 0; i < artistList.length; i++) {
                                
                let artistName = artistList[i].name; 

                let artistPic = artistList[i].picture_xl;

                let artistItem = '<li><div class="uk-card uk-card-default"><div class="uk-card-media-top"><img class="img-artist" src="' + artistPic + '" alt="artist N°' + i + '"></div><div class="uk-card-body artist-body-card"><a href="artist.html"><h3>' + artistName + '</h3></a><span>1 458 632</span><a href="#"> fans</a></div></div></li>';

                document.querySelector(".artistList").innerHTML += artistItem;
            }
        }
    )

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

})