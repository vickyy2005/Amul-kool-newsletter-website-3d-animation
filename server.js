import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Dynamic Data
const data = {
  flavors: [
    {
      id: "rose",
      name: "Rose",
      tagline: "Floral & Soothing",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKdppg5uiWWNTnFhbipkrajKJl3fTiEzdIFPNbTWOzaqjDJKJXhSdp_JbSOO9Sm8LnphCYGgnxek38BG_PR9o19Lmb6R1tLPM-IQkTWXJdCJbWsbA8knnh12_lYGI9v7nrikFRpS0TDwFZh0ZXRCKF4Mk5derQeHJCGRWT7I97UjjvfQ5J0_27gxIXWbhnU8_W3MV2X3cNoRyljOAUrmpdV1i_NZv9tFTve3XPGNqgD1N4q8jatz6Rhu77JpZIxqnayuDebF0ROg",
      theme: { bg: "bg-rose-50 dark:bg-rose-800", text: "text-rose-dark dark:text-rose-50", border: "border-primary" },
      nutrition: { energy: "85 kcal", protein: "3.0 g", carbs: "10.5 g", fat: "3.5 g" }
    },
    {
      id: "kesar",
      name: "Kesar",
      tagline: "Rich & Traditional",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAErOcepOZuLtbWuYnPwziyLvcLAL4XdnsI5vxZYAKiZsFA8cD5KWCJb-z99iaUDUx_NJx8xI17VE9ofVIrc148dKyBJ-mV9-xAU2VIwZX16h6VXpBrVugTFn8B8qyuM0hCnJcxFOHT1Eeq0Au8r2w7fdCJR_nFz4Ps6UCBBS8uQeleisLN5pgOsJuOhPl3QAJjM77p1lAxo4uHSJbNtmdYaVZA8nov3t0sXjlvjpjDL1m-jz2BVpgUTxcNhUx5C5ZO_trpvL6tDg",
      theme: { bg: "bg-yellow-50 dark:bg-yellow-900/40", text: "text-yellow-600 dark:text-yellow-50", border: "border-yellow-400 dark:border-yellow-600" },
      nutrition: { energy: "88 kcal", protein: "3.2 g", carbs: "11.0 g", fat: "3.5 g" }
    },
    {
      id: "badam",
      name: "Badam",
      tagline: "Nutty & Wholesome",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpDRPyUiVaj-HxNSsPhHBMPGnq8RhHdmQ3IT8XLW8RMoF4RqeBTR9gjXvWV7WKL2eF4gi5qM9A8zLXIz0CBj1EX33078kFNWl2KOXixGPaqhAAMyx4lKASEU9ULl2rA01CxRApoTOm7992gfKfu8pU1lXx6_Hj4XabFrEbVHmJV5UMX__d1FFq73nYBaIr6vG2oxuYFC9gBmvQMlfAHu-a4br4Jh4lGffTPYT2A3bHk1ctPZkzfVr3u0Nq1W2Bsvq7fzQiOTFz8g",
      theme: { bg: "bg-orange-50 dark:bg-orange-900/40", text: "text-orange-600 dark:text-orange-50", border: "border-orange-400 dark:border-orange-600" },
      nutrition: { energy: "90 kcal", protein: "3.5 g", carbs: "10.2 g", fat: "3.8 g" }
    },
    {
      id: "chocolate",
      name: "Chocolate",
      tagline: "Decadent & Classic",
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
    {
      question: "Does Amul Kool need to be refrigerated?",
      answer: "Amul Kool can be stored at room temperature before opening thanks to our sterilization process. However, it tastes best when served chilled. Once opened, keep it refrigerated and consume within 2 days."
    },
    {
      question: "Is Amul Kool suitable for vegetarians?",
      answer: "Yes! All variants of Amul Kool are 100% vegetarian. They are made from pure cow and buffalo milk and natural flavorings."
    },
    {
      question: "Are there any artificial preservatives?",
      answer: "No, Amul Kool does not contain any artificial preservatives. We use advanced thermal processing to ensure a long shelf life while maintaining freshness and nutrition."
    }
  ]
};

const translations = {
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

// Endpoints
app.get('/api/content', (req, res) => {
  res.json(data);
});

app.get('/api/translations', (req, res) => {
  const lang = req.query.lang;
  if (lang && translations[lang]) {
    res.json(translations[lang]);
  } else {
    res.json({}); // Default empty for English
  }
});

// Store Locator Mock Data
const storeLocations = {
  "110001": [
    { name: "Amul Parlour Connaught Place", address: "Inner Circle, Connaught Place, New Delhi", lat: 28.6315, lng: 77.2167, distance: "0.2 km" },
    { name: "Amul Preferred Outlet Bengali Market", address: "Bengali Market, New Delhi", lat: 28.6290, lng: 77.2300, distance: "1.5 km" }
  ],
  "400001": [
    { name: "Amul Scooping Parlour Fort", address: "Fort, Mumbai, Maharashtra", lat: 18.9322, lng: 72.8335, distance: "0.5 km" },
    { name: "Amul Store Colaba", address: "Colaba Causeway, Mumbai", lat: 18.9150, lng: 72.8250, distance: "2.1 km" }
  ],
  "default": [
    { name: "Amul Parlour (Default)", address: "Central City Plaza", lat: 20.5937, lng: 78.9629, distance: "N/A" } // India center
  ]
};

app.get('/api/stores', async (req, res) => {
  const pin = req.query.pin;
  if (!pin) {
    return res.status(400).json({ error: "PIN code is required" });
  }

  // Use hardcoded if it exists
  if (storeLocations[pin]) {
    return res.json({ stores: storeLocations[pin], center: storeLocations[pin][0] });
  }

  // Dynamically geocode the PIN for any other location using OpenStreetMap Nominatim
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pin}&country=India&format=json`, {
      headers: {
        "User-Agent": "AmulKoolDemoWebsite/1.0"
      }
    });
    const data = await response.json();
    
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      
      // Extract a decent place name or default to the PIN
      const displayNameArray = data[0].display_name.split(',');
      const placeName = displayNameArray[0] || pin;
      
      // Generate some mock stores nicely scattered around the real coordinates
      const stores = [
        { name: "Amul Parlour " + placeName, address: "Main Road, " + placeName, lat: lat + 0.002, lng: lon + 0.001, distance: "0.4 km" },
        { name: "Amul Preferred Outlet", address: "Station Road, " + placeName, lat: lat - 0.001, lng: lon - 0.003, distance: "1.2 km" },
        { name: "Amul Scooping Parlour", address: "City Center, " + placeName, lat: lat + 0.004, lng: lon - 0.002, distance: "2.5 km" }
      ];
      
      return res.json({ stores, center: stores[0] });
    }
  } catch (err) {
    console.error("Geocoding error", err);
  }

  // Fallback if geocoding fails or no results
  const stores = storeLocations["default"];
  res.json({ stores, center: stores[0] });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  // In a real app, save email to database here
  console.log(`New subscription: ${email}`);
  
  res.json({ success: true, message: 'Successfully subscribed to Newsletter!' });
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all required fields." });
  }
  
  console.log('New Contact Form Submission:', { name, email, subject, message });
  res.json({ success: true, message: "Thank you for reaching out! We'll get back to you soon." });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
