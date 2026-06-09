import { Input, Select, Space } from "antd";
import type { FormItemProps } from "antd";
import { Form } from "antd";
import { useEffect, useState, type ChangeEvent } from "react";
import {
    PHONE_AREA_CODE_OPTIONS,
    PHONE_AREA_CODES,
    combinePhoneNumber,
    getPhoneNumberRules,
    parsePhoneNumber,
    type PhoneAreaCode,
} from "@/lib/phone-number";

type PhoneNumberInputProps = {
    value?: string;
    onChange?: (value: string | undefined) => void;
    disabled?: boolean;
};

const PhoneNumberInput = ({ value, onChange, disabled = false }: PhoneNumberInputProps) => {
    const parsed = parsePhoneNumber(value);
    const [code, setCode] = useState<PhoneAreaCode>(parsed?.code ?? PHONE_AREA_CODES[0]);
    const [line, setLine] = useState(parsed?.line ?? "");

    useEffect(() => {
        const next = parsePhoneNumber(value);

        if (next) {
            setCode(next.code);
            setLine(next.line);
            return;
        }

        if (!value) {
            setCode(PHONE_AREA_CODES[0]);
            setLine("");
        }
    }, [value]);

    const emitValue = (nextCode: string, nextLine: string) => {
        if (nextLine.length === 7) {
            onChange?.(combinePhoneNumber(nextCode, nextLine));
            return;
        }

        onChange?.(undefined);
    };

    const handleCodeChange = (nextCode: PhoneAreaCode) => {
        setCode(nextCode);
        emitValue(nextCode, line);
    };

    const handleLineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextLine = event.target.value.replace(/\D/g, "").slice(0, 7);
        setLine(nextLine);
        emitValue(code, nextLine);
    };

    return (
        <Space.Compact style={{ width: "100%" }}>
            <Select
                value={code}
                options={PHONE_AREA_CODE_OPTIONS}
                onChange={handleCodeChange}
                disabled={disabled}
                style={{ width: "38%" }}
                popupMatchSelectWidth={120}
                placeholder="Código"
            />
            <Input
                value={line}
                onChange={handleLineChange}
                disabled={disabled}
                maxLength={7}
                inputMode="numeric"
                placeholder="1234567"
                style={{ width: "62%" }}
            />
        </Space.Compact>
    );
};

type PhoneNumberFieldProps = {
    name: string | (string | number)[];
    label: string;
    required?: boolean;
    disabled?: boolean;
    rules?: FormItemProps["rules"];
};

export const PhoneNumberField = ({
    name,
    label,
    required = false,
    disabled = false,
    rules,
}: PhoneNumberFieldProps) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules ?? getPhoneNumberRules(required)}
        >
            <PhoneNumberInput disabled={disabled} />
        </Form.Item>
    );
};
