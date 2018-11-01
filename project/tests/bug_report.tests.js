'use strict;'
// Just for test Webpack bundling
alert('my.bug_report.js - RUNNING');
// Just for test Webpack bundling
import { get_version } from './version';
// alert with get_version() works fine
//alert('my.bug_report.js - get_version() = ' + get_version());

import { BugReport } from './bug_report';

// alert works fine
alert('my.bug_report.js - let get static BugReport.idInstruction ');
// alert works fine
alert('my.bug_report.js - BugReport.idInstruction = ' + BugReport.idInstruction);
alert('my.bug_report.js - new BugReport() = ' + (new BugReport()));
alert('my.bug_report.js - new BugReport().promptMessage = ' + (new BugReport()).promptMessage);
alert('my.bug_report.js - new BugReport().name (example) = ' + (new BugReport(name='example')).name);

// how can I define my self object?!
// TEST 1 - NOT WORK with 'name=' and 'promptMessage='
// var my_bug_report = new BugReport(
//    name='my',
//    promptMessage='Leave a comment and contact to contact you if you want.'
// );

// fuck - it must be without 'arg='
let my_bug_report = new BugReport('my','Leave a comment and contact to contact you if you want.');

// Just for test Webpack bundling
alert('It\'s OK'

$('#example_bug_report_button').html('Save');;);
