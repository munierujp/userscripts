Array.from(document.querySelectorAll('a[href^="/"][target="_blank"]'))
  .forEach(element => element.removeAttribute('target'))
