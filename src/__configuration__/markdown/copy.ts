// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function fallbackCopyTextToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);
}
export function copyTextToClipboard(text: string): void {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text);
}
