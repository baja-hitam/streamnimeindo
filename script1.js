const animeInfoContainer = document.getElementById("animeInfoContainer");
let rating = document.getElementById('rating3');
let title3 = document.getElementById("title4");
let status2 = document.getElementById('status4'); 
let sinopsis = document.getElementById('sinopsis');
const episode = document.getElementById('episode')
const animeInfo = document.getElementById("animeInfo");
const saveData = JSON.parse(localStorage.getItem('datakey'));
const videoPlayer = document.getElementById("player");

displayAnimeInfo(saveData.data);

function displayAnimeInfo(data) {
    animeInfoContainer.style.display ="block";
    var title1;
    title3.innerHTML = data.title;
    rating.innerHTML = data.rating;  
    status2.innerHTML = data.status;
    let po = document.createElement('p');
    po.innerHTML = data.synopsis;
    sinopsis.appendChild(po);


    data.episode_lists.forEach(eps =>{
        title1 = document.createElement('h4');
        title1.innerHTML = eps.episode;
        title1.addEventListener("click", async function () {
                const res = await fetch(`https://otakudesu-unofficial-api.rzkfyn.xyz/api/v1/episode/${eps.slug}`)
                const episodeData = await res.json();
                console.log(episodeData.data);
                displayWatchInfo(episodeData.data);
        });
        episode.appendChild(title1);
    });
};
//belum
function displayWatchInfo(episodeData) {
    let tag = document.getElementById('tag');
    tag.innerHTML = episodeData.episode;
    tag.style.display = "block"
    videoPlayer.style.display = "block"
    const serverUrl = episodeData.stream_url;
    var player = document.getElementById('player');
    player.style.display = "block"
    player.src = `${serverUrl}`;
    };

function hapusString(input, stringToBeDeleted) {
    return input.replace(new RegExp(stringToBeDeleted, 'g'), '');
  };