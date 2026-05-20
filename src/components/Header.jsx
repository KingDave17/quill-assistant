import logo from "../assets/screen.png";
import "./Header.css";
export default function Header({ toggleHistory, isHistoryOpen }) {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Quill logo" />
        <h1>Quill</h1>
      </div>
      <button
        className="historyToggleButton"
        onClick={toggleHistory}
        aria-controls="historySidebar"
        aria-expanded={isHistoryOpen}
        aria-label="Toggle history sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        History
      </button>
    </header>
  );
}
