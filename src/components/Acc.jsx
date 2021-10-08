import React from 'react';

const getAccel = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                console.log(permissionState);
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', (event) => {
                        const rotationDegrees = event.alpha;
                        const frontToBackDegrees = event.beta; // от себя к себе
                        const leftToRightDegrees = event.gamma; // влево/вправо
                        console.log(frontToBackDegrees, leftToRightDegrees, rotationDegrees);
                    });
                }
            })
            .catch(console.error);
    } else {
        console.log('x3')
    }
}

export const Acc = () => {
    return (
        <div className="App">
            <button onClick={getAccel}>Plug in acc</button>
            TEST
        </div>
    );
}

