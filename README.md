# Portfolio Website

A modern, dark-mode portfolio built with React, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

Since the project files were manually generated, you need to install dependencies first:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

## 🛠️ Tech Stack

- **React**: UI Library
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **Vite**: Build tool

## 🌍 Deployment on Netlify

1. **Push to GitHub**:
   - Initialize git: `git init`
   - Add files: `git add .`
   - Commit: `git commit -m "Initial commit"`
   - Push to a new GitHub repository.

2. **Connect to Netlify**:
   - Log in to Netlify.
   - Click "Add new site" > "Import from existing project".
   - Select GitHub and choose your repository.

3. **Configure Build**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. **Deploy**:
   - Click "Deploy Site".
   - Netlify will automatically detect the form in `Contact.jsx` because of the `data-netlify="true"` attribute.

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js` to change `shadowed-green` or `mint-green`.
- **Content**: Update `src/components/*.jsx` files with your own text and links.
