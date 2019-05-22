import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyter-plugin-test extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyter-plugin-test',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyter-plugin-test is activated!');
  }
};

export default extension;
