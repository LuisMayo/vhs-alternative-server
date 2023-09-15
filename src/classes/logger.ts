export class Logger {
    private static readonly maxLogLines = 1001;
    private static nextLogIndex = 0;
    private static logs: {msg: string, msgEnd?: string, timestamp: number}[] = [];
    static log(msg: string, msgEnd?: string) {
        console.log(msg, msgEnd);
        Logger.logs[Logger.nextLogIndex] = {msg, msgEnd, timestamp: Date.now()};
        Logger.nextLogIndex = (Logger.nextLogIndex + 1) % Logger.maxLogLines;
    }

    static getLogListHtml() {
        let html = '';
        let startIndex: number;
        let endIndex: number;
        if (Logger.isLogFull()) {
            startIndex = Logger.nextLogIndex;
            endIndex = this.maxLogLines;
        } else {
            startIndex = 0;
            endIndex = Logger.nextLogIndex;
        }
        for (let i = 0; i < endIndex; i++) {
            const element = Logger.logs[(i + startIndex) % this.maxLogLines];
            html += `<div>${new Date(element.timestamp).toLocaleString('es-ES')} - ${element.msg}<span style="color: orange"> ${element.msgEnd}</span></div>\n`;
        }
        return html;
    }

    private static isLogFull() {
        return Logger.logs[Logger.nextLogIndex] != null;
    }
}