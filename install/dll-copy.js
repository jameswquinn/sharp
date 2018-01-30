'use strict';

const fs = require('fs');
const path = require('path');

const copyFileSync = require('fs-copy-file-sync');
const npmLog = require('npmlog');

if (process.platform === 'win32') {
  const vendorLibDir = path.join(__dirname, '..', 'vendor', 'lib');
  const buildReleaseDir = path.join(__dirname, '..', 'build', 'Release');
  npmLog.info('sharp', `Copying DLLs from ${vendorLibDir} to ${buildReleaseDir}`);
  try {
    fs
      .readdirSync(vendorLibDir)
      .filter(function (filename) {
        return /\.dll$/.test(filename);
      })
      .forEach(function (filename) {
        copyFileSync(
          path.join(vendorLibDir, filename),
          path.join(buildReleaseDir, filename)
        );
      });
  } catch (err) {
    npmLog.error('sharp', err.message);
  }
}
