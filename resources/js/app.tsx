import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';

const el = document.getElementById('app');

if (el) {
    const root = createRoot(el);
    root.render(
        <StrictMode>
            <AppRouter />
        </StrictMode>
    );
}