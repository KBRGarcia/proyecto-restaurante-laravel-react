import { UploadOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { Avatar, Button, Col, Form, Input, Row, Upload } from "antd";
import type { ReactNode } from "react";
import { createImageUploadHandler } from "@/lib/image-upload";

type ImageUploadFieldProps = {
    form?: FormInstance;
    fieldName?: string;
    label: string;
    previewUrl: string | null;
    onPreviewChange: (url: string) => void;
    uploadLabel?: string;
    icon: ReactNode;
    shape?: "circle" | "square";
    colSpan?: number;
};

export const ImageUploadField = ({
    form,
    fieldName = "image",
    label,
    previewUrl,
    onPreviewChange,
    uploadLabel = "Subir Imagen",
    icon,
    shape = "square",
    colSpan = 6,
}: ImageUploadFieldProps) => {
    const handleBeforeUpload = createImageUploadHandler({
        form,
        fieldName,
        onPreviewChange,
    });

    return (
        <Col xs={24} md={colSpan} style={{ textAlign: "center", marginBottom: "20px" }}>
            <Form.Item name={fieldName} hidden>
                <Input type="hidden" />
            </Form.Item>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                <span style={{ fontWeight: 500 }}>{label}</span>
                <Avatar size={100} shape={shape} src={previewUrl} icon={icon} />
                <Upload
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />} size="small">
                        {uploadLabel}
                    </Button>
                </Upload>
            </div>
        </Col>
    );
};
