import React, {useRef, useCallback, useState} from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {useDispatch} from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
}

function WebcamCapture() {
    const dispatch = useDispatch();
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const history = useHistory();


    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc);
            setImage(imageSrc);
            dispatch(setCameraImage(imageSrc));
            history.push('/preview')
        },
        [webcamRef],
    )
    return (
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref ={ webcamRef}
                width={videoConstraints.width}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />
            <img src={image} alt=""/>
        </div>
    )
}

export default WebcamCapture
