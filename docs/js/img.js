window.addEventListener('load', function () {
  const classes = [
    "rounded",
    "d-block"
  ]

  document.querySelectorAll(".content img").forEach(function (el) {
    classes.forEach(function (c) {
      el.classList.add(c)
    })
  })
})
