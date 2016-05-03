'use strict';

const assert = require('assert');
const fs = require('fs');

const cfenv = require('cfenv');
const _ = require('lodash');

module.exports = function Config(path) {

  assert(_.isString(path), "Must specify path that exists.");
  
  fs.accessSync(path, fs.R_OK);

  let vcap;
  let config;

  if (!!process.env['VCAP_APP_PORT']) {
    // bluemix
    config = require(path + '/config.bluemix.json');

    vcap = cfenv.getAppEnv();
    _.each(config.vcap.services, (v, key) => {
      vcap.services[key] = v;
    });
  } else {

    config = require(path + '/config.local.json');

    vcap = cfenv.getAppEnv({ vcap: config.vcap });
  }

  vcap["locals"] = config.locals;

  return vcap;
};
