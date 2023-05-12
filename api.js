const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
   extended: true
}));

app.post('/api/create-advance', function (req, res) {
   const PAYMTYPE = req.body.PAYMTYPE;
   const CASHJOURN = req.body.CASHJOURN;
   const DOC_DATE = req.body.DOC_DATE;
   const PSTNG_DATE = req.body.PSTNG_DATE;
   const CURRENCY = req.body.CURRENCY;
   const BRANCH = req.body.BRANCH;
   const REF_KEY = req.body.REF_KEY;
   const REF_DOC_NO = req.body.REF_DOC_NO;
   const REF_KEY1 = req.body.REF_KEY1;

   const VENDOR_NO = req.body.VENDOR_NO;
   const PMNTTRMS = req.body.PMNTTRMS;
   const BLINE_DATE = req.body.BLINE_DATE;
   const ASSIGN_NO = req.body.ASSIGN_NO;
   const ITEM_TEXT = req.body.ITEM_TEXT;
   const DUE_ON = req.body.DUE_ON;
   const AMOUNT = req.body.AMOUNT;
   const W_TAX_CODE01 = req.body.W_TAX_CODE01;
   const W_BAS_AMT01 = req.body.W_BAS_AMT01;
   const PAY_VENDOR_NO = req.body.PAY_VENDOR_NO;
   const NAME1 = req.body.NAME1;
   const STREET = req.body.STREET;
   const CITY = req.body.CITY;
   const POSTL_CODE = req.body.POSTL_CODE;
   const TAX_NO_1 = req.body.TAX_NO_1;
   const TAX_NO_3 = req.body.TAX_NO_3;
   const BRANCH_NO = req.body.BRANCH_NO;
   const BRANCH_DESC = req.body.BRANCH_DESC;
   const PMNTMETHOD = req.body.PMNTMETHOD;
   const W_TAX_TYPE = req.body.W_TAX_TYPE;

   const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
        <urn:ZFII001_CREATE_ADVANCE>
            <DOCUMENTHEADER>
                <PAYMTYPE>${PAYMTYPE}</PAYMTYPE>
                <CASHJOURN>${CASHJOURN}</CASHJOURN>
                <DOC_DATE>${DOC_DATE}</DOC_DATE>
                <PSTNG_DATE>${PSTNG_DATE}</PSTNG_DATE>
                <CURRENCY>${CURRENCY}</CURRENCY>
                <BRANCH>${BRANCH}</BRANCH>
                <REF_KEY>${REF_KEY}</REF_KEY>
                <REF_DOC_NO>${REF_DOC_NO}</REF_DOC_NO>
                <REF_KEY1>${REF_KEY1}</REF_KEY1>
            </DOCUMENTHEADER>
            <DOCUMENTITEM>
                <VENDOR_NO>${VENDOR_NO}</VENDOR_NO>
                <PMNTTRMS>${PMNTTRMS}</PMNTTRMS>
                <BLINE_DATE>${BLINE_DATE}</BLINE_DATE>
                <ASSIGN_NO>${ASSIGN_NO}</ASSIGN_NO>
                <ITEM_TEXT>${ITEM_TEXT}</ITEM_TEXT>
                <DUE_ON>${DUE_ON}</DUE_ON>
                <AMOUNT>${AMOUNT}</AMOUNT>
                <W_TAX_CODE01>${W_TAX_CODE01}</W_TAX_CODE01>
                <W_BAS_AMT01>${W_BAS_AMT01}</W_BAS_AMT01>
                <PAY_VENDOR_NO>${PAY_VENDOR_NO}</PAY_VENDOR_NO>
                <NAME1>${NAME1}</NAME1>
                <STREET>${STREET}</STREET>
                <CITY>${CITY}</CITY>
                <POSTL_CODE>${POSTL_CODE}</POSTL_CODE>
                <TAX_NO_1>${TAX_NO_1}</TAX_NO_1>
                <TAX_NO_3>${TAX_NO_3}</TAX_NO_3>
                <BRANCH_NO>${BRANCH_NO}</BRANCH_NO>
                <BRANCH_DESC>${BRANCH_DESC}</BRANCH_DESC>
                <PMNTMETHOD>${PMNTMETHOD}</PMNTMETHOD>
                <W_TAX_TYPE>${W_TAX_TYPE}</W_TAX_TYPE>
            </DOCUMENTITEM>
        </urn:ZFII001_CREATE_ADVANCE>
    </soapenv:Body>
</soapenv:Envelope>`;
   // console.log(body);
   const options = {
      url: 'http://PIAPPLFC:Big%232014@bkk1svrid11.big.th.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_ESS_ADVANCE&receiverParty=&receiverService=&interface=SI_ESS_Advance_Post_Req&interfaceNamespace=urn:big:advance:ecc',
      method: 'POST',
      headers: {
         'Content-Type': 'application/xml',
      },
      body: body,
   };

   request(options, function (error, response) {
      const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
      logFile.write(response);
      logFile.write(error);
      logFile.end();

      if (error) {
         console.error(error);
         res.status(500).send({
            error: 'Internal Server Error'
         });
      } else {
         xml2js.parseString(response.body, function (err, result) {
            if (err) {
               console.error(err);
               res.status(500).send({
                  error: 'Internal Server Error'
               });
            } else {
               const E_DOCNO = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZFII001_CREATE_ADVANCE.Response'][0]['E_DOCNO'][0];
               const E_RESULT = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZFII001_CREATE_ADVANCE.Response'][0]['E_RESULT'][0];
               res.send({
                  E_DOCNO,
                  E_RESULT
               });
            }
         });
      }
   });
});

app.post('/api/cclr-advance', function(req, res) {
   const PAYMTYPE = req.body.PAYMTYPE;
   const DOC_DATE = req.body.DOC_DATE;
   const PSTNG_DATE = req.body.PSTNG_DATE;
   const CURRENCY = req.body.CURRENCY;
   const DOC_TYPE = req.body.DOC_TYPE;
   const BRANCH = req.body.BRANCH;
   const REF_DOC_NO = req.body.REF_DOC_NO;
   const REF_KEY1 = req.body.REF_KEY1;
   const PMNTTRMS = req.body.PMNTTRMS;
   const BLINE_DATE = req.body.BLINE_DATE;
   const ASSIGN_NO = req.body.ASSIGN_NO;
   const ITEM_TEXT = req.body.ITEM_TEXT;
   
   const body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFII001_CCLR_ADVANCE>
          <DOCUMENTHEADER>
             <DOC_DATE>${DOC_DATE}</DOC_DATE>
             <PSTNG_DATE>${PSTNG_DATE}</PSTNG_DATE>
             <CURRENCY>${CURRENCY}</CURRENCY>
             <DOC_TYPE>${DOC_TYPE}</DOC_TYPE>
             <BRANCH>${BRANCH}</BRANCH>
             <REF_KEY></REF_KEY>
             <REF_DOC_NO>${REF_DOC_NO}</REF_DOC_NO>
             <REF_KEY1>${REF_KEY1}</REF_KEY1>
          </DOCUMENTHEADER>
          <ITEMS>
             <PMNTTRMS>${PMNTTRMS}</PMNTTRMS>
             <BLINE_DATE>${BLINE_DATE}</BLINE_DATE>
             <ASSIGN_NO>${ASSIGN_NO}</ASSIGN_NO>
             <ITEM_TEXT>${ITEM_TEXT}</ITEM_TEXT>
          </ITEMS>
       </urn:ZFII001_CCLR_ADVANCE>
    </soapenv:Body>
 </soapenv:Envelope>`;
 
   const options = {
     url: 'http://PIAPPLFC:Big%232013@bkk1svrid11.big.th.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EFORM&receiverParty=&receiverService=&interface=SI_CCLR_Advance_OS&interfaceNamespace=urn:big:eform:ecc',
     method: 'POST',
     headers: {
       'Content-Type': 'application/xml',
     },
     body: body,
   };
 
   request(options, function (error, response) {
      const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
      logFile.write(response);
      logFile.write(error);
      logFile.end();
     if (error) {
       console.error(error);
       res.status(500).send({ error: 'Internal Server Error' });
     } else {
       xml2js.parseString(response.body, function(err, result) {
         if (err) {
           console.error(err);
           res.status(500).send({ error: 'Internal Server Error' });
         } else {
           const E_DOCNO = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZFII001_CCLR_ADVANCE.Response'][0]['E_DOCNO'][0];
           const E_RESULT = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZFII001_CCLR_ADVANCE.Response'][0]['E_RESULT'][0];
           res.send({ E_DOCNO, E_RESULT });
         }
       });
     }
   });
 });

app.post('/api/create-eess-advance', function(req, res) {
   const DOC_DATE = req.body.DOC_DATE;
   const PSTNG_DATE = req.body.PSTNG_DATE;
   const CURRENCY = req.body.CURRENCY;
   const DOC_TYPE = req.body.DOC_TYPE;
   const BRANCH = req.body.BRANCH;
   const REF_DOC_NO = req.body.REF_DOC_NO;
   const REF_KEY1 = req.body.REF_KEY1;

   const VENDOR_NO = req.body.VENDOR_NO;
   const NAME1 = req.body.NAME1;
   const NAME2 = req.body.NAME2;
   const NAME3 = req.body.NAME3;
   const NAME4 = req.body.NAME4;
   const STREET = req.body.STREET;
   const CITY = req.body.CITY;
   const POSTL_CODE = req.body.POSTL_CODE;
   const TAX_NO_1 = req.body.TAX_NO_1;
   const TAX_NO_3 = req.body.TAX_NO_3;
   const BRANCH_NO = req.body.BRANCH_NO;
   const BRANCH_DESC = req.body.BRANCH_DESC;
   const PMNTTRMS = req.body.PMNTTRMS;
   const BLINE_DATE = req.body.BLINE_DATE;
   const GL_ACCOUNT = req.body.GL_ACCOUNT;
   const AMOUNT = req.body.AMOUNT;
   const TAX_AMT = req.body.TAX_AMT;
   const TOTAL_AMOUNT = req.body.TOTAL_AMOUNT;
   const TAX_CODE = req.body.TAX_CODE;
   const W_TAX_CODE01 = req.body.W_TAX_CODE01;
   const W_BAS_AMT01 = req.body.W_BAS_AMT01;
   const ITEM_TEXT = req.body.ITEM_TEXT;
   const ASSIGN_NO = req.body.ASSIGN_NO;
   const COSTCENTER = req.body.COSTCENTER;
   const SALESORG = req.body.SALESORG;
   const PLANT = req.body.PLANT;
   const DISTR_CHAN = req.body.DISTR_CHAN;
   const MATERIAL = req.body.MATERIAL;
   const CUSTOMER = req.body.CUSTOMER;
   const NETWORK = req.body.NETWORK;
   const ACTIVITY = req.body.ACTIVITY;
   const WBS_ELEMENT = req.body.WBS_ELEMENT;
   const ORDERID = req.body.ORDERID;
 
   const body= `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFII001_EES_CLR_ADVANCE>
          <DOCUMENTHEADER>
             <DOC_DATE>${DOC_DATE}</DOC_DATE>
             <PSTNG_DATE>${PSTNG_DATE}</PSTNG_DATE>
             <CURRENCY>${CURRENCY}</CURRENCY>
             <DOC_TYPE>${DOC_TYPE}</DOC_TYPE>
             <BRANCH>${BRANCH}</BRANCH>
             <REF_KEY></REF_KEY>
             <REF_DOC_NO>${REF_DOC_NO}</REF_DOC_NO>
             <REF_KEY1>${REF_KEY1}</REF_KEY1>
          </DOCUMENTHEADER>
          <ITEMS>
             <item>
             <VENDOR_NO>${VENDOR_NO}</VENDOR_NO>
             <NAME1>${NAME1}</NAME1>
             <NAME2>${NAME2}</NAME2>
             <NAME3>${NAME3}</NAME3>
             <NAME4>${NAME4}</NAME4>
             <STREET>${STREET}</STREET>
             <CITY>${CITY}</CITY>
             <POSTL_CODE>${POSTL_CODE}</POSTL_CODE>
             <TAX_NO_1>${TAX_NO_1}</TAX_NO_1>
             <TAX_NO_3>${TAX_NO_3}</TAX_NO_3>
             <BRANCH_NO>${BRANCH_NO}</BRANCH_NO>
             <BRANCH_DESC>${BRANCH_DESC}</BRANCH_DESC>
             <PMNTTRMS>${PMNTTRMS}</PMNTTRMS>
             <BLINE_DATE>${BLINE_DATE}</BLINE_DATE>
             <GL_ACCOUNT>${GL_ACCOUNT}</GL_ACCOUNT>
             <AMOUNT>${AMOUNT}</AMOUNT>
             <TAX_AMT>${TAX_AMT}</TAX_AMT>
             <TOTAL_AMOUNT>${TOTAL_AMOUNT}</TOTAL_AMOUNT>
             <TAX_CODE>${TAX_CODE}</TAX_CODE>
             <W_TAX_CODE01>${W_TAX_CODE01}</W_TAX_CODE01>
             <W_BAS_AMT01>${W_BAS_AMT01}</W_BAS_AMT01>
             <W_TAX_CODE02>${W_TAX_CODE02}</W_TAX_CODE02>
             <W_BAS_AMT02>${W_BAS_AMT02}</W_BAS_AMT02>
             <W_TAX_CODE03>${W_TAX_CODE03}</W_TAX_CODE03>
             <W_BAS_AMT03>${W_BAS_AMT03}</W_BAS_AMT03>
             <ITEM_TEXT>${ITEM_TEXT}</ITEM_TEXT>
             <ASSIGN_NO>${ASSIGN_NO}</ASSIGN_NO>
             <COSTCENTER>${COSTCENTER}</COSTCENTER>
             <SALESORG>${SALESORG}</SALESORG>
             <PLANT>${PLANT}</PLANT>
             <DISTR_CHAN>${DISTR_CHAN}</DISTR_CHAN>
             <MATERIAL>${MATERIAL}</MATERIAL>
               <CUSTOMER>${CUSTOMER}</CUSTOMER>
               <NETWORK>${NETWORK}</NETWORK>
               <ACTIVITY>${ACTIVITY}</ACTIVITY>
               <WBS_ELEMENT>${WBS_ELEMENT}</WBS_ELEMENT>
               <ORDERID>${ORDERID}</ORDERID>
            </item>
         </ITEMS>
      </urn:ZFII001_EES_CLR_ADVANCE>
   </soapenv:Body>
</soapenv:Envelope>`;
const options = {
   url: 'http://PIAPPLFC:Big%232013@bkk1svrid11.big.th.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EFORM&receiverParty=&receiverService=&interface=SI_CCLR_EES_OS&interfaceNamespace=urn:big:eform:ecc',
   method: 'POST',
   headers: {
     'Content-Type': 'application/xml',
   },
   body: body,
 };

 request(options, function (error, response) {
   const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
   logFile.write(response);
   logFile.write(error);
   logFile.end();
   if (error) {
     console.error(error);
     res.status(500).send({ error: 'Internal Server Error' });
   } else {
     xml2js.parseString(response.body, function(err, result) {
       if (err) {
         console.error(err);
         res.status(500).send({ error: 'Internal Server Error' });
       } else {
         const E_DOCNO = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZFII001_CCLR_ADVANCE.Response'][0]['E_DOCNO'][0];
         const E_RESULT = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZFII001_CCLR_ADVANCE.Response'][0]['E_RESULT'][0];
         res.send({ E_DOCNO, E_RESULT });
       }
     });
   }
 });
});

app.post('/api/create-cclr-ees', function(req, res) {
   const DOC_DATE = req.body.DOC_DATE;
   const PSTNG_DATE = req.body.PSTNG_DATE;
   const CURRENCY = req.body.CURRENCY;
   const DOC_TYPE = req.body.DOC_TYPE;
   const BRANCH = req.body.BRANCH;
   const REF_KEY = req.body.REF_KEY;
   const REF_DOC_NO = req.body.REF_DOC_NO;
   const REF_KEY1 = req.body.REF_KEY1;

   const VENDOR_NO = req.body.VENDOR_NO;
   const PMNTTRMS = req.body.PMNTTRMS;
   const BLINE_DATE = req.body.BLINE_DATE;
   const ASSIGN_NO = req.body.ASSIGN_NO;
   const ITEM_TEXT = req.body.ITEM_TEXT;

   const url = "http://bkk1svrid11.big.th.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_EFORM&receiverParty=&receiverService=&interface=SI_CCLR_EES_OS&interfaceNamespace=urn:big:eform:ecc";
   const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFII001_CCLR_EES>
         <!--You may enter the following 3 items in any order-->
         <DOCUMENTHEADER>
            <DOC_DATE>${DOC_DATE}</DOC_DATE>
            <PSTNG_DATE>${PSTNG_DATE}</PSTNG_DATE>
            <CURRENCY>${CURRENCY}</CURRENCY>
            <DOC_TYPE>${DOC_TYPE}</DOC_TYPE>
            <BRANCH>${BRANCH}</BRANCH>
            <REF_KEY>${REF_KEY}</REF_KEY>
            <REF_DOC_NO>${REF_DOC_NO}</REF_DOC_NO>
            <REF_KEY1>${REF_KEY1}</REF_KEY1>
         </DOCUMENTHEADER>
         <ITEMS>
            <VENDOR_NO>${VENDOR_NO}</VENDOR_NO>
            <PMNTTRMS>${PMNTTRMS}</PMNTTRMS>
            <BLINE_DATE>${BLINE_DATE}</BLINE_DATE>
            <ASSIGN_NO>${ASSIGN_NO}</ASSIGN_NO>
            <ITEM_TEXT>${ITEM_TEXT}</ITEM_TEXT>
         </ITEMS>
      </urn:ZFII001_CCLR_EES>
   </soapenv:Body>
</soapenv:Envelope>`;
 
   const options = {
     method: 'POST',
     url: url,
     headers: {
       'Content-Type': 'text/xml;charset=UTF-8',
       'Accept-Encoding': 'gzip,deflate',
       'SOAPAction': 'urn:sap-com:document:sap:rfc:functions:ZFII001_CCLR_EES'
     },
     body: xml
   };
 
   request(options, function (error, response, body) {
      const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
      logFile.write(response);
      logFile.write(error);
      logFile.end();
     if (error) throw new Error(error);
 
     const xmlResponse = body;
     const jsonResponse = convert.xml2json(xmlResponse, {compact: true, spaces: 4});
 
     const result = JSON.parse(jsonResponse)['SOAP:Envelope']['SOAP:Body']['ns0:ZFII001_CCLR_EES.Response']['E_RESULT']['_text'];
     const message = JSON.parse(jsonResponse)['SOAP:Envelope']['SOAP:Body']['ns0:ZFII001_CCLR_EES.Response']['E_MESSAGE']['_text'];
     const docNo = JSON.parse(jsonResponse)['SOAP:Envelope']['SOAP:Body']['ns0:ZFII001_CCLR_EES.Response']['E_DOCNO']['_text'];
 
     res.send({
       result: result,
       message: message,
       docNo: docNo
     });
   });
 });

 
app.listen(9000, function () {
   console.log('Server is listening on port 9000');
});