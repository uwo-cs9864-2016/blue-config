'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cfenv = require('cfenv');
const _ = require('lodash');

module.exports = function Config(pathname) {

  assert(_.isString(pathname), "Must specify pathname that exists.");
  
  fs.accessSync(pathname, fs.R_OK);

  let vcap;
  let config;

  if (!!process.env['VCAP_APP_PORT']) {
    // bluemix
    config = require(path.join(pathname, 'config.bluemix.json'));

    vcap = cfenv.getAppEnv();
    
    if (_.has(config, 'vcap.services')) {
      _.each(config.vcap.services, (v, key) => {
        vcap.services[key] = v;
      });  
    }
  } else {
    // local 
    config = require(path.join(pathname, 'config.local.json'));
    
    let ext = {};
    if (_.has(config, 'vcap')) {
      ext = { vcap: config.vcap };
    }
    
    vcap = cfenv.getAppEnv(ext);
  }

  if (_.has(vcap, "locals")) {
    vcap.locals = config.locals;
  } else {
    vcap.locals = {};
  }

  return vcap;
};
