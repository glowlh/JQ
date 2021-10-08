import styled from 'styled-components';

export const TitleWrapper = styled.div`
  display: inline-flex;
  position: relative;
  margin-left: 2px;
  margin-bottom: 24px;

  ::after {
    content: '';
    height: 24px;
    width: 24px;
    border-radius: 50%;
    display: block;
    position: absolute;
    background-color: #E02B26;
    bottom: 0px;
    left: -15px;
    z-index: -1;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 28px;
`;

export const Chapter = styled.div`
  margin-bottom: 24px;
  line-height: 1.5;
`;
