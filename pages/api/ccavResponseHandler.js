const ccav = require('./ccavutil.js')

export default function (req, res) {
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '1C1A069B7FD2CEF791F42561377C9A4F',	//Put in the 32-Bit key provided by CCAvenues.
        ccavPOST = '';

    ccavEncResponse += req.data;
    ccavPOST = new URLSearchParams(ccavEncResponse);
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
