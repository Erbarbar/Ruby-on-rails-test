//var express    = require('express');
const bodyParser = require('body-parser');
const Slack      = require('slack-node'); // to send messages to Slack
const Tesseract = require('tesseract.js'); // for image text recognition
const FB = require('fb'); // to get facebook images
const request = require('request');
const fs = require('fs'); // to be a ble to write a file

// show or hide logs
var logs = false;

// point bot to slack channel
const bot_link = process.env.LINK; // no hack, pls
const slack = new Slack();
slack.setWebhook(bot_link); // the channel is defined on slack app settings

// setup conection to Facebook REST API
const fb_token = process.env.FB_TOKEN;
var fb = new FB.Facebook();
fb.setAccessToken(fb_token);

//IPN facebook page id
var ipn_id = "ipnbarcafetaria";

//IPN menu image
var url = "https://scontent.fopo2-1.fna.fbcdn.net/v/t1.0-9/35464654_1759158370816852_1085733037682982912_n.jpg?_nc_cat=0&oh=a9bd7f868dc5639d416aa380a5967078&oe=5BA595FF";
           
//test image
//var url = "http://tesseract.projectnaptha.com/img/eng_bw.png"
var filename = "pic.png";



getFacebook();


// FUNCTIONS --------------------------------------------------


// gets information from facebook (IPN page posts) 
function getFacebook(){
    fb.api(ipn_id, { fields: ['posts{full_picture,message,created_time}']   }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }

        // checks to see if a post is a valid menu
        var menu = res.posts.data.some(isMenu);

        //if there is no menu...
        if(menu == false)
            console.log("There is no menu this week :(");
    });
}

// cehcks if a post entry is a valid menu
function isMenu(info){
    var date = new Date(info.created_time);
    var now = new Date();

    var daysElapsed = hourDiff(date,now);

    if(date.getDay() < 2 && daysElapsed < 7){ // post on weekend and less than a week ago 
        url = info.full_picture;
        testMessage("Menú do IPN (" + date.toLocaleDateString() + ")");
        return true;
    }

    return false;
}

// simple math function for code clarity
function hourDiff(date, now){
    date = date-(date/(1000*60*60*24)); //get beginning of day
    now  = now -(now /(1000*60*60*24)); // get beginning of day
    var diffDays = (now - date)/(1000*60*60*24); // get days elapsed
    return diffDays;
}

// Downloads image from <input> to <output>
function downloadImage(input, output){

    if(logs) console.log("downloading image from [" + input + "] to [" + output +"]");
    var writeFileStream = fs.createWriteStream(output);
    request(input).pipe(writeFileStream).on('close', function() {
        readImage(output);
    });
}

// gets text from image recognition algorithm (Tesseract)
function readImage(image){
    if(logs) console.log("reading image from: [" + image + "]");
    var tesseractPromise = Tesseract
        .recognize(image, 'por')
        .progress(function  (p) { if(logs) console.log('progress', p)  })
        .catch(err => console.error(err))
        .then(function (result) {
            doSomethingWithText(result.text);
        });
}

function doSomethingWithText(text){
    if(logs) console.log(text);
    testMessage(text);
}

// sends <message> as a text message to slack 
function testMessage(message){
    if(logs) console.log("Sending message");
    slack.webhook(
        {
            text: message,
            attachments:
            [
                {   
                    mrkdwn_in:"text",
                    text: "IPN",
                    fallback: "Ups, parece que não dá para votar...",
                    callback_id: "vote",
                    image_url: url,
                    color: "#3AA3E3"/*,
                    uncomment to add button
                    actions:
                    [
                        {   
                            name: "button",
                            text: "Votar",
                            type: "button",
                            value: "ipn"
                        }
                    ]*/
                }

            ]
        }, 
        function(err, response) {
            if (err === null)
                if(logs) console.log("[Message sent]:\n" + message);
            else{
                if(logs) console.log(err);
                if(logs) console.log(response);
            }
            process.exit(0);
        }
    );
}


function createMessageText(){
    return "Menú IPN:\n:bowl_with_spoon: *Sopa do dia*: Canja de galinha\n:meat_on_bone: *Carne*: Lasanha de carne\n:ear_of_rice: *Vegetariano*: Lasanha de espinafres";
}
