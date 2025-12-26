var isTab7Loaded = false;

window.initTab7 = function() {
    if (isTab7Loaded) return;
    isTab7Loaded = true;

    Ext.onReady(function() {
        Ext.create('Ext.panel.Panel', {
            title: 'PDF Report Generation',
            renderTo: 'tab7-container',
            bodyPadding: 20,
            width: '100%',
            height: 200,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<h3>Click below to download the full database report as PDF</h3>',
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'button',
                    text: 'Download PDF',
                    scale: 'large',
                    width: 200,
                    handler: function() {
                        // Trigger the browser download
                        window.open('downloadPrefixPdf', '_blank');
                    }
                }
            ]
        });
    });
};