const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");
const googleTranslator = document.getElementById("source-lang");
var apiKey = config.MY_API_KEY;

//Show loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
//Get quote from API
function getQuote() {
    loading();
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        success: function( response ) {
            if(response.quoteText.length > 120){
                quoteText.classList.add("long-quote");
            }
            else{
                quoteText.classList.remove("long-quote");
            }
            quoteText.innerText = response.quoteText;
            testQuote= response.quoteText;
            //If Author is blank
            if(response.quoteAuthor === ''){
                authorText.innerText = "Unkown";
            }
            else{
                authorText.innerText = response.quoteAuthor;
            }
            //stop loader and show Quote
            complete();
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            getQuote();
        }
    });
  }


//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    console.log(quote);
    const author = authorText.innerText;
    const newLocal = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    const twitterUrl = newLocal;
    window.open(twitterUrl,'_blank');
}

//Google translate API
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"accept-encoding": "application/gzip",
		"x-rapidapi-key": `${apiKey}`,
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
	},
	"data": {
		"q": "",
		"source": "en",
		"target": ""
	}
};

//fetch and insert the translated text
function fetchTranslatedText(){
    $.ajax(settings).done(function (response) {
        var translatedText = response.data.translations[0].translatedText;
        console.log(translatedText);
        quoteText.innerText = translatedText;
    })
    .fail(function(xhr, textStatus, errorThrown ){
        alert("Error!!Cant reach the server!");
        $("#source-lang").val("EN").attr("selected","selected");
    });
}

//Event listner for langugage dropdown menu
googleTranslator.addEventListener('change',function(){
    console.log($(this).val());
    if($(this).val() != 'en'){
        settings.data.target = $(this).val();
        settings.data.q = quoteText.innerText;
        //console.log(quoteText.innerText);
        fetchTranslatedText();
    }
});

//Resteing dropdown menu to default lang "EN" before calling getQuote()
function newQuote(){
    $("#source-lang").val("EN").attr("selected","selected");
    getQuote();
}
newQuoteBtn.addEventListener('click',newQuote);//New Quote Listner
twitterBtn.addEventListener("click",tweetQuote);//Tweet Button Listner
//On window load
getQuote();