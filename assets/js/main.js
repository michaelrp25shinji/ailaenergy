
// Desplazamiento suave optimizado (con ajuste para header fijo)
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (href === '#' || href === '#!') return;

  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();

    // 🔹 Ajuste por altura del header fijo (cámbialo según tu diseño)
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    // 🔹 Scroll suave con desplazamiento compensado
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // 🔹 Cierra el menú en versión móvil (si está abierto)
    const nav = document.querySelector('.nav-list');
    const toggle = document.getElementById('navToggle');
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      if (nav) nav.style.display = 'none';
    }
  }
});
(function setupMobileNav(){
  const toggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  if(!toggle || !navList) return;
  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navList.style.display = expanded ? 'none' : 'flex';
  });
})();
(function tryPlayHero(){
  const video = document.getElementById('heroVideo');
  if(!video) return;
  video.muted = true;
  const p = video.play();
  if(p && p.catch){ p.catch(()=>{ video.pause(); console.info('Autoplay blocked.'); }); }
})();

/* ------------------------------
   POPUPS CON TRANSICIONES
------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

  // Selecciona todos los botones que abren popups (por clase o ID)
  const abrirBtns = document.querySelectorAll('[id^="abrirPopup"], .popup');
  const body = document.body;

  abrirBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Detectar el popup correspondiente (siguiente elemento o ID)
      let popup;
      const id = btn.getAttribute("data-popup") || btn.getAttribute("id");
      if (id && document.getElementById(id.replace("abrir", ""))) {
        popup = document.getElementById(id.replace("abrir", ""));
      } else {
        popup = btn.nextElementSibling;
      }

      if (!popup) return;

      // Reiniciar cualquier animación anterior
      popup.classList.remove("is-closing", "popup-oculto");
      popup.classList.add("popup-activo");
      body.style.overflow = "hidden";

      // Reiniciar animaciones (reflow)
      void popup.offsetWidth;
      popup.querySelector(".popup-contenido").style.animation = "zoomIn 0.3s ease forwards";
      popup.style.animation = "fadeIn 0.4s ease forwards";
    });
  });

  // Delegación para cierre (todos los botones con id que empiece con cerrarPopup)
  document.querySelectorAll('[id^="cerrarPopup"]').forEach(btn => {
    btn.addEventListener("click", e => {
      const popup = e.target.closest(".popup-activo");
      if (!popup) return;
      cerrarPopup(popup);
    });
  });

  // Cerrar al hacer clic fuera del contenido
  document.querySelectorAll(".popup-oculto, .popup-activo").forEach(popup => {
    popup.addEventListener("click", e => {
      if (e.target === popup) cerrarPopup(popup);
    });
  });

  // Cerrar con tecla ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      const popup = document.querySelector(".popup-activo");
      if (popup) cerrarPopup(popup);
    }
  });

  function cerrarPopup(popup) {
    const contenido = popup.querySelector(".popup-contenido");

    // Añadimos animaciones de salida
    contenido.style.animation = "zoomOut 0.3s ease forwards";
    popup.style.animation = "fadeOut 0.4s ease forwards";
    popup.classList.add("is-closing");

    // Esperamos a que termine la animación para ocultarlo
    popup.addEventListener("animationend", function handler(e) {
      if (e.target !== popup) return;
      popup.removeEventListener("animationend", handler);
      popup.classList.remove("popup-activo", "is-closing");
      popup.classList.add("popup-oculto");
      contenido.style.animation = "";
      popup.style.animation = "";
      body.style.overflow = "";
    });
  }
});

// Restaura el menú de navegación al cambiar de tamaño de ventana
window.addEventListener('resize', () => {
  const navList = document.querySelector('.nav-list');
  const toggle = document.getElementById('navToggle');

  if (!navList || !toggle) return;

  // Cambia "768" por el breakpoint que uses en tu CSS
  if (window.innerWidth > 768) {
    // En escritorio, siempre visible
    navList.style.display = 'flex';
    toggle.setAttribute('aria-expanded', 'false');
  } else {
    // En móvil, se mantiene oculto hasta que el usuario lo abra
    navList.style.display = 'none';
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("cookie-accept-btn");

    // Mostrar el banner si no se ha aceptado
    if (!localStorage.getItem("cookiesAceptadas")) {
      banner.style.display = "block";
    }

    // Al hacer clic en "Aceptar"
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAceptadas", "true");
      banner.style.display = "none";
    });
  });