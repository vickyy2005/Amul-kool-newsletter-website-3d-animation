const fs = require('fs');

const codeHtml = fs.readFileSync('code.html', 'utf-8');
const styleCss = fs.readFileSync('style.css', 'utf-8');
const mainJs = fs.readFileSync('main.js', 'utf-8');

// Extract everything from <section id="features"> to the end of <footer> from code.html
const featuresIndex = codeHtml.indexOf('<section class="py-24 bg-white dark:bg-gray-900 transition-colors duration-300" id="features">');
const footerEndIndex = codeHtml.indexOf('</footer>') + '</footer>'.length;
const bodyEndIndex = codeHtml.indexOf('</body>');

const remainingSections = codeHtml.substring(featuresIndex, footerEndIndex);
const themeScript = codeHtml.substring(footerEndIndex, bodyEndIndex);

const newIndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amul Kool Rose - Refreshingly Real</title>
    
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#D81B60",
                        "background-light": "#FFF0F5",
                        "background-dark": "#1A1A24",
                        "royal-blue": "#1A237E",
                        "rose-light": "#F8BBD0",
                        "rose-dark": "#C2185B",
                    },
                    fontFamily: {
                        display: ["Playfair Display", "serif"],
                        sans: ["Inter", "sans-serif"],
                    },
                    borderRadius: {
                        DEFAULT: "0.75rem",
                    },
                },
            },
        };
    </script>
    <link rel="stylesheet" href="./style.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            overscroll-behavior-y: none;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
        }
    </style>
  </head>
  <body class="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <div id="animation-spacer" style="height: 500vh;">
      <div class="scroll-container bg-black">
        <canvas id="animation-canvas"></canvas>
      </div>
    </div>

    <div class="relative z-10 bg-background-light dark:bg-background-dark">
${remainingSections}
    </div>
    
    <script type="module" src="/main.js"></script>
${themeScript}
  </body>
</html>`;

fs.writeFileSync('index.html', newIndexHtml);

const newStyleCss = `.scroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  background-color: #000;
}

canvas {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}`;

fs.writeFileSync('style.css', newStyleCss);

const newMainJs = `import './style.css';

const canvas = document.getElementById('animation-canvas');
const context = canvas.getContext('2d');

const frameCount = 240; 
const currentFrame = index => (
  \`/frames/ezgif-frame-\${index.toString().padStart(3, '0')}.jpg\`
);

const images = [];

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images[i] = img;
  }
};

const setupCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  if (images[1] && images[1].complete) {
    drawCover(images[1]);
  } else {
    images[1].onload = () => {
      drawCover(images[1]);
    };
  }
}

function drawCover(img) {
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.width / img.height;
  let renderWidth, renderHeight, x, y;

  if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      x = 0;
      y = (canvas.height - renderHeight) / 2;
  } else {
      renderWidth = canvas.height * imgRatio;
      renderHeight = canvas.height;
      x = (canvas.width - renderWidth) / 2;
      y = 0;
  }
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, renderWidth, renderHeight);
}

const updateImage = index => {
  if (images[index]) {
    drawCover(images[index]);
  }
}

window.addEventListener('scroll', () => {
  const spacer = document.getElementById('animation-spacer');
  if (!spacer) return;
  
  const maxScrollTop = spacer.offsetHeight - window.innerHeight;
  let scrollTop = document.documentElement.scrollTop;
  
  if (scrollTop > maxScrollTop) {
    scrollTop = maxScrollTop;
  }
  
  let scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
  if (scrollFraction < 0) scrollFraction = 0;
  
  const frameIndex = Math.min(
    frameCount,
    Math.max(1, Math.ceil(scrollFraction * frameCount))
  );

  requestAnimationFrame(() => updateImage(frameIndex));
});

preloadImages();
window.addEventListener('resize', setupCanvas);
setupCanvas();
`;

fs.writeFileSync('main.js', newMainJs);

console.log("Done merging!");
