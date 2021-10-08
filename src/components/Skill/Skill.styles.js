import styled, { css } from 'styled-components';

export const Box = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  ${({ responsive }) => responsive && css`
    @media (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;

export const Label = styled.div`
  display: inline-flex;
  padding: 4px 6px;
  border-radius: 4px;
  background-color: #E9EAEA;
  font-weight: bold;
  
  ${({ responsive }) => responsive && css`
    @media (max-width: 500px) {
      margin-bottom: 8px;
    }
  `}
`;

export const Description = styled.div`
  margin-left: 16px;
  
  ${({ responsive }) => responsive && css`
    @media (max-width: 500px) {
      margin-left: 6px;
    }
  `}
`;
