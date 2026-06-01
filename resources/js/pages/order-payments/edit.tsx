import { Edit, useForm } from "@refinedev/antd";
import { OrderPaymentForm } from "./form";

export const OrderPaymentsEdit = () => {
    const { form, formProps, saveButtonProps } = useForm();

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <OrderPaymentForm form={form} formProps={formProps} />
        </Edit>
    );
};
