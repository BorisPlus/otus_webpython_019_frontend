'use strict;'
import { BugReport, BugReportParams } from '../../src/bug_report';
// Example
let exParams = new BugReportParams();
exParams.name = 'example';
exParams.promptMessage = 'Патлумачце дадаткова і пакажыце кантактныя дадзеныя, калі хочаце.';
exParams.ajaxErrorMessage = 'Пры адпраўцы паведамлення паўсталі памылкі.';
let exampleBugReport = new BugReport(
    exParams
);
// Mine
let myParams = new BugReportParams();
myParams.name = 'my';
myParams.promptMessage = 'Leave a comment and contact to contact you if you want.';
myParams.ajaxErrorMessage = 'There were errors while sending the message.';
let myBugReport = new BugReport(
    myParams
);
// test for redeclare promptMessage
myBugReport.promptMessage = 'Yo, put your contact here, bro...';

export { BugReportParams, BugReport };