const response = {
  error (msg, code = 500) {
    let err = new Error(msg)
    err.httpStatus = code
    return err
  },
  success (msg, data= {}, code = 200) {
    return {
      msg,
      statusCode: code,
      data
    }
  }
}

const validation = {}

module.exports = {
  response,
  validation
}
