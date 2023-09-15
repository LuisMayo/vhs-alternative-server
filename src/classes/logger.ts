export class Logger {
    private static readonly maxLogLines = 1000;
    private static nextLogIndex = 0;
    private static logs: {msg: string, msgEnd?: string, timestamp: number}[] = [];
    static log(msg: string, msgEnd?: string) {
        console.log(msg, msgEnd);
        Logger.logs[Logger.nextLogIndex] = {msg, msgEnd, timestamp: Date.now()};
        Logger.nextLogIndex = (Logger.nextLogIndex + 1) % Logger.maxLogLines;
    }

    static getLogListHtml() {
        let html = '<div>\n';
        let startIndex: number;
        let endIndex: number;
        if (Logger.isLogFull()) {
            startIndex = endIndex = Logger.nextLogIndex;
        } else {
            startIndex = 0;
            endIndex = Logger.nextLogIndex;
        }
        for (let i = startIndex; i < endIndex; i = (i + 1) % Logger.maxLogLines) {
            const element = Logger.logs[i];
            html += `<span>${new Date(element.timestamp).toLocaleString('es-ES')} - ${element.msg}<span style="color: orange"> ${element.msgEnd}</span></span>\n`;
        }
        html += '</div>';
        return html;
    }

    private static isLogFull() {
        return Logger.logs[Logger.nextLogIndex] != null;
    }
}