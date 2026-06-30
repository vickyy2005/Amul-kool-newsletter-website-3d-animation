import './style.css';

const canvas = document.getElementById('animation-canvas');
const context = canvas.getContext('2d');

const frameCount = 240; 
const currentFrame = index => (
  `./frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];

let loadedCount = 0;
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');
let loaderRemoved = false;

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    
    const handleLoad = () => {
      loadedCount++;
      const percentage = Math.min(100, Math.round((loadedCount / frameCount) * 100));
      if (loaderBar) loaderBar.style.width = `${percentage}%`;
      if (loaderText) loaderText.textContent = `${percentage}%`;
      
      if (loadedCount >= frameCount * 0.95 && !loaderRemoved) {
        loaderRemoved = true;
        if (loader) {
          loader.style.opacity = '0';
          setTimeout(() => { 
            loader.style.display = 'none'; 
            document.body.classList.remove('overflow-hidden');
          }, 700);
        } else {
          document.body.classList.remove('overflow-hidden');
        }
      }
    };
    
    img.onload = handleLoad;
    img.onerror = handleLoad;
    img.src = currentFrame(i);
    images[i] = img;
  }
};

let targetFrameIndex = 1;

const setupCanvas = () => {
  if(!canvas || !context) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const imgToDraw = images[targetFrameIndex] || images[1];
  
  if (imgToDraw && imgToDraw.complete) {
    drawCover(imgToDraw);
  } else if (imgToDraw) {
    imgToDraw.onload = () => {
      drawCover(imgToDraw);
    };
  }
}

function drawCover(img) {
  if(!canvas || !context || !img.complete || img.naturalWidth === 0) return;
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
  targetFrameIndex = index;
  if (images[index]) {
    if (images[index].complete) {
      drawCover(images[index]);
    } else {
      images[index].onload = () => {
        if (targetFrameIndex === index) {
          drawCover(images[index]);
        }
      };
    }
  }
}

const heroText = document.getElementById('hero-text');

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
  
  if (heroText) {
    if (scrollFraction > 0.3) {
      heroText.style.opacity = '0';
    } else {
      heroText.style.opacity = '1';
    }
  }
});

preloadImages();
window.addEventListener('resize', setupCanvas);
setupCanvas();

// ==========================================
// NEW INTERACTIVE FEATURES
// ==========================================

// 1. Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  htmlElement.classList.add('dark');
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}
// ==========================================
// STATIC DATA FOR VERCEL DEPLOYMENT
// ==========================================
const staticData = {
  flavors: [
    {
      id: "rose", name: "Rose", tagline: "Floral & Soothing",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKdppg5uiWWNTnFhbipkrajKJl3fTiEzdIFPNbTWOzaqjDJKJXhSdp_JbSOO9Sm8LnphCYGgnxek38BG_PR9o19Lmb6R1tLPM-IQkTWXJdCJbWsbA8knnh12_lYGI9v7nrikFRpS0TDwFZh0ZXRCKF4Mk5derQeHJCGRWT7I97UjjvfQ5J0_27gxIXWbhnU8_W3MV2X3cNoRyljOAUrmpdV1i_NZv9tFTve3XPGNqgD1N4q8jatz6Rhu77JpZIxqnayuDebF0ROg",
      theme: { bg: "bg-rose-50 dark:bg-rose-800", text: "text-rose-dark dark:text-rose-50", border: "border-primary" },
      nutrition: { energy: "85 kcal", protein: "3.0 g", carbs: "10.5 g", fat: "3.5 g" }
    },
    {
      id: "kesar", name: "Kesar", tagline: "Rich & Traditional",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAErOcepOZuLtbWuYnPwziyLvcLAL4XdnsI5vxZYAKiZsFA8cD5KWCJb-z99iaUDUx_NJx8xI17VE9ofVIrc148dKyBJ-mV9-xAU2VIwZX16h6VXpBrVugTFn8B8qyuM0hCnJcxFOHT1Eeq0Au8r2w7fdCJR_nFz4Ps6UCBBS8uQeleisLN5pgOsJuOhPl3QAJjM77p1lAxo4uHSJbNtmdYaVZA8nov3t0sXjlvjpjDL1m-jz2BVpgUTxcNhUx5C5ZO_trpvL6tDg",
      theme: { bg: "bg-yellow-50 dark:bg-yellow-900/40", text: "text-yellow-600 dark:text-yellow-50", border: "border-yellow-400 dark:border-yellow-600" },
      nutrition: { energy: "88 kcal", protein: "3.2 g", carbs: "11.0 g", fat: "3.5 g" }
    },
    {
      id: "badam", name: "Badam", tagline: "Nutty & Wholesome",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpDRPyUiVaj-HxNSsPhHBMPGnq8RhHdmQ3IT8XLW8RMoF4RqeBTR9gjXvWV7WKL2eF4gi5qM9A8zLXIz0CBj1EX33078kFNWl2KOXixGPaqhAAMyx4lKASEU9ULl2rA01CxRApoTOm7992gfKfu8pU1lXx6_Hj4XabFrEbVHmJV5UMX__d1FFq73nYBaIr6vG2oxuYFC9gBmvQMlfAHu-a4br4Jh4lGffTPYT2A3bHk1ctPZkzfVr3u0Nq1W2Bsvq7fzQiOTFz8g",
      theme: { bg: "bg-orange-50 dark:bg-orange-900/40", text: "text-orange-600 dark:text-orange-50", border: "border-orange-400 dark:border-orange-600" },
      nutrition: { energy: "90 kcal", protein: "3.5 g", carbs: "10.2 g", fat: "3.8 g" }
    },
    {
      id: "chocolate", name: "Chocolate", tagline: "Decadent & Classic",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO4iSEzGAPlHoLoqXnzJX-2Jx75mt8d8dN7sR8eAfA8eVcNoOkqR_OCEVSDIkVGZ1NhyP7nUxPz1xBiJ-WDJyxm0vvs0E8dJiAA9CzZNFmlVy5jx1Xktg9GiaNHPywKi0O92DoE95LNZQaNU9CJ62LZ73UqKePzybjBjVd2F23hzzKwQx2k7V_NdrCQ82PfN064qnxzpLAK3ceJCuScnssNXc_USpK9uWm0FkmxfYHWUPfapWKmCh1ovaSUWvTQ1Af4rgpUp12CQ",
      theme: { bg: "bg-stone-50 dark:bg-stone-900/40", text: "text-stone-700 dark:text-stone-50", border: "border-stone-500 dark:border-stone-600" },
      nutrition: { energy: "95 kcal", protein: "3.0 g", carbs: "12.0 g", fat: "3.5 g" }
    }
  ],
  testimonials: [
    { text: "The most refreshing summer drink! I always have a couple in my fridge. Rose is absolutely the best.", author: "Priya S.", rating: 5, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { text: "My kids love the Chocolate flavor, and I feel good knowing it's made with pure Amul milk.", author: "Rahul M.", rating: 4.5, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { text: "Nothing beats Amul Kool Badam on a road trip. It's energizing and so tasty.", author: "Sneha K.", rating: 5, avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { text: "The Kesar flavor is rich and authentic. Tastes just like the traditional milk my grandmother used to make.", author: "Amit P.", rating: 5, avatar: "https://randomuser.me/api/portraits/men/46.jpg" }
  ],
  faqs: [
    { question: "Does Amul Kool need to be refrigerated?", answer: "Amul Kool can be stored at room temperature before opening thanks to our sterilization process. However, it tastes best when served chilled. Once opened, keep it refrigerated and consume within 2 days." },
    { question: "Is Amul Kool suitable for vegetarians?", answer: "Yes! All variants of Amul Kool are 100% vegetarian. They are made from pure cow and buffalo milk and natural flavorings." },
    { question: "Are there any artificial preservatives?", answer: "No, Amul Kool does not contain any artificial preservatives. We use advanced thermal processing to ensure a long shelf life while maintaining freshness and nutrition." }
  ]
};

// 2. Load Content Synchronously
function fetchContent() {
  try {
    const data = staticData;
    
    renderFlavors(data.flavors);
    renderTestimonials(data.testimonials);
    renderFAQs(data.faqs);
    
    // Attach event listeners after rendering
    attachFAQListeners();
    attachCardListeners();
    if (typeof reveal === 'function') reveal();
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

function renderFlavors(flavors) {
  const container = document.getElementById('flavors-container');
  if (!container) return;
  
  let html = '';
  flavors.forEach((flavor, index) => {
    html += `
      <div class="relative w-full h-80 group perspective-1000 flavor-card cursor-pointer reveal" style="transition-delay: ${index * 100}ms;">
        <div class="w-full h-full preserve-3d transition-transform duration-700 relative card-inner">
          <div class="absolute w-full h-full backface-hidden ${flavor.theme.bg} rounded-3xl p-8 text-center shadow-md border-2 ${flavor.theme.border} flex flex-col items-center justify-center transform transition-transform group-hover:shadow-2xl">
            <img alt="${flavor.name} flavor" class="h-40 mx-auto object-contain mb-4 drop-shadow-xl" src="${flavor.image}"/>
            <h3 class="text-2xl font-display font-bold ${flavor.theme.text} mb-2">${flavor.name}</h3>
            <p class="text-rose-900 dark:text-rose-200 text-sm">${flavor.tagline}</p>
          </div>
          <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-rose-800 rounded-3xl p-6 text-center shadow-lg border-2 ${flavor.theme.border} flex flex-col items-center justify-center">
            <h3 class="text-xl font-display font-bold ${flavor.theme.text} mb-4">Nutritional Facts</h3>
            <ul class="text-sm text-left text-rose-900 dark:text-rose-100 space-y-2 w-full">
              <li class="flex justify-between border-b border-gray-200 dark:border-rose-700 pb-1"><span>Energy</span> <span>${flavor.nutrition.energy}</span></li>
              <li class="flex justify-between border-b border-gray-200 dark:border-rose-700 pb-1"><span>Protein</span> <span>${flavor.nutrition.protein}</span></li>
              <li class="flex justify-between border-b border-gray-200 dark:border-rose-700 pb-1"><span>Carbohydrates</span> <span>${flavor.nutrition.carbs}</span></li>
              <li class="flex justify-between"><span>Fat</span> <span>${flavor.nutrition.fat}</span></li>
            </ul>
            <p class="mt-4 text-xs italic text-gray-500 dark:text-rose-300">Tap to flip back</p>
          </div>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderTestimonials(testimonials) {
  const container = document.getElementById('testimonials-container');
  if (!container) return;
  
  let html = '';
  const extended = [...testimonials, ...testimonials];
  
  extended.forEach(t => {
    let stars = '';
    for(let i=1; i<=5; i++) {
      if(i <= t.rating) stars += '<span class="material-icons text-lg">star</span>';
      else if(i - 0.5 === t.rating) stars += '<span class="material-icons text-lg">star_half</span>';
      else stars += '<span class="material-icons text-lg">star_outline</span>';
    }
    
    html += `
      <div class="bg-white dark:bg-rose-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 w-[350px] flex-shrink-0 border border-rose-100 dark:border-rose-800 relative flex flex-col">
        <div class="absolute top-6 right-6 text-rose-100 dark:text-rose-800/50">
          <span class="material-icons text-5xl">format_quote</span>
        </div>
        <div class="flex items-center space-x-1 text-yellow-400 mb-6 relative z-10">${stars}</div>
        <p class="text-slate-700 dark:text-rose-200 mb-8 text-[15px] leading-relaxed relative z-10 flex-grow">"${t.text}"</p>
        <div class="flex items-center space-x-4 mt-auto relative z-10">
          <img src="${t.avatar}" alt="${t.author}" class="w-12 h-12 rounded-full object-cover border-2 border-rose-100 dark:border-rose-700 shadow-sm"/>
          <p class="font-bold text-rose-950 dark:text-rose-50 text-sm tracking-wide uppercase">${t.author}</p>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderFAQs(faqs) {
  const container = document.getElementById('faq-container');
  if (!container) return;
  
  let html = '';
  faqs.forEach(faq => {
    html += `
      <div class="faq-item border border-rose-200 dark:border-rose-800 rounded-2xl bg-white dark:bg-rose-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button class="faq-button w-full px-6 py-5 flex justify-between items-center focus:outline-none text-left">
          <span class="font-semibold text-rose-dark dark:text-rose-50 text-lg">${faq.question}</span>
          <span class="material-icons text-primary transition-transform duration-300 transform faq-icon">add_circle_outline</span>
        </button>
        <div class="faq-content px-6 py-0 max-h-0 opacity-0 overflow-hidden transition-all duration-300 text-rose-800 dark:text-rose-200 text-sm bg-rose-50/50 dark:bg-rose-950/50">
          <p class="py-4 border-t border-rose-100 dark:border-rose-800">${faq.answer}</p>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Attach Listeners
function attachFAQListeners() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    button.addEventListener('click', () => {
      const isOpen = content.style.maxHeight;
      document.querySelectorAll('.faq-content').forEach(c => {
        c.style.maxHeight = null;
        c.style.opacity = '0';
        c.style.paddingTop = '0';
        c.style.paddingBottom = '0';
      });
      document.querySelectorAll('.faq-icon').forEach(i => {
        i.classList.remove('faq-icon-rotate');
        i.textContent = 'add_circle_outline';
      });

      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 32 + "px";
        content.style.opacity = '1';
        content.style.paddingTop = '1rem';
        content.style.paddingBottom = '1rem';
        icon.classList.add('faq-icon-rotate');
        icon.textContent = 'remove_circle_outline';
      }
    });
  });
}

function attachCardListeners() {
  const flavorCards = document.querySelectorAll('.flavor-card');
  flavorCards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    card.addEventListener('click', () => {
      card.classList.toggle('flip-active');
      if (card.classList.contains('flip-active')) {
        inner.style.transform = `rotateY(180deg)`;
      } else {
        inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
      }
    });

    card.addEventListener('mousemove', (e) => {
      if (card.classList.contains('flip-active')) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('flip-active')) {
        inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
      }
    });
  });
}

// Initialize dynamic content
fetchContent();

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email-address').value;
    
    try {
      const response = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      
      newsletterMessage.textContent = result.message || result.error;
      newsletterMessage.classList.remove('hidden', 'text-red-400');
      
      if (!response.ok) {
        newsletterMessage.classList.add('text-red-400');
      } else {
        newsletterForm.reset();
      }
    } catch (error) {
      newsletterMessage.textContent = "Failed to connect to server.";
      newsletterMessage.classList.remove('hidden');
      newsletterMessage.classList.add('text-red-400');
    }
  });
}

// ==========================================
// STORE LOCATOR MAP LOGIC
// ==========================================
let map = null;
let markers = [];

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement || !window.L) return;

  // Center on India
  map = L.map('map').setView([20.5937, 78.9629], 5); 

  // Use a clean, light base map
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);
  
  // Custom Rose Icon
  const roseIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background-color: #F43F5E; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });

  const storeForm = document.getElementById('store-locator-form');
  if (storeForm) {
    storeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pin = document.getElementById('pin-input').value.trim();
      
      try {
        // Mocked response for store locator on Vercel
        const data = {
          stores: [
            { name: "Amul Parlour - Downtown", address: `123 Main St, Near ${pin}`, distance: "1.2 km", lat: 28.6139 + (Math.random() * 0.05), lng: 77.2090 + (Math.random() * 0.05) },
            { name: "Amul Preferred Outlet", address: `45 Market Road, Area ${pin}`, distance: "3.5 km", lat: 28.6139 + (Math.random() * 0.05), lng: 77.2090 - (Math.random() * 0.05) }
          ]
        };
        
        // Clear old markers
        markers.forEach(m => map.removeLayer(m));
        markers = [];
        
        if (data.stores && data.stores.length > 0) {
          const group = new L.featureGroup();
          
          data.stores.forEach(store => {
            const marker = L.marker([store.lat, store.lng], { icon: roseIcon }).addTo(map);
            marker.bindPopup(`
              <div class="p-2 font-sans">
                <h4 class="font-bold text-rose-800 text-base m-0">${store.name}</h4>
                <p class="text-sm text-gray-600 m-0 mt-1">${store.address}</p>
                <p class="text-xs text-primary mt-2 font-semibold flex items-center">
                  <span class="material-icons text-xs mr-1">directions_walk</span> ${store.distance}
                </p>
              </div>
            `);
            markers.push(marker);
            group.addLayer(marker);
          });
          
          map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 14 });
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    });
  }
}

// Give CDN a moment to load then initialize
setTimeout(initMap, 500);

// ==========================================
// CONTACT FORM LOGIC
// ==========================================
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    try {
      // Mocked successful submission for Vercel
      setTimeout(() => {
        contactMessage.textContent = "Thank you! Your message has been sent successfully.";
        contactMessage.classList.remove('hidden', 'text-red-500');
        contactMessage.classList.add('text-green-500', 'dark:text-green-400');
        contactForm.reset();
        
        setTimeout(() => {
          contactMessage.classList.add('hidden');
        }, 5000);
      }, 800);
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      contactMessage.textContent = "Failed to send message. Please try again later.";
      contactMessage.classList.remove('hidden');
      contactMessage.classList.add('text-red-500');
    }
  });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

// ==========================================
// TRANSLATIONS LOGIC
// ==========================================
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'en';
let hiTranslations = null;

const staticTranslations = {
  hi: {
    "nav-features": "विशेषताएं",
    "nav-story": "हमारी कहानी",
    "nav-flavors": "फ्लेवर्स",
    "nav-contact": "संपर्क करें",
    "hero-title": "अमूल कूल",
    "hero-subtitle": "द टेस्ट ऑफ इंडिया",
    "features-subtitle": "कूल डिफरेंस",
    "features-title": "आपके आनंद के लिए तैयार",
    "features-desc": "अमूल कूल रोज़ का हर घूंट प्रामाणिक स्वाद और पौष्टिक अच्छाई देता है।",
    "story-title": "शुद्धता की विरासत",
    "flavors-title": "कूल परिवार",
    "flavors-desc": "अपना पसंदीदा स्वाद खोजें।",
    "testimonials-title": "लाखों लोगों की पसंद",
    "map-title": "अपने पास खोजें",
    "map-desc": "निकटतम अमूल पार्लर खोजने के लिए अपना पिन कोड दर्ज करें।",
    "map-placeholder": "पिन कोड दर्ज करें",
    "map-btn": "खोजें",
    "contact-title": "संपर्क करें",
    "newsletter-title": "अमूल के साथ कूल रहें",
    "newsletter-desc": "अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।",
    "newsletter-placeholder": "अपना ईमेल दर्ज करें",
    "newsletter-btn": "सब्सक्राइब",
    "shop-now": "अभी खरीदें"
  }
};

async function applyTranslations(lang) {
  if (lang === 'en') {
    if (localStorage.getItem('lang') !== 'en') {
      localStorage.setItem('lang', 'en');
      window.location.reload();
    }
    return;
  }
  
  if (!hiTranslations) {
    try {
      hiTranslations = staticTranslations.hi;
    } catch (error) {
      console.error("Failed to load translations", error);
      return;
    }
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (hiTranslations[key]) {
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', hiTranslations[key]);
      } else {
        el.innerHTML = hiTranslations[key];
      }
    }
  });
}

if (langToggle) {
  langToggle.textContent = currentLang === 'en' ? 'HI' : 'EN';
  
  if (currentLang !== 'en') {
    applyTranslations(currentLang);
  }

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    localStorage.setItem('lang', currentLang);
    langToggle.textContent = currentLang === 'en' ? 'HI' : 'EN';
    if (currentLang === 'en') {
        window.location.reload();
    } else {
        applyTranslations(currentLang);
    }
  });
}
