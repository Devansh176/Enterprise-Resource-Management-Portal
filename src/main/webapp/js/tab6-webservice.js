var isTab6Loaded = false;

window.initTab6 = function() {
    if(isTab6Loaded) return;
    isTab6Loaded = true;

    Ext.onReady(function() {
        Ext.create('Ext.panel.Panel', {
            title: 'Web Service',
            renderTo: 'tab6-container',
            bodyPadding: 10,
            width: '100%',
            height: 400,
            items: [
                {
                    xtype: 'button',
                    text: 'Call the Web Service (GET JSON)',
                    scale: 'medium',
                    handler: function() {
                        Ext.Ajax.request({
                            url: 'api/prefixes',
                            method: 'GET',
                            success: function(response) {
                                var text = response.responseText;
                                Ext.getCmp('jsonOutput').setValue(JSON.stringify(JSON.parse(text), null, 4));
                            },
                            failure: function(response) {
                                Ext.Msg.alert('Error', 'Failed to call web service');
                            }
                        })
                    }
                },
                {
                    xtype: 'textareafield',
                    id: 'jsonOutput',
                    fieldLabel: 'JSON Response',
                    labelAlign: 'top',
                    width: '100%',
                    height: 300,
                    margin: '10 0 0 0',
                    readOnly: true,
                    fieldStyle: 'background-color:black; color:white; font-family:monospace; border:none',
                },
            ]
        })
    });
}
