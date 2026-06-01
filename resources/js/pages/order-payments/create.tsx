import { Create, useForm } from "@refinedev/antd";
import { OrderPaymentForm } from "./form";

export const OrderPaymentsCreate = () => {
    const { form, formProps, saveButtonProps } = useForm();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <OrderPaymentForm form={form} formProps={formProps} />
        </Create>
    );
};
