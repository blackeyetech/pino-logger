const pino = require("pino");

class PinoLogger extends pino {
  constructor(name) {
    super({name});

    this.name = name;
    
    this.setLevel = function(level) {
      if (level !== undefined) {
        this.level = level;
      } else if (besh.config.get(besh.BeshLogger.CFG_TRACE) === true) {
        this.level = "trace";
      } else if (besh.config.get(besh.BeshLogger.CFG_DEBUG) === true) {
        this.level = "debug";
      } else if (besh.config.get(besh.BeshLogger.CFG_QUIET) === true) {
        this.level = "silent";
      } else {
        this.level = "info";
      }
    }

    // We can not create methods normally because 
    // we are extending pino so we have to do it this way (??)
    this.childLogger = function(name) {
      return this.child({name});
    };

    this.close = async () => {};

    Object.defineProperties(this, {
      FATAL_LEVEL : { 
        get: function() { return "fatal" }
      }
    });

    Object.defineProperties(this, {
      ERROR_LEVEL : { 
        get: function() { return "error" }
      }
    });

    Object.defineProperties(this, {
      WARN_LEVEL : { 
        get: function() { return "warn" }
      }
    });

    Object.defineProperties(this, {
      QUIET_LEVEL : { 
        get: function() { return "silent" }
      }
    });

    Object.defineProperties(this, {
      INFO_LEVEL : { 
        get: function() { return "info" }
      }
    });

    Object.defineProperties(this, {
      DEBUG_LEVEL : { 
        get: function() { return "debug" }
      }
    });

    Object.defineProperties(this, {
      TRACE_LEVEL : { 
        get: function() { return "trace" }
      }
    });

    this.setLevel()
  }
}

module.exports = PinoLogger;
