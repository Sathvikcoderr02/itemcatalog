# GlobalPath Consultants - Study Abroad Consultancy Website

A modern, responsive static website for a study abroad consultancy business. This website showcases services, popular study destinations, testimonials, and contact information.

## Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ⚡ Fast loading and optimized performance
- 📱 Mobile-first approach
- ✨ Modern UI with smooth animations
- 📞 WhatsApp integration for instant communication
- 📝 Contact form with validation
- 🎨 Clean and maintainable code

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

## Project Structure

```
study/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All CSS styles
├── js/
│   └── script.js      # JavaScript functionality
└── README.md           # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd study
   ```

2. Open `index.html` in your preferred web browser.

### Local Development

To run a local development server:

1. Navigate to the project directory
2. Run one of the following commands:

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

   **Or with Node.js:**
   ```bash
   npx http-server
   ```
   Then open `http://localhost:8080` in your browser.

## Customization

### Update WhatsApp Number

To update the WhatsApp contact number:

1. Open `index.html`
2. Find the WhatsApp button (around line 320)
3. Update the phone number in the URL: `https://wa.me/YOUR_NUMBER_HERE`

### Change Color Scheme

To change the color scheme:

1. Open `css/style.css`
2. Locate the `:root` selector at the top of the file
3. Update the CSS variables:
   ```css
   :root {
       --primary-color: #2c3e50;
       --secondary-color: #3498db;
       --accent-color: #e74c3c;
       /* ... other variables ... */
   }
   ```

### Replace Images

1. Add your images to the project directory
2. Update the image paths in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (latest versions)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Images from [Unsplash](https://unsplash.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Note:** This is a static website. For form submission functionality, you'll need to integrate with a backend service or use a form submission service like Formspree, Netlify Forms, or similar.
