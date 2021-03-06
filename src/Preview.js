import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import "./Preview.css";
import {useHistory} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { AttachFile, Create, Crop, MusicNote, TextFields, Timer, Send } from '@material-ui/icons';
import {v4 as uuid} from 'uuid';
import {db, storage} from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage());
    }
    
    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");
        uploadTask.on('state_changed', null, (error) => {
            // Error 
            console.log(error);
        }, () => {
            // Complete
            storage.ref('posts').child(id).getDownloadURL().then(url => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: 'Wei',
                    read: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                history.replace('/chats')
            })
        })
    }

    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview__close"/>
            <div className="preview__toolbarRight">
                <TextFields/>
                <Create/>
                <MusicNote/>
                <AttachFile/>
                <Crop/>
                <Timer/>
            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <Send fontSize="small" className="preview__sendIcon"/>
            </div>
        </div>
    )
}

export default Preview
