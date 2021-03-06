
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
function waitFor(answer, num, callback){

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
            if(final_transcript.indexOf(answer) != -1){
                callback('pass', num);
            } else if(final_transcript == "スキップ") {
                console.log("fail");
                callback('skip', num);
            } else {
                console.log(final_transcript+" is wrong");
            }
        }
    };

    recognition.start();

};

function nextCard(){
    if (quiz[currentAnswer]){
        kanji = quiz[currentAnswer]['kanji'];
        pron = quiz[currentAnswer]['pron'];
        trans = quiz[currentAnswer]['trans'];
        var newcard = cardHTML(quiz[currentAnswer]);
        currentAnswer++;
        console.log(currentAnswer);
        console.log("Waiting for: "+kanji);
        showPage('quiz');
        $('.card').append(newcard);
        setTimeout(function(){
            $('.waiting').removeClass('waiting');
        }, 300);            
        waitFor(kanji, currentAnswer-1, function(mark, num) {
            markKanji(mark, num);
            moveCards();
        });
    } else {
        showResults();
    }
};

function markKanji(mark, currAn){
    var markout;
    switch(mark) {
    case "skip":
        markout = '✖';
        break;
    case "pass":
        markout = '✔';
        break;
    }
    quiz[currAn]['mark'] = markout;
    updateLiveResults(currAn, markout);
    
}

function moveCards(){
    $(".flip-container").addClass("animate");
    setTimeout(function(){
        // wait 3 seconds before moving on
        $('.flip-container').addClass("exit");// .delay(1000).remove();
        setTimeout(function(){
            $('.exit').remove();
        }, 300);            
        nextCard();  
    }, 3000);            
    
}

function runQuiz(quiz){
    showPage('quiz');
    quiz = shuffle(quiz);
    createLiveResults();
    nextCard();
};

function cardHTML(text){
    var source   = $("#card").html();
    var template = Handlebars.compile(source);
    var context = {
        kanji: text['kanji'],
        pron: text['pron'],
        trans: text['trans']
    };
    var html = template(context);
    return html;
}

function showResults(){
    var source   = $("#results-template").html();
    var template = Handlebars.compile(source);
    var context = quiz;
    var html = template(context);
    $('.results').html(html); 
    showPage('results');
}

function showPage(page){
    $('.section').removeClass('show').addClass('hidden');     
    $('.'+page).removeClass('hidden').addClass('show'); 
}

function createLiveResults(){
    var html = "";
    for(var i=0,j=quiz.length;i<j;i++){
        html += '<span class="live-result" id="lr'+i+'">●</span>';
    }    
    console.log(html);
    $(".live-results").append(html);
}

function updateLiveResults(num, mark){
    $("#lr"+num).html(mark);        
}

var currentAnswer = 0;

// Change number of questions and chosen dictionary here
var cutoff = 20;
var selection = jlpt5;

var quiz = selection.splice(0, 20);


$("#start").click(function() {
    // $(".intro").hide();
    runQuiz(quiz);
});

