import * as $ from 'jquery';
import getVersion from './version';
export { getVersion };

const instructionIdTemplate = "bug_report_instruction";
const buttonIdTemplate = "bug_report_button";
const thanksIdTemplate = "bug_report_thanks";

class BugReportParams {
    constructor(params) {
        this.name = "";
        this.promptMessage = "Оставте комментарий и контакт для связи с Вами, если хотите.";
        this.backendServer =  "http://127.0.0.1:5000";
        this.backendRoute =  "/bug_report/create";
        this.ajaxErrorMessage =  "При отправке сообщения возникли ошибки.";
    }
};

class BugReport {

    // make names of containers by templates
    _getIdFromTemplate(template) { return this.name ? [this.name, template].join('_') : template;}
    //
    getInstructionId() { return this._getIdFromTemplate(instructionIdTemplate); }
    getButtonId() { return this._getIdFromTemplate(buttonIdTemplate); }
    getThanksId() { return this._getIdFromTemplate(thanksIdTemplate); }

    constructor(bugReportParams) {
        this.name = bugReportParams.name;
        this.promptMessage =  bugReportParams.promptMessage;
        this.backendServer =  bugReportParams.backendServer;
        this.backendRoute =  bugReportParams.backendRoute;
        this.ajaxErrorMessage =  bugReportParams.ajaxErrorMessage;
        // auto binding
        this._bind();
    }

    // bind BugReport object to containers at page
    _bind() {
        let button = document.getElementById(this.getButtonId());
        if (!button) return;
        button.onclick = () => this.getReport();
    }

    _messageAtPromptWindow(where, what) {
        return [where, what, this.promptMessage].join('\n\n')
    }

    _getBackendServerRoute() {
        // return [this.backendServer, this.backendRoute].join('');
        return `${this.backendServer}${this.backendRoute}`;
    }

    getReport() {
        let selectedText = window.getSelection().toString();
        if (!selectedText) return;
        var message = this._messageAtPromptWindow(window.location.href, selectedText);
        var userPrompt = prompt(message, "");
        if (userPrompt != null) {
            this.sayThanks();
            // honest send
            this.sendReport(
                window.location.href,
                selectedText,
                userPrompt,
                true
            );
            return;
        }
        // I wanna know all attempts
        // force send of uncertain user unprompted message
        this.sendReport(
            window.location.href,
            selectedText,
            userPrompt || '',
            false
        );
    }

    // hide or show
    _setContainerVisibilityState(containerId, state = true) {
        let container = document.getElementById(containerId);
        container && (container.style.visibility = state ? 'visible' : 'hidden');
    }

    sayThanks(show_thanks = true) {
        // hide or show thanksContainer
        this._setContainerVisibilityState(this.getThanksId(), show_thanks);
        // hide or show instructionContainer
        this._setContainerVisibilityState(this.getInstructionId(), !show_thanks);
        // hide or show buttonContainer
        this._setContainerVisibilityState(this.getButtonId(), !show_thanks);
        //
        if (!show_thanks) return;
        setTimeout(() => this.sayThanks(false), 3000);
    }

    sendReport(href, selectedText, userText, honestMarker){
        /* NATIVE HTTP AJAX POST */
        /* */
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this._getBackendServerRoute(), true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == '200') { return; }
                if (!honestMarker) return;
                alert(this.ajaxErrorMessage + xhr.statusText);
            }
        };

        xhr.send(JSON.stringify({
            href: href,
            selectedText: selectedText,
            userText: userText,
            honestMarker: honestMarker,
        }));


        /* SOME BROWSERS LIKE FF NOT WORK WITH FETCH */
        /*
        fetch(
            this._getBackendServerRoute(),
            {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: {
                    href: href,
                    selectedText: selectedText,
                    userText: userText,
                    honestMarker: honestMarker
                }
            }
        ).then(function(response) {
            if(response.ok) return;
            if(honestMarker) alert("При отправке сообщения возникли ошибки");
        }).catch(function(error) {
            if(honestMarker) alert('Error: ' + error);
            if(honestMarker) console.log('Error: ' + error.message);
        });
        */

        /* JQUERY AJAX POST */
        /* WORK EVERYWHERE */
        /*
        let that = this;
        $.ajax({
            url: this._getBackendServerRoute(),
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                href: href,
                selectedText: selectedText,
                userText: userText,
                honestMarker: honestMarker}
            ),
            // success: function(response) { alert('Готово'); },
            // CROSS-DOMAIN ajax NOT CATCH textStatus AND errorThrown, IT's SO BAD, SO BAD
            error: function(XMLHttpRequest, textStatus, errorThrown) { if (honestMarker) {
                alert(`${that.ajaxErrorMessage} ${ errorThrown ? `(${textStatus}: ${errorThrown})` :''}`)
            }}
        });
        */

    }
};

// default BugReport object
let bugReport = new BugReport(new BugReportParams());

export { BugReport, BugReportParams }