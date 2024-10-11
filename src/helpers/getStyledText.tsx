import { LinkIcon, Mail } from "lucide-react";
import { ReactNode } from "react";

export const getStyledText = (text: string | undefined, condensed: boolean): ReactNode[] => {
    if (!text) return [];

    const words = text.split(/\s+/);
    let emailCount = 0;
    let linkCount = 0;

    return words.map((word, index) => {
        let style: React.CSSProperties = {
            display: 'inline-block',
            marginRight: '4px',
            marginBottom: '4px',
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            hyphens: 'auto',
        };
        let content: ReactNode = word;

        if (/^@[^@]+$/.test(word)) {
            style = {
                ...style,
                backgroundColor: '#ADF0D9',
                color: '#07A873',
                borderRadius: '9999px',
                padding: '2px 6px',
                cursor: 'pointer'
            };
        } else if (/^#[^#]+$/.test(word)) {
            style = {
                ...style,
                backgroundColor: '#DBC7FF',
                color: '#702EE6',
                borderRadius: '9999px',
                padding: '2px 6px',
                cursor: 'pointer'
            };
        } else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(word)) {
            style = {
                ...style,
                backgroundColor: '#FFE6C7',
                color: '#F58E0A',
                borderRadius: '9999px',
                padding: '2px 6px',
                cursor: 'pointer'
            };
            emailCount++;
            if (condensed) {
                content = <><Mail size={14} className="inline mr-1" />Mail {emailCount}</>;
            }
        } else if (/https?:\/\/[^\s]+/.test(word) || /www.[^\s]+/.test(word)) {
            style = {
                ...style,
                backgroundColor: '#D6EBFF',
                color: '#007FFF',
                borderRadius: '9999px',
                padding: '2px 6px',
                cursor: 'pointer'
            };
            linkCount++;
            if (condensed) {
                content = <><LinkIcon size={14} className="inline mr-1" />Link {linkCount}</>;
            }
        }

        return (
            <span key={index} style={style}>
                {content}
            </span>
        );
    });
};