'use strict'

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('60kvzCQI5NnbKVaA3xLkjw');


module.exports = function (to_email, messageCategory){

function letters (messageCategory){
	switch(messageCategory){
		case "order-confirm" :
			return "Hello, this is Pharmatek sending a confirmation email to confirm your recent order and I love you."

		default:
			return "Welcome to Pharmatek I love you."
		}
	}
	    var message = {
	        "html": letters(messageCategory),
	        "subject": "A friendly reminder from Pharmatek",
	        "from_email": "Pharmatek@Pharmatek.com",
	        "from_name": "Mr. Bill Mosely",
	        "to": [{
	                "email": to_email,
	                "name": to_email
	            }],
	        "important": false,
	        "track_opens": true,    
	        "auto_html": false,
	        "preserve_recipients": true,
	        "merge": false,
	        "tags": [
	            "Pharmatek"
	        ]    
	    };
	    var async = false;
	    var ip_pool = "Main Pool";
	    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
	        // console.log(message);
	        // console.log(result);   
	    }, function(e) {
	        // Mandrill returns the error as an object with name and message keys
	        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	    });
}
