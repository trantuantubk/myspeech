import AudioRecorder from './AudioRecorder';
import { useState } from "react"

function App() {
    const [recordOption, setRecordOption] = useState("audio");
    //
    return (
        <>
            <h1>
                My Speech        
            </h1>
            <AudioRecorder />
        </>
    )
}
export default App;