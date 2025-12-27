var isTab8Loaded = false;
var cronInterval = null;

window.initTab8 = function() {
    if (isTab8Loaded) return;
    isTab8Loaded = true;

    Ext.onReady(function() {
        var logStore = Ext.create('Ext.data.Store', {
            fields: ['log'],
            data: []
        });

        Ext.create('Ext.panel.Panel', {
            title: 'Tab 8: Cron Monitor',
            renderTo: 'tab8-container',
            width: '100%',
            height: 500,
            bodyPadding: 20,
            items: [
                {
                    xtype: 'component',
                    html: '<div style="background:#f9f9f9; border:1px solid #ccc; padding:15px; margin-bottom:20px;">' +
                          '<h2 style="margin-top:0;">System: Cron</h2>' +
                          '<p>This tab monitors an <b>External Cron Job</b>.</p>' +
                          '<p><b>Configuration:</b> The file runs every minute via Crontab.</p>' +
                          '</div>'
                },
                {
                    xtype: 'grid',
                    title: 'Live Execution Logs (Refreshes every 2s)',
                    store: logStore,
                    height: 350,
                    scrollable: true,
                    columns: [
                        { text: 'Server Log Message', dataIndex: 'log', flex: 1 }
                    ]
                }
            ]
        });

        cronInterval = setInterval(function() {
            Ext.Ajax.request({
                url: 'api/cron-logs',
                method: 'GET',
                success: function(response) {
                    var logs = JSON.parse(response.responseText);
                    var data = logs.map(function(msg) {
                        return { log: msg };
                    });
                    logStore.loadData(data.reverse());
                }
            });
        }, 2000); /// Triggering in 2 sec interval
    });
};