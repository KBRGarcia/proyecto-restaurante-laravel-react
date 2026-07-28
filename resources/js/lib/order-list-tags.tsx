import { Tag } from 'antd';

export const getOrderStatusTag = (status: string) => {
    switch (status) {
        case 'pending':
            return <Tag color="orange">Pendiente</Tag>;
        case 'preparing':
            return <Tag color="blue">En Cocina</Tag>;
        case 'ready':
            return <Tag color="green">Listo</Tag>;
        case 'delivered':
            return <Tag color="cyan">Entregado</Tag>;
        case 'canceled':
            return <Tag color="red">Cancelado</Tag>;
        case 'on_the_way':
            return <Tag color="geekblue">En Camino</Tag>;
        default:
            return <Tag>{status}</Tag>;
    }
};

export const getOrderServiceTypeTag = (type?: string) =>
    type === 'delivery' ? (
        <Tag color="purple">Delivery</Tag>
    ) : (
        <Tag color="magenta">Retiro en local</Tag>
    );
