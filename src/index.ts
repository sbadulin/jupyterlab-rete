import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { Widget } from '@phosphor/widgets';

import '../style/index.css';


/**
 * Initialization data for the jupyter-plugin-test extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyter-plugin-test',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyter-plugin-test is activated!');

    const widget: Widget = new Widget();
    widget.id = 'jupyter-plugin-test';
    widget.title.label = 'Vega 2';
    widget.title.closable = true;

    // Add an application command
    const command: string = 'vega:open';
    app.commands.addCommand(command, {
      label: 'Vega 2 with Rete.js',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette
    palette.addItem({command, category: 'App'});
  }
};

export default extension;
