console.log("server starts in a bit..");
var gulp = require('gulp');
var express = require('express');
var fs = require('fs');
var bodyParser = require("body-parser");
var dust = require("gulp-dust");
var browsersync = require('browser-sync');

var bs = browsersync.create();

gulp.task('express', function() {
    console.log("express starting..");
    var app = express();
    app.use(bodyParser.json());

    app.use('/', express.static('public'));

    app.get('/contactsList', function(request, response) {

        response.sendFile(__dirname + "/data/contactList.json");

    });

    app.post('/addContact', function(request, response) {

        //response.sendFile(__dirname + "/data/contactList.json");
        //read the file and update it
        console.log("incoming data=" + JSON.stringify(request.body));

        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


            console.log('file data' + data);
            var fileJsonData = JSON.parse(data);

            var newContact = request.body;

            newContact.id = fileJsonData.contactList.length + 1;

            console.log("newContact=" + JSON.stringify(newContact));

            fileJsonData.contactList.push(newContact);

            var stringFile = JSON.stringify(fileJsonData);

            fs.writeFile(__dirname + "/data/contactList.json", stringFile);
            //fs.close();

            response.send(stringFile);

        });



    });

    app.post('/deleteContact', function(request, response) {

        console.log("incoming data=" + JSON.stringify(request.body));

        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


            console.log('file data' + data);
            var fileJsonData = JSON.parse(data);

            var deletedContact = request.body;
            var index = -1;
            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id == deletedContact.id) {
                    index = i;
                }
            }
            console.log("index=" + index);
            if (index >= 0) {
                var newContactsList = fileJsonData.contactList.splice(index, 1);
                var stringFile = JSON.stringify(fileJsonData);
                console.log("after Delete=" + stringFile);
                fs.writeFile(__dirname + "/data/contactList.json", stringFile);
                response.send(stringFile);

            } else {
                response.send(JSON.stringify(fileJsonData));
            }

        });

    });

    app.get('/getContact', function(request, response) {

        var id = request.query.id;
        console.log("id=" + id);

        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


            console.log('file data' + data);
            var fileJsonData = JSON.parse(data);
            var foundContact = {};

            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id == id) {
                    foundContact = fileJsonData.contactList[i];
                }
            }


            var stringFile = JSON.stringify(foundContact);
            response.send(stringFile);


        });

        return "success";

    });

    app.post('/searchContact', function(request, response) {

        //response.sendFile(__dirname + "/data/contactList.json");
        //read the file and update it

        return "success";

    });

    app.post('/updateContact', function(request, response) {

        console.log("incoming data=" + JSON.stringify(request.body));

        fs.readFile(__dirname + "/data/contactList.json", 'utf-8', function(err, data) {


            console.log('file data' + data);
            var fileJsonData = JSON.parse(data);

            var updatedContact = request.body;

            for (var i = 0; i < fileJsonData.contactList.length; i++) {
                if (fileJsonData.contactList[i].id == updatedContact.id) {
                    fileJsonData.contactList[i] = updatedContact;
                    break;
                }
            }
            var stringFile = JSON.stringify(fileJsonData);

            fs.writeFile(__dirname + "/data/contactList.json", stringFile);
            //fs.close();

            response.send(stringFile);

        });

    });

    var server = app.listen(3000, function() {
        console.log("server started at port 3000");
    });
});

//browser sync task
gulp.task('browser-sync', function() {
    bs.init({

        proxy: {
            target: "localhost:3000",
            //ws: true // enables websockets
        },
        browser: "firefox"
    });
});

//dust task
gulp.task('dust', function() {
    gulp.src('public/js/*.dust')
        .pipe(dust())
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {

    // watch dust files
    gulp.watch('./public/js/*.dust', function() {
        gulp.run('dust');
    });

    gulp.watch("public/*.html").on('change', bs.reload);
    //gulp.watch("public/css/*.css").on('change', bs.reload);
    gulp.watch("public/js/*.js").on('change', bs.reload);

});


//Watch task
gulp.task('default', ['browser-sync', 'dust', 'watch' , 'express']);
