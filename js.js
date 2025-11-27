
// For real use: keep overrideDate = null. For testing, set e.g. '2025-12-07'.
const overrideDate = '2025-12-12'; // 'YYYY-MM-DD' or null

// Content for each door
const doorContent = {
  1: "Käy juoksemaan ulkona raikkaassa talvisäässä!",
  2: "Kävele 10 000 askelta tänään!",
  3: "Käy uimassa kylmässä vedessä!",
  4: "Juo 2 litraa vettä tänään!",
  5: "Meditoi 10 minuuttia rauhallisessa ympäristössä!",
  6: "Raikas metsäkävely virkistää mieltä!",
  7: "Ota hetki aikaa venytellä kehoa herättyäsi",
  8: "Kokeile jotain uutta liikuntamuotoa tänään!",
  9: "Syö kunnon aamupala!",
  10: "Mene ulkojäälle luistelemaan!",
  11: "Kokeile padelia ystävän kanssa!",
  12: "Käy kuntosalilla tänään!",
  13: "Käy nauttimassa saunasta ja rentoudu!",
  14: "Käy hiihtämässä",
  15: "Tee kotitreeni, joka saa sykkeen nousemaan!",
  16: "Käy sompasaunnassa",
  17: "Käy laskettelemassa mäessä!",
  18: "Tee kevyt kävelylenkki luonnossa!",
  19: "Kokeile joogaa tai pilatesta!",
  20: "Palautumispäivä – keskity lepoon ja rentoutumiseen!",
  21: "Tee joku yllämainituista aktiviteeteista uudestaan!",
  22: "Käy hieronnassa rentoutumassa!",
  23: "Vieraile sukulaisten luona joita et näe jouluna!",
  24: "Vietä aikaa läheistesi kanssa, joka joulu voi olla viimeinen",
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
  const month = today.getMonth(); 
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