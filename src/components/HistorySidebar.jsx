import "./HistorySidebar.css";
import { useEffect, useRef } from "react";

export default function HistorySidebar({ history, isOpen, closeSidebar, loadHistoryItem }) {
    const activeElementBeforeOpen = useRef(null);

    // Close on Escape key and manage focus
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape" && isOpen) {
                closeSidebar();
            }
        };
        document.addEventListener("keydown", handleKey);

        if (isOpen) {
            activeElementBeforeOpen.current = document.activeElement;
            const closeBtn = document.querySelector("#historySidebar .closeButton");
            if (closeBtn) {
                setTimeout(() => closeBtn.focus(), 100);
            }
        } else {
            if (activeElementBeforeOpen.current) {
                activeElementBeforeOpen.current.focus();
                activeElementBeforeOpen.current = null;
            }
        }

        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, closeSidebar]);

    const handleItemActivate = (item) => {
        loadHistoryItem(item);
    };

    const onKeyDownItem = (e, item) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleItemActivate(item);
        }
    };

    return (
        <>
            {isOpen && <div className="sidebarOverlay" onClick={closeSidebar} aria-label="Close history sidebar" />}
            <aside
                id="historySidebar"
                className={`historySidebar ${isOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="historySidebarTitle"
            >
                <div className="sidebarHeader">
                    <h2 id="historySidebarTitle">History</h2>
                    <button className="closeButton" onClick={closeSidebar} aria-label="Close history sidebar">&times;</button>
                </div>
                <div className="historyList">
                    {history.length === 0 ? (
                        <p className="emptyHistory">No history yet. Start generating!</p>
                    ) : (
                        history.map((item) => (
                            <div
                                key={item.id}
                                className="historyItem"
                                role="button"
                                tabIndex="0"
                                onClick={() => handleItemActivate(item)}
                                onKeyDown={(e) => onKeyDownItem(e, item)}
                                aria-label={`Load history item from ${item.date}`}
                            >
                                <span className="historyDate">{item.date}</span>
                                <p className="historyPrompt">{item.prompt}</p>
                            </div>
                        ))
                    )}
                </div>
            </aside>
        </>
    );
}
