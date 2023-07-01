import React from "react";
interface Props {
    text: string;
    action: any;
    style: string
}

const Button = ({ text, action, style }: Props) => {
    return (
        <button onClick={action} className={style}>{text}</button>
    )
}

export default Button;