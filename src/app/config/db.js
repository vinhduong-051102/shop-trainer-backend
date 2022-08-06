const mongoose = require('mongoose')

const connect = async (URL) => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  }
  catch (err) {
    console.log(err)
  }
} 

module.exports = { connect }