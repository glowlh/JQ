import styled, { css } from 'styled-components';

export const Row = styled.div`
  ${({ bottomGap }) => bottomGap && css`
    margin-bottom: ${bottomGap}px;
  ` }
`;

export const Img = styled.img`
  max-width: 100%;
  height: auto;
`;
