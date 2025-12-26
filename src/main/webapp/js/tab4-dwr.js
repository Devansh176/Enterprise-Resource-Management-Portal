var isTab4Loaded = false;

window.initTab4 = function() {
    if(isTab4Loaded) return;
    isTab4Loaded = true;

    Ext.onReady(function() {
        var prefixStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'title', 'gender', 'displayPrefix'],
            data: []
        });

        window.loadPrefixData = function() {
            if(typeof PrefixController !== 'undefined') {
                PrefixController.listPrefixes(function(data) {
                    prefixStore.loadData(data);
                });
            } else {
                console.warn("DWR Backend not found.");
            }
        };

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
                    iconCls: 'icon-save',
                    handler: function() {
                        var form = this.up('form').getForm();
                        if(form.isValid()) {
                            var v = form.getValues();

                            if (!v.displayPrefix || !v.gender || !v.title) {
                                 Ext.Msg.alert('Error', 'Please select all fields');
                                 return;
                            }

                            console.log("Sending -> Title:", v.title, " Gender:", v.gender, " Prefix:", v.displayPrefix);
                            PrefixController.savePrefix(v.title, v.gender, v.displayPrefix, {
                                callback: function() {
                                    Ext.Msg.alert('Success', 'Record Saved!');
                                    form.reset();
                                    window.loadPrefixData();
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
                            window.loadPrefixData();
                        });
                    }
                }
            ]
        });

        var listGrid = Ext.create('Ext.grid.Panel', {
            title: 'Prefix List',
            store: prefixStore,
            height: 300,
            margin: '10 0 0 0',
            columns: [
                {text: 'ID', dataIndex: 'id', width: 50},
                {
                    text: 'Title',
                    dataIndex: 'title',
                    flex: 1,
                    renderer: function(value) {
                        return value ? value.displayValue : '';
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
                                window.loadPrefixData();
                            });
                        }
                    }]
                }
            ],
            tbar: [
                {
                    xtype: 'textfield',
                    emptyText: 'Search Title',
                    width: 150,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function() {
                            filterGrid();
                        }
                    }
                },
                {
                            xtype: 'textfield',
                            emptyText: 'Search Gender...',
                            width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function() { filterGrid(); }
                            }
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'Search Prefix...',
                            width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function() { filterGrid(); }
                            }
                        },
                        {
                            text: 'Clear Filters',
                            icon: 'https://cdn-icons-png.flaticon.com/16/1828/1828843.png',
                            handler: function() {
                                // Clear all text fields
                                var toolbar = this.up('toolbar');
                                toolbar.items.each(function(item) {
                                    if (item.xtype === 'textfield') item.setValue('');
                                });
                                // Clear store filter
                                prefixStore.clearFilter();
                            }
                        }
                    ]
                });

                function filterGrid() {
                    var toolbar = listGrid.down('toolbar');
                    var titleVal = toolbar.items.getAt(0).getValue().toLowerCase();
                    var genderVal = toolbar.items.getAt(1).getValue().toLowerCase();
                    var prefixVal = toolbar.items.getAt(2).getValue().toLowerCase();

                    prefixStore.clearFilter();

                    prefixStore.filterBy(function(record) {
                        var rTitle = record.get('title');
                        var rGender = record.get('gender');
                        var rPrefix = record.get('displayPrefix');

                        // Convert to searchable strings
                        var sTitle = (rTitle && rTitle.displayValue) ? rTitle.displayValue.toLowerCase() : '';
                        var sGender = rGender ? rGender.toLowerCase() : '';
                        var sPrefix = rPrefix ? rPrefix.toLowerCase() : '';

                        // Check if the row matches ALL non-empty search fields
                        var matchTitle = sTitle.indexOf(titleVal) > -1;
                        var matchGender = sGender.indexOf(genderVal) > -1;
                        var matchPrefix = sPrefix.indexOf(prefixVal) > -1;

                        return matchTitle && matchGender && matchPrefix;
                    });
                }

        Ext.create('Ext.container.Container', {
            renderTo: 'tab4-container',
            width: '100%',
            items: [entryForm, listGrid]
        });

        window.loadPrefixData();
    });
};