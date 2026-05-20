import "./Loading.css";
import { useEffect } from "react";

export default function Loading(props) {

    useEffect(() => {
        if (props.handleSubmit && props.inputRef.current) {
            props.inputRef.current.scrollIntoView({ 
                behavior: "smooth"
            });
            props.inputRef.current.focus({ preventScroll: true });
        }
    }, [props.handleSubmit]);
    return (
        <section id="loading-section" ref={props.inputRef} aria-live="polite" aria-busy="true" tabIndex="-1" style={{ outline: "none" }}>
            <div className="loadingArea"> 
                <div className="loadingHeader">
                    <h1>Quill is writing...</h1>
                </div>
                
                <div className="skeletonContainer">
                    <div className="skeletonLine"></div>
                    <div className="skeletonLine"></div>
                    <div className="skeletonLine w-80"></div>
                    <div></div>
                    <div className="skeletonLine w-80"></div>
                    <div className="skeletonLine"></div>
                    <div className="skeletonLine w-60"></div>
                    <div className="skeletonLine w-80"></div>
                    <div></div>
                    <div className="skeletonLine w-60"></div>
                    <div className="skeletonLine w-60"></div>
                    <div className="skeletonLine w-80"></div>
                    <div className="skeletonLine"></div>
                    <div className="skeletonLine"></div>
                    <div></div>
                    <div className="skeletonLine w-60"></div>
                    <div className="skeletonLine w-80"></div>
                    <div className="skeletonLine w-80"></div>
                    <div className="skeletonLine w-60"></div>
                </div>
            </div>
        </section>
    )
}
