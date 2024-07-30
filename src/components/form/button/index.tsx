import * as React from "react";

export type ButtonSizeType = 'sm' | 'lg' | 'md' | undefined;
export type ButtonBorderColor = 'main' | 'submain' | 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success' | 'white' | 'gray' | undefined;
export type ButtonBorderVariant = 'rounded-lg' | 'rounded-full' | undefined;
export type ButtoncolorType = 'main' | 'submain' | 'primary' | 'secondary' | 'info' | 'warning' | 'danger' | 'success' | 'white' | 'transparent' | undefined;
export type ButtonTextColor = 'main' | 'submain' | 'gray' | 'default' | undefined;
export declare interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	disabled?: boolean;
    textColor?: ButtonTextColor; 
	size?: ButtonSizeType;
	color?: ButtoncolorType;
    borderVariant?: ButtonBorderVariant;
    borderColor?: ButtonBorderColor
}

function getTextColor(textCol: ButtonTextColor): string {
    switch (textCol) {
        case 'main':
            return `text-main`
        case 'submain':
            return `text-submain`
        case 'gray':
            return `text-gray-600`
        case 'default':
            return `text-white`
        default:
            return `text-white`
    }
}

function getColor(colorType: ButtoncolorType): string {
    switch(colorType){
        case "main":
            return `bg-main`
        case "submain":
            return `bg-submain`
        case "danger":
            return `bg-red-600`;
        case "info":
            return `bg-info`;
        case "primary":
            return `bg-primary`;
        case "warning":
            return `bg-warning`;
        case "secondary":
            return `bg-secondary`;
        case "white":
            return `bg-white`;
        case "success" :
            return `bg-green-800`;
        case "transparent" :
            return `bg-transparent`;
        default:
            return `bg-primary`
    }
}

function getBorderColor(colorType: ButtonBorderColor): string {
    switch(colorType){
        case "main":
            return `border-main`
        case "submain":
            return `border-submain`
        case "danger":
            return `border-danger`;
        case "info":
            return `border-info`;
        case "primary":
            return `border-primary`;
        case "warning":
            return `border-warning`;
        case "secondary":
            return `border-secondary`;
        case "white":
            return `border-white`;
        case "success" :
            return `border-success`;
        case "gray" :
            return `border-gray-500`;
        default:
            return ``
    }
}

function getSize(size: ButtonSizeType): string {
    switch(size){
        case "sm":
            return "py-[4px]";
        case "lg":
            return "py-[9px]";
        case "md":
            return "py-[6px]";
        default:
            return "py-[6px]"
    }
}

export default function Button (_props: ButtonProps): JSX.Element {
    let props = { ..._props };
    if (props.size === undefined) props.size = "md";

    props.className = `
        ${props.color ? getColor(props.color) : ''} ${getSize(props.size)} ${props.borderColor ? `border-[1px] ` + getBorderColor(props.borderColor) : ''}
        focus:outline-none
        text-[10pt] px-3
        ${getTextColor(props.textColor)} rounded mr-2 ${_props.className? _props.className:''} ${_props.borderVariant?_props.borderVariant:''} 
        `
    delete props.textColor
    delete props.borderColor
    delete props.borderVariant
    return <button type="button" {...props}>{props.children}</button>;
}
