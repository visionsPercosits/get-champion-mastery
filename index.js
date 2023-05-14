const API_KEY = "sua-key";

const getSummonerMastery = async (region, summonerName) => {
  try {
    const summonerResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
    );
    const summonerData = await summonerResponse.json();
    const summonerId = summonerData.id;
    const summonerLevel = summonerData.summonerLevel;

    const masteryResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerId}?api_key=${API_KEY}`
    );
    const masteryPoints = await masteryResponse.json();

    return { summonerLevel, masteryPoints, exists: true };
  } catch (error) {
    return { exists: false };
  }
};

const summonerForm = document.getElementById("summoner-form");
const masteryResults = document.getElementById("mastery-results");

summonerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const summonerName = document.getElementById("summoner-name").value;
  const region = document.getElementById("region-select").value;

  const masteryData = await getSummonerMastery(region, summonerName);
  if (masteryData.exists) {
    const masteryHtml = `
            <div id="infoTo">
              <p>${summonerName} é nível ${masteryData.summonerLevel}!</p>
              <p>Total de pontos de maestria: ${masteryData.masteryPoints}!</p>
            </div>
          `;
    masteryResults.innerHTML = masteryHtml;
  } else {
    const messageHtml = `
            <div id="infoTo">
              <p>${summonerName} não foi pego por ninguém, pegue o quanto antes!</p>
            </div>
          `;
    masteryResults.innerHTML = messageHtml;
  }
});
