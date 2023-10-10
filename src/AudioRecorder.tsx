import { useState, useRef } from "react";

const mimeType = "audio/webm";

const AudioRecorder = () =>  {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef<MediaStream | null>(null);
    const [recordingStatus, setRecordingStatus] = useState('inactive');
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audio, setAudio] = useState(null)

    const getMicrophonePermission = async() => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia ({
                    audio : true,
                    video : false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err : unknown) {
                if (err instanceof Error){
                    alert(err.message);
                }
            }
        } else {
            alert("The MediaRecorder API is not support in your browser")
        }
    };

    const startRecording = async() => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream);
        //set the MediaRecorder instance to the mediaRecorder ref
        if(mediaRecorder.current == null) {
            mediaRecorder.current = media;
        }
        
        mediaRecorder.current.start();
        let localAudioChunks : Blob[] = [];
        mediaRecorder.ondataavailable = (event) => {
            if(typeof event.data === "undefined") return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onStop
    };
    return (
        <div>
            <h2>Audio Recorder</h2>
            <main>
                <div className = "audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ): null}
                    {permission ? (
                        <button type="button">
                            Record
                        </button>
                    ): null}
                </div>
            </main>
        </div>
    );
}
export default AudioRecorder;