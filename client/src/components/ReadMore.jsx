import { useState } from "react";

const ReadMore = ({ text, limit = 150 }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = text.length > limit;
    const displayText = expanded || !isLong ? text : text.slice(0, limit) + "...";

    return (
        <span>
            <span>{displayText}</span>
            {isLong && (
                <button 
                className="ml-5 text-blue-800"
                onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "see less" : "see more"}
                </button>
            )}
        </span>
    );
};

export default ReadMore;