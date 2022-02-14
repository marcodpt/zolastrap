function switchScheme(scheme) {
  sessionStorage.setItem("scheme", scheme)
  document.querySelectorAll(
    'nav a.dropdown-item[onclick^="switchScheme("]'
  ).forEach(function (a) {
    a.classList.remove('active')
  })
  const a = document.querySelector(
    'nav a.dropdown-item[onclick="switchScheme(\''+scheme+'\')"]'
  )
  if (a) {
    a.classList.add('active')
  }

  const colors = [
    'dark',
    'light',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info'
  ]

  const nav = document.querySelector('nav')
  const footer = document.querySelector('footer')

  const Scheme = scheme.split(" ")
  const bg = Scheme[0]
  const t = Scheme[1] || Scheme[0]

  colors.forEach(function (color) {
    if (nav) {
      nav.classList.remove("bg-"+color)
      nav.classList.remove("navbar-"+color)
    }
    if (footer) {
      footer.classList.remove("bg-"+color)
      footer.classList.remove("text-"+color)
    }
  })
  if (nav) {
    nav.classList.add("bg-"+bg)
    nav.classList.add("navbar-"+(t == "light" ? "light" : "dark"))
  }
  if (footer) {
    footer.classList.add("bg-"+bg)
    footer.classList.add("text-"+(t == "light" ? "dark" : "light"))
  }
}

window.addEventListener('load', function () {
  var scheme = sessionStorage.getItem("scheme")
  if (scheme) {
    switchScheme(scheme)
  }
})
