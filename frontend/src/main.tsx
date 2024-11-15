
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme/themeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <App />
    <Toaster />
    </ThemeProvider>
    </BrowserRouter>

)
