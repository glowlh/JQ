import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from './Audio.styles';

const WIDTH = 700;
const HEIGHT = 600;

export const Audio = () => {
  const canvasEl = useRef();
  const requestRef = React.useRef();
  const [audioData, setAudioData] = useState(new Uint8Array(0));

  let audioCtx;
  let canvasCtx;
  let analyser;
  let dataArray;
  let bufferLength;

  const getMedia = async (constraints) => {
    if (!navigator.mediaDevices.getUserMedia) {
      console.warn('Media Devices is not defined');
      return;
    }

    console.log('Media Devices is defined');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      handleSuccess(stream);
    } catch(err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    getMedia({ audio: true, video: false });
    canvasCtx = canvasEl.current.getContext('2d');
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const draw = () => {
    if (!analyser) {
      return;
    }

    requestRef.current = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    setAudioData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    let barWidth = (WIDTH / bufferLength) * 2.5 - 1;
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = 'rgb(' + ( barHeight + 100 ) + ',50,50)';
      canvasCtx.fillRect(x,HEIGHT - barHeight / 2, barWidth,barHeight/2);

      x += barWidth;
    }
  };

  const visualize = (stream) => {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    const source = audioCtx.createMediaStreamSource(stream);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);

    draw();
  };

  const handleSuccess = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    visualize(stream);

    mediaRecorder.ondataavailable = function(e) {
      console.dir(e.data);
    }
  };

  return (
    <div>
      Audio page
      <Canvas ref={canvasEl} />
    </div>
  )
};
