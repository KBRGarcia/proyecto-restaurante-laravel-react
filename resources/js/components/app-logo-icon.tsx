import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: Readonly<SVGAttributes<SVGElement>>) {
    return (
        <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Círculo rojo de fondo */}
            <circle cx="50" cy="50" r="50" fill="#D42B2B" />

            {/* Tenedor (izquierda) */}
            <g fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="30" y1="18" x2="30" y2="38" />
                <line x1="36" y1="18" x2="36" y2="38" />
                <line x1="42" y1="18" x2="42" y2="38" />
                <path d="M30 38 C30 44 36 46 36 50" />
                <path d="M42 38 C42 44 36 46 36 50" />
                <line x1="36" y1="50" x2="36" y2="82" />
                <line x1="33" y1="82" x2="39" y2="82" />
            </g>

            {/* Cuchara (derecha) */}
            <g fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <ellipse cx="60" cy="29" rx="7.5" ry="11" />
                <line x1="60" y1="40" x2="60" y2="82" />
                <line x1="57" y1="82" x2="63" y2="82" />
            </g>
        </svg>
    );
}
