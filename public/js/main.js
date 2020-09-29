const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')


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

    result.innerHTML = "";
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


        const img = document.createElement('img');
        img.src = song.album.cover_big;
        songElement.appendChild(img);


        const mediaBody = document.createElement("div");
        mediaBody.className = "media-body";
        songElement.appendChild(mediaBody);

        const h3 = document.createElement('h3')
        h3.textContent = `${songTitle}- ${artist}`
        mediaBody.appendChild(h3)


        result.appendChild(songElement)

    });
}

// display final result in DO
// function showData(data) {

//     result.innerHTML = `
//     <ul class="song-list">
//       ${data.data
//         .map(song=> `<li>
//                     <div>

//                         <strong>${song.artist.name}</strong> -${song.title} 
//                     </div>
//                     <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
//                 </li>`
//         )
//         .join('')}
//     </ul>
//   `;
// }

// event listener in get lyrics button
result.addEventListener('click', e => {
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



// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    let lyricsDiv = document.createElement('div')
    lyricsDiv.classList.add("lyrics")
    let content = document.createElement('p')
    lyricsDiv.appendChild(content)

    content.innerHTML = lyrics;

    let h2 = document.createElement('h2');
    h2 = `${artist}- ${songTitle}`;




    result.innerHTML = "";

    result.appendChild(lyricsDiv);


    // result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    //     <p>${lyrics}</p>`;

}