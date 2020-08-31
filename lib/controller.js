const Task = require('./UserData');

var kue = require('kue')
  , jobs = kue.createQueue();

// Producer for jobs testing

for ( var i = 0; i < 10; i++ ) {
    console.log( 'Creating Job #' + i );

    jobs.create( 'testing', {
      title: 'jobs #' + i
    }).save();
}

exports.getTasks = async ctx => {
  ctx.body = await Task.find();
};

exports.getOneTask = async ctx => {
  const id = ctx.params.id;
  const task = await Task.findById(id);

  if (!task) {
    ctx.throw(404, 'Data not found');
  }
  ctx.body = task;
};

exports.createTask = async ctx => {
  let values = ctx.request.body;
  let newTask = await Task.create(values);

  for ( var i = 0; i < 100; i++ ) {
    console.log( 'Creating Activity Job #' + i );

    jobs.create( 'activity_log', {
        title: 'inserted item',
        body: values+ i,
        status:'200'
    }).save();
}

  if (!newTask || !newTask._id) {
    ctx.throw(500, 'Error creating task');
  }
  ctx.body = newTask;
};

exports.updateTask = async ctx => {
  const id = ctx.params.id;
  const values = ctx.request.body;

  let foundTask = await Task.findById(id);

  if (!foundTask || !foundTask._id) {
    ctx.throw(404, 'Data not found');
  }

  let updated = await Task.findByIdAndUpdate(id, values, { new: true });
  for ( var i = 0; i < 100; i++ ) {
    console.log( 'Creating Activity Job #' + i );

    jobs.create( 'activity_log', {
        title: 'update item',
        body: values+ i,
        status:'200'
    }).save();
}

  if (!updated || !updated._id) {
    ctx.throw(500, 'Error updating item');
  }

  ctx.body = updated;
};

exports.deleteTask = async ctx => {
  const id = ctx.params.id;

  const task = await Task.findById(id);
  if (!task) {
    ctx.throw(404, 'Data not found');
  }

  let deletedTask = await Task.findByIdAndRemove(id);

  for ( var i = 0; i < 100; i++ ) {
    console.log( 'Creating Activity Job #' + i );

    jobs.create( 'activity_log', {
        title: 'delete item',
        body: id+ i,
        status:'200'
    }).save();
}

  if (!deletedTask) {
    ctx.throw(500, 'Error deleting task');
  }

  ctx.body = deletedTask;
};
