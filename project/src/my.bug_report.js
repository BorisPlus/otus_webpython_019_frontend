'use strict;'
import { BugReport } from './bug_report';
export { BugReport };
// Example
let example_bug_report = new BugReport(
    'example',
    'Патлумачце дадаткова і пакажыце кантактныя дадзеныя, калі хочаце.'
);
// Mine
let my_bug_report = new BugReport(
    'my',
    'Leave a comment and contact to contact you if you want.'
);
// test for redeclare promptMessage
// my_bug_report.promptMessage = 'Yo, put your contact here, bro...'
