const image = document.getElementById('image')

image.source = null;

image.initialize = function() {
  this.threshold = threshold.set(164);
  this.ratio = ratio.set(5);
  this.source = cv.imread(this);
  this.dst = new cv.Mat();

  [this, output].forEach((i) => i.show());
}

image.blur = function() {
  const kernelSize = new cv.Size(3,3);
  const anchor = new cv.Point(-1, -1);

  cv.blur(this.dst, this.dst, kernelSize, anchor, cv.BORDER_DEFAULT);
  return this;
}

image.detectEdge = function() {
  cv.Canny(this.dst, this.dst, this.threshold, (this.threshold * this.ratio), 3)
  return this;
}

image.detectLines = function() {
  this.lines = new cv.Mat();
  cv.HoughLinesP(this.dst, this.lines, 1, Math.PI / 180, 2, 0, 0);
  return this;
}

image.drawLines = function() {
  this.detectLines();

  const color = new cv.Scalar(255, 0, 0);
  const dst = new cv.imread(this);

  for (let i = 0; i < this.lines.rows; ++i) {
    const startPoint = new cv.Point(this.lines.data32S[i * 4], this.lines.data32S[i * 4 + 1]);
    const endPoint = new cv.Point(this.lines.data32S[i * 4 + 2], this.lines.data32S[i * 4 + 3]);
    cv.line(dst, startPoint, endPoint, color);
  }

  [this.dst, this.lines].forEach((i) => i.delete());
  this.dst = dst;

  return this;
}

image.equalize = function() {
  cv.equalizeHist(this.dst, this.dst);
  return this;
}

image.render = function() {
  return this.toGrayscale().blur().equalize().detectEdge().drawLines().dst;
}

image.show = function() {
  cv.imshow('canvas', this.render());
  this.dst.delete();
}

image.toGrayscale = function() {
  cv.cvtColor(this.source, this.dst, cv.COLOR_BGR2GRAY, 0);
  return this;
}

image.onload = image.initialize;

image.onThresholdChanged = function(value) {
  this.dst = new cv.Mat();
  this.threshold = value;
  this.show();
}

image.onRatioChanged = function(value) {
  this.dst = new cv.Mat();
  this.ratio = value;
  this.show();
}
