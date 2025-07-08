# 🎓 EduTools - Interactive Educational Platform

A modern, multilingual educational platform built with Astro, featuring interactive tools, quizzes, and educational content designed to enhance learning experiences.

## 🌟 Features

### 🌍 Multilingual Support
- **3 Languages**: Indonesian (default), English, Chinese
- **Smart Routing**: `/` (ID), `/en/`, `/zh/`
- **Dynamic Translation**: Real-time language switching
- **SEO Optimized**: Proper hreflang tags and localized metadata

### 🛠️ Interactive Tools
- **Name Picker**: Random name selection with animations, multi-list support, and export functionality
- **Slot Simulator**: Educational slot machine with RTP visualization and myth-busting
- **Quiz Engine**: IQ tests, MBTI personality assessments, and trivia quizzes

### 🎨 Modern UI/UX
- **Dark/Light Theme**: Animated circular reveal transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: GSAP-powered interactions and transitions
- **Sound Effects**: Tone.js integration for audio feedback
- **Toast Notifications**: Real-time user feedback system

### 🚀 Performance & SEO
- **Static Site Generation**: Lightning-fast loading times
- **Core Web Vitals Optimized**: Excellent performance scores
- **Structured Data**: JSON-LD schema markup
- **Sitemap Generation**: Automatic SEO optimization
- **Image Optimization**: WebP support and lazy loading

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Astro v5.11.0 |
| **Styling** | Tailwind CSS |
| **Animations** | GSAP, Three.js |
| **Audio** | Tone.js |
| **Search** | Fuse.js |
| **Export** | html2canvas |
| **Language** | TypeScript |

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Navigation, footer components
│   ├── tools/           # Tool-specific components
│   ├── quiz/            # Quiz engine components
│   └── ui/              # Generic UI components
├── content/             # Content collections
│   └── blog/            # Blog posts by language
│       ├── id/          # Indonesian posts
│       ├── en/          # English posts
│       └── zh/          # Chinese posts
├── data/                # Static data files
│   └── quizzes/         # Quiz questions and answers
├── i18n/                # Internationalization
│   ├── id.json          # Indonesian translations
│   ├── en.json          # English translations
│   ├── zh.json          # Chinese translations
│   └── utils.ts         # i18n utilities
├── layouts/             # Page layouts
│   └── BaseLayout.astro # Main layout template
├── pages/               # Route pages
│   ├── tools/           # Tool pages
│   ├── quiz/            # Quiz pages
│   ├── en/              # English routes
│   └── zh/              # Chinese routes
├── scripts/             # Client-side functionality
│   ├── theme.ts         # Theme management
│   ├── audio.ts         # Sound system
│   ├── toast.ts         # Notifications
│   └── i18n.ts          # Client i18n
└── styles/              # Global styles
    └── global.css       # Tailwind + custom CSS
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edu-tools
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:4321
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 Usage Guide

### Name Picker Tool
1. Navigate to `/tools/name-picker`
2. Add names to your list
3. Create multiple lists for different purposes
4. Click "Pick Name" to randomly select
5. Export results as images
6. Generate groups from your lists

### Quiz System
1. Choose quiz type: IQ, MBTI, or Trivia
2. Answer questions within time limits
3. View detailed explanations
4. Track your progress and scores
5. Compare with leaderboards

### Slot Simulator
1. Access `/tools/slot-simulator`
2. Learn about RTP and probability
3. Experience both fake and true RNG
4. Understand gambling myths vs facts
5. Earn educational badges

## 🌐 Internationalization

### Adding New Languages

1. **Create translation file**
   ```bash
   src/i18n/[locale].json
   ```

2. **Update utils.ts**
   ```typescript
   export const locales: Locale[] = ['id', 'en', 'zh', 'new-locale'];
   ```

3. **Add route pages**
   ```bash
   src/pages/[new-locale]/
   ```

### Translation Structure
```json
{
  "nav": { "home": "Home", "tools": "Tools" },
  "common": { "start": "Start", "next": "Next" },
  "tools": { "namePicker": { "title": "Name Picker" } }
}
```

## 🎨 Customization

### Theme Configuration
- Edit `tailwind.config.mjs` for design tokens
- Modify `src/styles/global.css` for custom styles
- Update theme colors in CSS variables

### Adding New Tools
1. Create component in `src/components/tools/`
2. Add page in `src/pages/tools/`
3. Update navigation and translations
4. Add data files if needed

## 📊 Data Management

### Local Storage Schema
```javascript
{
  "userPreferences": { "theme": "dark", "language": "id" },
  "toolUsage": { "namePicker": 3, "iqTest": 2 },
  "namePickerData": { "currentList": "Main", "lists": {...} },
  "quizHistory": { "mbti": { "lastResult": "INTJ" } }
}
```

### Quiz Data Format
- **Multiple Choice**: Standard quiz format with explanations
- **Likert Scale**: MBTI-style personality assessments
- **Timed Questions**: IQ tests with time constraints

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Conventional commits

## 🚀 Deployment

### Static Hosting (Recommended)
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### Build Output
```bash
npm run build
# Output in dist/ directory
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all languages are supported

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Astro Team** - Amazing static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animation library
- **Tone.js** - Web audio framework
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

## 📞 Support

- 📧 Email: support@edutools.example.com
- 💬 Discord: [Join our community](https://discord.gg/edutools)
- 📖 Documentation: [docs.edutools.example.com](https://docs.edutools.example.com)
- 🐛 Issues: [GitHub Issues](https://github.com/username/edu-tools/issues)

---

**Built with ❤️ for education and learning**
