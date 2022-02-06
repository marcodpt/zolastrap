window.addEventListener('load', function () {
  const classes = [
    "blockquote",
    "border-start",
    "border-5",
    "border-primary",
    "ps-3"
  ]

  document.querySelectorAll(".content blockquote").forEach(function (bq) {
    classes.forEach(function (c) {
      bq.classList.add(c)
    })
  })
})
