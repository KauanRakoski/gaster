const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

const levels = {
    INFO: { color: colors.cyan, label: 'INFO ' },
    WARN: { color: colors.yellow, label: 'WARN ' },
    ERROR: { color: colors.red, label: 'ERROR' },
    DEBUG: { color: colors.dim, label: 'DEBUG' },
};

function getTimestamp() {
    return new Date().toISOString();
}

function formatMessage(level, message, details=''){
    const timestamp = getTimestamp();
    const color = level.color;
    const label = level.label;

    const detailsString = details ? `\n${JSON.stringify(details, null, 2)}` : '';

    return `${color}[${timestamp}] ${label}:${colors.reset} ${message}\n ${detailsString}`;
}

const logger = {
    info: (message, details='') => {
        console.log(formatMessage(levels.INFO, message, details))
    },
    warn: (message, details='') => {
        console.log(formatMessage(levels.WARN, message, details))
    },
    error: (message, details='') => {
        console.log(formatMessage(levels.ERROR, message, details))
    }
}

module.exports = logger;