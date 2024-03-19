let logLevel = 1; // Default log level

const LOG_LEVELS = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
};

function logError(message) {
  if (logLevel >= LOG_LEVELS.ERROR) {
    console.error(`ERROR: ${message}`);
  }
}

function logWarn(message) {
  if (logLevel >= LOG_LEVELS.WARN) {
    console.warn(`WARN: ${message}`);
  }
}

function logInfo(message) {
  if (logLevel >= LOG_LEVELS.INFO) {
    console.info(`INFO: ${message}`);
  }
}

function logDebug(message) {
  if (logLevel >= LOG_LEVELS.DEBUG) {
    console.log(`DEBUG: ${message}`);
  }
}

// Function to set the current log level
function setLogLevel(level) {
  logLevel = level;
}

// Exporting log functions and log level setter
export { logError, logWarn, logInfo, logDebug, setLogLevel };
