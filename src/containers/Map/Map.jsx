import React, {useMemo} from 'react';
import {Forward, Copy} from 'vienna.icons';
import {Whitespace, Badge, Link, Button} from 'vienna-ui';
import {CHARACTERS_LIST} from "../Character/Character";

export const Map = () => {
    const handleCopy = (link) => () => {
        const textField = document.createElement('textarea');
        textField.innerText = link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    }

    const characters = useMemo(() => {
        return Object.keys(CHARACTERS_LIST).map((id) => {
            const {name} = CHARACTERS_LIST[id];
            return (
                <Whitespace key={id} mb='16px' style={{display: 'flex', alignItems: 'center'}}>
                    <Link href={`/character/${id}`} target='_blank'>
                        <Badge>{name} <Forward/></Badge>
                    </Link>{' '}
                    <Button square design='ghost'>
                        <Copy style={{marginLeft: '8px'}} onClick={handleCopy(`https://japanparty.fun/character/${id}`)}/>
                    </Button>
                </Whitespace>
            )
        })
    }, []);

    return (
        <>
            {characters}
        </>
    );
}
