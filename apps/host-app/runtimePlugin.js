/**
 * Remote Router Runtime Plugin for Module Federation
 * -------------------------------------------------
 * This plugin extends the capabilities of the module federation runtime by customizing the behavior of the application at runtime.
 *
 * Functionality:
 * 1. The plugin provides several hooks to customize the behavior of the application at runtime.
 * 2. It handles the loading of remote microfrontends and provides a way to handle errors that may occur during this process.
 *
 * How it Works:
 * - The 'errorLoadRemote' method is called when there's an error loading a remote microfrontend. It logs the error and returns a module that displays an error message.
 * - The 'init' method is called when the plugin is initialized. It simply returns the arguments it was called with.
 * - The 'beforeRequest' method is called before a request is made to load a remote microfrontend. It modifies the entry property of the remotes to point to the correct URLs.
 *
 * Usage:
 * - The plugin is a crucial part of the host application as it handles the loading of remote microfrontends.
 *
 * Notes:
 * - This plugin provides a flexible way to control the loading of remote microfrontends, optimizing the loading process and handling errors efficiently.
 */
const runtimePlugin = () => {
  const getErrorMessage = (id, error) =>
    `remote ${id} is offline due to error: ${error}`;

  const getModule = (pg, from) => {
    if (from === 'build') {
      return () => ({
        __esModule: true,
        default: pg,
      });
    } else {
      return {
        default: pg,
      };
    }
  };

  return {
    errorLoadRemote({ id, error, from, origin }) {
      console.error(id, 'offline');
      const pg = function () {
        console.error(id, 'offline', error);
        return getErrorMessage(id, error);
      };
      return getModule(pg, from);
    },
  };
};

export default runtimePlugin;
