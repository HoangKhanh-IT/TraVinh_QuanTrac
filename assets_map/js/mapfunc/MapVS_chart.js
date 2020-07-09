/*---- Chart cho từng trạm khi bấm vào từng trạm hoặc tìm kiếm trạm ----*/
function render_columnchart_quantrac(div_id, data_chart, name_title, key, data) {
    am4core.useTheme(am4themes_animated);
    am4core.ready(function () {

        /** Remove Logo **/
        $("g[opacity='0.3']").remove();
        $("g[opacity='0.4']").remove();
        var chart = am4core.create(div_id, am4charts.XYChart);
        chart.data = data_chart;

        chart.language.locale = am4lang_vi_VN;
        chart.logo.height = -500;
        chart.fontSize = 13;
        chart.dateFormatter.inputDateFormat = "HH:mm:ss, dd/MM/yyyy";

        /*** View Chart Column theo Date ***/
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        /*** Label thời gian nằm giữa column ***/
        dateAxis.renderer.labels.template.location = 0.5;
        dateAxis.renderer.minGridDistance = 50;
        /*** Thay đổi width chart do khoảng cách thời gian ***/
        dateAxis.baseInterval = {
            "timeUnit": "minute",
            "count": 5
        }
        dateAxis.tooltipDateFormat = "HH:mm:ss, dd/MM/yyyy";
        dateAxis.showOnInit = false;

        /*** View Chart Column theo Category đẹp
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "time";
        categoryAxis.renderer.maxGridDistance = 10; ***/

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "";

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = data;
        series.dataFields.dateX = key;
        /* series.stroke = "#007bff";
        series.dataFields.categoryX = key; */
        series.fill = "#007bff";
        series.fillOpacity = 0.3;
        series.yAxis = valueAxis;
        series.tooltipText = "Thời gian: {dateX}\n Giá trị: [bold font-size: 13]{valueY}[/]";

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.opacity = 0;

        var title = chart.titles.create();
        title.text = name_title;
        title.fontSize = 25;
        title.fontFamily = "Arial";
        title.marginBottom = 30;

        /* var label = categoryAxis.renderer.labels.template;
        label.wrap = true;
        label.maxWidth = 100;
        label.tooltipText = "{category}"; */

        chart.invalidateData();
    });
};

function render_linechart_quantrac(div_id, data_chart, name_title, key, data) {
    am4core.useTheme(am4themes_animated);
    am4core.ready(function () {

        /** Remove Logo **/
        $("g[opacity='0.3']").remove();
        $("g[opacity='0.4']").remove();
        var chart = am4core.create(div_id, am4charts.XYChart);
        chart.data = data_chart;

        chart.language.locale = am4lang_vi_VN;
        chart.logo.height = -500;
        chart.fontSize = 13;
        chart.dateFormatter.inputDateFormat = "HH:mm:ss, dd/MM/yyyy";

        /*** View Chart Line theo Date ***/
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;
        /*** Thay đổi width chart do khoảng cách thời gian ***/
        dateAxis.baseInterval = {
            "timeUnit": "second",
            "count": 1
        }
        dateAxis.tooltipDateFormat = "HH:mm:ss, dd/MM/yyyy";
        dateAxis.showOnInit = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "";

        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = data;
        series.dataFields.dateX = key;
        series.strokeWidth = 2;
        series.tensionX = 1;
        series.stroke = "#007bff";
        series.fill = "#007bff";
        series.fillOpacity = 0.3;
        series.yAxis = valueAxis;
        series.tooltipText = "Thời gian: {dateX}\n Giá trị: [bold font-size: 13]{valueY}[/]";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.opacity = 0;

        var title = chart.titles.create();
        title.text = name_title;
        title.fontSize = 25;
        title.fontFamily = "Arial";
        title.marginBottom = 30;

        chart.invalidateData();
    });
};

/*---- Group Chart của nhiều trạm quan trắc ----*/

/* function render_groupchart_quantrac(div_id, data_chart, type_chart, name_title, key, num_data) { */
function render_groupchart_quantrac(div_id, data_chart, name_title, key, data) {
    am4core.useTheme(am4themes_animated);
    am4core.ready(function () {

        /** Remove Logo **/
        $("g[opacity='0.3']").remove();
        $("g[opacity='0.4']").remove();
        var chart = am4core.create(div_id, am4charts.XYChart);
        chart.data = data_chart;

        chart.language.locale = am4lang_vi_VN;
        chart.logo.height = -500;
        chart.fontSize = 13;
        chart.dateFormatter.inputDateFormat = "HH:mm:ss, dd/MM/yyyy";

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        /*** Label thời gian nằm giữa column ***/
        dateAxis.renderer.labels.template.location = 0.5;
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.baseInterval = {
            "timeUnit": "minute",
            "count": 5
        }
        dateAxis.tooltipDateFormat = "HH:mm:ss, dd/MM/yyyy";

        function createAxisAndSeries(field, name, bullet, color) {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            if (chart.yAxes.indexOf(valueAxis) != 0) {
                valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
            }

            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = key;
            series.name = name;
            series.strokeWidth = 2;
            series.tensionX = 0.7;
            series.stroke = color;
            series.fill = color;
            series.fillOpacity = 0.3;
            series.tooltipText = "{name}\n[bold font-size: 13]{valueY}[/]";

            var interfaceColors = new am4core.InterfaceColorSet();

            switch (bullet) {
                case "triangle":
                    var bullet_1 = series.bullets.push(new am4charts.Bullet());
                    bullet_1.width = 12;
                    bullet_1.height = 12;
                    bullet_1.horizontalCenter = "middle";
                    bullet_1.verticalCenter = "middle";

                    var triangle = bullet_1.createChild(am4core.Triangle);
                    triangle.stroke = interfaceColors.getFor("background");
                    triangle.strokeWidth = 2;
                    triangle.direction = "top";
                    triangle.width = 12;
                    triangle.height = 12;
                    break;
                case "rectangle":
                    var bullet_2 = series.bullets.push(new am4charts.Bullet());
                    bullet_2.width = 12;
                    bullet_2.height = 12;
                    bullet_2.horizontalCenter = "middle";
                    bullet_2.verticalCenter = "middle";

                    var rectangle = bullet_2.createChild(am4core.Rectangle);
                    rectangle.stroke = interfaceColors.getFor("background");
                    rectangle.strokeWidth = 2;
                    rectangle.direction = "top";
                    rectangle.width = 12;
                    rectangle.height = 12;
                    break;
                case "circle":
                    var bullet_3 = series.bullets.push(new am4charts.Bullet());
                    bullet_3.width = 12;
                    bullet_3.height = 12;
                    bullet_3.horizontalCenter = "middle";
                    bullet_3.verticalCenter = "middle";

                    var circle = bullet_3.createChild(am4core.Circle);
                    circle.stroke = interfaceColors.getFor("background");
                    circle.strokeWidth = 2;
                    circle.direction = "top";
                    circle.width = 12;
                    circle.height = 12;
                    break;
            }
        }

        /*** Tạo Line Series theo từng trạm với mỗi thông số ***/
        createAxisAndSeries("Trạm NM01", "Trạm NM01", "circle", "#ffb157");
        createAxisAndSeries("Trạm NM02", "Trạm NM02", "triangle", "#007bff");
        createAxisAndSeries("Trạm NM03", "Trạm NM03", "rectangle", "#1ab400");

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.opacity = 0;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        var title = chart.titles.create();
        title.text = name_title;
        title.fontSize = 25;
        title.fontFamily = "Arial";
        title.marginBottom = 30;

        /*** Delay Time Export ***/
        chart.exporting.timeoutDelay = 500;

        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.align = "left";
        chart.exporting.menu.verticalAlign = "top";
        chart.exporting.menu.items = [{
            "label": "XUẤT FILE",
            "menu": [
                {"type": "png", "label": "PNG"},
                {"type": "xlsx", "label": "Excel"},
                {"type": "pdf", "label": "PDF"}
            ]
        }];
    });
}
