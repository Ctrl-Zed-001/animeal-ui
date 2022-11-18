const ccav = require('./ccavutil.js')

export default function (req, res) {
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '0E3C7C18D465713163159A1A5E8AE19A',	//Put in the 32-Bit key provided by CCAvenues.
        ccavPOST = '';

    ccavEncResponse += JSON.stringify(req.body);
    console.log("🚀 ~ file: ccavResponseHandler.js ~ line 13 ~ ccavEncResponse", ccavEncResponse)
    let encryptedRes = JSON.parse(ccavEncResponse)
    console.log("🚀 ~ file: ccavResponseHandler.js ~ line 12 ~ encryptedRes", encryptedRes)
    ccavPOST = new URLSearchParams(encryptedRes.encResp);
    console.log("🚀 ~ file: ccavResponseHandler.js ~ line 14 ~ ccavPOST", ccavPOST)
    console.log("----------------------------")
    var encryption = ccavPOST.toString();
    console.log("level 3 =====")
    ccavResponse = ccav.decrypt(encryption, workingKey);
    console.log("level 4 =====")
    var pData = '';
    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
    pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
    pData = pData.replace(/&/gi, '</td></tr><tr><td>')
    pData = pData + '</td></tr></table>'
    htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
    console.log("level 5 =====")
    res.status(200).send(htmlcode)
};
