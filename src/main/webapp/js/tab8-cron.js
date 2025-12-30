var isTab8Loaded = false;

window.initTab8 = function() {
    if(isTab8Loaded) return;
    isTab8Loaded = true;

    Ext.onReady(function() {

        var logStore = Ext.create('Ext.data.Store', {
            fields: ['logEntry'],
            proxy: {
                type: 'ajax',
                url: 'api/cron/logs',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });

        var pollTask = {
            run: function() {
                if (Ext.getCmp('tab8CronLogs')) {
                    logStore.reload();
                    refreshStatus();
                } else {
                    Ext.TaskManager.stop(this);
                }
            },
            interval: 2000
        };
        Ext.TaskManager.start(pollTask);

        // REFRESH
        var refreshStatus = function() {
            Ext.Ajax.request({
                url: 'api/cron/current',
                method: 'GET',
                success: function(response) {
                    var currentCron = response.responseText;
                    var lbl = Ext.getCmp('currentCronDisplay');
                    if(lbl) {
                        lbl.update(
                            '<div style="background:#e3f2fd; padding:10px; border-radius:5px; border:1px solid #90caf9; color:#1565c0; font-family:Arial;">' +
                            '<b>Current Schedule:</b> ' + currentCron +
                            '</div>'
                        );
                    }
                }
            });
        };

        Ext.create('Ext.panel.Panel', {
            title: 'Dynamic Cron Job Manager',
            renderTo: 'tab8-container',
            width: '100%',
            height: 600,
            layout: { type: 'vbox', align: 'stretch' },
            bodyPadding: 15,

            items: [
                // CONFIG SECTION
                {
                    xtype: 'fieldset',
                    title: 'Scheduler Configuration',
                    collapsible: false,
                    padding: 15,
                    defaults: { labelWidth: 120 },
                    items: [
                        {
                            xtype: 'component',
                            id: 'currentCronDisplay',
                            margin: '0 0 15 0',
                            html: 'Loading...'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'cronInput',
                                    emptyText: 'e.g. */5 * * * * *',
                                    width: 300,
                                    height: 32
                                },
                                {
                                    xtype: 'button',
                                    text: 'Update Schedule',
                                    icon: 'https://cdn-icons-png.flaticon.com/16/2099/2099058.png',
                                    scale: 'medium',
                                    margin: '0 0 0 10',
                                    handler: function() {
                                        var expr = Ext.getCmp('cronInput').getValue();
                                        if(!expr) {
                                            Ext.Msg.alert('Warning', 'Please enter a valid cron expression');
                                            return;
                                        }

                                        Ext.Ajax.request({
                                            url: 'api/cron/update',
                                            method: 'POST',
                                            params: { expression: expr },
                                            success: function(response) {
                                                Ext.Msg.alert('Success', response.responseText);
                                                logStore.reload();
                                                refreshStatus();
                                            },
                                            failure: function() {
                                                Ext.Msg.alert('Error', 'Server connection failed');
                                            }
                                        });
                                    }
                                }
                            ]
                        }
                    ]
                },

                // LOGS
                {
                    xtype: 'grid',
                    id: 'tab8CronLogs',
                    title: 'Live Execution Monitor',
                    store: logStore,
                    flex: 1,
                    margin: '15 0 0 0',
                    columns: [
                        {
                            text: 'Status Log',
                            dataIndex: 'logEntry',
                            flex: 1,
                            renderer: function(value) {
                                if(value.includes("Error")) return '<span style="color:#d32f2f; font-weight:bold;">✖ ' + value + '</span>';
                                if(value.includes("Configuration")) return '<span style="color:#1976d2; font-weight:bold;">ℹ ' + value + '</span>';
                                if(value.includes("CRON")) return '<span style="color:#388e3c;">✔ ' + value + '</span>';
                                return value;
                            }
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        emptyText: '<div style="text-align:center; padding:20px; color:#aaa;">No logs generated yet</div>',
                        deferEmptyText: false
                    },
                    tools: [{
                        type: 'refresh',
                        handler: function() { logStore.reload(); }
                    }]
                }
            ]
        });
    });
};