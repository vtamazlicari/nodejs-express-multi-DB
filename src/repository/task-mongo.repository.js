
module.exports = function mongoTaskRepository(connection) {
  require('../models/task.mongoose')(connection);
  const { Task } = connection.models;

  return {
    async create(data) {
      const task = new Task(data);

      return task.save();
    },

    async remove(id) {
      await Task.deleteOne({ _id: id });

      return;
    },

    async list() {
      const tasks = await Task.find({});

      return tasks;
    },
  }
}
