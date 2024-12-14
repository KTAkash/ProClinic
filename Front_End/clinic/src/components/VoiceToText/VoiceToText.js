import './Voicetotext.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";

const App = () => {
    const [textToCopy, setTextToCopy] = useState("");
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 2000000, // Keeps "Copied!" for 2 seconds
    });

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        // Update `textToCopy` whenever `transcript` changes
        setTextToCopy(transcript);
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    const handleClear = () => {
        resetTranscript();
        setTextToCopy("");
    };

    return (
        <>
           <div className="voice-to-text-container">
            <h2 className="title">Speech to Text Converter</h2>
            
            <div
                className="main-content"
                onClick={() => setTextToCopy(transcript)}
            >
                {transcript || "Click here after speaking to copy the text!"}
            </div>

            <div className="btn-container">
                <button onClick={setCopied} disabled={!textToCopy.trim()}>
                    {isCopied ? 'Copied!' : 'Copy to clipboard'}
                </button>
                <button onClick={startListening}>Start Listening</button>
                <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                <button onClick={handleClear}>Clear Words</button>
            </div>
        </div>
        </>
    );
};

export default App;