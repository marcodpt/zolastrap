window.addEventListener('load', function () {
  const classes = [
    "blockquote",
    "border-start",
    "border-5",
    "border-primary",
    "ps-3"
  ]

  document.querySelectorAll(".content blockquote").forEach(function (el) {
    classes.forEach(function (c) {
      el.classList.add(c)
    })
  })
})
