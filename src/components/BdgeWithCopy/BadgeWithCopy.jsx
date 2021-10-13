import React from 'react';
import { Copy } from 'vienna.icons';
import { Box } from './BadgeWithCopy.styles'
import {Button} from "vienna-ui";

export const BadgeWithCopy = ({ children, copy }) => {
    const handleCopy = () => {
        const textField = document.createElement('textarea');
        textField.innerText = copy;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    }

    return (
        <Box>
            {children}
            <Copy size='s' style={{marginLeft: '8px'}} onClick={handleCopy} />
        </Box>
    )
}