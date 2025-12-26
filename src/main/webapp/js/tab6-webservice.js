var isTab6Loaded = false;

window.initTab6 = function() {
    if (isTab6Loaded) return;
    isTab6Loaded = true;

    Ext.onReady(function() {

        // --- SECTION 1: CREATE RECORD ---
        var createPanel = Ext.create('Ext.form.Panel', {
            title: '1. Create New Record (POST)',
            bodyPadding: 10,
            margin: '0 0 10 0',
            layout: 'hbox',
            defaults: { margin: '0 10 0 0', labelWidth: 60 },
            items: [
                { xtype: 'textfield', name: 'title', fieldLabel: 'Title', emptyText: 'e.g., MR' },
                { xtype: 'textfield', name: 'gender', fieldLabel: 'Gender', emptyText: 'e.g., MALE' },
                { xtype: 'textfield', name: 'prefix', fieldLabel: 'Prefix', emptyText: 'e.g., SO' },
                {
                    xtype: 'button',
                    text: 'Create',
                    icon: 'https://cdn-icons-png.flaticon.com/16/992/992651.png', // Plus icon
                    handler: function() {
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            // Standard AJAX POST
                            Ext.Ajax.request({
                                url: 'api/prefixes',
                                method: 'POST',
                                params: form.getValues(),
                                success: function(response) {
                                    var json = JSON.parse(response.responseText);
                                    Ext.Msg.alert('Result', json.message);
                                }
                            });
                        }
                    }
                }
            ]
        });

        // --- SECTION 2: DELETE RECORD ---
        var deletePanel = Ext.create('Ext.form.Panel', {
            title: '2. Delete Record (DELETE)',
            bodyPadding: 10,
            margin: '0 0 10 0',
            layout: 'hbox',
            defaults: { margin: '0 10 0 0', labelWidth: 60 },
            items: [
                { xtype: 'numberfield', name: 'id', fieldLabel: 'ID', emptyText: 'ID to delete', width: 150 },
                {
                    xtype: 'button',
                    text: 'Delete',
                    icon: 'https://cdn-icons-png.flaticon.com/16/1214/1214428.png', // Trash icon
                    handler: function() {
                        var idField = this.up('form').down('numberfield');
                        var id = idField.getValue();
                        if (!id) {
                            Ext.Msg.alert('Error', 'Please enter an ID');
                            return;
                        }

                        Ext.Ajax.request({
                            url: 'api/prefixes/' + id, // Append ID to URL
                            method: 'DELETE',
                            success: function(response) {
                                var json = JSON.parse(response.responseText);
                                Ext.Msg.alert('Result', json.message);
                            }
                        });
                    }
                }
            ]
        });

        // --- SECTION 3: LIST ALL ---
        var listPanel = Ext.create('Ext.panel.Panel', {
            title: '3. List All Records (GET)',
            bodyPadding: 10,
            layout: 'anchor',
            items: [
                {
                    xtype: 'button',
                    text: 'Refresh List',
                    scale: 'medium',
                    margin: '0 0 10 0',
                    handler: function() {
                        Ext.Ajax.request({
                            url: 'api/prefixes',
                            method: 'GET',
                            success: function(response) {
                                var text = response.responseText;
                                Ext.getCmp('jsonOutput').setValue(JSON.stringify(JSON.parse(text), null, 4));
                            },
                            failure: function(response) {
                                Ext.Msg.alert('Error', 'Failed to fetch data');
                            }
                        });
                    }
                },
                {
                    xtype: 'textareafield',
                    id: 'jsonOutput',
                    fieldLabel: 'JSON Response',
                    labelAlign: 'top',
                    anchor: '100%',
                    height: 250,
                    readOnly: true,
                    fieldStyle: 'background-color: black; color: white; font-family: monospace; border: none;'
                }
            ]
        });

        // Render everything to the container
        Ext.create('Ext.container.Container', {
            renderTo: 'tab6-container',
            width: '100%',
            items: [createPanel, deletePanel, listPanel]
        });
    });
};