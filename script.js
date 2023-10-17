const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const watchContainer = document.getElementById("qualityContainer");
const mainLoading = document.getElementById("mainLoading");
const animeInfoContainer1 = document.getElementById("animeInfoContainer");

searchBtn.addEventListener("click", async function () {
    resultContainer.style.display = 'block';
    mainLoading.style.display = 'flex';
    resultContainer.innerHTML="";
    mainLoading.innerHTML = "Loading..."

    const query = queryInput.value;
    const rest = await fetch(`https://otakudesu-unofficial-api.rzkfyn.xyz/api/v1/search/${query}`);
    const data = await rest.json();
    if (data.data.length > 0) {
        displayResults(data.data);
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
        resultMain = `${animeTitle} | ${result.status} | ${result.rating}`;
        resultDiv.innerHTML = resultMain;
        resultDiv.addEventListener("click", async function () {
            mainLoading.style.display = "flex";
            resultContainer.style.display = "none";
            const res = await fetch(`https://otakudesu-unofficial-api.rzkfyn.xyz/api/v1/anime/${result.slug}`);
            const data = await res.json();
            localStorage.setItem('datakey',JSON.stringify(data));
            window.location = "anime.html";
        });
        resultContainer.appendChild(resultDiv);
    });
};
  function cekString(input, stringToCheck) {
    return input.includes(stringToCheck);
  }
