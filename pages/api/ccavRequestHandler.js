var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

export default function handler(req, res) {
    var body = '',
        workingKey = '1C1A069B7FD2CEF791F42561377C9A4F',		//Put in the 32-Bit key shared by CCAvenues.
        accessCode = '	AVCT46JJ15BR82TCRB',		//Put in the access code shared by CCAvenues.
        encRequest = '',
        formbody = '',
        merchant_id = '1529688'

    body += req.data;
    encRequest = ccav.encrypt(body, workingKey);
    let POST = qs.parse(body);
    formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=' + merchant_id + '&encRequest=' + encRequest + '&access_code=' + accessCode + '"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';

    // request.on('end', function () {
    //     response.writeHeader(200, { "Content-Type": "text/html" });
    //     response.write(formbody);
    //     response.end();
    // });
    res.status(200).send(formbody)
    return;
};
