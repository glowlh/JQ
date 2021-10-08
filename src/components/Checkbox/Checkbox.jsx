import React, { useState, useCallback, useEffect } from 'react';
import { Checkbox as DSCheckbox } from 'vienna-ui';

export const Checkbox = ({children, onChange, checked = false, ...rest}) => {
    const [checkedState, setChecked] = useState(checked);

    const handleCheck = useCallback(() => {
        setChecked(!checkedState);
        onChange(!checkedState);
    }, [checkedState]);

    useEffect(() => {
        setChecked(checked);
    }, [checked]);

    return (
        <DSCheckbox {...rest} checked={checkedState} onChange={handleCheck}>{children}</DSCheckbox>
    )
}
