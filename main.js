var nav = document.getElementById("nav");
window.addEventListener("scroll", function () { nav.classList.toggle("sc", scrollY > 40); }, { passive: true });
var hbg = document.getElementById("hbg"), nl = document.getElementById("navlinks");
hbg.addEventListener("click", function () { nl.classList.toggle("open"); });
nl.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { nl.classList.remove("open"); }); });
document.querySelectorAll("a[href^=\"#\"]").forEach(function (a) {
  a.addEventListener("click", function (e) {
    var t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
});
var revEls = document.querySelectorAll(".rev");
var ro = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); ro.unobserve(e.target); } });
}, { threshold: 0.12 });
revEls.forEach(function (el) { ro.observe(el); });
function runCnt(el) {
  var t = +el.dataset.t, s = el.dataset.s || "", dur = 1800, t0 = performance.now();
  function tick(now) { var p = Math.min((now - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(e2 * t) + s; if (p < 1) requestAnimationFrame(tick); }
  requestAnimationFrame(tick);
}
var co = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { runCnt(e.target); co.unobserve(e.target); } }); }, { threshold: .5 });
document.querySelectorAll(".cnt").forEach(function (el) { co.observe(el); });
var hfired = false;
var ho = new IntersectionObserver(function (entries) {
  if (!entries[0].isIntersecting || hfired) return;
  hfired = true; ho.disconnect();
  var dur = 1600, t0 = performance.now();
  var h1 = document.getElementById("h1"), h3 = document.getElementById("h3");
  function tick(now) { var p = Math.min((now - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3); h1.textContent = Math.round(e2 * 94) + "%"; h3.textContent = Math.round(e2 * 5); if (p < 1) requestAnimationFrame(tick); else { h1.textContent = "94%"; h3.textContent = "5"; } }
  requestAnimationFrame(tick);
}, { threshold: .5 });
var hs = document.querySelector(".hstats"); if (hs) ho.observe(hs);
var hts = document.getElementById("hts");
setInterval(function () {
  var n = new Date(), pad = function (v) { return String(v).padStart(2, "0"); };
  hts.textContent = pad(n.getHours()) + ":" + pad(n.getMinutes()) + ":" + pad(n.getSeconds()) + " \xb7 CAM-01";
}, 1000);
var tfired = false;
var to2 = new IntersectionObserver(function (entries) {
  if (!entries[0].isIntersecting || tfired) return;
  tfired = true; to2.disconnect();
  document.querySelectorAll("#termb .ll").forEach(function (line) { setTimeout(function () { line.classList.add("on"); }, +(line.dataset.ms || 0)); });
}, { threshold: .3 });
var tb = document.getElementById("termb"); if (tb) to2.observe(tb);
