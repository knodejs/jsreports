$(document).ready(function() {

    var orderData = [{
        "userId": "1X39AN4Z92Y",
        "userName": "John Smith",
        "accountType": "INDIVIDUAL",
        "orderTotal": 19.95,
        "orderDate": "2016-02-24"
    }, {
        "userId": "1AC43L30HR8",
        "userName": "Alison Jones",
        "accountType": "BUSINESS",
        "orderTotal": 180.50,
        "orderDate": "2016-02-25"
    }, {
        "userId": "1CM499NA94R",
        "userName": "Becky Sanderson",
        "accountType": "BUSINESS",
        "orderTotal": 85.00,
        "orderDate": "2016-02-27"
    }];

    var orderSchema = {
        fields: [{
            name: "userId",
            type: "text"
        }, {
            name: "userName",
            type: "text"
        }, {
            name: "accountType",
            type: "text"
        }, {
            name: "orderTotal",
            type: "number"
        }, {
            name: "orderDate",
            type: "date"
        }]
    };

    var data_sources = [{
        "id": "orders",
        "name": "Orders",
        "data": orderData,
        "schema": orderSchema
    }];

    // Load the report definition from WEB API
    //TODO
    $.getJSON("data/orderreport.json", function(report_def) {
        console.log(report_def);
        renderDesigner(report_def);
        refreshPreview(report_def);
    });


    //initial/init from ui// save schema def blank template js report
    /*
    var report = jsreports.createReport()
        .data('orders')
        .groupBy('accountType', 'accountType', 'desc')
        .header(0.35)
        .text('[accountType] Accounts:')
        .footer(0.5)
        .text('Total: [SUM(orderTotal)]', 2, 0, 2, 0.25, {
            pattern: '$#,##0.00',
            align: 'right',
            bold: true
        })
        .detail()
        .text('[userName]')
        .text('[orderDate]', 1.75, 0, 1, 0.25, {
            pattern: 'M/D/YY'
        })
        .text('[orderTotal]', 3, 0, 1, 0.25, {
            pattern: '$#,##0.00',
            align: 'right'
        })
        .done();
    */




    var renderDesigner = function(report_def) {
        var designer = new jsreports.Designer({
            embedded: true,
            container: $(".report-designer").css('min-height', '500px'),
            data_sources: data_sources,
            report_def: report_def,
            layout: "horizontal"
        });

        $(designer).on("save", function(evt, reportdef) {
            console.log(reportdef);
            report_def = JSON.parse(reportdef);
            //TODO
            //POST TO WEB API
            //update preview
            refreshPreview(report_def);
        });
    };
    var refreshPreview = function(report_def) {
        
        $(".report_preview").empty();
        jsreports.render({
            report_def: report_def,
            target: $(".report_preview").css('min-height', '500px'),
            datasets: data_sources
        });
    };
});