import { useOne } from "@refinedev/core";
import { Form, type FormInstance } from "antd";
import { useCallback, useEffect } from "react";

const LINKED_USER_FIELDS = ["first_name", "last_name", "identity_document", "email"] as const;

type LinkedUser = {
    name?: string;
    last_name?: string;
    email?: string;
    identity_document?: string | null;
};

type UseLinkedUserProfileFieldsOptions = {
    form?: FormInstance;
};

export const useLinkedUserProfileFields = ({ form }: UseLinkedUserProfileFieldsOptions) => {
    const userId = Form.useWatch("user_id", form);

    const { query: userQuery } = useOne<LinkedUser>({
        resource: "users",
        id: userId ?? "",
        queryOptions: {
            enabled: !!userId,
        },
    });

    const user = userQuery.data?.data;

    const isUserLinked = userId !== undefined && userId !== null && userId !== "";

    const clearLinkedFields = useCallback(() => {
        form?.setFieldsValue({
            user_id: undefined,
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            identity_document: undefined,
        });
    }, [form]);

    useEffect(() => {
        if (!isUserLinked || !user) {
            return;
        }

        form?.setFieldsValue({
            first_name: user.name ?? "",
            last_name: user.last_name ?? "",
            email: user.email ?? "",
            identity_document: user.identity_document ?? "",
        });
    }, [isUserLinked, user, form]);

    return {
        isUserLinked,
        clearLinkedFields,
        linkedFieldNames: LINKED_USER_FIELDS,
    };
};
