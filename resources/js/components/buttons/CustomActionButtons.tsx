import React from "react";
import {
    ShowButton, ShowButtonProps,
    EditButton, EditButtonProps,
    DeleteButton, DeleteButtonProps,
    CreateButton, CreateButtonProps
} from "@refinedev/antd";
import { PlusOutlined } from "@ant-design/icons";

// Boton de Ver
export const CustomShowButton: React.FC<ShowButtonProps> = (props) => {
    return (
        <ShowButton
            type="primary"
            shape="circle"
            style={{ backgroundColor: '1677ff', borderColor: '1677ff', color: 'white', ...props.style }}
            hideText
            size="medium"
            {...props}
        />
    );
};

// Boton de Editar
export const CustomEditButton: React.FC<EditButtonProps> = (props) => {
    return (
        <EditButton
            type="primary"
            shape="circle"
            colorHover="#82FF82"
            style={{ backgroundColor: '#4FC450', borderColor: '#4FC450', color: 'white', ...props.style }}
            hideText
            size="medium"
            {...props}
        />
    );
};

// Boton de Eliminar
export const CustomDeleteButton: React.FC<DeleteButtonProps> = (props) => {
    return (
        <DeleteButton
            type="primary"
            shape="circle"
            danger
            hideText
            size="medium"
            {...props}
        />
    );
};

export const CustomCreateButton: React.FC<CreateButtonProps> = (props) => {
    return (
        <CreateButton
            icon={<PlusOutlined />}
            size="large"
            style={{ backgroundColor: '#1677ff', borderColor: '#1677ff', color: 'white', ...props.style }}
            children=""
            {...props}
        />
    );
};