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

        // Reads ALL 3 inputs to create a combined filter
        var searchTask = new Ext.util.DelayedTask(function() {
            var tVal = document.getElementById('tab4TitleSearch') ? document.getElementById('tab4TitleSearch').value : '';
            var gVal = document.getElementById('tab4GenderSearch') ? document.getElementById('tab4GenderSearch').value : '';
            var pVal = document.getElementById('tab4PrefixSearch') ? document.getElementById('tab4PrefixSearch').value : '';

            console.log("Filtering -> Title:", tVal, " Gender:", gVal, " Prefix:", pVal);

            prefixStore.load({
                params: {
                    title: tVal,
                    gender: gVal,
                    prefix: pVal
                }
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
                    editable: false, emptyText: 'Select...'
                },
                {
                    xtype: 'combo',
                    name: 'gender',
                    fieldLabel: 'Gender',
                    store: ['MALE', 'FEMALE', 'OTHER'],
                    editable: false, emptyText: 'Select...'
                },
                {
                    xtype: 'combo',
                    name: 'displayPrefix',
                    fieldLabel: 'Prefix',
                    store: ['SO', 'HO', 'FO', 'DO', 'WO', 'MO'],
                    editable: false, emptyText: 'Select...'
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
                                    // Trigger the search task to reload grid (keeps filters active)
                                    searchTask.delay(100);
                                },
                                errorHandler: function(msg) { Ext.Msg.alert('Error', msg); }
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
                            prefixStore.reload();
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
                    renderer: function(value) { return (value && value.displayValue) ? value.displayValue : value; }
                },
                {
                    text: '<input type="text" id="tab4GenderSearch" placeholder="Gender..." ' +
                          'style="width:90%; padding:2px; color:black;">',
                    dataIndex: 'gender',
                    flex: 1,
                    sortable: false
                },
                {
                    text: '<input type="text" id="tab4PrefixSearch" placeholder="Prefix..." ' +
                          'style="width:90%; padding:2px; color:black;">',
                    dataIndex: 'displayPrefix',
                    flex: 1,
                    sortable: false
                },
                {
                    text: 'Action',
                    xtype: 'actioncolumn',
                    width: 100,
                    items: [{
                        icon: 'https://cdn-icons-png.flaticon.com/16/1214/1214428.png',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex) {
                            var id = grid.getStore().getAt(rowIndex).get('id');
                            PrefixController.deletePrefix(id, function() {
                                searchTask.delay(100); // Reload keeping filters
                            });
                        }
                    }]
                }
            ],

            listeners: {
                afterrender: function() {
                    // Apply listeners to ALL 3 inputs
                    var inputs = ['tab4TitleSearch', 'tab4GenderSearch', 'tab4PrefixSearch'];

                    Ext.each(inputs, function(inputId) {
                        var el = Ext.get(inputId);
                        if (el) {
                            // Stop ExtJS from interfering with clicks
                            el.on('mousedown', function(e) { e.stopPropagation(); });
                            el.on('click', function(e) { e.stopPropagation(); });
                            el.on('keydown', function(e) { e.stopPropagation(); });

                            el.on('keyup', function(e) {
                                searchTask.delay(1000); // 1 Second Debounce
                            });
                        }
                    });
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