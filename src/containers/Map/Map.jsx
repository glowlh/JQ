import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {Forward, Copy} from 'vienna.icons';
import {Whitespace, Badge, Link, Button, Card, P, Flex} from 'vienna-ui';
import NativeSelect from '@mui/material/NativeSelect';
import {CHARACTERS_LIST} from "../Character/Character";
import {updateUserScoring, useUsers} from "../../controllers";

export const Map = () => {
    const [hasLoadedUsers, setHasLoadedUsers] = useState(false);
    const [activeUser, setActiveUser] = useState();
    const [users] = useUsers();

    const handleChangeActiveUser = useCallback((e) => {
        const userId = e.target.value;
        const nextActiveUser = users.find((user) => userId === user.id);
        setActiveUser(nextActiveUser);
    }, [users]);

    useEffect(() => {
        if (Array.isArray(users) && users.length !== 0 && !hasLoadedUsers) {
            setActiveUser(users[0]);
            setHasLoadedUsers(true);
        }
    }, [users]);

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
            const user = users && users.length && users.find((item) => item.id === id);
            let scoring = 0;
            if (user) {
                scoring = user.scoring;
            }

            return (
                <Whitespace key={id} mb='16px' style={{display: 'flex', alignItems: 'center'}}>
                    <Whitespace mr='8px'>
                        <Link href={`/character/${id}`} target='_blank'>
                            <Badge>{name} <Forward/></Badge>
                        </Link>
                    </Whitespace>
                    Счет: {scoring}
                    <Button square design='ghost'>
                        <Copy style={{marginLeft: '8px'}} onClick={handleCopy(`https://japanparty.fun/character/${id}`)}/>
                    </Button>
                </Whitespace>
            )
        })
    }, [users]);

    const handleIncreaseScoring = (value) => () => {
        if (!activeUser) {
            return;
        }

        const nextScoring = activeUser.scoring + value;
        updateUserScoring(activeUser.id, { scoring: nextScoring });
        setActiveUser({ ...activeUser, scoring: nextScoring });
    }

    const handleDecreaseScoring = (value) => () => {
        if (!activeUser) {
            return;
        }

        const nextScoring = activeUser.scoring - value;

        if (nextScoring >= 0) {
            updateUserScoring(activeUser.id, { scoring: nextScoring });
            setActiveUser({ ...activeUser, scoring: nextScoring });
        }
    }

    return (
        <>
            <Whitespace mb='28px'>
                <Card style={{ maxWidth: '500px', width: '100%' }}>
                    <Whitespace mb='8px'>
                        <NativeSelect defaultValue={users[0] && users[0].id} onChange={handleChangeActiveUser}>
                            {
                                users && users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.realName} {user.role} {user.name}</option>
                                ))
                            }
                        </NativeSelect>
                    </Whitespace>
                    <P weight='bold' size='l' margin='s'>
                        Счет: {activeUser && activeUser.scoring}
                    </P>

                    <Flex gap='s2' wrap='wrap'>
                        <Flex.Item><Badge onClick={handleDecreaseScoring(10)} color='nice30'>-10</Badge></Flex.Item>
                        <Flex.Item><Badge onClick={handleDecreaseScoring(5)} color='nice30'>-5</Badge></Flex.Item>
                        <Flex.Item><Badge onClick={handleDecreaseScoring(3)} color='nice30'>-3</Badge></Flex.Item>
                        <Flex.Item><Badge onClick={handleDecreaseScoring(1)} color='nice30'>-1</Badge></Flex.Item>

                        <Flex.Item><Badge onClick={handleIncreaseScoring(1)} color='miami30'>+1</Badge></Flex.Item>
                        <Flex.Item><Badge onClick={handleIncreaseScoring(3)} color='miami30'>+3</Badge></Flex.Item>
                        <Flex.Item><Badge onClick={handleIncreaseScoring(5)} color='miami30'>+5</Badge></Flex.Item>
                        <Flex.Item><Badge onClick={handleIncreaseScoring(10)} color='miami30'>+10</Badge></Flex.Item>
                    </Flex>
                </Card>
            </Whitespace>
            {characters}
        </>
    );
}
