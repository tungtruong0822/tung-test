export class MyExtension extends Autodesk.Viewing.Extension {
    constructor(viewer: Autodesk.Viewing.GuiViewer3D, options?: any) {
        super(viewer, options);
        this.viewer = viewer;
        this.options = options;
        this.subToolbar = null;
    }


    load() {
        console.log('My excel extension loaded');
        return true;
    }

    unload() {
        if (this.subToolbar) {
            this.viewer.toolbar.removeControl(this.subToolbar);
            this.subToolbar = null;
        }

    }

    onToolbarCreated(toolbar) {
        // Button 1
        var button1 = new Autodesk.Viewing.UI.Button('excel-button');
        button1.icon.style.backgroundImage = 'url(https://img.icons8.com/color/30/000000/microsoft-excel-2019--v1.png)';

        button1.setToolTip('Export Excel');

        // SubToolbar
        this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('excel-button');
        this.subToolbar.addControl(button1);

        this.viewer.toolbar.addControl(this.subToolbar);

        // Handle button click event
        button1.onClick = (event) => {
            // Your code to handle the button click event
            // You can show a popup, perform an action, etc.

            console.log('Excel button clicked');
        };
    }

    static getName() {
        return 'MyExtension';
    }

}

Autodesk.Viewing.theExtensionManager.registerExtension('MyExtension', MyExtension);
