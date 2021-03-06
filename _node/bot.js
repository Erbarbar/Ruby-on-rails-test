//var express    = require('express');
const bodyParser = require('body-parser');
const Slack      = require('slack-node'); // to send messages to Slack
const Tesseract  = require('tesseract.js'); // for image text recognition
const FB         = require('fb'); // to get facebook images
const request    = require('request');
const fs         = require('fs'); // to be a ble to write a file

// show or hide logs
var logs = true;

// IPN facebook page id
var ipn_id = "ipnbarcafetaria";

// where downloaded image will be stored (for image recognition purposes)     
var filename = "pic.png";


// point bot to slack channel
const bot_link = process.env.LINK; // no hack, pls
const slack = new Slack();
slack.setWebhook(bot_link); // the channel is defined on slack app settings

// setup conection to Facebook REST API
const fb_token = process.argv[2];
//const fb_token = process.env.FB_TOKEN; //https://developers.facebook.com/tools/explorer/
const app_id = process.env.APP_ID;
const app_secret = process.env.APP_SECRET;

var fb = new FB.Facebook();
fb.setAccessToken(fb_token);
//extendToken();
//refreshToken();
if(logs) console.log(fb_token);
getFacebook();

//getFacebook();


// FUNCTIONS --------------------------------------------------

// the app needs to be validated so it can access public information
function extendToken(){
    if(logs) console.log("extendToken");
    var accessToken = fb.getAccessToken();
    if(logs) console.log(accessToken);
    FB.api('oauth/access_token', {
        client_id: app_id,
        client_secret: app_secret,
        grant_type: 'fb_exchange_token',
        fb_exchange_token: accessToken
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        if(logs) console.log(res);
        var accessToken = res.access_token;
        var expires = res.expires ? res.expires : 0;
    });
}

// the app needs to be validated so it can access public information
function refreshToken(){
    console.log("refreshToken()");
    if(logs) console.log(fb.getAccessToken());
    FB.api('oauth/access_token', {
        client_id: app_id,
        client_secret: app_secret,
        redirect_uri: "http://localhost:3000",
        grant_type: 'refresh_token'
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        if(logs) console.log(res);
        var accessToken = res.access_token;
        fb.setAccessToken(accessToken);
        if(logs) console.log(fb.getAccessToken());
        //getFacebook();
        //extendToken();
    });
}

// same as refresh token, but repeats each minute
function refreshTokenRepeat(){
    console.log("refreshTokenRepeat()");
    if(logs) console.log(fb.getAccessToken());
    var now = new Date();
    console.log(now);
    FB.api('oauth/access_token', {
        client_id: app_id,
        client_secret: app_secret,
        grant_type: 'client_credentials'
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        if(logs) console.log(res);
        var accessToken = res.access_token;
        fb.setAccessToken(accessToken);
        if(logs) console.log(fb.getAccessToken());
        setTimeout(refreshToken,60000);

    });
}

// gets information from facebook (IPN page posts) 
function getFacebook(){
    if(logs) console.log("getFacebook()");
    if(logs) console.log(fb.getAccessToken());
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
        downloadImage(url,filename);
        
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
        .recognize(image, {
            lang: 'por',
            tessedit_enable_dict_correction: '1',
            tessedit_word_for_word: '1'
        })
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
                    title: "IPN cafetaria",
                    title_link: "https://www.facebook.com/pg/ipnbarcafetaria/photos",
                    fallback: "Menú da semana",
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
