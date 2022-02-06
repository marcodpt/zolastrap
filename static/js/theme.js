function activeTheme(theme) {
  document.querySelectorAll(
    'nav a.dropdown-item[onclick^="switchTheme("]'
  ).forEach(function (a) {
    a.classList.remove('active')
  })
  const a = document.querySelector(
    'nav a.dropdown-item[onclick="switchTheme(\''+theme+'\')"]'
  )
  if (a) {
    a.classList.add('active')
  }
}

function switchTheme(theme) {
  sessionStorage.setItem("theme", theme)
  activeTheme(theme)
  document
    .querySelectorAll('link.alternate')
    .forEach(function (e) {
      if (e.id == theme) {
        e.rel = "stylesheet"
      } else {
        e.rel = "stylesheet alternate"
      }
    })
}

var theme = sessionStorage.getItem("theme")
if (theme) {
  switchTheme(theme)
}

window.addEventListener('load', function () {
  activeTheme(theme)
})
