let queryString = new URLSearchParams(location.search);

    let artistId = queryString.get("artistID");

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556')
    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(informacion) {
            console.log(informacion);
            
            let titulo = informacion.title
            document.querySelector('.cancion' ).innerHTML = titulo ;

            let coverTrack = informacion.album.cover_xl
            document.querySelector('.image').src = coverTrack;

            let cantante = informacion.artist.name
            document.querySelector('.art').innerHTML = cantante;

            let albumes = informacion.album.cover
            document.querySelector('.album1').src = albumes;
            

            
        }
            
            
        
    )