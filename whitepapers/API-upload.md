# REST API verification with hand-off to hosted upload

This is a demonstration of the setup and use of a SheerID configuration that relays document review errors to an API user and collects any necessary subsequent document uploads in a minimally-branded hosted page. `curl` is used to demonstrate the REST API requests from a command line and `python -mjson.tool is used to format the JSON response`. It is assumed that `TOKEN` is an environment variable containing the actual API access token.

## One-time setup steps

### Create a template for directly receiving subsequent uploads

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/template -d 'name=upload-demo' -d _affiliationTypes=ACTIVE_DUTY -d theme=simple-form-branded -d 'view-logo=<img src="https://robohash.org/mylogo.png" alt="Demo Page" />' -d 'view-upload_only-content-header=<p>Please upload a file that demonstrates your active duty military service.</p>' | python -mjson.tool
{
    "active": true,
    "config": {
        "affiliationTypes": [
            "ACTIVE_DUTY"
        ],
        "assetTypes": [
            "INSURANCE_CARD",
            "OFFICIAL_LETTER",
            "ID_CARD",
            "DATED_ID_CARD",
            "OTHER",
            "PAY_STUB"
        ],
        "consolationRewardIds": [],
        "metadata": null,
        "rewardIds": [],
        "verificationTypes": [
            "AUTHORITATIVE",
            "ASSET_REVIEW"
        ]
    },
    "expires": null,
    "id": "54b9556ee4b067a39b267848",
    "metadata": {
        "theme": "simple-form-branded",
        "view-logo": "<img src=\"https://robohash.org/mylogo.png\" alt=\"Demo Page\" />",
        "view-upload_only-content-header": "<p>Please upload a file that demonstrates your active duty military service.</p>"
    },
    "name": "upload-demo"
}
````

### Map the namespace (assign a friendly URL)

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/namespace/upload-demo -X PUT -d templateId=54b9556ee4b067a39b267848 | python -mjson.tool
{
    "name": "upload-demo",
    "templateId": "54b9556ee4b067a39b267848"
}
````

### Set up email notifier to convey document review error and request additional upload

````
$  curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/notifier -d type=EMAIL -d "failureEmailSubject=SheerID - Action required" -d 'failureEmail=<p>There was an issue with your documentation:</p>${errorblock}<p><a href="${uploadUrl}">Please upload documentation to resolve these issues</a></p>' -d uploadUrl=https://verify-demo.sheerid.com/upload-demo/upload-only.html -d uploadTokenParameterName=uploadToken -d emailFromAddress=Verify@sheerid.com | python -mjson.tool
{
    "config": {
        "emailFromAddress": "Verify@sheerid.com",
        "failureEmail": "<p>There was an issue with your documentation:</p>${errorblock}<p><a href=\"${uploadUrl}\">Please upload documentation to resolve these issues</a></p>",
        "failureEmailSubject": "SheerID - Action required",
        "uploadUrl": "https://verify-demo.sheerid.com/upload-demo/upload-only.html",
		"uploadTokenParameterName": "uploadToken"
    },
    "filters": [],
    "id": "54b955cae4b078cd23483732",
    "tags": [],
    "type": "EMAIL"
}
````

## Verification steps

### Perform an instant verification (fail to verify)

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification -d FIRST_NAME=Joe -d LAST_NAME=Test -d EMAIL=test@sheerid.com -d BIRTH_DATE=1971-03-24 -d _affiliationTypes=ACTIVE_DUTY | python -mjson.tool
{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 4081,
            "organizationName": "Coast Guard Reserve",
            "start": 1392833973152,
            "type": "VETERAN",
            "updated": 1421432373152
        }
    ],
    "errors": [
        {
            "code": 92,
            "message": "Sandbox: odd birth year",
            "propertyName": null
        }
    ],
    "inactiveAffiliations": [
        {
            "attributes": [],
            "end": 1392833973152,
            "organizationId": 4081,
            "organizationName": "Coast Guard Reserve",
            "start": 844021173152,
            "type": "ACTIVE_DUTY",
            "updated": 1421432373152
        }
    ],
    "metadata": {},
    "request": {
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "ACTIVE_DUTY"
            ],
            "assetTypes": [
                "INSURANCE_CARD",
                "OFFICIAL_LETTER",
                "ID_CARD",
                "DATED_ID_CARD",
                "OTHER",
                "PAY_STUB"
            ],
            "consolationRewardIds": [],
            "metadata": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "metadata": {},
        "organization": null,
        "personId": "54b95635e4b067a39b267854",
        "timestamp": 1421432373117,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "54b95635e4b067a39b267855",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1421432373152
}
````

### Generate an asset upload token

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/asset/token -d requestId=54b95635e4b067a39b267855 | python -mjson.tool
{
    "expires": 1421518786188,
    "token": "5215e0d02ad9c93314657a746f1c934c"
}
````

### Upload asset via REST API

````
$ curl -s https://services-sandbox.sheerid.com/rest/0.5/asset -F token=5215e0d02ad9c93314657a746f1c934c -F file=@SandboxTesting~REJECTED.png | python -mjson.tool
[
    {
        "assetType": null,
        "comments": [],
        "created": 1421432401526,
        "errors": [],
        "expires": null,
        "id": "54b95651e4b067a39b26785a",
        "issued": null,
        "name": "SandboxTesting~REJECTED.png",
        "size": 5381,
        "status": "PENDING_REVIEW",
        "type": "image/png"
    }
]
````

#### Alternatives

NOTE: this action could also have been performed by the end-user directly at this URL:

    https://verify-demo.sheerid.com/upload-demo/upload-only.html?uploadToken=5215e0d02ad9c93314657a746f1c934c

Or, for that matter, at this URL:

    https://services-sandbox.sheerid.com/upload/?token=5215e0d02ad9c93314657a746f1c934c

Or by using the "direct upload" technique described in this document:

    http://developer.sheerid.com/direct-upload.html

### Inquire (`result` is false)

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/54b95635e4b067a39b267855 | python -m json.tool
{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 4081,
            "organizationName": "Coast Guard Reserve",
            "start": 1392833973152,
            "type": "VETERAN",
            "updated": 1421432373152
        }
    ],
    "errors": [
        {
            "code": 92,
            "message": "Sandbox: odd birth year",
            "propertyName": null
        }
    ],
    "inactiveAffiliations": [
        {
            "attributes": [],
            "end": 1392833973152,
            "organizationId": 4081,
            "organizationName": "Coast Guard Reserve",
            "start": 844021173152,
            "type": "ACTIVE_DUTY",
            "updated": 1421432373152
        }
    ],
    "metadata": {},
    "request": {
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "ACTIVE_DUTY"
            ],
            "assetTypes": [
                "INSURANCE_CARD",
                "OFFICIAL_LETTER",
                "ID_CARD",
                "DATED_ID_CARD",
                "OTHER",
                "PAY_STUB"
            ],
            "consolationRewardIds": [],
            "metadata": null,
            "rewardIds": [],
            "verificationTypes": [
                "ASSET_REVIEW",
                "AUTHORITATIVE"
            ]
        },
        "metadata": {},
        "organization": null,
        "personId": "54b95635e4b067a39b267854",
        "timestamp": 1421432373114,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "54b95635e4b067a39b267855",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1421432401740
}
````

### End-user receives email

Contains a link to upload an additional document:

    https://verify-demo.sheerid.com/upload-demo/upload-only.html?uploadToken=13c1fbebadabb067652fb4668a163a42

### Follow link, upload a file

Opened the above link in a browser and uploaded a file named `SandboxTesting~ACCEPTED.png` so it would get approved

### Inquire (`result` is now true)

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/54b95635e4b067a39b267855 | python -m json.tool
{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 0,
            "organizationName": "UNKNOWN",
            "start": null,
            "type": "ACTIVE_DUTY",
            "updated": null
        },
        {
            "attributes": [],
            "end": null,
            "organizationId": 4081,
            "organizationName": "Coast Guard Reserve",
            "start": 1392833973152,
            "type": "VETERAN",
            "updated": 1421432373152
        }
    ],
    "errors": [],
    "inactiveAffiliations": [
        {
            "attributes": [],
            "end": 1392833973152,
            "organizationId": 4081,
            "organizationName": "Coast Guard Reserve",
            "start": 844021173152,
            "type": "ACTIVE_DUTY",
            "updated": 1421432373152
        }
    ],
    "metadata": {},
    "request": {
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "ACTIVE_DUTY"
            ],
            "assetTypes": [
                "OTHER",
                "OFFICIAL_LETTER",
                "INSURANCE_CARD",
                "PAY_STUB",
                "DATED_ID_CARD",
                "ID_CARD"
            ],
            "consolationRewardIds": [],
            "metadata": null,
            "rewardIds": [],
            "verificationTypes": [
                "ASSET_REVIEW",
                "AUTHORITATIVE"
            ]
        },
        "metadata": {},
        "organization": null,
        "personId": "54b95635e4b067a39b267854",
        "timestamp": 1421432373114,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "54b95635e4b067a39b267855",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1421432624276
}
````
