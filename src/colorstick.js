function c2hex(c) {
  var hex = Math.round(c*255).toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgb2Hex(r, g, b) {
  return `#${c2hex(r)}${c2hex(g)}${c2hex(b)}`;
}

function colorstick(label, setColour, increment) {
  var colorstick = document.createElement("div")
  colorstick.className = "colorstick"

  var wrapper = document.createElement("div")
  wrapper.className = "colorstick-wrapper"

  var title = document.createElement("span")
  title.innerText = label
  colorstick.append(title)

  function createStick(color, temperature) {
    var color = rgb2Hex(color.r, color.g, color.b)
    var o = document.createElement("div")
    o.style.backgroundColor = color
    o.className = "colorstick-item"
    o.title = temperature + " K"
    return o
  }

  for (t = 1000; t <= 10000; t += increment ?? 10) {
    const color = setColour(t)
    const boxNode = createStick(color, t)
    
    wrapper.appendChild(boxNode)
  }

  colorstick.append(wrapper)

  return colorstick
}