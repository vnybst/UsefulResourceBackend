/* eslint-disable @typescript-eslint/no-explicit-any */
class StopWatch {
  private start: number;
  constructor(private logger: Logger) {
    this.start = Date.now();
  }
  stop(message: string, obj?: any) {
    this.logger.log(message, { took: Date.now() - this.start, ...obj });
  }
}

// https://github.com/yefremov/iserror/blob/master/index.js
function isError(err: any): boolean {
  if (!err) return false;
  else if (err instanceof Error) return true;
  else if (Object.prototype.toString.call(err) === "[object Error]")
    return true;
  else return false;
}

function objectify(err: any): { [str: string]: any } {
  if (isError(err)) {
    let errMessage: string = err.message;
    if (err.method && err.statusCode)
      errMessage = `${err.statusCode} ${err.statusMessage} ${err.method} ${err.host}${err.path} ${errMessage}`;
    return {
      errMessage,
      stack: (err.stack || "").split(/\n/).slice(0, 6).join(" "),
    };
  } else {
    return err;
  }
}

// https://cloud.google.com/error-reporting/docs/formatting-error-messages
const logType =
  "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent";

interface PropsMap {
  [key: string]: string | number;
}
/**
 * Logger function that standardizes the log format & discourages the standard console.log
 */
export default class Logger {
  private dflt: PropsMap;
  /**
   * Creates a new Logger instance.
   * @param {String} name - name of the logger - generally the file/module/controller name
   * @param {Object} extra - (Optional) Default properties that should be added to JSON log for all logs printed using this logger
   */
  constructor(private name: string, extra?: PropsMap) {
    this.dflt = { name, ...extra };
  }

  start(): StopWatch {
    return new StopWatch(this);
  }
  /**
   * Prints a general log to the STDOUT.
   * @param {String} message - A unique easily identifiable string that defines the context in which this log can be used.
   * @param {Object} obj - Any json object(preferably a key-value store) that needs to be added to the log along with the default values mentioned in the constructor
   */
  log(message: string, obj?: any) {
    console.log(
      JSON.stringify({
        ...this.dflt,
        message,
        ...obj,
      })
    );
  }

  /**
   * Prints an info log to the STDOUT. Should be used for informational logs like
   * "cronjob.started", "request.received.for.saving.entity"
   * @param {String} message - A unique easily identifiable string that defines the context in which this log can be used.
   * @param {Object} obj - Any json object(preferably a key-value store) that needs to be added to the log along with the default values mentioned in the constructor
   */
  info(message: string, obj?: any) {
    console.error(
      JSON.stringify({
        ...this.dflt,
        severity: "INFO",
        message,
        ...obj,
      })
    );
  }

  /**
   * Prints an Warning log to the STDOUT.
   * @param {String} message - A unique easily identifiable string that defines the context in which the warning is thrown.
   * @param {Object} obj - Any json object(preferably a key-value store) that needs to be added to the log along with the default values mentioned in the constructor
   */
  warn(message: string, obj?: any) {
    console.error(
      JSON.stringify({
        ...this.dflt,
        severity: "WARNING",
        message,
        ...obj,
      })
    );
  }

  /**
   * Prints an Error log to the STDOUT.
   * @param {String} message - A unique easily identifiable string that defines the context in which the error is thrown.
   * @param {Error | Object} [err] - Error that was thrown while handling the error/A key-value pair for error info.
   * @param {Object} [obj] -  A general key-value pair object that can exemplify the reasons for which the error has happened.
   */
  error(message: string): void;
  error(message: string, err: Error): void;
  error(message: string, obj: any): void;
  error(message: string, err: Error, obj: any): void;
  error(message: string, err?: Error, obj?: any): void {
    console.error(
      JSON.stringify({
        ...this.dflt,
        severity: "ERROR",
        message,
        ...objectify(err),
        ...objectify(obj),
      })
    );
  }
  /**
   * Useful for reporting all errors at top-level. Useful for raising Google Alerts at service level.
   * @param {string} service - service name for which error is thrown.
   * @param {string} message - error message.
   * @param {Error | NotImplementedError | ValidationError} [err] - Error that has happened.
   * @param {Object} [obj] - Any parameters that need to be passed to make the error more traceable.
   */
  errorReport(service: string, message: string, err?: any, obj?: any): void {
    console.error(
      JSON.stringify({
        ...this.dflt,
        severity: "ERROR",
        message,
        serviceContext: { service },
        "@type": logType,
        ...objectify(err),
        ...objectify(obj),
      })
    );
  }
}
