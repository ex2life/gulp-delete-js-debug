"use strict";
var through = require('through2');
var PluginError = require('plugin-error');

//имя плагина
const PLUGIN_NAME = 'gulp-delete-js-debug';

function generate_reg_string(debugtype) {
    var strmas=[];
    if (debugtype.indexOf( 'debugger' ) !== -1) strmas.push("debugger;");
    if (debugtype.indexOf( 'alert' ) !== -1) strmas.push("alert\\([^;]*\\);");
    if ((debugtype.indexOf( 'console' ) !== -1)||(debugtype.indexOf( 'window.console' ) !== -1)) {
        var str="("
        if (debugtype.indexOf( 'console' ) !== -1){
            str+="(?<!\\.)console";
            if (debugtype.indexOf( 'window.console' ) !== -1) str+="|";
        }
        if (debugtype.indexOf( 'window.console' ) !== -1) str+="window.console";
        str+=").";
        str+="(?:log|info|warn|error|assert|count|clear|group|groupEnd|groupCollapsed|trace|debug|dir|dirxml|profile|profileEnd|time|timeEnd|timeStamp|table|exception)" +
            "\\([^;]*\\);?";
        strmas.push(str);
    }
    return strmas.join("|");
}

function obrabot(options) {
    //поток, по которому будут проходить все файлы
    var stream = through.obj(function(file, enc, cb) {
        if (file.isBuffer()) {
            options = options || {};
            //если файл пуст
            if (file.isNull()) {
                //вернуть пустой файл
                return cb(null, file);
            }
            //если пользователь не указал что удалить, то удаляем все
            if (!("debugtype" in options)) {
                options.debugtype = [
                    "console",
                    "window.console",
                    "debugger",
                    "alert"
                ];
            }
            console.log("Удалена следующая отладочная информация: "+options.debugtype);
            //генерируем регулярное выражение
            var regex_console = new RegExp(
                generate_reg_string(options.debugtype),
                "gim"
            );
            const data = file.contents.toString()
            // Заменяем информацию для отладки на пустую строку
                .replace(regex_console,"");

            // Загоняем строку обратно в буфер
            file.contents = new Buffer(data);

            // Передаём файл следующему плагину
            this.push(file);
        }

        if (file.isStream()) {
            var error= new PluginError(PLUGIN_NAME, 'Streams not supported!');
            console.log(error.toString());
            return cb();
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);
        // tell the stream engine that we are done with this file
        cb();
    });

    // returning the file stream
    return stream;
}

// exporting the plugin main function
module.exports = obrabot;



