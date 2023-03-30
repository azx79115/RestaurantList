const mongoose = require('mongoose')
const Schema = mongoose.Schemaconst
const listSchema = new Schema({
  name: {
    type: String,//資料型別是字串
    required: true //必填單位
  },
  done: {
    type: Boolean
  }
})

module.export = mongoose.model('Todo', todoSchema)
