import React, {useCallback, useRef, useEffect, useState} from 'react';
import { Modal, Button } from 'vienna-ui';
import { Box, Image, Light, GlobalStyle } from './Card.styles';

const MODAL_HAS_OPENED = 'MODAL_HAS_OPENED';

export const Card = ({ imageSrc }) => {
    const [isMobile, setIsMobile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const cardRef = useRef();
    const flareRef = useRef();

    useEffect(() => {
        const hasDeviceMotionEvent = DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function';
        setIsMobile(hasDeviceMotionEvent);

        if (hasDeviceMotionEvent) {
            // setIsOpen(hasDeviceMotionEvent);
            setIsOpen(false);
        }
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (isMobile) {
            return;
        }

        const flare = flareRef.current;
        const card = cardRef.current;
        const { width: flareWidth, height: flareHeight } = flare.getBoundingClientRect();
        const { x: cardX, y: cardY, width: cardWidth, height: cardHeight } = card.getBoundingClientRect();
        const positionX = e.pageX - cardX;
        const positionY = e.pageY - cardY;
        flare.style.opacity = `50%`;

        flare.style.right = `${positionX - flareWidth / 2}px`;
        flare.style.bottom = `${positionY - flareHeight / 2}px`;

        const coefficientX = 40 / cardHeight;
        const baseXLine = cardY + cardHeight / 2;
        let rotateX;
        if (e.pageY < baseXLine) {
            rotateX = coefficientX * (baseXLine - e.pageY);
        } else {
            rotateX = -coefficientX * (e.pageY - baseXLine);
        }

        const coefficientY = 20 / cardWidth;
        const baseYLine = cardX + cardWidth / 2;
        let rotateY;
        if (e.pageX < baseYLine) {
            rotateY = coefficientY * (baseYLine - e.pageX);
        } else {
            rotateY = -coefficientY * (e.pageX - baseYLine);
        }

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, [isMobile]);

    const handleMouseOut = useCallback(() => {
        if (isMobile) {
            return;
        }

        const flare = flareRef.current;
        flare.style.opacity = '0';
    }, [isMobile]);

    const handleClickAccelerometer = useCallback(() => {
        if (!isMobile) {
            return;
        }

        setIsOpen(false);
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', (e) => {
                        const frontToBackDegrees = e.beta;
                        const leftToRightDegrees = e.gamma;

                        const card = cardRef.current;
                        card.style.transform = `rotateX(${(frontToBackDegrees - 20) / 3}deg) rotateY(${leftToRightDegrees / 3}deg) translateZ(-100px)`;
                    });
                }
            })
            .catch(console.error);
    }, [isMobile]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Layout>
                    <Modal.Head>
                        <Modal.Title>Konnichiwa 🇯🇵</Modal.Title>
                    </Modal.Head>
                    <Modal.Body>
                        Вам достался персонаж с интересной ролью.
                        Все как и в жизни не то, чем кажется с первого взгляда.
                        Внешность обманчива. Готовы начать?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            size="l"
                            design="outline"
                            onClick={handleClickAccelerometer}
                        >
                            Начинаем
                        </Button>
                    </Modal.Footer>
                </Modal.Layout>
            </Modal>
            <Box ref={cardRef} onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
                <Image src={imageSrc} alt='Герой' />
                <Light ref={flareRef} />
            </Box>
        </>
    );
}
