var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://PIAPPLFC:Big%232013@bkk1svrid11.big.th.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_ESS_ADVANCE&receiverParty=&receiverService=&interface=SI_ESS_Advance_Post_Req&interfaceNamespace=urn:big:advance:ecc',
  'headers': {
    'Content-Type': 'application/xml',
  },
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:urn="urn:sap-com:document:sap:rfc:functions">
<soapenv:Header/>
<soapenv:Body>
<urn:ZFII001_CREATE_ADVANCE>
<DOCUMENTHEADER>
<PAYMTYPE>02</PAYMTYPE>
<CASHJOURN>HQ01</CASHJOURN>
<DOC_DATE>20220901</DOC_DATE>
<PSTNG_DATE>20220915</PSTNG_DATE>
<CURRENCY>THB</CURRENCY>
<BRANCH>0000</BRANCH>
<REF_KEY></REF_KEY>
<REF_DOC_NO>000A20220923</REF_DOC_NO>
<REF_KEY1>A2022090023</REF_KEY1>
</DOCUMENTHEADER>
<DOCUMENTITEM>
<VENDOR_NO>E20161154</VENDOR_NO>
<PMNTTRMS>V001</PMNTTRMS>
<BLINE_DATE>20220930</BLINE_DATE>
<ASSIGN_NO>IA00000A2022090023</ASSIGN_NO>
<ITEM_TEXT>CREATE ADVANCE-Case1</ITEM_TEXT>
<DUE_ON>20221005</DUE_ON>
<AMOUNT>1040</AMOUNT>
<W_TAX_CODE01></W_TAX_CODE01>
<W_BAS_AMT01></W_BAS_AMT01>
<PAY_VENDOR_NO>E20161154</PAY_VENDOR_NO>
<NAME1></NAME1>
<STREET></STREET>
<CITY></CITY>
<POSTL_CODE></POSTL_CODE>
<TAX_NO_1></TAX_NO_1>
<TAX_NO_3></TAX_NO_3>
<BRANCH_NO></BRANCH_NO>
<BRANCH_DESC></BRANCH_DESC>
<PMNTMETHOD>F</PMNTMETHOD>
<W_TAX_TYPE></W_TAX_TYPE>
</DOCUMENTITEM>
</urn:ZFII001_CREATE_ADVANCE>
</soapenv:Body>
</soapenv:Envelope>
`

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
