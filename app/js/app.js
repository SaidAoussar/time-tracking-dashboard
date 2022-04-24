// read data from json and loop frame
const readData = (timeframe, frames) => {
  frames.innerHTML = ``;
  fetch("../../data.json")
    .then((res) => res.json())
    .then((dataJson) => {
      dataJson.forEach((item) => {
        const section = `
<section class="${item.title.toLowerCase()}">
  <div class="item">
    <div class="back-card bg-${item.title
      .toLowerCase()
      .split(" ")
      .join("-")}-back">
      <div
        style="background-image: url(./../../images/icon-${item.title
          .toLowerCase()
          .split(" ")
          .join("-")}.svg)"
      ></div>
    </div>
    <div class="card">
      <div class="part-one">
        <h3 class="card__title">${item.title}</h3>
        <div class="card__icon">
          <img src="./images/icon-ellipsis.svg" alt="ellipsis" />
        </div>
      </div>
      <div class="part-two">
        <h1 class="card__time"><span id="work-hrs">${
          item.timeframes[timeframe].current
        }</span>hrs</h1>
        <div class="card__date">
          Last ${getPreviousPeriod(timeframe)} - <span id="lw-work">${
          item.timeframes[timeframe].previous
        }</span>hrs
        </div>
      </div>
    </div>
  </div>
</section>`;

        frames.innerHTML += section;
      });
    })
    .catch((e) => console.log(e));
};

//

function getPreviousPeriod(timeframe) {
  let period;
  switch (timeframe) {
    case "daily":
      period = "Yesterday";
      break;
    case "weekly":
      period = "Week";
      break;
    case "monthly":
      period = "Month";
  }

  return period;
}

document.addEventListener("DOMContentLoaded", function () {
  const frames = document.querySelector(".frames");
  const btnDaily = document.querySelector(".btn-daily");
  const btnWeekly = document.querySelector(".btn-weekly");
  const btnMonthly = document.querySelector(".btn-monthly");

  readData("weekly", frames);
  btnWeekly.style.color = "#bdc1ff";

  btnDaily.addEventListener("click", function () {
    btnDaily.style.color = "#bdc1ff";
    btnWeekly.style.color = "#6f76c8";
    btnMonthly.style.color = "#6f76c8";
    readData("daily", frames);
  });

  btnWeekly.addEventListener("click", function () {
    btnDaily.style.color = "#6f76c8";
    btnWeekly.style.color = "#bdc1ff";
    btnMonthly.style.color = "#6f76c8";
    readData("weekly", frames);
  });

  btnMonthly.addEventListener("click", function () {
    btnDaily.style.color = "#6f76c8";
    btnWeekly.style.color = "#6f76c8";
    btnMonthly.style.color = "#bdc1ff";
    readData("monthly", frames);
  });
});

//https://stackoverflow.com/questions/65262631/addeventlistener-doesnt-work-on-newly-added-innerhtml
