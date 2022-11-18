const ccav = require('./ccavutil.js')

export default function (req, res) {
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '0E3C7C18D465713163159A1A5E8AE19A',	//Put in the 32-Bit key provided by CCAvenues.
        ccavPOST = '';

    ccavEncResponse += JSON.stringify(req.body);

    let encryptedRes = JSON.parse(ccavEncResponse)

    ccavPOST = new URLSearchParams(encryptedRes.encResp);
    var encryption = ccavPOST.toString();

    ccavResponse = ccav.decrypt(encryptedRes.encResp, workingKey);

    var pData = '';
    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
    pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
    pData = pData.replace(/&/gi, '</td></tr><tr><td>')
    pData = pData + '</td></tr></table>'
    let htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
    res.status(200).send(htmlcode)
};
