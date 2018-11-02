'use strict;'
import BugReport from '../../src/bug_report';
export { BugReport };
// Example
let exampleBugReport = new BugReport(
    'example',
    'Патлумачце дадаткова і пакажыце кантактныя дадзеныя, калі хочаце.'
);
// Mine
let myBugReport = new BugReport(
    'my',
    'Leave a comment and contact to contact you if you want.'
);
// test for redeclare promptMessage
myBugReport.promptMessage = 'Yo, put your contact here, bro...'
