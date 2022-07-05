import gulp from 'gulp';
import dev from './gulp/dev.js';
import build from './gulp/build.js';
const { task } = gulp;

task('default', cb => dev(cb));
task('build', cb => build(cb));
