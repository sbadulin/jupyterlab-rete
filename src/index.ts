import { IRenderMime } from '@jupyterlab/rendermime-interfaces';


import { JSONObject } from '@phosphor/coreutils';


import { Widget } from '@phosphor/widgets';

import '../style/index.css';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/vnd.gazpromneft.rete';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-rete';

/**
 * A widget for rendering rete.
 */
export class ReteWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render rete into this widget's node. 
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    
    let data = model.data[this._mimeType] as JSONObject;
    this.node.textContent = JSON.stringify(data);
    
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for rete data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new ReteWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'vega2-mime-plugin:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  fileTypes: [
    {
      name: 'rete',
      mimeTypes: [MIME_TYPE],
      extensions: ['.rete']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'Rete.js',
    primaryFileType: 'rete',
    fileTypes: ['rete'],
    defaultFor: ['rete']
  }
};

export default extension;
