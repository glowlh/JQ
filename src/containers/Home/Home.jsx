import React, {useMemo, useEffect, useState} from 'react';
import { Whitespace, H2 } from 'vienna-ui';
import {StoryBox, StoryBoxContent, StoryBoxImage} from "./Home.styles";
import {Img, Row} from '../../assets/block.styles';
import {TitleWrapper, Title, Chapter} from '../../assets/text.styles';
import {CHARACTERS_LIST} from "../Character/Character";

export const Home = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const promises = [];
        const TEST_ID = '7c9c1144-d03e-4c65-a04f-457bd3557fef';
        Object.keys(CHARACTERS_LIST).forEach((id) => {
            if (id !== TEST_ID) {
                const fineName = CHARACTERS_LIST[id].file;
                promises.push(import(`../Character/data/${fineName}`));
            }
        })

        Promise.all(promises).then((values) => {
            setList(values);
        })
    }, []);

    const characters = useMemo(() => {
        return list.map((info, index) => (
            <Whitespace mb='32px' key={index}>
                <div>
                    <TitleWrapper>
                        <Title>
                            {info.role} {info.name}
                        </Title>
                    </TitleWrapper>
                </div>
                {info.legend}
            </Whitespace>
        ));
    }, [list]);

    return (
        <div>
            <StoryBox>
                <StoryBoxImage>
                    <Img
                        src='https://cdn.dribbble.com/users/1061278/screenshots/13820872/media/96c40dfbe1b68d050905a60dde00bbab.png?compress=1&resize=1600x1200'
                        alt="Здесь была картинка. Упс..."/>
                </StoryBoxImage>
                <StoryBoxContent>
                    <H2 margin='l'>Предыстория</H2>
                    <Chapter>
                        Кем вы были в прошлой жизни? А кем переродитесь в следующей? Может будете <b>якудза</b>, <b>хакером</b>, <b>человеком из другого времени</b> или <b>богом Кондзин</b>? А может <b>ребенком императора</b>, <b>хикка</b> или <b>ниндзя</b>? А может быть <b>детективом по сверхъестественному</b> или <b>ученым</b>? Или может… слизью?
                    </Chapter>
                    <Chapter>
                        У Вселенной есть начало, но нет конца. – Безграничность.
                        У звёзд тоже есть начало, но они гибнут из-за собственной силы. – Ограниченность.
                        Мудрецы глупее всех на свете. История нам это доказала.
                        Рыба, живущая в океане, не знает о мире на суше. Будь она разумна, она бы также погибла.
                        Человек, превысивший скорость света – это ещё больший абсурд, чем рыба, начавшая жить на суше.
                        Назовём это последним предупреждением бога для тех, кто ещё сопротивляется.
                        Всё происходящее – случайность. Но эта случайность предопределена волей мира.
                    </Chapter>
                    <Chapter>
                        Неважно, как незначительно выглядит что-то, ведь оно может стать причиной больших перемен в будущем.
                        Ты знаешь, что такое эффект бабочки? Если нет – узнай. Пойми, насколько требуется быть осмотрительным.
                        Просто подумай об этом. Восприятие обычного человека ограничено на 99%. Люди – гораздо более глупые существа, чем они сами думают. Они не обращают внимания на то происходящее, что стало частью их обычной жизни. А если и замечают, то сразу забывают об этом. Или даже сам мозг не обрабатывает эту информацию.
                    </Chapter>
                    <Chapter>
                        С вами произошло что-то невероятное...
                        Но с другой стороны, если задуматься, — ничего странного.
                        Возможно, это полностью перевернёт ваши жизни.
                        Хоть толком ничего и не изменилось.
                        Очень-очень необычное и в то же время заурядное.
                        Из музеев крадут драгоценности, люди исчезают из семей и из своих времен, крадут данные, продают незаконные вещи, охотятся на других людей или просто смеются в стороне над всем происходящем.
                        Это происходит здесь, в Токио 2021...
                    </Chapter>

                    <H2 margin='l'>Жители города</H2>
                    <Row bottomGap={32}>
                        {characters}
                    </Row>
                </StoryBoxContent>
            </StoryBox>
        </div>
    );
};
