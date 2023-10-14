const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const animeInfoContainer = document.getElementById("animeInfoContainer");
const watchContainer = document.getElementById("qualityContainer");
const mainLoading = document.getElementById("mainLoading");
const videoPlayer = document.getElementById("player");
const episode = document.getElementById('episode')
const animeInfo = document.getElementById("animeInfo");
const sinopsis1 = document.getElementById("sinopsis");

searchBtn.addEventListener("click", async function () {
    animeInfoContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    mainLoading.style.display = 'flex';
    resultContainer.innerHTML="";
    mainLoading.innerHTML = "Loading..."
    episode.innerHTML="";
    animeInfo.innerHTML="";
    sinopsis1.innerHTML="";

    const query = queryInput.value;
    const rest = await fetch(`https://otakudesu-anime-api.vercel.app/api/v1/search/${query}`);
    const data = await rest.json();
    if (data.search.length > 0) {
        displayResults(data.search);
      } else {
        mainLoading.innerHTML = "Data Tidak Ditemukan";
      }
});

function displayResults(results) {
    resultContainer.innerHTML = "";
    mainLoading.style.display = "none";

    results.forEach(result => {
        const resultDiv = document.createElement("div");
        animeTitle = `${result.title.replace("(Judul)","")}`;
        resultMain = `${animeTitle} | ${result.rating}`;

        resultDiv.innerHTML = resultMain;
        var stringToDelete = "https:/otakudesu.wiki/anime/";
        var hasil = hapusString(result.endpoint,stringToDelete);
        resultDiv.addEventListener("click", async function () {
            mainLoading.style.display = "flex";
            resultContainer.style.display = "none";

            const res = await fetch(`https://otakudesu-anime-api.vercel.app/api/v1/detail/${hasil}`);
            const data = await res.json();
            displayAnimeInfo(data.anime_detail,data.episode_list);
        });
        resultContainer.appendChild(resultDiv);
    });
};

function displayAnimeInfo(data,data2) {
    animeInfoContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    mainLoading.style.display = 'none';
    var title1;

    data.detail.forEach(data1 => {
        const resultDetail = document.createElement("p");
        resultDetail.innerHTML = data1;
        animeInfo.appendChild(resultDetail);
    })
    data.sinopsis.forEach(sinopsis => {
        const resultSinopsis = document.createElement("p");
        resultSinopsis.innerHTML = sinopsis;
        sinopsis1.appendChild(resultSinopsis);
    })
    data2.forEach(eps =>{
        title1 = document.createElement('h4');
        title1.innerHTML = eps.episode_title;
        var stringToDelete = "https:/otakudesu.wiki/episode/";
        var hasil1 = hapusString(eps.episode_endpoint,stringToDelete);
        title1.addEventListener("click", async function (params) {
            mainLoading.style.display = "flex";
                const res = await fetch(`https://otakudesu-anime-api.vercel.app/api/v1/episode/${hasil1}`);
                const episodeData = await res.json();
                displayWatchInfo(episodeData);
        });
        episode.appendChild(title1);
    })
};

function displayWatchInfo(episodeData) {
    mainLoading.style.display = "none";
    let tag = document.getElementById('tag');
    tag.innerHTML = episodeData.title;
    tag.style.display = "block"
    const serverUrl = episodeData.streamLink;
    var player = document.getElementById('player');
    player.style.display = "block"
    player.src = `${serverUrl}`;
    };

function hapusString(input, stringToBeDeleted) {
    return input.replace(new RegExp(stringToBeDeleted, 'g'), '');
  };

  function cekString(input, stringToCheck) {
    return input.includes(stringToCheck);
  }
