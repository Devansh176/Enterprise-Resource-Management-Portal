//var PatientManager = (function() {
//
//    var cmpTitle, cmpDob, cmpGender, cmpPrefix;
//    var cmpFrom, cmpTo;
//
//    Ext.onReady(function() {
//        cmpTitle = createCombo('slot-title', ['MR', 'MRS', 'MS', 'DR', 'MX', 'MASTER']);
//        cmpGender = createCombo('slot-gender', ['MALE', 'FEMALE', 'OTHER']);
//        cmpPrefix = createCombo('slot-prefix', ['SO', 'HO', 'FO', 'DO', 'MO', 'WO']);
//
//        cmpDob = Ext.create('Ext.form.field.Date', {
//            renderTo: 'slot-dob', format: 'Y-m-d', maxValue: new Date(), width: '100%'
//        });
//
//        cmpFrom = Ext.create('Ext.form.field.Date', {
//            renderTo: 'filter-from', format: 'Y-m-d', width: 130,
//            listeners: { change: function() { search(); } }
//        });
//
//        cmpTo = Ext.create('Ext.form.field.Date', {
//            renderTo: 'filter-to', format: 'Y-m-d', width: 130,
//            listeners: { change: function() { search(); } }
//        });
//
//        search();
//    });
//
//    function createCombo(divId, storeData) {
//        return Ext.create('Ext.form.field.ComboBox', {
//            renderTo: divId, store: storeData, emptyText: 'Select', width: '100%', editable: false
//        });
//    }
//
//    function search() {
//        var tVal = document.getElementById('s-title').value;
//        var nVal = document.getElementById('s-name').value;
//        var gVal = document.getElementById('s-gender').value;
//        var pVal = document.getElementById('s-prefix').value;
//        var dFrom = cmpFrom.getValue();
//        var dTo = cmpTo.getValue();
//
//        PatientController.searchWithFilters(tVal, nVal, dFrom, dTo, gVal, pVal, {
//            callback: function(data) {
//                renderTable(data);
//            },
//            errorHandler: function(e) { console.error("DWR Error:", e); }
//        });
//    }
//
//    function renderTable(data) {
//        var tbody = document.getElementById('grid-body');
//        tbody.innerHTML = "";
//
//        if (!data || data.length === 0) {
//            tbody.innerHTML = "<tr><td colspan='7' style='text-align:center; padding:15px; color:#999;'>No records found</td></tr>";
//            return;
//        }
//
//        data.forEach(function(row) {
//            var tr = document.createElement('tr');
//            var dobStr = row.dob ? Ext.Date.format(new Date(row.dob), 'd-M-Y') : "";
//
//            var pfx = row.displayPrefix || row.prefix || "";
//
//            tr.innerHTML =
//                "<td>" + row.id + "</td>" +
//                "<td>" + (row.title || "") + "</td>" +
//                "<td><b>" + (row.name || "") + "</b></td>" +
//                "<td>" + dobStr + "</td>" +
//                "<td>" + (row.gender || "") + "</td>" +
//                "<td>" + pfx + "</td>" +
//                "<td style='text-align:center;'>" +
//                    "<button onclick='PatientManager.deleteRec(" + row.id + ")' style='color:red; border:none; background:none; cursor:pointer; font-weight:bold;'>✖</button>" +
//                "</td>";
//
//            tbody.appendChild(tr);
//        });
//    }
//
//    return {
//        search: search,
//
//        save: function() {
//            var vTitle = cmpTitle.getValue();
//            var vName = document.getElementById('input-name').value;
//            var vDob = cmpDob.getValue();
//            var vGender = cmpGender.getValue();
//            var vPrefix = cmpPrefix.getValue();
//
//            if (!vName) { alert("Please enter a name"); return; }
//
//            PatientController.savePatient(vTitle, vName, vDob, vGender, vPrefix, {
//                callback: function() {
//                    alert("Saved!");
//                    document.getElementById('input-name').value = "";
//                    cmpTitle.reset(); cmpDob.reset(); cmpGender.reset(); cmpPrefix.reset();
//                    search();
//                }
//            });
//        },
//
//        deleteRec: function(id) {
//            if(confirm("Delete ID " + id + "?")) {
//                PatientController.deletePatient(id, { callback: search });
//            }
//        },
//
//        deleteAll: function() {
//            if(confirm("Delete ALL records?")) {
//                PatientController.deleteAll({ callback: search });
//            }
//        },
//
//        clearDates: function() {
//            cmpFrom.reset(); cmpTo.reset(); search();
//        }
//    };
//})();