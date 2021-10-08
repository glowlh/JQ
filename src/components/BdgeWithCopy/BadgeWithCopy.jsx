import React from 'react';
import { Copy } from 'vienna.icons';
import { Box } from './BadgeWithCopy.styles'
import {Button} from "vienna-ui";

export const BadgeWithCopy = ({ children }) => {
    const handleCopy = () => {
        const textField = document.createElement('textarea');
        textField.innerText = children;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    }

    return (
        <Box>{children}
            <Button style={{ height: 'auto' }} square design='ghost'>
                <Copy size='s' style={{marginLeft: '8px'}} onClick={handleCopy} />
            </Button>
        </Box>
    )
}