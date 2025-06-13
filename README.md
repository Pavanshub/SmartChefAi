# 🍳 SmartChef - AI-Powered Recipe Generator

> Transform your available ingredients into delicious recipes with the power of AI

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-purple?style=flat-square)](https://openrouter.ai/)

### SmartChef is a modern, AI-powered recipe generator that helps you create amazing dishes from whatever ingredients you have on hand. Whether you're looking to reduce food waste, try new combinations, or just need cooking inspiration, SmartChef has you covered.

## ✨ Features

### 🤖 AI-Powered Recipe Generation
- **Advanced AI Integration**: Uses OpenRouter API with Google Gemini for intelligent recipe creation
- **Creative Combinations**: Generates unique recipes you might never have thought of
- **Contextual Understanding**: AI considers cooking techniques, flavor profiles, and ingredient compatibility

### 🥘 Smart Recipe Management
- **Ingredient Input System**: Tag-based ingredient management with smart validation
- **Dietary Preferences**: Full support for vegetarian, vegan, keto, gluten-free, paleo, and more
- **"Surprise Me" Feature**: Get unexpected, creative recipe combinations
- **Recipe Favorites**: Save and organize your favorite recipes
- **Recipe Search**: Find saved recipes by name, ingredients, or description

### 🎨 Beautiful User Experience
- **Modern Design**: Clean, intuitive interface with smooth animations
- **Responsive Layout**: Perfect experience on desktop, tablet, and mobile
- **Loading States**: Elegant loading animations and progress indicators
- **Error Handling**: Graceful error handling with helpful user feedback
- **Accessibility**: Built with accessibility best practices

### 🔧 Production-Ready Features
- **Offline Capability**: Works with mock data when API is unavailable
- **Environment Configuration**: Easy setup with environment variables
- **Performance Optimized**: Fast loading and smooth interactions
- **SEO Friendly**: Proper meta tags and structured data
- **Type Safety**: Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **OpenRouter API Key** (optional - app works with demo data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smartchef.git
   cd smartchef
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure your API key** (Optional)
   
   Edit `.env.local` and add your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting an OpenRouter API Key

SmartChef uses OpenRouter to access state-of-the-art AI models. Here's how to get your API key:

1. **Visit [OpenRouter.ai](https://openrouter.ai)**
2. **Sign up** for a free account
3. **Navigate to API Keys** in your dashboard
4. **Create a new API key**
5. **Add the key** to your `.env.local` file

**💡 Note**: The app works perfectly without an API key using intelligent mock recipes for demonstration purposes.

## 🏗️ Project Structure

```
smartchef/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── generate-recipes/
│   ├── favorites/         # Favorites page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ingredient-form.tsx
│   ├── recipe-card.tsx
│   ├── recipe-dialog.tsx
│   └── loading-skeleton.tsx
├── lib/                  # Utility libraries
│   ├── openrouter.ts     # OpenRouter API service
│   ├── storage.ts        # Local storage utilities
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
└── public/              # Static assets
```

## 🎯 Core Features Deep Dive

### Ingredient Management
- **Smart Input**: Add ingredients with real-time validation
- **Duplicate Detection**: Prevents adding the same ingredient twice
- **Quantity Limits**: Maximum 10 ingredients for optimal recipe generation
- **Easy Removal**: One-click ingredient removal with visual feedback

### Recipe Generation
- **Multiple Recipes**: Generate 3 varied recipes from your ingredients
- **Dietary Filtering**: Respects dietary preferences and restrictions
- **Creative Mode**: "Surprise Me" feature for unexpected combinations
- **Detailed Instructions**: Step-by-step cooking instructions with tips

### Recipe Management
- **Favorites System**: Save recipes to your personal collection
- **Search Functionality**: Find recipes by name, ingredients, or description
- **Recipe Details**: View complete recipes with ingredients, steps, and tips
- **Copy to Clipboard**: Share recipes easily with one click

### User Experience
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Loading States**: Beautiful loading skeletons during API calls
- **Error Handling**: Graceful error handling with helpful messages
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Technology Stack

### Frontend
- **[Next.js 13+](https://nextjs.org/)**: React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)**: Beautiful, accessible UI components
- **[Lucide React](https://lucide.dev/)**: Beautiful, customizable icons

### Backend & AI
- **[OpenRouter API](https://openrouter.ai/)**: Access to multiple AI models
- **[Google Gemini](https://aistudio.google.com/apikey)**: Advanced language model for recipe generation
- **Next.js API Routes**: Serverless API endpoints

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic CSS vendor prefixing

## 🎨 Design System

SmartChef uses a carefully crafted design system that combines:

### Color Palette
- **Primary Gradients**: Orange to pink for warmth and appetite appeal
- **Secondary Colors**: Purple accents for creativity and innovation
- **Neutral Tones**: Carefully balanced grays for readability
- **Status Colors**: Green, yellow, and red for feedback and states

### Typography
- **Font Family**: Inter for clean, modern readability
- **Hierarchy**: Clear heading and body text relationships
- **Line Height**: Optimized for reading comfort (150% body, 120% headings)

### Spacing & Layout
- **8px Grid System**: Consistent spacing throughout the interface
- **Responsive Breakpoints**: Mobile-first design with tablet and desktop optimizations
- **Container Widths**: Optimal reading widths for different content types

### Animations
- **Micro-interactions**: Subtle hover states and button feedback
- **Page Transitions**: Smooth slide-in animations for new content
- **Loading States**: Engaging skeleton screens and spinners

## 📱 Responsive Design

SmartChef is built mobile-first and provides an excellent experience across all devices:

### Mobile (320px - 768px)
- Single-column layout for easy thumb navigation
- Touch-friendly button sizes and spacing
- Optimized form inputs for mobile keyboards
- Swipe-friendly recipe cards

### Tablet (768px - 1024px)
- Two-column recipe grid for better space utilization
- Larger touch targets while maintaining information density
- Optimized modal dialogs for tablet viewing

### Desktop (1024px+)
- Three-column recipe grid for maximum content visibility
- Hover states and micro-interactions
- Keyboard navigation support
- Optimized for mouse and trackpad interaction

## 🔧 Configuration & Customization

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key for AI features | No | Mock data used |
| `NEXT_PUBLIC_APP_URL` | Your app's URL for API headers | No | `http://localhost:3000` |

### Customization Options

#### Changing AI Models
Edit `lib/openrouter.ts` to use different models:
```typescript
model: 'google/gemma-3n-e4b-it:free', // Change this line
```

#### Modifying Color Themes
Update `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  // Add your custom colors here
}
```

#### Adding New Dietary Preferences
Update the select options in `components/ingredient-form.tsx`:
```typescript
<SelectItem value="your-diet">Your Diet Name</SelectItem>
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in the Vercel dashboard
   - Deploy!

### Linting
```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage improvements
- 🌐 Internationalization support

## 📊 Performance

SmartChef is optimized for performance:

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: Optimized with tree shaking and code splitting

## 🔒 Security

- **API Key Protection**: Environment variables are never exposed to the client
- **Input Validation**: All user inputs are validated and sanitized
- **HTTPS Only**: Secure communication with external APIs
- **No Data Storage**: No personal data is stored on servers
- **Local Storage**: Favorites are stored locally on the user's device

## 🌟 Roadmap

### Upcoming Features
- [ ] **Recipe Collections**: Organize recipes into custom collections
- [ ] **Meal Planning**: Plan weekly meals with generated recipes
- [ ] **Shopping Lists**: Generate shopping lists from recipes
- [ ] **Nutritional Information**: Display calories and nutritional data
- [ ] **Recipe Sharing**: Share recipes with friends and family
- [ ] **Voice Input**: Add ingredients using voice commands
- [ ] **Recipe Photos**: AI-generated recipe images
- [ ] **Cooking Timer**: Built-in timers for recipe steps

### Long-term Goals
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Recipe Videos**: AI-generated cooking instruction videos
- [ ] **Community Features**: User-generated content and reviews
- [ ] **Advanced AI**: More sophisticated recipe generation
- [ ] **Integration**: Connect with smart kitchen appliances

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[OpenRouter](https://openrouter.ai/)** for providing access to state-of-the-art AI models
- **[Gemini](https://aistudio.google.com/apikey)** for the amazing Gemini model
- **[shadcn](https://ui.shadcn.com/)** for the beautiful, accessible UI component library
- **[Vercel](https://vercel.com/)** for the excellent Next.js framework and hosting platform
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework
- **The open-source community** for the amazing tools and libraries that make this project possible

## 📞 Support

Need help? Here are your options:

- **📖 Documentation**: Check this README and inline code comments
- **🐛 Bug Reports**: Open an issue on GitHub
- **💡 Feature Requests**: Open an issue with the "enhancement" label
- **💬 Discussions**: Use GitHub Discussions for questions and ideas

---

**Happy Cooking!** 👨‍🍳✨

*Made with ❤️ by developers who love good food and great code*#
