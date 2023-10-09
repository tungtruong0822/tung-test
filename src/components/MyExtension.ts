import Autodesk from 'forge-viewer';
import ReactDOM from 'react-dom';
import React from 'react';
import PropertyPanel from './PropertyPanel'; // Import the PropertyPanel component

export class MyExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this.viewer = viewer;
    this.options = options;
    this.subToolbar = null;
    this.propertyPanel = null; // Reference to the property panel
    this.isOpen = false; // Property panel initial state
    this.selectedIds = []; // Store selected object IDs
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
    this.closePropertyPanel(); // Close the property panel when unloading the extension
    return true;
  }

  onToolbarCreated(toolbar) {
    // Button 1
    const button1 = new Autodesk.Viewing.UI.Button('excel-button');
    button1.icon.style.backgroundImage =
      'url(https://img.icons8.com/color/30/000000/microsoft-excel-2019--v1.png)';
    button1.setToolTip('Export Excel');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('excel-button');
    this.subToolbar.addControl(button1);

    this.viewer.toolbar.addControl(this.subToolbar);

    // Handle button click event
    button1.onClick = () => {
      // Toggle the property panel when the button is clicked
      this.togglePropertyPanel();
    };
  }

  togglePropertyPanel() {
    // Toggle the property panel's visibility
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.openPropertyPanel();
    } else {
      this.closePropertyPanel();
    }
  }

  openPropertyPanel() {
    // Create the property panel if it doesn't exist
    if (!this.propertyPanel) {
      this.propertyPanel = document.createElement('div');
      this.propertyPanel.id = 'property-panel';
      this.propertyPanel.style.position = 'absolute';
      this.propertyPanel.style.top = '50px';
      this.propertyPanel.style.right = '20px';
      this.propertyPanel.style.width = '300px';
      this.propertyPanel.style.height = '400px';
      this.propertyPanel.style.backgroundColor = 'white';
      this.propertyPanel.style.border = '1px solid #ccc';
      this.propertyPanel.style.zIndex = '1000';
      this.propertyPanel = new Tabulator('.datagrid-container', {
        height: '100%',
        layout: 'fitColumns',
        groupBy: 'group',
        columns: [
            { title: 'Type name', field: 'name', width: 150 },
            { title: 'Tổng khối lượng', field: 'volume', hozAlign: 'left', formatter: 'progress' },

        ]
    });



      // Append the property panel to the viewer's container
      this.viewer.container.appendChild(this.propertyPanel);
    }

    // Render the React PropertyPanel component inside the created div
    ReactDOM.render(
      <PropertyPanel selectedIds={this.selectedIds} viewer={this.viewer} />,
      this.propertyPanel
    );
  }

  closePropertyPanel() {
    // Remove the property panel and its React component
    if (this.propertyPanel) {
      ReactDOM.unmountComponentAtNode(this.propertyPanel);
      this.propertyPanel.remove();
      this.propertyPanel = null;
    }
  }

  // Handle selection change in the viewer
  onSelectionChanged(event) {
    this.selectedIds = event.dbIdArray || []; // Update selected object IDs
    if (this.isOpen) {
      this.openPropertyPanel(); // Update the property panel when selection changes
    }
  }

  static getName() {
    return 'MyExtension';
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('MyExtension', MyExtension);
