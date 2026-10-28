module.exports = initTaskModel;

function initTaskModel(mongoose) {
  const { Schema } = mongoose;

  const TaskSchema = new Schema(
    {
      task: String
    }, {
      timestamps: true,
    });

    mongoose.model('Task', TaskSchema, 'tasks');
}
