var isTab6Loaded = false;

window.initTab6 = function() {
    if (isTab6Loaded) return;
    isTab6Loaded = true;

    Ext.onReady(function() {
        var createPanel = Ext.create('Ext.form.Panel', {
            title: '1. Create New Record (POST)',
            bodyPadding: 15,
            margin: '0 0 20 0',

            layout: 'column',

            defaults: {
                labelAlign: 'top',
                margin: '0 20 10 0',
                columnWidth: 0.3
            },

            items: [
                {
                    xtype: 'combo',
                    name: 'title',
                    fieldLabel: 'Title',
                    store: ['MR', 'MRS', 'MS', 'DR', 'PROF'],
                    emptyText: 'Select...',
                    editable: false
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: 'Full Name',
                    emptyText: 'Enter Name',
                    columnWidth: 0.4
                },
                {
                    xtype: 'datefield',
                    name: 'dob',
                    fieldLabel: 'Date of Birth',
                    format: 'Y-m-d',
                    maxValue: new Date()
                },

                {
                    xtype: 'combo',
                    name: 'gender',
                    fieldLabel: 'Gender',
                    store: ['MALE', 'FEMALE', 'OTHER'],
                    emptyText: 'Select...',
                    editable: false
                },
                {
                    xtype: 'combo',
                    name: 'prefix',
                    fieldLabel: 'Prefix',
                    store: ['SO', 'HO', 'FO', 'DO', 'WO'],
                    emptyText: 'Select...',
                    editable: false
                },
                {
                    xtype: 'container',
                    columnWidth: 0.3,
                    layout: { type: 'vbox', align: 'start', pack: 'end' },
                    items: [
                        { xtype: 'component', height: 23 },
                        {
                            xtype: 'button',
                            text: 'Create Record',
                            scale: 'medium',
                            width: 150,
                            icon: 'https://cdn-icons-png.flaticon.com/16/992/992651.png',
                            handler: function() {
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    var values = form.getValues();

                                    var rawDob = form.findField('dob').getValue();
                                    if(rawDob) {
                                        values.dob = Ext.Date.format(rawDob, 'Y-m-d');
                                    }

                                    Ext.Ajax.request({
                                        url: 'api/prefixes',
                                        method: 'POST',
                                        params: values, // Send all 5 fields
                                        success: function(response) {
                                            var json = JSON.parse(response.responseText);
                                            Ext.Msg.alert('Success', json.message);
                                            form.reset();
                                        },
                                        failure: function(response) {
                                            Ext.Msg.alert('Error', 'Failed to create record.');
                                        }
                                    });
                                }
                            }
                        }
                    ]
                }
            ]
        });


        var deletePanel = Ext.create('Ext.form.Panel', {
            title: '2. Delete Record (DELETE)',
            bodyPadding: 15,
            margin: '0 0 20 0',
            layout: 'hbox',
            items: [
                {
                    xtype: 'numberfield',
                    name: 'id',
                    fieldLabel: 'ID to Delete',
                    labelWidth: 80,
                    width: 250,
                    emptyText: 'Enter ID',
                    margin: '0 15 0 0'
                },
                {
                    xtype: 'button',
                    text: 'Delete Record',
                    icon: 'https://cdn-icons-png.flaticon.com/16/1214/1214428.png',
                    handler: function() {
                        var idField = this.up('form').down('numberfield');
                        var id = idField.getValue();
                        if (!id) {
                            Ext.Msg.alert('Error', 'Please enter an ID');
                            return;
                        }

                        Ext.Msg.confirm('Confirm', 'Are you sure you want to delete ID: ' + id + '?', function(btn){
                            if(btn === 'yes'){
                                Ext.Ajax.request({
                                    url: 'api/prefixes/' + id,
                                    method: 'DELETE',
                                    success: function(response) {
                                        var json = JSON.parse(response.responseText);
                                        Ext.Msg.alert('Result', json.message);
                                        idField.reset();
                                    }
                                });
                            }
                        });
                    }
                }
            ]
        });

        var listPanel = Ext.create('Ext.panel.Panel', {
            title: '3. List All Records (GET)',
            bodyPadding: 15,
            layout: 'anchor',
            items: [
                {
                    xtype: 'button',
                    text: 'Refresh JSON List',
                    margin: '0 0 10 0',
                    handler: function() {
                        var area = Ext.getCmp('jsonOutput');
                        area.setValue('Loading...');

                        Ext.Ajax.request({
                            url: 'api/prefixes',
                            method: 'GET',
                            success: function(response) {
                                var text = response.responseText;
                                try {
                                    var json = JSON.parse(text);
                                    area.setValue(JSON.stringify(json, null, 4));
                                } catch(e) {
                                    area.setValue(text);
                                }
                            },
                            failure: function(response) {
                                area.setValue('Error: ' + response.status + ' ' + response.statusText);
                            }
                        });
                    }
                },
                {
                    xtype: 'textareafield',
                    id: 'jsonOutput',
                    anchor: '100%',
                    height: 300,
                    readOnly: true,
                    fieldStyle: 'background-color: #222; color: #0f0; font-family: monospace; border: 1px solid #ccc; padding: 10px;',
                    value: '// Click Refresh to see data...'
                }
            ]
        });

        // Render everything
        Ext.create('Ext.container.Container', {
            renderTo: 'tab6-container',
            width: '100%',
            items: [createPanel, deletePanel, listPanel]
        });
    });
};