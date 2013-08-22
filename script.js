
function trim1 (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// code adapted from https://github.com/SupplyFrame/rvc/blob/master/rvc.js
function waitFor(answer, callback){

    var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "ja-JP"; // for Japanese words


    recognition.onresult = function(event) {
        final_transcript = '';
        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = trim1(final_transcript);
        if(final_transcript != "") {
            console.log(final_transcript);
            if(final_transcript == answer) {
                callback();
            }
        }
    };

    recognition.start();

};

function nextCard(){
    if (quiz[currentAnswer]){
        answer = quiz[currentAnswer];
        currentAnswer++;
        console.log(currentAnswer);
        console.log("Waiting for: "+answer);
        $('#question').text(answer);
        waitFor(answer, function() {
            console.log("Correct!");
            nextCard();  
        });
    } else {
        $('#question').text("Finished!"); 
        $('#results').text("Finished! Your results:"+quiz); 
        // show results page
    }
};

function runQuiz(quiz){
    console.log(currentAnswer);
    quiz = shuffle(quiz);
    nextCard();
};


var currentAnswer = 0;
var quiz = ["友達", "私", "元気", "魚"];

$("#start").click(function() {
    $(".intro").hide();
    runQuiz(quiz);
});


