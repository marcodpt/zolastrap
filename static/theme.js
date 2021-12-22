function switchTheme(theme) {
  sessionStorage.setItem("theme", theme)
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
