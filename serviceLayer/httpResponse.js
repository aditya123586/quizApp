class HttpResponse {
  send(req, res) {
    const message = req.tempStore.message ? req.tempStore.message : "";
    const status = 200;
    const errorCode = 0;
    const data = req.tempStore.data ? req.tempStore.data : {};

    res.status(status).send({
      message,
      errorCode,
      data,
    });
  }

  sendError(exception, res, next) {
    const status = 500;
    const message = exception.message ? exception.message : exception;
    const errorCode = 1;
    const data = {};
    res.status(status).send({
      message,
      errorCode,
      data,
    });
  }
}

module.exports = HttpResponse;
