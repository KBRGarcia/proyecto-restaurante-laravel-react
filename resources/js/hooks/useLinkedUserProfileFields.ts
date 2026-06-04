import { useOne } from "@refinedev/core";
import { Form, type FormInstance } from "antd";
import { useCallback, useEffect, useState } from "react";

const LINKED_USER_FIELDS = ["first_name", "last_name", "identity_document", "email"] as const;

export type ClientPurchaseStatsDisplay = {
    first_purchase_at_formatted?: string | null;
    last_purchase_at_formatted?: string | null;
    total_orders?: number;
    total_spent?: string | number;
};

const EMPTY_PURCHASE_STATS: ClientPurchaseStatsDisplay = {
    first_purchase_at_formatted: null,
    last_purchase_at_formatted: null,
    total_orders: 0,
    total_spent: 0,
};

type LinkedUser = {
    name?: string;
    last_name?: string;
    email?: string;
    identity_document?: string | null;
    purchase_stats?: ClientPurchaseStatsDisplay | null;
};

type UseLinkedUserProfileFieldsOptions = {
    form?: FormInstance;
    withPurchaseStats?: boolean;
};

export const useLinkedUserProfileFields = ({
    form,
    withPurchaseStats = false,
}: UseLinkedUserProfileFieldsOptions) => {
    const userId = Form.useWatch("user_id", form);
    const [purchaseStats, setPurchaseStats] = useState<ClientPurchaseStatsDisplay>(EMPTY_PURCHASE_STATS);

    const { query: userQuery } = useOne<LinkedUser>({
        resource: "users",
        id: userId ?? "",
        queryOptions: {
            enabled: !!userId,
        },
    });

    const user = userQuery.data?.data;
    const isPurchaseStatsLoading = withPurchaseStats && !!userId && userQuery.isLoading;

    const isUserLinked = userId !== undefined && userId !== null && userId !== "";

    const clearLinkedFields = useCallback(() => {
        form?.setFieldsValue({
            user_id: undefined,
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            identity_document: undefined,
        });

        if (withPurchaseStats) {
            setPurchaseStats(EMPTY_PURCHASE_STATS);
        }
    }, [form, withPurchaseStats]);

    useEffect(() => {
        if (!isUserLinked || !user) {
            if (withPurchaseStats) {
                setPurchaseStats(EMPTY_PURCHASE_STATS);
            }
            return;
        }

        form?.setFieldsValue({
            first_name: user.name ?? "",
            last_name: user.last_name ?? "",
            email: user.email ?? "",
            identity_document: user.identity_document ?? "",
        });

        if (withPurchaseStats) {
            setPurchaseStats(user.purchase_stats ?? EMPTY_PURCHASE_STATS);
        }
    }, [isUserLinked, user, form, withPurchaseStats]);

    return {
        isUserLinked,
        clearLinkedFields,
        linkedFieldNames: LINKED_USER_FIELDS,
        purchaseStats: withPurchaseStats ? purchaseStats : undefined,
        isPurchaseStatsLoading,
    };
};
