# Giddaa (Test)

A secure and affordable home-buying platform for Nigerians on the National Housing Fund (NHF) Plan, built with Next.js and TypeScript.


## Core Screens

1. **Landing Page** - Introduction to the platform and its benefits
2. **Dashboard** - All Estates Fetched
3. **Create Estates** - For creation of new estates with the images
4. **View Estate** - Detailed view of estate information

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

## Installation

### Clone the repository:

```bash
git clone [https://github.com/tochukwu19/Giddaa-Test.git]
cd Giddaa-Test
```

### Install dependencies:

```bash
npm install
# or
yarn install
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Build

Create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

```bash
public/               # Static files
src/
  ├── app/            # Next.js App Router structure
  │   ├── (auth)/     # Authentication routes
  │   │   └── login/  # Login page
  │   │       └── page.tsx
  │   ├── assets/     # Media assets
  │   ├── components/ # Reusable UI components
  │   ├── context/    # React context providers
  │   ├── create/     # Property creation pages
  │   ├── dashboard/  # User dashboard pages
  │   ├── estate/     # Estate viewing pages
  │   ├── hooks/      # Custom React hooks
  │   ├── lib/        # Utility libraries
  │   ├── services/   # API and external services
  │   ├── favicon.ico # Site favicon
  │   ├── globals.css # Global CSS styles
  │   └── layout.tsx  # Root layout component
```

## Key Dependencies

- [Next.js](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management
- [React Hook Form](https://react-hook-form.com/) - Form validation and handling
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations and transitions
- [Lucide React](https://lucide.dev/) - Icon library
- [React Toastify](https://github.com/fkhadra/react-toastify) - Toast notifications
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## State Management

- Used **React Query** for server state management
- Implemented efficient caching strategies for property listings
- Optimistic updates for improved UX during form submissions

## Authentication & Security

- Secure user authentication with dedicated (auth) route group
- Protected routes for authenticated users
- Data validation on both client and server sides

## Styling

- Combined **Tailwind CSS** with **Radix UI** for consistent styling
- Created micro interactions with **Framer Motion** for smooth animations
- Implemented fully responsive designs for all screen sizes

## Deployment

The application can be deployed to:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://www.netlify.com/)
- Any Node.js compatible hosting service

## Contributing

We welcome contributions! Follow these steps:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "Add new feature"`)
4. **Push** to the branch (`git push origin feature-branch`)
5. **Open a Pull Request**

## License

This project is licensed under the **MIT License**.