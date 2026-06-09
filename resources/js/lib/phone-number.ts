import type { FormItemProps } from "antd";

export const PHONE_AREA_CODES = ["0412", "0414", "0416", "0422", "0424", "0426"] as const;

export type PhoneAreaCode = (typeof PHONE_AREA_CODES)[number];

export const PHONE_AREA_CODE_OPTIONS = PHONE_AREA_CODES.map((code) => ({
    value: code,
    label: code,
}));

export const PHONE_NUMBER_PATTERN = /^(0412|0414|0416|0422|0424|0426)\d{7}$/;

export const PHONE_LINE_PATTERN = /^\d{7}$/;

export const parsePhoneNumber = (
    value?: string | null,
): { code: PhoneAreaCode; line: string } | null => {
    if (!value || !PHONE_NUMBER_PATTERN.test(value)) {
        return null;
    }

    return {
        code: value.slice(0, 4) as PhoneAreaCode,
        line: value.slice(4),
    };
};

export const combinePhoneNumber = (code: string, line: string): string => `${code}${line}`;

export const getPhoneNumberRules = (required = false): FormItemProps["rules"] => {
    const rules: NonNullable<FormItemProps["rules"]> = [];

    if (required) {
        rules.push({ required: true, message: "El número de teléfono es obligatorio" });
    }

    rules.push({
        validator: async (_, value) => {
            if (!value) {
                return required
                    ? Promise.reject(new Error("El número de teléfono es obligatorio"))
                    : Promise.resolve();
            }

            if (PHONE_NUMBER_PATTERN.test(String(value))) {
                return Promise.resolve();
            }

            return Promise.reject(
                new Error("Seleccione un código válido e ingrese exactamente 7 dígitos"),
            );
        },
    });

    return rules;
};
