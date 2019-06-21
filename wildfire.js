const firePixelsArray = [];
const fireWidth = 40;
const fireHeight = 40;
const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 1, g: 30, b: 8 },
  { r: 1, g: 35, b: 10 },
  { r: 2, g: 38, b: 10 },
  { r: 2, g: 75, b: 28 },
  { r: 2, g: 80, b: 30 },
  { r: 2, g: 85, b: 35 },
  { r: 3, g: 90, b: 45 },
  { r: 3, g: 100, b: 50 },
  { r: 3, g: 125, b: 60 },
  { r: 3, g: 140, b: 62 },
  { r: 3, g: 140, b: 65 },
  { r: 3, g: 145, b: 68 },
  { r: 4, g: 145, b: 70 },
  { r: 4, g: 150, b: 75 },
  { r: 3, g: 160, b: 82 },
  { r: 4, g: 164, b: 85 },
  { r: 4, g: 165, b: 88 },
  { r: 4, g: 169, b: 88 },
  { r: 5, g: 170, b: 89 },
  { r: 5, g: 170, b: 90 },
  { r: 6, g: 170, b: 99 },
  { r: 6, g: 175, b: 100 },
  { r: 6, g: 188, b: 100 },
  { r: 6, g: 191, b: 104 },
  { r: 8, g: 178, b: 120 },
  { r: 10, g: 187, b: 120 },
  { r: 10, g: 187, b: 120 },
  { r: 10, g: 191, b: 120 },
  { r: 120, g: 175, b: 165 },
  { r: 149, g: 196, b: 165 },
  { r: 149, g: 200, b: 165 },
  { r: 149, g: 210, b: 165 },
  { r: 149, g: 215, b: 170 },
  { r: 155, g: 223, b: 188 },
  { r: 160, g: 239, b: 198 },
  { r: 167, g: 242, b: 200 }
];

function start() {
  createFireDataStructrue();
  createFireSource();
  renderFire();

  setInterval(calculateFirePropagation, 50);
}

function createFireDataStructrue() {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;

      updateFireIntensityPerPixel(pixelIndex);
    }
  }

  renderFire();
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;

  if (belowPixelIndex >= fireWidth * fireHeight) {
    return;
  }

  const decay = Math.floor(Math.random() * 3);
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
  const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

  firePixelsArray[currentPixelIndex - decay] = newFireIntensity;
}

function renderFire() {
  debug = false;
  let html = "<table cellpadding=0 cellspacing=0>";
  for (let row = 0; row < fireHeight; row++) {
    html += "<tr>";
    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = column + fireWidth * row;
      const fireIntensity = firePixelsArray[pixelIndex];

      if (debug == true) {
        html += "<td>";
        html += "<div class='pixel-index'>" + pixelIndex + "</div>";
        html += fireIntensity;
        html += "</td>";
      } else {
        const color = fireColorsPalette[fireIntensity];
        const colorString = color.r + "," + color.g + "," + color.b;
        html +=
          '<td class="pixel" style="background-color: rgb(' +
          colorString +
          ')">';
        html += "</td>";
      }
    }
    html += "</tr>";
  }

  html += "</table>";

  document.querySelector("#fireCanvas").innerHTML = html;
}

function createFireSource() {
  for (let column = 0; column < fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight;
    const pixelIndex = overflowPixelIndex - fireWidth + column;

    firePixelsArray[pixelIndex] = 36;
  }
}

start();
