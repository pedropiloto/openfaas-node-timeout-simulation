"use strict";
const { NodeVM } = require("vm2");
const ARGUMENTS_PROPERTY_NAME = "args";
const EXECUTION_ERROR_CODE = "0600002";
module.exports = async (event, context) => {
  // It contains the function code and its parameters
  const code = event.body.code;
  let functionCode1 = 'while(true){console.log("it works");}';
  let functionCode2 = 'console.log("it works")';
  let functionCode = code === 1 ? functionCode1 : functionCode2;

    if (code === 1) {
      while (true) {}
    } else {
      return context
        .headers({ "Content-Type": "application/json" })
        .status(200)
        .succeed({ body: "it works" });
    }
};
function errorMessage(errorCode, errorMessage) {
  return {
    errorCode,
    errorMessage,
  };
}
