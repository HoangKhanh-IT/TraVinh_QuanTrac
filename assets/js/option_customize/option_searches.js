/*----- DOM Option Loại hình và Quan trắc -----*/
$(function () {
    $.getJSON("services/call_obstyles_option.php", function (data_obstyles) {
        $('#loaihinh').jstree({
            'core': {
                'themes': {
                    'icons': false
                },
                'data': data_obstyles
            },
            "checkbox": {
                "keep_selected_style": false,
            },
            "plugins": ["checkbox", "changed"]
        }).bind("open_node.jstree", function (event, data) {
            var obj_node_last = data.instance.get_node(data.node, true);
            var obj_node = $('li#2.jstree-node.jstree-open')
            /*** Kiểm tra các Obj_node_last có mở không, nếu có sẽ đóng ***/
            if (obj_node_last) {
                obj_node_last.siblings('.jstree-open').each(function () {
                    data.instance.close_node(this, 0);
                });
            }
            /*** Kiểm tra các Obj_node (tìm kiếm Obj_node_last) có mở không, nếu có sẽ đóng ***/
            if (obj_node) {
                obj_node.siblings('.jstree-open').each(function () {
                    data.instance.close_node(this, 0);
                });
            }
        })
    })
})

/*----- DOM Option Loại trạm -----*/
function dom_categories_option() {
    $.getJSON("services/call_categories_option.php", function (data_category) {
        $('#loaitram')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn loại trạm"));
        $.each(data_category, function (key, value) {
            $('#loaitram')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_categories_option();

/*----- DOM Option Huyện -----*/
function dom_districts_option() {
    $.getJSON("services/call_districts_option.php", function (data_district) {
        $('#district')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn quận huyện"));
        $.each(data_district, function (key, value) {
            $('#district')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_districts_option();

/*----- DOM Option Loại địa danh -----*/
function dom_loctype_option() {
    $.getJSON("services/call_loctype_option.php", function (data_locType) {
        $('#locType')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn loại địa danh"));
        $.each(data_locType, function (key, value) {
            $('#locType')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_loctype_option();

/*----- DOM Option Địa danh -----*/
function dom_location_option() {
    $.getJSON("services/call_location_option.php", function (data_location) {
        $('#location')
            .append($("<option></option>")
                .attr('value', 'none').text("Lựa chọn địa danh"));
        $.each(data_location, function (key, value) {
            $('#location')
                .append($("<option></option>")
                    .attr('value', value.id).text(value.name));
        });
    })
}
dom_location_option();