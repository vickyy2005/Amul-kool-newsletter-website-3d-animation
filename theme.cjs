const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Remove all dark mode classes
html = html.replace(/dark:[\w\-\/\[\]]+/g, '');

// 2. Replace royal-blue with rose-dark
html = html.replace(/royal-blue/g, 'rose-dark');

// 3. Replace background colors to make it white and pink
html = html.replace(/bg-gray-900/g, 'bg-rose-50');
html = html.replace(/bg-gray-800/g, 'bg-white');
html = html.replace(/bg-gray-100/g, 'bg-white');

// 4. Update specific text colors to match the theme
html = html.replace(/text-gray-500/g, 'text-rose-800');
html = html.replace(/text-gray-600/g, 'text-rose-900');
html = html.replace(/text-gray-900/g, 'text-rose-950');

// 5. Update footer specifically
// The footer originally had bg-gray-900 which we just changed to bg-rose-50.
// Let's make the footer look nice with a strong pink background
html = html.replace(/<footer class="bg-rose-50 pt-16/g, '<footer class="bg-rose-600 pt-16 text-white');
// The footer text uses text-gray-400, let's change it to text-rose-100 in the footer context
// And the text-white for headings can stay.
html = html.replace(/text-gray-400/g, 'text-rose-100');

// 6. Update the tailwind config to define our beautiful pink and white colors
const newConfig = `tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: "#F43F5E", /* Rose 500 */
                        "background-light": "#FFFFFF", 
                        "rose-light": "#FFE4E6", /* Rose 100 */
                        "rose-dark": "#9F1239", /* Rose 800 */
                        "rose-50": "#FFF1F2",
                        "rose-100": "#FFE4E6",
                        "rose-600": "#E11D48",
                        "rose-800": "#9F1239",
                        "rose-900": "#881337",
                        "rose-950": "#4C0519",
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
        };`;

html = html.replace(/tailwind\.config = \{[\s\S]*?\};/, newConfig);

// Also remove the dark mode toggle script at the bottom since we are strictly white and pink
html = html.replace(/<script>\s*\/\/\s*Theme toggle logic[\s\S]*?<\/script>/, '');
html = html.replace(/<script>\s*if \(localStorage\.theme[\s\S]*?<\/script>/, '');

// Save the file
fs.writeFileSync('index.html', html);
console.log('Theme updated successfully.');
