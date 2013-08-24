
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
            if(final_transcript.indexOf(answer) != -1){
                callback();
            } else if(final_transcript == "スキップ") {
                console.log("fail");
                callback();
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
        $('.quiz').addClass('show');
        $('.quiz').append(newcard);
        setTimeout(function(){
            $('.waiting').removeClass('waiting');
        }, 300);            
        waitFor(kanji, function() { moveCards();  });
    } else {
        $('.results').show().text("Finished! Your results:"+quiz); 
        // show results page
    }
};

function moveCards(){
    console.log("Correct!");
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
    console.log(currentAnswer);
    quiz = shuffle(quiz);
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


var currentAnswer = 0;
var quiz = [
    {
        "kanji": "友達",
        "pron": "ともだち",
        "trans": "friend"
    },
    {
        "kanji": "私",
        "pron": "わたし",
        "trans": "myself"
    },
    {
        "kanji": "元気",
        "pron": "げんき",
        "trans": "genki"
    },
    {
        "kanji": "魚",
        "pron": "さかな",
        "trans": "fish"
    },
]

$("#start").click(function() {
    // $(".intro").hide();
    runQuiz(quiz);
});


