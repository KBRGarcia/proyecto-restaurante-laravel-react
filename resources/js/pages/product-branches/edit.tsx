import { Edit, useForm } from "@refinedev/antd";
import { ProductBranchForm } from "./form";

export const ProductBranchesEdit = () => {
    const { form, formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <ProductBranchForm form={form} formProps={formProps} isEdit />
        </Edit>
    );
};
