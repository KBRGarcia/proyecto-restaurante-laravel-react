import { Create, useForm } from "@refinedev/antd";
import { ProductBranchForm } from "./form";

export const ProductBranchesCreate = () => {
    const { form, formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <ProductBranchForm form={form} formProps={formProps} />
        </Create>
    );
};
