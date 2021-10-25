import React, {useCallback, useState, useMemo, useEffect} from "react";
import {Badge, Button, Flex, H5, Link, Modal, Whitespace} from "vienna-ui";
import {DocSend} from "vienna.icons";
import NativeSelect from '@mui/material/NativeSelect';
import {BadgeWithCopy} from "../../../components/BdgeWithCopy";
import {useParams} from "react-router-dom";
import {useItems, useUsersOnce, updateItem} from "../../../controllers";
import {ModalContent} from "./Baggage.styles";

export const Baggage = () => {
    const params = useParams();
    const [items] = useItems(params.id);
    const [users] = useUsersOnce(params.id);
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState();
    const [nextOwnerId, setNextOwnerId] = useState();

    const handleOpen = useCallback((item) => () => {
        setIsOpen(true);
        setActiveItem(item);
    }, [])

    useEffect(() => {
        if (isOpen && users[0]) {
            setNextOwnerId(users[0].id);
        }
    }, [isOpen, users]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setActiveItem(undefined);
    }, [])

    const baggage = useMemo(() => {
        let content = null;

        if (items.length) {
            content = (
                <Flex gap='s2' wrap='wrap'>
                    {items.map((item) => {
                        const trade = <DocSend size='s' onClick={handleOpen(item)}/>;
                        if (item.type === 'text') {
                            return (
                                <Flex.Item key={item.id} id={item.id} wrapLine><Badge
                                    color='seattle10'>{item.name} {trade}</Badge></Flex.Item>
                            );
                        } else if (item.type === 'link') {
                            return (
                                <Flex.Item key={item.id} id={item.id} wrapLine>
                                    <Badge color='seattle10'>
                                        <Link href={item.link} target='_blank'>
                                            {item.name}
                                        </Link>{' '}
                                        {trade}
                                    </Badge>
                                </Flex.Item>
                            )
                        } else if (item.type === 'copy') {
                            return (
                                <Flex.Item key={item.id} id={item.id} wrapLine>
                                    <BadgeWithCopy copy={item.name}>
                                        <Whitespace mr='8px'>{item.name}</Whitespace>
                                        {trade}
                                    </BadgeWithCopy>
                                </Flex.Item>
                            );
                        }
                    })}
                </Flex>
            );
        } else {
            content = (<Badge color='nice30'>Предметов нет</Badge>);
        }

        return (<Whitespace mb='24px'>
            <H5 margin='xs'>Инвентарь: </H5>
            <Whitespace>
                {content}
            </Whitespace>
        </Whitespace>);
    }, [items]);

    const handleClickTrade = useCallback((userId) => {
        updateItem(activeItem.id, {userId: nextOwnerId});
        setIsOpen(false);
    }, [activeItem, nextOwnerId]);

    const handleChangeOwner = useCallback((e) => {
        const userId = e.target.value;
        setNextOwnerId(userId);
    }, []);

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <Modal.Layout>
                    <Modal.Head>
                        <Modal.Title>Передать предмет 🇯🇵</Modal.Title>
                    </Modal.Head>
                    <Modal.Body>
                        <ModalContent>
                            Кому вы хотите передать <b>{activeItem && activeItem.name}</b>?
                        </ModalContent>
                        <Whitespace mt='20px'>
                            <NativeSelect defaultValue={users[0] && users[0].id} onChange={handleChangeOwner}>
                                {
                                    users && users.map((user) => (
                                        <option value={user.id}>{user.role} {user.name}</option>
                                    ))
                                }
                            </NativeSelect>
                        </Whitespace>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            size="l"
                            design="outline"
                            onClick={handleClickTrade}
                        >
                            Передать
                        </Button>
                    </Modal.Footer>
                </Modal.Layout>
            </Modal>
            {baggage}
        </>
    );
}