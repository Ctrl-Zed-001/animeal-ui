const ccav = require('./ccavutil.js')

export default function (req, res) {
    console.log("req ========", req)
    console.log("req.data=============", req.data)
    console.log("req.body==========", req.body)
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '0E3C7C18D465713163159A1A5E8AE19A',	//Put in the 32-Bit key provided by CCAvenues.
        ccavPOST = '';

    ccavEncResponse += req.body;
    console.log("🚀 ~ file: ccavResponseHandler.js ~ line 13 ~ ccavEncResponse", ccavEncResponse)
    ccavPOST = new URLSearchParams(JSON.stringify(ccavEncResponse));
    console.log("🚀 ~ file: ccavResponseHandler.js ~ line 15 ~ ccavPOST", ccavPOST)
    var encryption = ccavPOST.toString().encResp;
    ccavResponse = ccav.decrypt(encryption, workingKey);
    var pData = '';
    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
    pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
    pData = pData.replace(/&/gi, '</td></tr><tr><td>')
    pData = pData + '</td></tr></table>'
    htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';

    res.status(200).send(formbody)
};
