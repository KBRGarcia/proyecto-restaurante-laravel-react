import type { PropsWithChildren } from 'react';

export const AppSystemShell = ({ children }: PropsWithChildren) => (
    <div className="app-system-outer">
        <div className="app-system">{children}</div>
    </div>
);
