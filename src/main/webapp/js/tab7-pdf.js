//var isTab7Loaded = false;
//
//window.initTab7 = function() {
//    if (isTab7Loaded) return;
//    isTab7Loaded = true;
//
//    Ext.onReady(function() {
//        Ext.create('Ext.panel.Panel', {
//            title: 'Tab 7: Puppeteer PDF Generation',
//            renderTo: 'tab7-container',
//            bodyPadding: 20,
//            width: '100%',
//            height: 300,
//            layout: {
//                type: 'vbox',
//                align: 'center',
//                pack: 'center'
//            },
//            items: [
//                {
//                    xtype: 'button',
//                    text: 'Generate PDF',
//                    scale: 'large',
//                    width: 250,
//                    handler: function() {
//                        // 1. Get Text Filters
//                        var tVal = document.getElementById('tab4TitleSearch') ? document.getElementById('tab4TitleSearch').value : '';
//                        var nVal = document.getElementById('tab4NameSearch') ? document.getElementById('tab4NameSearch').value : '';
//                        var gVal = document.getElementById('tab4GenderSearch') ? document.getElementById('tab4GenderSearch').value : '';
//                        var pVal = document.getElementById('tab4PrefixSearch') ? document.getElementById('tab4PrefixSearch').value : '';
//
//                        var fromCmp = Ext.getCmp('dobFromFilter');
//                        var toCmp = Ext.getCmp('dobToFilter');
//
//                        var dFrom = '';
//                        var dTo = '';
//
//                        if(fromCmp && fromCmp.getValue()) {
//                            dFrom = Ext.Date.format(fromCmp.getValue(), 'Y-m-d');
//                        }
//                        if(toCmp && toCmp.getValue()) {
//                            dTo = Ext.Date.format(toCmp.getValue(), 'Y-m-d');
//                        }
//
//                        var url = 'downloadPuppeteerPdf?' +
//                            'title=' + encodeURIComponent(tVal) +
//                            '&name=' + encodeURIComponent(nVal) +
//                            '&dobFrom=' + encodeURIComponent(dFrom) +
//                            '&dobTo=' + encodeURIComponent(dTo) +
//                            '&gender=' + encodeURIComponent(gVal) +
//                            '&prefix=' + encodeURIComponent(pVal);
//
//                        console.log("Downloading PDF with URL: " + url);
//                        window.open(url, '_blank');
//                    }
//                }
//            ]
//        });
//    });
//};