import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

export const Box = styled.div`
  width: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0px 20px 50px #ccc;
  transition: 0.1s;
  z-index: 1;
  transform: translateZ(-100px);

  @media (max-width: 420px) {
    width: calc(100% - 20px);
  }

  @media (max-width: 754px) {
    margin-top: -20px;
  }

  perspective: 800px;
  perspective-origin: center;
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const blink = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
`;

export const Light = styled.div`
  opacity: 0;
  transition: opacity 1s;
  width: 200px;
  height: 200px;
  position: absolute;
  //animation: ${blink} ease 5s infinite;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: blur(20px);
    border-radius: 70px;
    background-color: #fff;
    width: 150px;
    height: 150px;
  }
`;