
### Step 1. Perform a verification request

Note the `requestId` property returned in the JSON response which is used in the 2nd REST request.

#### Request (curl)

    $ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
       -X POST -d FIRST_NAME=Joe -d LAST_NAME=Tester -d BIRTH_DATE=1972-01-14 -d _affiliationTypes=ACTIVE_DUTY

#### Response (formatted JSON)

    {
    	"affiliations": [{
    		"type": "ACTIVE_DUTY",
    		"organizationId": 4078,
    		"organizationName": "Navy Reserve",
    		"updated": 1401380018327,
    		"start": 1222791218327,
    		"end": null,
    		"attributes": []
    	}],
    	"inactiveAffiliations": [],
    	"status": "COMPLETE",
    	"result": true,
    	"requestId": "53875cb2e4b01db148ffd40e",
    	"errors": [],
    	"timestamp": 1401380018327,
    	"request": {
    		"metadata": {},
    		"organization": null,
    		"timestamp": 1401380018257,
    		"userId": "4f70bfcfe4b01f7e8bec652e",
    		"personId": "53875b6ae4b01db148ffd3fb",
    		"config": {
    			"affiliationTypes": ["ACTIVE_DUTY"],
    			"verificationTypes": ["AUTHORITATIVE", "ASSET_REVIEW"],
    			"assetTypes": ["ID_CARD", "OTHER", "DATED_ID_CARD", "INSURANCE_CARD", "OFFICIAL_LETTER", "PAY_STUB"],
    			"rewardIds": [],
    			"consolationRewardIds": [],
    			"metadata": null
    		}
    	},
    	"metadata": {}
    }


### Step 2. Fetch the person data

The endpoint used to fetch this data is dependent upon the `requestId` of the original verification request/response. *NOTE:* Use of this endpoint requires the `PERSON_DATA` role and person data may only be returned if it has not yet been purged according to the account's data retention policy.

#### Request (curl)

    $ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/53875cb2e4b01db148ffd40e/person

#### Response (formatted JSON)

    {
    	"fields": {
    		"FIRST_NAME": "Joe",
    		"BIRTH_DATE": "1972-01-14",
    		"LAST_NAME": "Tester"
    	}
    }

