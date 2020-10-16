
const form = document.getElementById('form')
const search = document.getElementById('search')
const results = document.getElementById('results')
let songList = "";



/// api URL ///
const apiURL = 'https://api.lyrics.ovh';


/// adding event listener in form

form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim()

    if (!searchValue) {

        alert("There is nothing to search")

    } else {
        searchSong(searchValue)
    }
})


//search song 
async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    if (data.data.length == 0) {
        console.log('Not Found');
        // alert("Song Lyrics not found")
        document.write("Not Found")
    }


    results.innerHTML = "";
    console.log(data)
    showData(data)
}


function showData(data) {

    // result.innerHTML = data;
    data.data.forEach(song => {
        const songTitle = song.title;
        const artist = song.artist.name;

        const songElement = document.createElement('span')
        // songElement.className = 'media'
        songElement.setAttribute('song-name', songTitle)
        songElement.setAttribute('artist', artist)

        const h3 = document.createElement('h3')
        h3.textContent = `${songTitle}- ${artist}`
        songElement.appendChild(h3)

        const img = document.createElement('img');
        img.src = song.album.cover_big;
        img.id = ('img');
        songElement.appendChild(img);

     

        results.appendChild(songElement)

        songList = results.innerHTML;


    });
}

// event listener in get lyrics button
results.addEventListener('click', e => {
    let clickedElement = e.target.parentElement;
    console.log(clickedElement.tagName);
    console.log(clickedElement.parentElement.tagName);

    // checking clicked elemet is button or not
    if (clickedElement.tagName === "SPAN") {
        const artist = clickedElement.getAttribute('artist');
        const songTitle = clickedElement.getAttribute('song-name');

        getLyrics(artist, songTitle)
    }

    if (clickedElement.parentElement.tagName === ('SPAN')) {
        clickedElement = clickedElement.parentElement;
        const artist = clickedElement.getAttribute('artist');
        const songTitle = clickedElement.getAttribute('song-name');

        getLyrics(artist, songTitle)

    }

})


// Back button function
document.addEventListener('DOMContentLoaded', function () {


    document.getElementById('back-btn').addEventListener('click', function () {


        results.innerHTML = songList;
        document.getElementById('back-btn').style.visibility = 'hidden'

    })
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    let lyricsDiv = document.createElement('div')
    lyricsDiv.classList.add("lyrics")
    lyricsDiv.id = 'lyrics';


    // var button = document.createElement("button");
    // button.innerHTML = "GO BACK";
    // button.className = "back-btn"
    // lyricsDiv.appendChild(button)


    let h2 = document.createElement('h2');
    h2.innerText = `${artist}- ${songTitle}`;

    lyricsDiv.appendChild(h2)


    let content = document.createElement('p')
    content.innerHTML = lyrics;
    lyricsDiv.appendChild(content)


    results.innerHTML = "";

    results.appendChild(lyricsDiv);


    document.getElementById('back-btn').style.visibility = 'visible';
    // document.getElementById('up-btn').style.visibility = 'visible';

    //back to top arrow
    if(lyrics != ""){
    document.getElementById('arrow-container').style.visibility = 'visible';
    }

    //Scroll to the top of page//
    // window.scrollTo(0, 0);
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}