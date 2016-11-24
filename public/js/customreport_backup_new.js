var dataSources = [{
    "id": "account_detail",
    "name": "Account Detail",
    "data": [{
        "accountHolder": "John Q. Public",
        "accountNumber": "Z04-20049713",
        "accountValue": 9040.17,
        "freeCredit": 7482.57,
        "startDate": new Date(2015, 11, 1),
        "endDate": new Date(2015, 11, 31),
        "netChange": -194.64,
        "changeItems": [{
            "category": "Beginning Account Value",
            "description": "",
            "currentPeriod": 9234.81,
            "ytd": 0
        }, {
            "category": "Additions",
            "description": "Exchanges In",
            "currentPeriod": 0,
            "ytd": 10000
        }, {
            "category": "Subtractions",
            "description": "Transaction Costs & Fees",
            "currentPeriod": 0,
            "ytd": -28.54
        }, {
            "category": "Change in Investment Value",
            "description": "",
            "currentPeriod": -194.64,
            "ytd": -931.29
        }],
        "holdings": [{
            "name": "Core Account",
            "amount": 7482,
            "color": "#E0E0E0"
        }, {
            "name": "Stocks",
            "amount": 1557,
            "color": "#9CCC65"
        }],
        "incomeItems": [{
            "category": "Taxable",
            "description": "Interest",
            "currentPeriod": 0.06,
            "ytd": 0.31
        }]
    }]
}];

var report = jsreports.createReport('Bank Statement')
    .data('account_detail')
    .page(11, 8.5, 'inches')
    .margins(0.5)
    .header(1.25)
    //.image('images/magnifibank-logo.png', 0, 0, 2.5, 1)
    .text('Account Summary', 5.25, 0.15, 4.75, 0.2, {
        bold: true,
        align: 'right',
        fontsize: 13
    })
    .text('[=FORMAT(startDate, \'mmm d, yyyy\')] to [=FORMAT(endDate, \'mmm d, yyyy\')]', 5.25, 0.4, 4.75, 0.2, {
        align: 'right',
        fontsize: 13
    })
    .detail(5.5)
    .text('Account Value:', 0, 0, 2.5, 0.5, {
        fontsize: 15
    })
    .text('[accountValue]', 2.5, 0, 2.25, 0.5, {
        fontsize: 15,
        bold: true,
        pattern: '$#,##0.00',
        align: 'right'
    })
    .text('Change in Account Value', 0, 0.75, 2.5, 0.5, {
        fontsize: 14,
        text_color: '#777'
    })
    .text('[netChange]', 2.5, 0.75, 2.25, 0.5, {
        fontsize: 14,
        align: 'right',
        pattern: '$#,##0.00;($#,##0.00)',
        text_color: '#777',
        bold: true
    })
    .table(0, 1.25, 4.75, 2.5, {
        data: 'changeItems',
        hasFooter: true,
        groupBy: 'category',
        fontSize: 9,
        hideRowWhenExpr: '!description'
    })
    .column('50%', '   [description]', '', '', {
        align: 'left',
        group0Header: '[category]'
    })
    .column('25%', '[currentPeriod]', 'This Period', '[SUM(currentPeriod)]', {
        align: 'right',
        detailStyle: {
            pattern: '#,##0.00'
        },
        group0Header: '[SUM(currentPeriod)]',
        group0HeaderStyle: {
            pattern: '#,##0.00'
        }
    })
    .column('25%', '[ytd]', 'Year-to-Date', '[SUM(ytd)]', {
        align: 'right',
        detailStyle: {
            pattern: '#,##0.00'
        },
        group0Header: '[SUM(ytd)]',
        group0HeaderStyle: {
            pattern: '#,##0.00'
        }
    })
    .text('Free Credit Balance', 0, 3, 2.25, 0.2, {
        fontsize: 11
    })
    .text('[freeCredit]', 3, 3, 1.75, 0.2, {
        align: 'right',
        pattern: '$#,##0.00',
        fontsize: 11
    })
    .text('Account # [accountNumber]', 5.25, 0, 4.75, 0.2, {
        bold: true,
        align: 'right',
        fontsize: 13
    })
    .text('[accountHolder] - INDIVIDUAL', 5.25, 0.25, 4.75, 0.2, {
        bold: true,
        align: 'right',
        fontsize: 13
    })
    .text('Account Holdings', 5.25, 0.75, 4.75, 0.25, {
        fontsize: 13
    })
    .chart('pie', 5.25, 1, 4.75, 2, {
        data: "holdings"
    })
    .series('amount', 'name', 'color')
    .table(5.25, 3.25, 4.75, 1.5, {
        data: 'holdings',
        hasFooter: true,
        fontSize: 9
    })
    .column('50%', '[name]', 'Holding Type', '', {
        align: 'left'
    })
    .column('25%', '[amount]', 'Value', '[SUM(amount)]', {
        align: 'right',
        detailStyle: {
            pattern: '#,##0'
        },
        footerStyle: {
            pattern: '#,##0'
        }
    })
    .column('25%', '[=amount / SUM(\'amount\')]', 'Percent of Account', '100%', {
        align: 'right',
        detailStyle: {
            pattern: '0%'
        },
        footerStyle: {
            pattern: '0%'
        }
    })
    .text('Please note that due to rounding, percentages may not add to 100%.',
        5.25, 4.5, 4.75, 1, {
            fontsize: 10,
            wrap: true
        })
    .text(['Important disclosures: Past results do not guarantee future',
            'returns.  All investments involve risk.'
        ].join(' '),
        0, 3.5, 4.75, 1, {
            fontsize: 10,
            wrap: true
        })
    .text('Income Summary', 0, 4.5, 4.75, 0.5, {
        fontsize: 13
    })
    .table(0, 4.85, 4.75, 1, {
        data: 'incomeItems',
        groupBy: 'category',
        hasFooter: true,
        fontSize: 9
    })
    .column('50%', '   [description]', '', '', {
        align: 'left',
        group0Header: '[category]'
    })
    .column('25%', '[currentPeriod]', 'This Period', '[SUM(currentPeriod)]', {
        align: 'right',
        footerStyle: {
            pattern: '$#,##0.00'
        }
    })
    .column('25%', '[ytd]', 'Year-to-Date', '[SUM(ytd)]', {
        align: 'right',
        footerStyle: {
            pattern: '$#,##0.00'
        }
    })
    .pageFooter(0.5)
    .text('Page 1 of 1', 9, 0.5, 1.5, 0.25, {
        fontsize: 10,
        italic: true
    })
    .done();

$(document).ready(function() {
    jsreports.render({
        report_def: report,
        target: $(".report_preview").css('min-height', '805px'),
        datasets: dataSources,
        showToolbar: false,
        scaleFonts: true
    });

    var designer = new jsreports.Designer({
        embedded: true,
        container: $(".report-designer").css('min-height', '805px'),
        data_sources: dataSources,
        report_def: report,
        layout: "horizontal"
    });
});
