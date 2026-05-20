
import { clsx } from "clsx";
import "./Body.css";

export default function Body({text, setText, handleSubmit, setSelectedLength, setSelectedTone, selectedLength, selectedTone}) {
    
    return (
        <main>
            <h1>Start a new draft</h1>
            <p className="upper">Describe what you need, and Quill will generate a starting point.</p>
            <form onSubmit={handleSubmit} className="promptArea" method="post">
                <div className="inputArea">
                    <label htmlFor="inputBox" className="visuallyHidden">Prompt</label>
                    <p>What do you want to write about?</p> 
                    <textarea 
                        value={text} 
                        onChange={(event) => setText(event.currentTarget.value)} 
                        className="inputBox" 
                        name="inputBox" 
                        id="inputBox" 
                        cols="30" 
                        rows="10"  
                        placeholder="e.g. A blog intro about the future of sustainable energy"
                        aria-required="true"
                    ></textarea>
                </div>
                <div className="selections">
                    <div className="toneSelector">
                        <p>Tone</p>
                        <div className="tonePills">
                            {["professional", "casual", "creative", "persuasive", "friendly", "compassionate"].map(tone => (
                                <button
                                    key={tone}
                                    type="button"
                                    className={clsx("toneButton", selectedTone === tone && "active")}
                                    onClick={() => setSelectedTone(tone)}
                                    value={tone}
                                    id={tone}
                                    aria-pressed={selectedTone === tone}
                                >
                                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="formatArea">
                        <label htmlFor="format" className="visuallyHidden">Format</label>
                        <div className="formatSelector">
                            <p>Format</p>
                            <select name="format" id="format" aria-required="true">
                                <option value="blog-intro">Blog Intro</option>
                                <option value="social-caption">Social Caption</option>
                                <option value="email">Email</option>
                                <option value="cover-letter">Cover Letter</option>
                                <option value="essay">Essay</option>
                                <option value="story">Story</option>
                                <option value="speech">Speech</option>
                                <option value="newsletter">Newsletter</option>
                                <option value="assignment">Assignment</option>
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div className="generateButton">
                    <div className="toneSelector">
                        <p>Length</p>
                        <div className="lengthPills">
                            {["short", "medium", "long"].map(length => (
                                <button
                                    key={length}
                                    type="button"
                                    className={clsx("lengthButton", selectedLength === length && "selected")}
                                    onClick={() => setSelectedLength(length)}
                                    value={length}
                                    id={length}
                                    aria-pressed={selectedLength === length}
                                >
                                    {length.charAt(0).toUpperCase() + length.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button disabled={!text || !selectedTone || !selectedLength} className="actualGenerate">✦ Generate</button>
                </div>
                

            </form>
        </main>
    )
}