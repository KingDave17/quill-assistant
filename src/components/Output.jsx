import { useState, useEffect } from "react";
import "./Output.css";
import ReactMarkdown from "react-markdown";

export default function Output(props) {
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(props.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    useEffect(() => {
        if (props.content && props.inputRef.current) {
            props.inputRef.current.scrollIntoView({ 
                behavior: "smooth"
            });
            
            props.inputRef.current.focus({ preventScroll: true });
        }
    }, [props.content]);
    return (
        <section ref={props.inputRef} className="outputArea" aria-live="polite" tabIndex="-1" style={{ outline: "none" }} role="region" aria-label="Generated content">
            <h1>Quill's response:</h1>
            <div className="quillResponse">
                <ReactMarkdown>{props.content}</ReactMarkdown>
            </div>
            <div className="outputButtons">
                <button className="copyButton" onClick={handleCopy} >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {isCopied ? "Copied!" : "Copy to clipboard"}
                </button>
                <button className="regenerateButton" onClick={props.handleRegenerate} >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                    </svg>
                    Regenerate
                </button>
            </div>
        </section>
    )
}