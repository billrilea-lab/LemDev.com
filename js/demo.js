(function () {
  fetch("http://127.0.0.1:8765/health", { mode: "cors" })
    .then(function (r) {
      if (!r.ok) return;
      return r.json();
    })
    .then(function (data) {
      if (!data) return;
      var banner = document.getElementById("live-desk-banner");
      if (!banner) return;
      banner.hidden = false;
      var scoreEl = banner.querySelector("span");
      if (scoreEl && data.score) {
        scoreEl.textContent = "● Live Pro desk — health " + data.score + "/100 (" + (data.grade || "?") + ")";
      }
      var mock = document.querySelector(".demo-ring span");
      if (mock && data.score) mock.textContent = String(data.score);
      var mockGrade = document.querySelector(".demo-ring small");
      if (mockGrade && data.grade) mockGrade.textContent = data.grade;
      var summary = document.querySelector(".demo-score strong");
      if (summary && data.summary) summary.textContent = data.summary;
    })
    .catch(function () {});
})();
