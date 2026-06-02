import { useUpdate } from "@refinedev/core";
import { useCallback, useState } from "react";

export const useInlineUpdate = () => {
    const { mutate, mutation } = useUpdate();
    const [updatingId, setUpdatingId] = useState<number | string | null>(null);

    const update = useCallback(
        (resource: string, id: number | string, values: Record<string, unknown>) => {
            setUpdatingId(id);
            mutate(
                { resource, id, values },
                { onSettled: () => setUpdatingId(null) },
            );
        },
        [mutate],
    );

    const isUpdating = useCallback(
        (id: number | string) => mutation.isPending && updatingId === id,
        [mutation.isPending, updatingId],
    );

    return { update, isUpdating };
};
