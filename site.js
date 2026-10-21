// פרטי קשר — לשנות כאן בלבד, וכל הכפתורים באתר מתעדכנים.
const PHONE = '972552626775';          // וואטסאפ, בפורמט בינלאומי בלי +
const EMAIL = 'hello@anivtoys.com';
const WA_TEXT = 'היי אניב טויס, אשמח לשמוע פרטים';

const local = '0' + PHONE.slice(3).replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
document.querySelectorAll('.js-wa').forEach((a) => { a.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_TEXT)}`; });
document.querySelectorAll('.js-mail').forEach((a) => { a.href = `mailto:${EMAIL}`; });
document.querySelectorAll('.js-mail-txt').forEach((a) => { a.textContent = EMAIL; a.dir = 'ltr'; });
document.querySelectorAll('.js-phone-txt').forEach((a) => { a.textContent = local; a.dir = 'ltr'; });
document.querySelectorAll('.js-year').forEach((s) => { s.textContent = new Date().getFullYear(); });

// מוצרים בקרוסלה — img: נתיב לתמונה (ריבועית, רקע שקוף)
const PRODUCTS = [
  { name: 'ביסקווישי', img: 'img/products/biskwishy.webp' },
  { name: 'בלופיז', img: 'img/products/bloopies.webp' },
  { name: 'קראשיז', img: 'img/products/crushies.webp' },
  { name: 'מוג׳יבול', img: 'img/products/mojiball.webp' },
  { name: 'LEGENDARY 23', img: 'img/products/legendary-purple.webp' },
  { name: 'מון רוק', img: 'img/products/moonrock.webp' },
  { name: 'קסטו׳ש', img: 'img/products/smooshy-smore.webp' },
  { name: 'פופקליק!', img: 'img/products/popclick.webp' },
  { name: 'גלידה סקווישי', img: 'img/products/gumball-wand.webp' },
  { name: 'קול קיוב', img: 'img/products/cool-cube.webp' },
  { name: 'LEGENDARY 23', img: 'img/products/legendary-yellow.webp' },
  { name: 'מנורת לבה טורנדו', img: 'img/products/tornado-lamp.webp' },
  { name: 'מיקרופון LIVE MUSIC', img: 'img/products/live-music.webp' },
  { name: 'ביוטי ניילס', img: 'img/products/beauty-nails.webp' },
  { name: 'דלי סליים 1 ק"ג', img: 'img/products/slime-bucket.webp' },
  { name: 'LEGENDARY 23', img: 'img/products/legendary-red.webp' },
  { name: 'באטר סמות׳', img: 'img/products/butter-smooth.webp' },
  { name: 'סליים טאואר', img: 'img/products/slime-tower.webp' },
  { name: 'נקניקו׳ש סקווישי', img: 'img/products/balloon-dog.webp' },
  { name: 'מק-סקווישי', img: 'img/products/mac-squishy.webp' },
];
const track = document.getElementById('track');
const card = (p, i) => `<div class="prod" style="--i:${i}"><div class="pimg">${p.img ? `<img src="${p.img}" alt="${p.name}" decoding="async">` : '<span>🧸</span>'}</div><h4>${p.name}</h4></div>`;
// חוזרים על הרשימה עד שיש מספיק כרטיסים למלא מסך רחב, ואז פעמיים ברצף כדי שהלולאה תתחבר בלי קפיצה
let row = [...PRODUCTS];
while (row.length < 8) row = row.concat(PRODUCTS);
track.innerHTML = [...row, ...row].map(card).join('');
track.style.setProperty('--dur', `${row.length * 5}s`);

// תפריט בטלפון
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => { if (e.target.closest('a')) menu.classList.remove('open'); });

// סימון הפריט בתפריט לפי האזור שעל המסך
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const id = en.target.classList.contains('hero') ? 'top' : en.target.id;
    links.forEach((l) => l.classList.toggle('on', l.getAttribute('href') === '#' + id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['about', 'brands', 'products', 'business', 'contact'].forEach((id) => spy.observe(document.getElementById(id)));
spy.observe(document.querySelector('.hero'));
