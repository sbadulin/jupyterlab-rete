import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import { ABCWidgetFactory, DocumentRegistry, IDocumentWidget, DocumentWidget } from '@jupyterlab/docregistry';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IEditorTracker } from '@jupyterlab/fileeditor';
import { Widget } from '@phosphor/widgets';
import { UUID } from '@phosphor/coreutils';
import { PathExt } from '@jupyterlab/coreutils';

import '../style/index.css';

const FILE_TYPES = ['RETE'];

export class ReteWidget extends Widget {
  /**
   * Construct a new Rete widget.
   */
  constructor(context: DocumentRegistry.CodeContext) {
    super();
    this.id = UUID.uuid4();
    this.title.label = PathExt.basename(context.localPath);
    this.title.closable = true;
    this.context = context;
    
    // let content = context.model;
    // let uri = Rete.Uri.parse(context.path);
    
    // let rete_model = editor.fromJSON(content);
    
    // editor.on('nodeselected', () => this.context.model.value.text = editor.getValue());
    
    // context.ready.then(() => { this._onContextReady(); });
  }
  
  /**
   * Handle actions that should be taken when the context is ready.
   */
  // private _onContextReady(): void {
  //   if (this.isDisposed) {
  //       return;
  //     }
    // const contextModel = this.context.model;
    // const editor = new NodeEditor('demo@0.1.0', document.querySelector('#rete'));
    // editor.use(ConnectionPlugin);

    // Set the editor model value.
    // editor.fromJSON(contextModel);

    // Wire signal connections.
    // contextModel.contentChanged.connect(this._onContentChanged, this);

    // Resolve the ready promise.
    // this._ready.resolve(undefined);
  // }

  /**
   * A promise that resolves when the file editor is ready.
   */
  // get ready(): Promise<void> {
  //   return this._ready.promise;
  // }

  /**
   * Handle a change in context model content.
   */
  // private _onContentChanged(): void {
  //   const oldValue = editor.getValue();
  //   const newValue = this.context.model.toString();

  //   if (oldValue !== newValue) {
  //     editor.setValue(newValue);
  //   }
  // }


  context: DocumentRegistry.CodeContext;
  // private _ready = new PromiseDelegate<void>();
};

  /**
   * A widget factory for editors.
   */
export class ReteFactory extends ABCWidgetFactory<IDocumentWidget<ReteWidget>, DocumentRegistry.ICodeModel> {

  /**
   * Create a new widget given a context.
   */
  protected createNewWidget(context: DocumentRegistry.CodeContext): IDocumentWidget<ReteWidget> {
    const content = new ReteWidget(context);
    const widget = new DocumentWidget({ content, context });
    return widget;
  }
}

/**
 * Initialization data for the jupyter-plugin-test extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyter-plugin-test',
  autoStart: true,
  requires: [ICommandPalette, IEditorTracker],
  activate: (app: JupyterLab, palette: ICommandPalette, editorTracker: IEditorTracker) => {
    const factory = new ReteFactory({
      name: 'Rete Editor',
      fileTypes: FILE_TYPES,
      defaultFor: ['*'],
    });
    app.docRegistry.addWidgetFactory(factory);

    // Add an application command
    const command: string = 'rete:open';
    app.commands.addCommand(command, {
      label: 'Rete Editor',
      execute: () => {
        const widget = new Widget();
        widget.id = 'lolekek';
        app.shell.addToMainArea(widget);
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette
    palette.addItem({command, category: 'Rete'});
  }
};

export default extension;
