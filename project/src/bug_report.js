import * as $ from 'jquery';

let _templateIdInstruction = "bug_report_instruction";
let _templateIdButton = "bug_report_button";
let _templateIdThanks = "bug_report_thanks";

class BugReport {
    // static methods
    static get idInstruction() { return _templateIdInstruction; }
    static get idButton() { return _templateIdButton; }
    static get idThanks() { return _templateIdThanks; }

    // make names of containers by templates
    getInstructionId() { return this.name ? this.name + "_" + BugReport.idInstruction : BugReport.idInstruction; }
    getButtonId() { return this.name ? this.name + "_" + BugReport.idButton : BugReport.idButton; }
    getThanksId() { return this.name ? this.name + "_" + BugReport.idThanks : BugReport.idThanks; }

    constructor(name, promptMessage) {
        this.name = name || "";
        this.promptMessage = promptMessage || "Оставте комментарий и контакт для связи с Вами, если хотите.";
        // auto binding
        this._bind()
    }

    // bind BugReport object to containers at page
    _bind() {
        let button = document.getElementById(this.getButtonId());
        if (!button) return;
        let that = this;
        button.onclick = function() { that.getReport(); }
    }

    getReport() {
        let selectedText = window.getSelection().toString();
        if (!selectedText) return;
        var message = window.location.href + "\n\n " + selectedText + "\n\n " + this.promptMessage;
        var userPrompt = prompt(message, "");
        if (userPrompt != null) {
            this.sayThanks();
            this.sendReport(
                window.location.href,
                selectedText,
                userPrompt,
                true
            ); // honest send
            return;
        }
        // I wanna know all attempts
        // force send of uncertain user unprompted message : message + user_message
        this.sendReport(
            window.location.href,
            selectedText,
            userPrompt || '',
            false
        );
    }

    sayThanks(show=true) {
        // hide or swow thanksContainer
        var thanksContainer = document.getElementById(this.getThanksId());
        if (thanksContainer){
            thanksContainer.style.visibility = show ? 'visible' : 'hidden';
        }
        // hide or swow instructionContainer
        var instructionContainer = document.getElementById(this.getInstructionId());
        if (instructionContainer){
            instructionContainer.style.visibility = show ? 'hidden': 'visible';
        }
        // hide or swow buttonContainer
        var buttonContainer = document.getElementById(this.getButtonId());
        if (buttonContainer){
            buttonContainer.style.visibility = show ? 'hidden': 'visible';
        }
        //
        if (!show) return;
        var that = this;
        setTimeout(function() { that.sayThanks(false); }, 3000);
    }
    sendReport(href, selectedText, userText, honestMarker){
        let bug_report_server_page = 'http://127.0.0.1:8280/bug_report/create';
        /* SIMPLE HTTP POST */
        /*var xhr = new XMLHttpRequest();
        xhr.open("POST", bug_report_server_page, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            href: href,
            selectedText: selectedText,
            userText: userText,
            honestMarker: honestMarker,
        }));*/

        /* SIMPLE AJAX POST */
        $.ajax({
            url: bug_report_server_page,
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                href: href,
                selectedText: selectedText,
                userText: userText,
                honestMarker: honestMarker}
            ),
            /*success: function(response) { alert('Готово'); },
            error: function(error) { alert("При отправке сообщения возникли ошибки:\n" + error); }*/
            error: function(error) { alert("При отправке сообщения возникли ошибки"); }
        });
    }
};

// default BugReport object
let bug_report = new BugReport();

export { BugReport };
