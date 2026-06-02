import type { FormInstance, UploadProps } from "antd";
import { Upload, message } from "antd";

const MAX_IMAGE_SIZE_MB = 2;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const readFileAsDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const validateImageFile = (file: File): boolean => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        message.error("Solo puedes subir archivos JPG, PNG, GIF o WebP.");
        return false;
    }

    const isWithinSizeLimit = file.size / 1024 / 1024 < MAX_IMAGE_SIZE_MB;
    if (!isWithinSizeLimit) {
        message.error(`La imagen debe pesar menos de ${MAX_IMAGE_SIZE_MB}MB.`);
        return false;
    }

    return true;
};

type CreateImageUploadHandlerOptions = {
    form?: FormInstance;
    fieldName?: string;
    onPreviewChange: (url: string) => void;
};

export const createImageUploadHandler = ({
    form,
    fieldName = "image",
    onPreviewChange,
}: CreateImageUploadHandlerOptions): UploadProps["beforeUpload"] => {
    return async (file) => {
        if (!validateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }

        try {
            const base64Url = await readFileAsDataUrl(file);
            onPreviewChange(base64Url);
            form?.setFieldsValue({ [fieldName]: base64Url });
        } catch {
            message.error("Error al procesar la imagen.");
        }

        return false;
    };
};
