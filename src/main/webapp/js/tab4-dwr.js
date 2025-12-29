var isTab4Loaded = false;

window.initTab4 = function() {
    if(isTab4Loaded) return;
    isTab4Loaded = true;

    Ext.onReady(function() {

        var prefixStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'title', 'gender', 'displayPrefix'],
            proxy: {
                type: 'ajax',
                url: 'api/search',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });


        var searchTask = new Ext.util.DelayedTask(function(searchValue) {
            console.log("Searching Backend for:", searchValue);
            prefixStore.load({
                params: { q: searchValue }
            });
        });


        var entryForm = Ext.create('Ext.form.Panel', {
            title: 'Prefix Entry',
            bodyPadding: 10,
            layout: 'hbox',
            height: 100,
            width: '100%',
            defaults: {margin: '0 10 0 0', labelWidth: 60},
            items: [
                {
                    xtype: 'combo',
                    name: 'title',
                    fieldLabel: 'Title',
                    store: ['MR', 'MRS', 'MS', 'MASTER', 'BABY_BOY', 'BABY_GIRL', 'MX', 'DR', 'PROF'],
                    editable: false,
                    emptyText: 'Select...'
                },
                {
                    xtype: 'combo',
                    name: 'gender',
                    fieldLabel: 'Gender',
                    store: ['MALE', 'FEMALE', 'OTHER'],
                    editable: false,
                    emptyText: 'Select...'
                },
                {
                    xtype: 'combo',
                    name: 'displayPrefix',
                    fieldLabel: 'Prefix',
                    store: ['SO', 'HO', 'FO', 'DO', 'WO', 'MO'],
                    editable: false,
                    emptyText: 'Select...'
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    handler: function() {
                        var form = this.up('form').getForm();
                        if(form.isValid()) {
                            var v = form.getValues();

                            PrefixController.savePrefix(v.title, v.gender, v.displayPrefix, {
                                callback: function() {
                                    Ext.Msg.alert('Success', 'Record Saved!');
                                    form.reset();
                                    prefixStore.reload(); // Refreshing grid via AJAX
                                },
                                errorHandler: function(msg) {
                                    Ext.Msg.alert('Error', 'Java Error: ' + msg);
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Delete All',
                    handler: function() {
                        PrefixController.deleteAll(function() {
                            Ext.Msg.alert('Success', 'All records deleted');
                            prefixStore.reload(); // Refreshing grid via AJAX
                        });
                    }
                }
            ]
        });


        var listGrid = Ext.create('Ext.grid.Panel', {
            title: 'Prefix List',
            store: prefixStore,
            height: 400,
            margin: '10 0 0 0',
            columns: [
                {text: 'ID', dataIndex: 'id', width: 50},

                {
                    text: '<input type="text" id="tab4TitleSearch" placeholder="Title..." ' +
                          'style="width:90%; padding:2px; color:black;">',
                    dataIndex: 'title',
                    flex: 1,
                    sortable: false,
                    renderer: function(value) {
                        if (value && value.displayValue) return value.displayValue;
                        return value;
                    }
                },

                {text: 'Gender', dataIndex: 'gender', flex: 1},
                {text: 'Prefix Of', dataIndex: 'displayPrefix', flex: 1},
                {
                    text: 'Action',
                    xtype: 'actioncolumn',
                    width: 100,
                    items: [{
                        icon: 'https://cdn-icons-png.flaticon.com/16/1214/1214428.png',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var id = rec.get('id');

                            PrefixController.deletePrefix(id, function() {
                                prefixStore.reload();
                            });
                        }
                    }]
                }
            ],

            listeners: {
                afterrender: function() {
                    var input = Ext.get('tab4TitleSearch');
                    if (input) {
                        input.on('mousedown', function(e) {
                            e.stopPropagation();
                        });

                        input.on('click', function(e) {
                            e.stopPropagation();
                        });

                        // Detect typing
                        input.on('keyup', function(e, t) {
                            var val = t.value;
                            searchTask.delay(1000, null, null, [val]);
                        });

                        input.on('keydown', function(e) {
                            e.stopPropagation();
                        });
                    }
                }
            }
        });

        Ext.create('Ext.container.Container', {
            renderTo: 'tab4-container',
            width: '100%',
            items: [entryForm, listGrid]
        });
    });
};