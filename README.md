<h1 align="center"> QuoteGenerator</h1>

![Netlify](https://img.shields.io/netlify/a85b3a15-9ecc-4ee8-bc90-c0498f5156da) 
 ![GitHub language count](https://img.shields.io/github/languages/count/sasi7392/QuoteGenerator)
 ![GitHub issues](https://img.shields.io/github/issues-raw/sasi7392/QuoteGenerator)

*Desktop View*

![Demo_Page](/images/demo1.png)

*Mobile View*

![Mobile_demo](/images/mobile_demo.png)
# Description

Quote Generator is implemented by javascript and jQuery in *script.js*.All designing are pure CSS.Used **GOOGLE TRANSLATE API** to translate the quotes to any selected language.This project supports **7** languages and *__Tweet__* the Quote.


My inspiration is from **Google Translator**.


## Usage
```javascript
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
```
## API Reference
https://cloud.google.com/translate/docs/basic/quickstart?hl=en_US

## Future Scope
To support more language and social services.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
