var request = require('request');
var options = {
  'method': 'POST',
  'url': 'localhost:9000/api/create-advance',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'PAYMTYPE': '02',
    'CASHJOURN': 'HQ01',
    'DOC_DATE': '20220901',
    'PSTNG_DATE': '20220915',
    'CURRENCY': 'THB',
    'BRANCH': '0000',
    'REF_KEY': '',
    'REF_DOC_NO': '000A20220923',
    'REF_KEY1': 'A2022090023',
    'VENDOR_NO': 'E20161154',
    'PMNTTRMS': 'V001',
    'BLINE_DATE': '20220930',
    'ASSIGN_NO': 'IA00000A2022090023',
    'ITEM_TEXT': 'CREATE ADVANCE-Case1',
    'DUE_ON': '20221005',
    'AMOUNT': '1040',
    'W_TAX_CODE01': '',
    'W_BAS_AMT01': '',
    'PAY_VENDOR_NO': 'E20161154',
    'NAME1': '',
    'STREET': '',
    'CITY': '',
    'POSTL_CODE': '',
    'TAX_NO_1': '',
    'TAX_NO_3': '',
    'BRANCH_NO': '',
    'BRANCH_DESC': '',
    'PMNTMETHOD': '',
    'W_TAX_TYPE': ''
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
