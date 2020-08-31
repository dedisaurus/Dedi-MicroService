var kue = require('kue')
    , cluster = require('cluster')
    , jobs = kue.createQueue();

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node_kue');

var ActivityLog = require('./models/activity_log.js');
var clusterWorkerSize = require('os').cpus().length;

if (cluster.isMaster) {

    // start the UI
    kue.app.listen( 8080 );
    console.log( 'UI started on port 3000' );

    for (var i = 0; i < clusterWorkerSize; i++) {
        cluster.fork();
    }
} else {

    // Consumer / Worker for jobs testing

    jobs.process( 'activity_log', 10, function ( job, done ) {
      console.log( 'Starting ' + job.data.title );

      console.log("Execute activity_log jobs...");

        var activity_log = new ActivityLog({
                        title: job.data.title ,
                        body:job.data.body ,
                        status:job.data.status 
                    });

        activity_log.save(function(err) {
            if (err)
            {
                console.log(err);
            }
            else
            {
                setTimeout( function () {
                    console.log( 'Finished activity log jobs: ' + job.data.title );
                    done();
                }, 100 );
            }
        });
    });

    jobs.process( 'testing', 4, function ( job, done ) {
      console.log( 'Starting ' + job.data.title );

      console.log("Execute testing jobs...");

      setTimeout( function () {
        console.log( 'Finished ' + job.data.title );
        done();
      }, 1000 );
    });

}