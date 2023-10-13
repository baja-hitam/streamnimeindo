const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const animeInfoContainer = document.getElementById("animeInfoContainer");
const watchContainer = document.getElementById("qualityContainer");
const mainLoading = document.getElementById("mainLoading");
const videoPlayer = document.getElementById("player");

searchBtn.addEventListener("click", async function () {
    animeInfoContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    mainLoading.style.display = 'flex';
    resultContainer.innerHTML="";

    const query = queryInput.value;
    const rest = await fetch(`https://api.consumet.org/anime/gogoanime/${query}?page=1`);
    const data = await rest.json();
    displayResults(data.results);
});

function displayResults(results) {
    resultContainer.innerHTML = "";
    mainLoading.style.display = "none";

    results.forEach(result => {
        const resultDiv = document.createElement("div");
        releaseDate = `${result.releaseDate.replace("Released: ","")}`;
        if (!releaseDate.length) {
            releaseDate = '???';
        }
        animeTitle = `${result.title.replace("(Dub)","")}`;
        resultMain = `${result.subOrDub} | ${animeTitle} | ${releaseDate}`;

        resultDiv.innerHTML = resultMain;
        resultDiv.addEventListener("click", async function () {
            mainLoading.style.display = "flex";
            resultContainer.style.display = "none";

            const res = await fetch(`https://api.consumet.org/anime/gogoanime/info/${result.id}`);
            const data = await res.json();
            displayAnimeInfo(data);
        });
        resultContainer.appendChild(resultDiv);
    });
};

function displayAnimeInfo(data) {
    animeInfoContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    watchContainer.style.display = 'none';
    mainLoading.style.display = 'none';

    const videoTitle = document.getElementById('videoTitle');
    videoTitle.innerHTML = `${data.title}`;
    const status = document.getElementById("status");
    status.innerHTML = `${data.status}`;
    const subOrDub = document.getElementById('subOrDub');
    subOrDub.innerHTML = `${data.subOrDub}`;
    const type = document.getElementById('type');
    type.innerHTML = `${data.type}`;
    const description = document.getElementById('videoDescription');
    description.innerHTML = `${data.description}`;
    const episodeSelect = document.getElementById('selectElement');
    episodeSelect.innerHTML = "";

    data.episodes.sort((a,b)=>b.number - a.number);
    data.episodes.forEach((episode) => {
        const option = document.createElement('option');
        option.value = episode.id;
        option.innerHTML = `Episode ${episode.number}`;
        episodeSelect.appendChild(option);
    });

    const watchBtn = document.getElementById('episodeButton');
    watchBtn.addEventListener("click", async function () {
        const serverSelect = document.getElementById('serverSelect');
        serverSelect.innerHTML="";
        watchContainer.style.display = "none";
        mainLoading.style.display = "flex";
        
        const episodeId = document.getElementById("selectElement").value;
        const res = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${episodeId}`);
        const episodeData = await res.json();
        displayWatchInfo(episodeData);
    });
};

function displayWatchInfo(episodeData) {
    watchContainer.style.display = 'block';
    mainLoading.style.display = "none";

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.href = episodeData.download;

    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = "";

    episodeData.sources.forEach((stream) => {
        const option = document.createElement('button');
        option.value = stream.url;
        option.className = "qualityBtn";
        let streamquality = stream.quality.replace('default','auto');
        option.innerHTML = `${streamquality}`;
        serverSelect.appendChild(option);
    });

    const watchBtn = document.querySelectorAll(".qualityBtn");
    for (let i = 0; i < watchBtn.length; i++) {
        watchBtn[i].addEventListener("click",function () {
            videoPlayer.style.display = 'block';
            const serverUrl = this.value;
            //videoPlayer.src = `https://9anime.skin/stream/play.php?slug=${serverUrl}`;
            var player = document.getElementById('player');
            player = new Clappr.Player({source: `${serverUrl}`, parentId: "#player"});
        });
    };
};
