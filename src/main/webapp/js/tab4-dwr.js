var isTab4Loaded = false;

window.initTab4 = function() {
    if(isTab4Loaded) return;
    isTab4Loaded = true;

    Ext.onReady(function() {

        var prefixStore = Ext.create('Ext.data.Store', {
            fields: ['id', 'title', 'name', { name: 'dob', type: 'date', dateFormat: 'time' }, 'gender', 'displayPrefix'],
            proxy: {
                type: 'ajax',
                url: 'api/search',
                reader: { type: 'json' }
            },
            autoLoad: true
        });

        // SEARCH
        var runSearch = function() {
            // Getting Text Filters from Column Headers
            var tVal = document.getElementById('tab4TitleSearch') ? document.getElementById('tab4TitleSearch').value : '';
            var nVal = document.getElementById('tab4NameSearch') ? document.getElementById('tab4NameSearch').value : '';
            var gVal = document.getElementById('tab4GenderSearch') ? document.getElementById('tab4GenderSearch').value : '';
            var pVal = document.getElementById('tab4PrefixSearch') ? document.getElementById('tab4PrefixSearch').value : '';

            var fromDate = Ext.getCmp('dobFromFilter').getValue();
            var toDate = Ext.getCmp('dobToFilter').getValue();

            var dFromStr = fromDate ? Ext.Date.format(fromDate, 'Y-m-d') : '';
            var dToStr = toDate ? Ext.Date.format(toDate, 'Y-m-d') : '';

            console.log("Searching -> Name:", nVal, " DOB:", dFromStr, "to", dToStr);

            prefixStore.load({
                params: {
                    title: tVal,
                    name: nVal,
                    dobFrom: dFromStr,
                    dobTo: dToStr,
                    gender: gVal,
                    prefix: pVal
                }
            });
        };

        // ENTRY FORM
        var entryForm = Ext.create('Ext.form.Panel', {
            title: 'Prefix Entry',
            bodyPadding: 15,
            layout: { type: 'hbox', align: 'middle' },
            width: '100%',
            height: 120,
            defaults: { margin: '0 15 0 0', labelWidth: 50, labelAlign: 'right' },
            items: [
                { xtype: 'combo', name: 'title', fieldLabel: 'Title', store: ['MR', 'MRS', 'MS', 'MASTER', 'BABY_BOY', 'BABY_GIRL', 'MX', 'DR', 'PROF'], editable: false, emptyText: 'Select...', width: 180 },
                { xtype: 'textfield', name: 'name', fieldLabel: 'Name', emptyText: 'Enter Full Name', flex: 1 },
                { xtype: 'datefield', name: 'dob', fieldLabel: 'DOB', format: 'Y-m-d', maxValue: new Date(), width: 170 },
                { xtype: 'combo', name: 'gender', fieldLabel: 'Gender', store: ['MALE', 'FEMALE', 'OTHER'], editable: false, emptyText: 'Select...', width: 160 },
                { xtype: 'combo', name: 'displayPrefix', fieldLabel: 'Prefix', store: ['SO', 'HO', 'FO', 'DO', 'WO', 'MO'], editable: false, emptyText: 'Select...', width: 140, margin: '0 0 0 0' }
            ],
            dockedItems: [{
                xtype: 'toolbar', dock: 'bottom', ui: 'footer', padding: '5 15 5 0',
                items: ['->',
                    {
                        text: 'Save Record', icon: 'https://cdn-icons-png.flaticon.com/16/190/190411.png', scale: 'small',
                        handler: function() {
                            var form = this.up('form').getForm();
                            if(form.isValid()) {
                                var v = form.getValues();
                                var dobRaw = form.findField('dob').getValue();
                                var finalDob = dobRaw ? dobRaw : null;
                                PrefixController.savePrefix(v.title, v.name, finalDob, v.gender, v.displayPrefix, {
                                    callback: function() {
                                        Ext.Msg.alert('Success', 'Record Saved!');
                                        form.reset();
                                        runSearch();
                                    },
                                    errorHandler: function(msg, exc) {
                                        Ext.Msg.alert(
                                            'Error',
                                            (exc && exc.message) ? exc.message : msg
                                        );
                                    }
                                });
                            }
                        }
                    },
                    {
                        text: 'Delete All', scale: 'small',
                        handler: function() {
                            Ext.Msg.confirm('Confirm', 'Delete all?', function(btn){
                                if(btn === 'yes'){
                                    PrefixController.deleteAll(function() {
                                        Ext.Msg.alert('Success', 'Deleted All');
                                        prefixStore.reload();
                                    });
                                }
                            });
                        }
                    }
                ]
            }]
        });

        // GRID
        var listGrid = Ext.create('Ext.grid.Panel', {
            title: 'Prefix List',
            store: prefixStore,
            height: 400,
            margin: '10 0 0 0',

            tbar: [
                {
                    xtype: 'label',
                    text: 'Filter DOB:',
                    style: 'font-weight:bold; margin-right:5px;'
                },
                {
                    xtype: 'datefield',
                    id: 'dobFromFilter',
                    emptyText: 'From Date',
                    format: 'Y-m-d',
                    width: 120,
                    listeners: {
                        change: function() {
                            runSearch();
                        }
                    }
                },
                {
                    xtype: 'label',
                    text: 'to',
                    style: 'margin:0 5px;'
                },
                {
                    xtype: 'datefield',
                    id: 'dobToFilter',
                    emptyText: 'To Date',
                    format: 'Y-m-d',
                    width: 120,
                    listeners: {
                        change: function() {
                            runSearch();
                        }
                    }
                },
                '-',
                {
                    text: 'Clear Dates',
                    icon: 'https://cdn-icons-png.flaticon.com/16/1828/1828843.png',
                    handler: function() {
                        Ext.getCmp('dobFromFilter').setValue(null);
                        Ext.getCmp('dobToFilter').setValue(null);
                        runSearch();
                    }
                }
            ],

            columns: [
                {text: 'ID', dataIndex: 'id', width: 40},
                {
                    text: '<div style="font-weight:bold;">Title</div><input id="tab4TitleSearch" style="width:90%">',
                    dataIndex: 'title', width: 120, sortable: false,
                    renderer: function(v) { return (v && v.displayValue) ? v.displayValue : v; }
                },
                {
                    text: '<div style="font-weight:bold;">Name</div><input id="tab4NameSearch" style="width:90%">',
                    dataIndex: 'name', flex: 1, sortable: false
                },
                {
                    text: 'DOB',
                    dataIndex: 'dob',
                    width: 110,
                    renderer: Ext.util.Format.dateRenderer('d-M-Y')
                },
                {
                    text: '<div style="font-weight:bold;">Gender</div><input id="tab4GenderSearch" onCha style="width:90%">',
                    dataIndex: 'gender', width: 120, sortable: false
                },
                {
                    text: '<div style="font-weight:bold;">Prefix</div><input id="tab4PrefixSearch" style="width:90%">',
                    dataIndex: 'displayPrefix', width: 100, sortable: false
                },
                {
                    text: 'Action', xtype: 'actioncolumn', width: 60,
                    items: [{
                        icon: 'https://cdn-icons-png.flaticon.com/16/1214/1214428.png',
                        tooltip: 'Delete',
                        handler: function(grid, rowIndex) {
                            var id = grid.getStore().getAt(rowIndex).get('id');
                            PrefixController.deletePrefix(id, function() {
                                runSearch();
                            });
                        }
                    }]
                }
            ],
            listeners: {
                afterrender: function() {
                    // Listeners for HTML Inputs
                    var inputs = ['tab4TitleSearch', 'tab4NameSearch', 'tab4GenderSearch', 'tab4PrefixSearch'];
                    Ext.each(inputs, function(id) {
                        var el = Ext.get(id);
                        if (el) {
                            el.on('mousedown', function(e){
                                e.stopPropagation();
                            });

                            el.on('click', function(e){
                                e.stopPropagation();
                            });

                            el.on('change', function() {
                                runSearch();
                            });

                            el.on('keydown', function(e) {
                                if(e.getKey() === e.ENTER) {
                                    runSearch();
                                }
                                e.stopPropagation();
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