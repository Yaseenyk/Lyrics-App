

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("Nothing to search");
    } else {
        beginSearch(searchValue);
    }
})

// Search function
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    displayData(data);
}

// Display Search Result
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
  }


  // //Variables
// const form = document.getElementById("form");
// const search = document.getElementById("search");
// const result = document.getElementById("result");


// const apiUrl = "https://api.lyrics.ovh";


// // Get Input Values

// form.addEventListener('submit' , e=>{
//     e.preventDefault();
//     searchValue = search.value.trim();

//     if(!searchValue){
//         alert("Enter The Song Name");
//     }
//     else{
//         beginSearch(searchValue);
//     }
// })

// //Create Search Function

// async function beginSearch(searchValue){
//     const searchResult = await fetch(`${apiUrl}/suggest/${searchValue}`);
//     const data = await searchResult.json();
//     // console.log(data);

//     displayData(data);
// }

// // Display Data
//  function displayData(data){
//     result.innerHTML = `<ul class name = 'songs'>
//         ${data.data
//         .map(songs => `
//         <li>
//             <div>
//             <b>${songs.artist.name}</b>
//                 - ${songs.title}
//             </div>
//             <span data-artist="${songs.artist.name}"
//             data-songtitle="${songs.title}">Get Lyrics</span>

//         </li>

//         `).join('')}

//     </ul>
//     `;
//  }


//  //Get Lyrics Function

//  result.addEventListener("click", value2 =>{
//      const clickElement = value2.target;


// //Check get lyrics Button
// if(clickElement.tagName === 'SPAN'){
//     const artist = clickElement.getAttribute('data-artist');
//     const songTitle = clickElement.getAttribute('data-songtitle');

//     getLyrics(artist, songTitle);
// }


//  })

//  async function getLyrics(artist, songTitle){
//      const res = await fetch(`${apiUrl}/vl/${artist}/${songTitle}`);

//      const data = await res.json();

//      const lyrics = data.lyrics.replace(/(r\n|\r|\n)/g,'<br>');


//      result.innerHTML = `<h2>
//                             <b>${artist}</b> - ${songTitle}
//                         </h2>
//                         <p>
//                         ${lyrics}
//                         </p>
//      `;
//  };
