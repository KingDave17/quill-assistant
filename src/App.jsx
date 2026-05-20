import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Loading from "./components/Loading";
import Output from "./components/Output";
import HistorySidebar from "./components/HistorySidebar";
import { generateContent } from "./ai";
import "./App.css";

export default function App() {
  const [selectedTone, setSelectedTone] = useState(null);
    const [selectedLength, setSelectedLength] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [content, setContent] = useState("");
    const [lastPrompt, setLastPrompt] = useState(""); 
    const inputRef = useRef(null); 
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("quillHistory");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("quillHistory", JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        if (content && inputRef.current) {
            inputRef.current.scrollIntoView({ 
                behavior: "smooth",
                block: "end"
            });
        }
    }, [content]);
    function handleSubmit(event){
        event.preventDefault();
        const formEl = event.currentTarget;
        const formData = new FormData(formEl)
        const inputBox = formData.get("inputBox");
        const format = formData.get("format");

        
        setError(null);
        setShowLoading(true);
        
         const prompt = `Write a ${selectedLength} ${format} about "${inputBox}" in a ${selectedTone} tone.`;
         setLastPrompt(prompt); 
         setSelectedTone(null)
      setSelectedLength(null)
      setText("");

    async function result() {
      try {
        const value = await generateContent(prompt);
        setContent(value);
        setHistory(prev => [
            { id: Date.now(), prompt: prompt, content: value, date: new Date().toLocaleString() },
            ...prev
        ]);
      } catch (err) {
        console.error(err);
        setError("Oops! Something went wrong while generating the text. Please try again.");
      } finally {
        setShowLoading(false);
      }
    }
    
    result();
    }

    async function handleRegenerate() {
        setContent(""); 
        setError(null);
        setShowLoading(true);
        
        try {
            const value = await generateContent(lastPrompt); 
            setContent(value);
            setHistory(prev => [
                { id: Date.now(), prompt: lastPrompt, content: value, date: new Date().toLocaleString() },
                ...prev
            ]);
        } catch (err) {
            console.error(err);
            setError("Oops! Something went wrong while regenerating the text. Please try again.");
        } finally {
            setShowLoading(false);
        }
    }

  function loadHistoryItem(item) {
      setContent(item.content);
      setLastPrompt(item.prompt);
      setError(null);
      setIsHistoryOpen(false);
      // Wait for the sidebar to close, then smoothly scroll to the output
      setTimeout(() => {
          if (inputRef.current) {
              inputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
              inputRef.current.focus({ preventScroll: true });
          }
      }, 300);
  }

  return (
    <div>
      <Header toggleHistory={() => setIsHistoryOpen(true)} isHistoryOpen={isHistoryOpen} />
      <HistorySidebar 
          history={history} 
          isOpen={isHistoryOpen} 
          closeSidebar={() => setIsHistoryOpen(false)} 
          loadHistoryItem={loadHistoryItem} 
      />
      {error && <div className="errorMessage">⚠️ {error}</div>}
      <Body handleSubmit={handleSubmit} setSelectedLength={setSelectedLength} setSelectedTone={setSelectedTone} selectedLength={selectedLength} selectedTone={selectedTone} text={text} setText={setText} />
      {showLoading && <Loading inputRef={inputRef} handleSubmit={handleSubmit} />}
      {content && <Output content={content} handleRegenerate={handleRegenerate} inputRef={inputRef} />}
    </div>
  )
}