const { connect } = require('mongoose')
const config = require('config')
const dbURI = config.get('mongo-link')

const dbConnect = async () => {
  try {
    await connect(dbURI)
    console.log("Successful Database Connection!")
  } catch (er) {
    console.error(er.message)
    process.exit(1)
  }
}

module.exports = dbConnect
