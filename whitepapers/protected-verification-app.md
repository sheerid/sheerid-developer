# Gating access to a verification page

## Step 1 (one-time): Create a template

The key here is the use of `tokenRequired` setting

### Request (curl)

    $ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/template \
        -d name=ProtectedDemo -d _affiliationTypes=ACTIVE_DUTY -d tokenRequired=true

### Response (formatted)

    {
        "active": true,
        "config": {
            "affiliationTypes": [
                "ACTIVE_DUTY"
            ],
            "assetTypes": [
                "OTHER",
                "INSURANCE_CARD",
                "DATED_ID_CARD",
                "OFFICIAL_LETTER",
                "ID_CARD",
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
        "id": "54121b30e4b083e8150b3f19",
        "metadata": {
            "tokenRequired": "true"
        },
        "name": "ProtectedDemo"
    }

The newly created verification page is now available at:

    https://services-sandbox.sheerid.com/verify/54121b30e4b083e8150b3f19/

However, when it's accessed directly, it asks you to supply a verification token (here, we'll look at the body tag, in a browser you would see a prompt to enter your code).

### Example

    $ curl -s https://services-sandbox.sheerid.com/verify/54121b30e4b083e8150b3f19/ | grep '<body'

    	<body class="code">

That's where step 2 comes in...

## Step 2 (each time): Create a verification token

For each user that you want to verify, create a token just before sending them to the verification page, and include that token in the URL.

### Request (curl)

    $ curl -H "Authorization: Bearer $TOKEN" -X POST \
        https://services-sandbox.sheerid.com/rest/0.5/template/54121b30e4b083e8150b3f19/token

### Response (formatted)

    [
        {
            "expires": 1410559623099,
            "token": "bb6Hbj"
        }
    ]

## Step 3: Refer traffic

Now that you've generated a single-use verification token, you may refer users directly to the verification page with the token, or they can enter it on the "code" step that was displayed before.

    https://services-sandbox.sheerid.com/verify/54121b30e4b083e8150b3f19/?token=bb6Hbj

### Example

    $ curl -s https://services-sandbox.sheerid.com/verify/54121b30e4b083e8150b3f19/?token=bb6Hbj | grep '<body'

    	<body class="verify">
