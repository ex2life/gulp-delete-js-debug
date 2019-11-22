const obrabot = require('../index');
var File = require('vinyl');
var src = "function lzw_encode(s) {\n" +
    "    let dict = {};\n" +
    "    let code = 0;\n" +
    "    let data = (s + \"\").split(\"\");\n" +
    "    console.log(\"fdgd\");\n" +
    "    data.forEach(function (element) {\n" +
    "        debugger;\n" +
    "        if (!(dict[element] != null)) {\n" +
    "            window.console.error(\"fdgfg\");\n" +
    "            dict[element] = code;\n" +
    "            code++;\n" +
    "        }\n" +
    "       alert('фсе');\n" +
    "    });";

test('Тест удаления только console', () => {
    // create the fake file
    var fakeFile = new File({
        contents: new Buffer(src)
    });

    // Create a prefixer plugin stream
    var myobrabot = obrabot({
        debugtype: ['console']
    });

    // write the fake file to it
    myobrabot.write(fakeFile);

    // wait for the file to come back out
    myobrabot.once('data', function (file) {
        // make sure it came out the same way it went in

        expect(file.isBuffer()).toBe(true);


        expect(file.contents.toString('utf8')).toBe("function lzw_encode(s) {\n" +
            "    let dict = {};\n" +
            "    let code = 0;\n" +
            "    let data = (s + \"\").split(\"\");\n" +
            "    \n" +
            "    data.forEach(function (element) {\n" +
            "        debugger;\n" +
            "        if (!(dict[element] != null)) {\n" +
            "            window.console.error(\"fdgfg\");\n" +
            "            dict[element] = code;\n" +
            "            code++;\n" +
            "        }\n" +
            "       alert('фсе');\n" +
            "    });");
    });
});
test('Тест удаления только window.console', () => {
    // create the fake file
    var fakeFile = new File({
        contents: new Buffer(src)
    });

    // Create a prefixer plugin stream
    var myobrabot = obrabot({
        debugtype: ['window.console']
    });

    // write the fake file to it
    myobrabot.write(fakeFile);

    // wait for the file to come back out
    myobrabot.once('data', function (file) {
        // make sure it came out the same way it went in

        expect(file.isBuffer()).toBe(true);


        expect(file.contents.toString('utf8')).toBe("function lzw_encode(s) {\n" +
            "    let dict = {};\n" +
            "    let code = 0;\n" +
            "    let data = (s + \"\").split(\"\");\n" +
            "    console.log(\"fdgd\");\n" +
            "    data.forEach(function (element) {\n" +
            "        debugger;\n" +
            "        if (!(dict[element] != null)) {\n" +
            "            \n" +
            "            dict[element] = code;\n" +
            "            code++;\n" +
            "        }\n" +
            "       alert('фсе');\n" +
            "    });");
    });
});
test('Тест удаления только debugger', () => {
    // create the fake file
    var fakeFile = new File({
        contents: new Buffer(src)
    });

    // Create a prefixer plugin stream
    var myobrabot = obrabot({
        debugtype: ['debugger']
    });

    // write the fake file to it
    myobrabot.write(fakeFile);

    // wait for the file to come back out
    myobrabot.once('data', function (file) {
        // make sure it came out the same way it went in

        expect(file.isBuffer()).toBe(true);


        expect(file.contents.toString('utf8')).toBe("function lzw_encode(s) {\n" +
            "    let dict = {};\n" +
            "    let code = 0;\n" +
            "    let data = (s + \"\").split(\"\");\n" +
            "    console.log(\"fdgd\");\n" +
            "    data.forEach(function (element) {\n" +
            "        \n" +
            "        if (!(dict[element] != null)) {\n" +
            "            window.console.error(\"fdgfg\");\n" +
            "            dict[element] = code;\n" +
            "            code++;\n" +
            "        }\n" +
            "       alert('фсе');\n" +
            "    });");
    });
});
test('Тест удаления только alert', () => {
    // create the fake file
    var fakeFile = new File({
        contents: new Buffer(src)
    });

    // Create a prefixer plugin stream
    var myobrabot = obrabot({
        debugtype: ['alert']
    });

    // write the fake file to it
    myobrabot.write(fakeFile);

    // wait for the file to come back out
    myobrabot.once('data', function (file) {
        // make sure it came out the same way it went in

        expect(file.isBuffer()).toBe(true);


        expect(file.contents.toString('utf8')).toBe("function lzw_encode(s) {\n" +
            "    let dict = {};\n" +
            "    let code = 0;\n" +
            "    let data = (s + \"\").split(\"\");\n" +
            "    console.log(\"fdgd\");\n" +
            "    data.forEach(function (element) {\n" +
            "        debugger;\n" +
            "        if (!(dict[element] != null)) {\n" +
            "            window.console.error(\"fdgfg\");\n" +
            "            dict[element] = code;\n" +
            "            code++;\n" +
            "        }\n" +
            "       \n" +
            "    });");
    });
});
test('Тест удаления всего и сразу', () => {
    // create the fake file
    var fakeFile = new File({
        contents: new Buffer(src)
    });

    // Create a prefixer plugin stream
    var myobrabot = obrabot({
        debugtype: ['console', 'window.console', 'debugger', 'alert']
    });

    // write the fake file to it
    myobrabot.write(fakeFile);

    // wait for the file to come back out
    myobrabot.once('data', function (file) {
        // make sure it came out the same way it went in

        expect(file.isBuffer()).toBe(true);


        expect(file.contents.toString('utf8')).toBe("function lzw_encode(s) {\n" +
            "    let dict = {};\n" +
            "    let code = 0;\n" +
            "    let data = (s + \"\").split(\"\");\n" +
            "    \n" +
            "    data.forEach(function (element) {\n" +
            "        \n" +
            "        if (!(dict[element] != null)) {\n" +
            "            \n" +
            "            dict[element] = code;\n" +
            "            code++;\n" +
            "        }\n" +
            "       \n" +
            "    });");
    });
});
test('Тест удаления всего и сразу, если пользователь не передал список команд', () => {
    // create the fake file
    var fakeFile = new File({
        contents: new Buffer(src)
    });

    // Create a prefixer plugin stream
    var myobrabot = obrabot();

    // write the fake file to it
    myobrabot.write(fakeFile);

    // wait for the file to come back out
    myobrabot.once('data', function (file) {
        // make sure it came out the same way it went in

        expect(file.isBuffer()).toBe(true);


        expect(file.contents.toString('utf8')).toBe("function lzw_encode(s) {\n" +
            "    let dict = {};\n" +
            "    let code = 0;\n" +
            "    let data = (s + \"\").split(\"\");\n" +
            "    \n" +
            "    data.forEach(function (element) {\n" +
            "        \n" +
            "        if (!(dict[element] != null)) {\n" +
            "            \n" +
            "            dict[element] = code;\n" +
            "            code++;\n" +
            "        }\n" +
            "       \n" +
            "    });");
    });
});