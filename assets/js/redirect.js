// redirect.js
document.addEventListener('DOMContentLoaded', () => {
  // Obtiene la ruta actual del navegador
  const path = window.location.pathname;

  // Si el usuario entra al dominio raíz (sin archivo)
  // o una carpeta sin especificar archivo (termina en '/')
  if (path === '/' || path.endsWith('/')) {
    // Redirige automáticamente a index.html
    window.location.replace(path + 'index.html');
  }
});