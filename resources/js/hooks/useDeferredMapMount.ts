import { useEffect, useState } from "react";

type UseDeferredMapMountOptions = {
    idleTimeoutMs?: number;
    rootMargin?: string;
};

export const useDeferredMapMount = (
    container: HTMLElement | null,
    { idleTimeoutMs = 600, rootMargin = "120px" }: UseDeferredMapMountOptions = {},
) => {
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        if (shouldMount) {
            return;
        }

        let cancelled = false;

        const mount = () => {
            if (!cancelled) {
                setShouldMount(true);
            }
        };

        const idleId =
            typeof window.requestIdleCallback === "function"
                ? window.requestIdleCallback(mount, { timeout: idleTimeoutMs })
                : null;
        const timeoutId =
            idleId === null ? window.setTimeout(mount, 150) : null;

        const observer =
            container && typeof window.IntersectionObserver !== "undefined"
                ? new IntersectionObserver(
                      (entries) => {
                          if (entries.some((entry) => entry.isIntersecting)) {
                              mount();
                          }
                      },
                      { rootMargin },
                  )
                : null;

        if (observer && container) {
            observer.observe(container);
        }

        return () => {
            cancelled = true;

            if (idleId !== null) {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }

            observer?.disconnect();
        };
    }, [container, idleTimeoutMs, rootMargin, shouldMount]);

    return shouldMount;
};
