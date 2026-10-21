// פרטי קשר — לשנות כאן בלבד, וכל הכפתורים באתר מתעדכנים.
const PHONE = '972500000000';          // וואטסאפ, בפורמט בינלאומי בלי + (מספר דמה זמני)
const EMAIL = 'hello@anivtoys.com';
const WA_TEXT = 'היי אניב טויס, אשמח לשמוע פרטים';

const local = '0' + PHONE.slice(3).replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
document.querySelectorAll('.js-wa').forEach((a) => { a.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_TEXT)}`; });
document.querySelectorAll('.js-mail').forEach((a) => { a.href = `mailto:${EMAIL}`; });
document.querySelectorAll('.js-mail-txt').forEach((a) => { a.textContent = EMAIL; a.dir = 'ltr'; });
document.querySelectorAll('.js-phone-txt').forEach((a) => { a.textContent = local; a.dir = 'ltr'; });
document.querySelectorAll('.js-year').forEach((s) => { s.textContent = new Date().getFullYear(); });

// מוצרים בקרוסלה — img: נתיב לתמונה (ריבועית, רקע שקוף עדיף). בינתיים מקומות שמורים.
const PRODUCTS = [
  { name: 'ביסקווישי', img: 'img/products/biskwishy.webp' },
  { name: 'בלופיז', img: 'img/products/bloopies.webp' },
];
const track = document.getElementById('track');
const card = (p, i) => `<div class="prod" style="--i:${i}"><div class="pimg">${p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : '<span>🧸</span>'}</div><h4>${p.name}</h4></div>`;
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
