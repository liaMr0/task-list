import React, { useRef, useState, useEffect } from "react";

const CanvasInput: React.FC<{
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    placeholder: string;
}> = ({ value, onChange, onFocus, placeholder }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (inputRef.current) {
            setScrollPosition(inputRef.current.scrollLeft);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleScroll = () => {
        if (inputRef.current) {
            setScrollPosition(inputRef.current.scrollLeft);
        }
    };

    const getStyledText = (text: string) => {
        if (!text) return <span style={{ color: '#999' }}>{placeholder}</span>;

        const words = text.split(' ');
        return words.map((word, index) => {
            let style = {};
            if (/^@[^@]+$/.test(word)) style = { color: '#07A873' };
            else if (/^#[^#]+$/.test(word)) style = { color: '#702EE6' };
            else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(word)) style = { color: '#F58E0A' };
            else if (/https?:\/\/[^\s]+/.test(word) || /www.[^\s]+/.test(word)) style = { color: '#007FFF' };
            return <span key={index} style={style}>{word}{index < words.length - 1 ? ' ' : ''}</span>;
        });
    };

    return (
        <div ref={containerRef} className="relative w-full overflow-hidden">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={onFocus}
                onScroll={handleScroll}
                className="w-full px-2 py-1 bg-transparent focus:outline-none text-transparent"
                style={{ caretColor: 'black' }}
            />
            <div
                className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none px-2 py-1 whitespace-nowrap"
                style={{
                    transform: `translateX(-${scrollPosition}px)`,
                    width: 'max-content'
                }}
            >
                {getStyledText(value)}
            </div>
        </div>
    );
};

export default CanvasInput;