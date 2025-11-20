// === SETTINGS ===
// For real use: keep overrideDate = null. For testing, set e.g. '2025-12-07'.
const overrideDate = '2025-12-12'; // 'YYYY-MM-DD' or null

// Content for each door (texts removed)
const doorContent = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
  18: "",
  19: "",
  20: "",
  21: "",
  22: "",
  23: "",
  24: "",
};

// === DATE HELPERS ===
function getTodayLocal() {
  if (overrideDate) {
    const parts = overrideDate.split('-');
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }
  return new Date();
}

function getCalendarDay(today) {
  const month = today.getMonth(); // 0=Jan ... 11=Dec
  const day = today.getDate();
  const isDecember = month === 11;
  return { day, isDecember };
}

// === RENDER ===
const calendarEl = document.getElementById('calendar');
const dateHintEl = document.getElementById('dateHint');

const today = getTodayLocal();
const { day: todayNumber, isDecember } = getCalendarDay(today);



for (let i = 1; i <= 24; i++) {
  const door = document.createElement('button');
  door.className = 'door';
  door.setAttribute('type', 'button');
  door.setAttribute('aria-expanded', 'false');
  door.setAttribute('aria-controls', `content-${i}`);
  door.dataset.day = String(i);

  const isLocked = i > todayNumber && isDecember;
  if (isLocked) door.classList.add('locked');
  if (i === todayNumber && isDecember) door.classList.add('today');

  door.innerHTML = `
    <div class="door-number">${i}</div>
    <div class="door-label">${isLocked ? 'Lukittu' : 'Avaa'}</div>
    <div id="content-${i}" class="content" role="region" aria-label="Luukun ${i} sisältö"></div>
  `;

  door.addEventListener('click', () => {
    if (door.classList.contains('locked')) return;

    const contentEl = door.querySelector('.content');
    const opened = door.classList.toggle('opened');
    door.setAttribute('aria-expanded', opened ? 'true' : 'false');

    if (opened) {
      contentEl.textContent = doorContent[i];
    }
  });

  calendarEl.appendChild(door);
}