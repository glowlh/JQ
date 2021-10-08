import styled from 'styled-components';
import { Link as RRDLink } from 'react-router-dom';

export const Box = styled.div`
  width: 100%;
  font-size: 16px;
  
  * {
    box-sizing: border-box;
  }
`;

export const Content = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
`;

export const Header = styled.div`
  width: 100%;
  position: fixed;
  height: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
  z-index: 2;
  perspective: 800px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
`;

export const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Link = styled(RRDLink)`
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  
  :hover {
    color: #45A3B2;
  }
  
  :active,
  :visited,
  :focus {
    color: #000;
  }
`;

export const Page = styled.div`
  padding-top: 70px;
`;
