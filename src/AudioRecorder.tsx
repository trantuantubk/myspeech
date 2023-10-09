import { useState, useRef } from "react";
const AudioRecorder = () =>  {
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream>();

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