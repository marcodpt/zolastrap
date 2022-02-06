window.addEventListener('load', function () {
  const nodes = document.querySelectorAll(".content blockquote")
  for (let i = 0; i < nodes.length; i++) {
    const classes = [
      "blockquote",
      "border-start",
      "border-5",
      "border-primary",
      "ps-3"
    ]

    classes.forEach(function (c) {
      nodes[i].classList.add(c)
    })
  }
})
