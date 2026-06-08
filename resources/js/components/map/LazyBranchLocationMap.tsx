import { lazy, Suspense, useState } from "react";
import type { ComponentProps } from "react";
import { MapPlaceholder } from "@/components/map/MapPlaceholder";
import { useDeferredMapMount } from "@/hooks/useDeferredMapMount";

const BranchLocationMapLazy = lazy(async () => {
    await import("leaflet/dist/leaflet.css");
    const module = await import("@/components/map/BranchLocationMap");

    return { default: module.BranchLocationMap };
});

type LazyBranchLocationMapProps = ComponentProps<typeof BranchLocationMapLazy>;

export const LazyBranchLocationMap = ({ height = 320, ...props }: LazyBranchLocationMapProps) => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const shouldMount = useDeferredMapMount(container);

    return (
        <div ref={setContainer}>
            {shouldMount ? (
                <Suspense fallback={<MapPlaceholder height={height} loading />}>
                    <BranchLocationMapLazy height={height} {...props} />
                </Suspense>
            ) : (
                <MapPlaceholder height={height} />
            )}
        </div>
    );
};
