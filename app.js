const btn = document.querySelector('.generate-btn')
const colorList = document.querySelectorAll('.color')
const hexList = document.querySelectorAll('.hex')
const copyNotification = document.getElementById("copyNotification");
let newColor
const randomColor = Math.floor(Math.random() * 16777215).toString(16)

fetch(`https://www.thecolorapi.com/scheme?hex=${randomColor}&mode=monochrome`)
  .then(response => response.json())
  .then(data => {
    newColor = data.colors
    renderColor()
  })

btn.addEventListener('click', function () {
  const colorMode = document.querySelector('select').value
  const hex = document.getElementById('color-picker').value.slice(1)

  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${colorMode}`)
    .then(response => response.json())
    .then(data => {
      newColor = data.colors
      renderColor()
    })
})

colorList.forEach(color => {
  color.addEventListener('click', function (e) {
    e.preventDefault()
    let copyHexText = e.target.getAttribute('hex')
    navigator.clipboard.writeText(copyHexText)
  })
})

function renderColor() {
  newColor.forEach(color => {
    const index = newColor.indexOf(color)
    const hexValue = color.hex.value
    colorList[index].style.backgroundColor = hexValue
    colorList[index].setAttribute('hex', hexValue)
    hexList[index].textContent = `${hexValue}`
  })
}