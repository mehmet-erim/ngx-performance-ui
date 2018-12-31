export function ngxsLogExcept(states: string[]) {
  if (!states.length) return console;

  const NO_LOG = new RegExp('\\[(' + states.join('|') + ')\\]');

  return {
    ...console,
    silent: false,
    group: function(message) {
      if (NO_LOG.test(message)) {
        this.silent = true;
        return;
      }

      this.silent = false;
      console.group(message);
    },
    groupCollapsed: function(message) {
      if (NO_LOG.test(message)) {
        this.silent = true;
        return;
      }

      this.silent = false;
      console.groupCollapsed(message);
    },
    log: function(message, ...args) {
      if (this.silent) return;

      console.log(message, ...args);
    },
  };
}
