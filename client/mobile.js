var xAccelBox = document.getElementById('x-accel');
var yAccelBox = document.getElementById('y-accel');
var zAccelBox = document.getElementById('z-accel');

imperio.emitRoomSetup();

// handle accel data using our library
imperio.emitAcceleration.gravity(printAccelerationData);

function printAccelerationData(accObj) {
  xAccelBox.innerHTML = `${accObj.x}`;
  yAccelBox.innerHTML = `${accObj.y}`;
  zAccelBox.innerHTML = `${accObj.z}`;
}
