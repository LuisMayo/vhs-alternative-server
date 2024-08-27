export class Logger {
    private static readonly maxLogLines = 1001;
    private static nextLogIndex = 0;
    private static logs: { msg: string, msgEnd?: string, timestamp: number }[] = [];
    
    static log(msg: string, msgEnd?: string) {
        try {
            console.log(msg, msgEnd);
        } catch (error) {
            console.error("Logging error:", error);
        }
        Logger.logs[Logger.nextLogIndex] = { msg, msgEnd, timestamp: Date.now() };
        Logger.nextLogIndex = (Logger.nextLogIndex + 1) % Logger.maxLogLines;
    }

    static getLogListHtml() {
        const logsToShow = Logger.isLogFull() ? Logger.maxLogLines : Logger.nextLogIndex;
        let html = '';

        for (let i = 0; i < logsToShow; i++) {
            const index = (i + Logger.nextLogIndex) % Logger.maxLogLines;
            const element = Logger.logs[index];
            if (element) {
                html += `<div>${new Date(element.timestamp).toLocaleString('es-ES')} - ${element.msg}<span style="color: orange"> ${element.msgEnd ?? ''}</span></div>\n`;
            }
        }
        return html;
    }

    private static isLogFull() {
        return Logger.nextLogIndex === 0 && Logger.logs[0] != null;
    }
}
