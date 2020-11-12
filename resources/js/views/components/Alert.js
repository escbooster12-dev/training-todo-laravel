import React from "react";

const Alert = ({ header, error }) => {
    return (
        <>
            {error ? (
                <div className="ui icon message">
                    <i className="bullhorn icon"></i>
                    <div className="content">
                        <div className="header">{header}</div>
                        <p>{error}</p>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Alert;
