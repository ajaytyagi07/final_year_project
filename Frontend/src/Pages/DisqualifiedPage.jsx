import React from "react";
import "./DisqualifiedPage.css";

const DisqualifiedPage = () => {
    return (
        <div className="container">
            <div className="content">
                <h1 className="title">Your quiz has been submitted.</h1>
                <p className="message">You have been disqualified from the quiz.</p>
            </div>
        </div>
    );
};

export default DisqualifiedPage;