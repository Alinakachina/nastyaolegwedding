(function () {
  "use strict";

  /* ====== Block reveal on scroll ====== */

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".block").forEach(function (block) {
    revealObserver.observe(block);
  });

  /* ====== Falling petals ====== */

  var layer = document.getElementById("petals-layer");
  var petalColors = ["var(--petal-1)", "var(--petal-2)", "var(--petal-3)", "var(--petal-4)"];

  function spawnPetal() {
    var petal = document.createElement("div");
    petal.className = "petal";

    var size = 10 + Math.random() * 10;
    var left = Math.random() * 100;
    var duration = 6 + Math.random() * 5;
    var drift = (Math.random() * 160 - 80) + "px";
    var spin = (Math.random() * 360 + 180) + "deg";

    petal.style.left = left + "vw";
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.animationDuration = duration + "s";
    petal.style.setProperty("--drift", drift);
    petal.style.setProperty("--spin", spin);

    layer.appendChild(petal);
    setTimeout(function () {
      petal.remove();
    }, duration * 1000 + 100);
  }

  function burstPetals(count) {
    for (var i = 0; i < count; i++) {
      setTimeout(spawnPetal, i * 90);
    }
  }

  // Block 1: continuous petals while the hero is on screen.
  var heroEl = document.getElementById("block-1");
  var heroInterval = null;

  var heroObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!heroInterval) {
            spawnPetal();
            heroInterval = setInterval(spawnPetal, 450);
          }
        } else if (heroInterval) {
          clearInterval(heroInterval);
          heroInterval = null;
        }
      });
    },
    { threshold: 0.1 }
  );
  heroObserver.observe(heroEl);

  // Blocks 2-6: a burst of petals each time the block scrolls into view.
  var otherBlocks = document.querySelectorAll(".block:not(#block-1)");
  var lastTriggered = {};

  var blockObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        var now = Date.now();
        if (lastTriggered[id] && now - lastTriggered[id] < 4000) return;
        lastTriggered[id] = now;
        burstPetals(14);
      });
    },
    { threshold: 0.25 }
  );
  otherBlocks.forEach(function (block) {
    blockObserver.observe(block);
  });

  /* ====== Countdown timer ====== */
  /* Свадьба: 22.08.2026, 15:00 по томскому времени (UTC+7, без перехода на летнее время) */

  var targetTimestamp = Date.UTC(2026, 7, 22, 8, 0, 0); // 15:00 Tomsk = 08:00 UTC

  var elDays = document.getElementById("cd-days");
  var elHours = document.getElementById("cd-hours");
  var elMins = document.getElementById("cd-mins");
  var elSecs = document.getElementById("cd-secs");

  var elDaysLabel = document.getElementById("cd-days-label");
  var elHoursLabel = document.getElementById("cd-hours-label");
  var elMinsLabel = document.getElementById("cd-mins-label");
  var elSecsLabel = document.getElementById("cd-secs-label");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function pluralize(n, forms) {
    var mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return forms[2];
    switch (n % 10) {
      case 1: return forms[0];
      case 2:
      case 3:
      case 4: return forms[1];
      default: return forms[2];
    }
  }

  var DAY_FORMS = ["день", "дня", "дней"];
  var HOUR_FORMS = ["час", "часа", "часов"];
  var MIN_FORMS = ["минута", "минуты", "минут"];
  var SEC_FORMS = ["секунда", "секунды", "секунд"];

  function updateCountdown() {
    var diff = targetTimestamp - Date.now();
    if (diff < 0) diff = 0;

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var mins = Math.floor((totalSeconds % 3600) / 60);
    var secs = totalSeconds % 60;

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMins.textContent = pad(mins);
    elSecs.textContent = pad(secs);

    elDaysLabel.textContent = pluralize(days, DAY_FORMS);
    elHoursLabel.textContent = pluralize(hours, HOUR_FORMS);
    elMinsLabel.textContent = pluralize(mins, MIN_FORMS);
    elSecsLabel.textContent = pluralize(secs, SEC_FORMS);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
