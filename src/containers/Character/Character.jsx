import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Badge, Flex, Groups, H3, H5, ThemeProvider, Whitespace, Span} from 'vienna-ui';
import {WarningTrFilled} from 'vienna.icons';
import {Checkbox} from '../../components/Checkbox';
import {Card} from '../../components/';
import {Photo} from './Character.styles';
import {CHARACTER_NAME, CHARACTER_TASKS, CHARACTER_TOKEN} from '../constants/characters';
import { Baggage } from './Baggage';
import {useUser} from "../../controllers";

const checkboxTheme = {
    checkbox: {
        checked: {
            "background-color": "#57B6ED",
            "border-color": "#57B6ED",
            "color": "#000000"
        }
    }
};

export const CHARACTERS_LIST = {
    'de226972-9798-497c-b01f-be1902dc47ce': {
        file: 'Hostes.json',
        name: 'Елена Вячеславовна',
    },
    'c0f5f16e-b2a7-421e-9471-a45d3b13109d': {
        file: 'СostumePlay.json',
        name: 'Антон',
    },
    'e0f6fdda-46de-46bf-bccc-7451a0c0ca82': {
        file: 'Monk.json',
        name: 'Саша',
    },
    'ac6af918-9873-4b52-abe7-2e915593d9c7': {
        file: 'Mangaka.json',
        name: 'Женя',
    },
    'fc65e021-fda2-4cfd-b520-a3405e45af3b': {
        file: 'FromPast.json',
        name: 'Митя',
    },
    '0ccfe88e-7226-40ea-999a-93935476e850': {
        file: 'Clerk.json',
        name: 'Толя',
    },
    'fde72446-fbac-4a5c-841d-42539cf557ff': {
        file: 'Blogger.json',
        name: 'Максим',
    },
    '16039794-85ad-4112-86fa-86a67cb78cfd': {
        file: 'Policeman.json',
        name: 'Александр Ильич',
    },
    '714c75be-2dd0-46d4-a909-384f1cb9ee30': {
        file: 'Schoolchild.json',
        name: 'Надя',
    },
    '2f92a201-27fd-4bfc-a4f0-21dfe16c3878': {
        file: 'Geisha.json',
        name: 'Ира',
    },
    'e0b118e3-5ef7-41c0-a093-6db87baf7c4a': {
        file: 'Gardenman.json',
        name: 'Дима',
    },
    '6cf37f2c-e70d-4846-aaaa-fc01cc07bef8': {
        file: 'Idol.json',
        name: 'Аня',
    },
    '7c9c1144-d03e-4c65-a04f-457bd3557fef': {
        file: 'Bankman.json',
        name: 'TEST',
    }
};

export const Character = () => {
    const params = useParams();
    const [characterInfo, setCharacterInfo] = useState({});
    const [user] = useUser(params.id);

    useEffect(() => {
        const {id} = params;

        if (id) {
            localStorage.setItem(CHARACTER_TOKEN, id);
            import(`./data/${CHARACTERS_LIST[id].file}`)
                .then(({default: data}) => {
                    setCharacterInfo(data);
                    localStorage.setItem(CHARACTER_NAME, data.name);
                })
                .catch(err => console.dir(err));
        }
    }, []);

    const handleClickTask = useCallback((id) => (checked) => {
        if (!id) {
            return;
        }

        let tasks = localStorage.getItem(CHARACTER_TASKS) ? JSON.parse(localStorage.getItem(CHARACTER_TASKS)) : {};
        if (checked) {
            tasks = {...tasks, [id]: checked};
        } else if (tasks[id]) {
            delete tasks[id];
        }

        localStorage.setItem(CHARACTER_TASKS, JSON.stringify(tasks));
    }, [characterInfo])

    return (
        <div>
            {
                characterInfo &&
                <>
                    <Photo>
                        <Card imageSrc={characterInfo.avatar}/>
                    </Photo>

                    <Whitespace mb='30px'>
                        <H3>
                            {characterInfo.role} {characterInfo.name}
                        </H3>
                    </Whitespace>

                    {
                        user &&
                        <Whitespace mb='16px'>
                            <H5>Счет: {user.scoring}</H5>
                        </ Whitespace>
                    }

                    <Whitespace mb='16px'>
                        <H5>Возраст: {characterInfo.age}</H5>
                    </ Whitespace>

                    <Whitespace mb='16px'>
                        <H5>Пол: {characterInfo.sex}</H5>
                    </ Whitespace>

                    <Whitespace mb='16px'>
                        <H5>Место рождения: {characterInfo.birthPlace}</H5>
                    </ Whitespace>

                    <Baggage />

                    <Whitespace mb='24px'>
                        <H5 margin='xs'>Легенда: </H5>
                        {characterInfo.legend}
                    </ Whitespace>

                    <Whitespace mb='24px'>
                        <Flex alignItems='center' gap='s1'>
                            <Flex.Item style={{marginBottom: '4px'}}><WarningTrFilled color='#FFAD6C'
                                                                                      size='m'/></Flex.Item>
                            <Flex.Item><H5 margin='xs'>Второй план героя{characterInfo.realRole && ` / ${characterInfo.realRole}`}:</H5></Flex.Item>
                        </Flex>
                        {characterInfo.real}
                    </Whitespace>

                    <Whitespace mb='24px'>
                        <H5 margin='s'>Задания: </H5>
                        <Groups design='vertical'>
                            {
                                characterInfo.tasks &&
                                characterInfo.tasks.map((it, index) => (
                                    <ThemeProvider theme={checkboxTheme} key={index}>
                                        <Checkbox
                                            id={`${params.id}-${index}`}
                                            checked={
                                                localStorage.getItem(CHARACTER_TASKS)
                                                && !!JSON.parse(localStorage.getItem(CHARACTER_TASKS))[`${params.id}-${index}`]
                                            }
                                            onChange={handleClickTask(`${params.id}-${index}`)}>
                                            <Badge size='s' color='miami10'>{it.cost}</Badge> {it.title}
                                        </Checkbox>
                                    </ThemeProvider>
                                ))
                            }
                        </Groups>
                    </Whitespace>
                </>
            }
        </div>
    );
};
