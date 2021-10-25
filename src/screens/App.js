import React, {useEffect, useState} from 'react';
import {Route, Switch,} from 'react-router-dom';
import {Home as HomeIcon} from 'vienna.icons';
import {RoundIcon, Button, ThemeProvider} from 'vienna-ui';
import {Box, Content, Header, HeaderContent, HeaderItem, Link, Page} from './App.styles';

import {Home} from '../containers/Home/Home';
import {Map} from '../containers/Map/Map';
import {Character} from '../containers/Character/Character';
import {CHARACTER_TOKEN} from "../containers/constants/characters";

const RoundIconTheme = {
  roundIcon:
      {
        color:
            {
              sochi100: {
                "background-color": "rgb(224, 43, 38)",
                "color": "#FFFFFF"
              }
            }
      }
};

export const App = () => {
    const [characterToken, setCharacterToken] = useState();
    const [characterName, setCharacterName] = useState();

    useEffect(() => {
        const character = localStorage.getItem(CHARACTER_TOKEN);
        if (character) {
            setCharacterToken(character);
        }

        const characterName = localStorage.getItem('CHARACTER_NAME')
        if (characterName) {
            setCharacterName(characterName[0]);
        }
    }, []);

    return (
        <Box>
            <Header>
                <HeaderContent>
                    <HeaderItem>
                        <Button square design='ghost' href='/'>
                            <HomeIcon size='l'/>
                        </Button>
                    </HeaderItem>
                    {
                        characterToken && characterName &&
                        <HeaderItem>
                            <Link to={`/character/${characterToken}`}>
                                <ThemeProvider theme={RoundIconTheme}>
                                    <RoundIcon size='xs' color='sochi100'>{characterName}</RoundIcon>
                                </ThemeProvider>
                            </Link>
                        </HeaderItem>
                    }
                </HeaderContent>
            </Header>

            <Content>
                <Page>
                    <Switch>
                        <Route path='/secretPageJQ'><Map/></Route>
                        <Route path='/character/:id'><Character/></Route>
                        <Route path='/'><Home/></Route>
                    </Switch>
                </Page>
            </Content>
        </Box>
    );
};

export default App;
