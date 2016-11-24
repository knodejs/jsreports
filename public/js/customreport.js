$(document).ready(function() {

    var orderData = [{
        "rtoName": "RTO NO ploblem First",
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
        "rtoName": "RTO NO ploblem Last",
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
        }, {
            name: "rtoName",
            type: "text"
        }]
    };

    var data_sources = [{
        "id": "Orders",
        "name": "Orders",
        "data": orderData,
        "schema": orderSchema
    }];

    // Load the report definition from WEB API
    //TODO
    // $.getJSON("data/orderreport.json", function(report_def) {
    //     console.log(report_def);
    //     renderDesigner(report_def);
    //     refreshPreview(report_def);
    // });


    //initial/init from ui// save schema def blank template js report

    var report = jsreports.createReport()
        .data('orders')
        .header(1.0)
        .detail(0.3)
        .footer(1.0)
        .done();

    var designer = new jsreports.Designer({
        embedded: true,
        container: $(".report-designer").css('min-height', '500px'),
        data_sources: data_sources,
        report_def: report,
        layout: "horizontal"
    });

    jsreports.libraryPath = "lib/jsreports";

    $(document).ready(function() {
        $(designer).on("save", function(evt, reportdef) {
            console.log(reportdef)
            preview(reportdef);
        });

        $(designer).on("render", function() {
            console.log('render designer')
            var btnRight = designer.addToolbarButton("New Button Right");
            $(btnRight).on("click", function() {
                alert("Right button clicked");
            });

            /** Add an arbitrary HTML element, here a container into which we'll append a drop-down */
            var span = designer.addToolbarElement('<span></span>', jsreports.ToolbarItemPosition.LEFT);
            var select = $('<select><option value="1">Option 1</option><option value="2">Option 2</option></select>');
            $(span).append(select).addClass('toolbar-dropdown');
            $(select).on("change", function() {
                alert("Selected " + $(this).val());
            });

            var btnLeft = designer.addToolbarButton("New Button Left", jsreports.ToolbarItemPosition.LEFT);
            $(btnLeft).on("click", function() {
                alert("Left button clicked");
            });
        });
    });

    function preview(reportdef) {
        report_def = JSON.parse(reportdef);
        jsreports.render({
            report_def: report_def,
            target: $(".report_preview").css('min-height', '500px'),
            datasets: data_sources
        });
    }


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
