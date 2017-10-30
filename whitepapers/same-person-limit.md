# Same Person Limit

## Overview

The "same person limit" feature is used to set a policy on the number of verifications allowed for a particular individual over a period of time. It is supplied by the API requestor as request configuration and enforced by the SheerID API.  If an end-user has exceeded the number of allowable verifications by policy, the API will refuse to process the verification request and instead return an error code.  By default, no same person limit policy is defined.

## Usage

The following settings may be supplied as request configuration parameters (request parameters prefixed by an underscore character "`_`" in version 0.5 of the SheerID REST API, for example: `_samePersonLimit=1` or `_samePersonLimit=template:1`)

### `samePersonLimit`

The maximum number of *successful* verifications that may be performed for any given person. By default, there is no limit to the number of verifications that can be performed. Unless otherwise specified, this applies to all verifications within the requesting account. If the numeric value is prefixed with `template:`, the policy will limit usage to one verification per template. The span of time for which this policy applies is defined by `samePersonLimitExpiration`, below.

 * **Format:** a positive integer which may optionally be prefixed with `template:` to define template-level scope.
 * **Default Value:** *none*

### `personDefinition`

Defines the data used to determine whether or not a verification request represents a unique person. Allows a requestor to exert fine-grained control over this policy. For example, to limit to one verification per email address, the requestor would specify: `_samePersonLimit=1&_personDefinition=EMAIL`

 * **Format:** a comma-delimited list of Field enumeration values (the complete list is available through the `getFields` method in the REST API)
 * **Default Value:** fields determined by SheerID based on the type of verification being performed

### `samePersonLimitIncludeOrganization`

By default, the limit is enforced against the same person definition across all organizations. In order to restrict the same person limit to just within the specified organization, this option may be enabled. An example would be allowing John Smith once per university, rather than one John Smith across all possible universities.

 * **Format:** a boolean value (either `true` or `false`)
 * **Default Value:** `false`

### `samePersonLimitExpiration`

How far back (in days) to look when enforcing the same person policy. We will search for activity for this person within the defined span of time, and ignore older activity when calculating the number of verifications.

 * **Format:** a positive integer representing the number of days of history that should be used to enforce the policy
 * **Default Value:** `365` (one year)

### Behavior

If the same person limit policy has been exceeded, the request will not be completed and the `verify` REST API resource method will return a `409 Conflict` HTTP status code.  If `samePersonLimit` is not specified, or the policy has not been exceeded, the request will be completed as normal.

### Example

#### Request 1

    curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
       -d FIRST_NAME=John -d LAST_NAME=Doe -d BIRTH_DATE=1990-01-02 -d organizationId=789 -d _samePersonLimit=1

#### Response 1

    {
	    "affiliations": [
	        {
	            "attributes": [],
	            "end": 1402844852648,
	            "organizationId": 789,
	            "organizationName": "CUNY LAW SCHOOL",
	            "start": 1392476852648,
	            "type": "STUDENT_PART_TIME",
	            "updated": 1393686452648
	        }
	    ],
	    "errors": [],
	    "inactiveAffiliations": [],
	    "metadata": {},
	    "request": {
	        "config": {
	            "affiliationTypes": [
	                "STUDENT_PART_TIME",
	                "FACULTY",
	                "STUDENT_FULL_TIME",
	                "EMPLOYEE"
	            ],
	            "assetTypes": [
	                "DATED_ID_CARD",
	                "PAY_STUB",
	                "OFFICIAL_LETTER",
	                "TRANSCRIPT",
	                "ID_CARD",
	                "TUITION_RECEIPT",
	                "REGISTRATION_RECEIPT",
	                "CLASS_SCHEDULE",
	                "OTHER"
	            ],
	            "consolationRewardIds": [],
	            "metadata": {
	                "samePersonLimit": "1"
	            },
	            "rewardIds": [],
	            "verificationTypes": [
	                "AUTHORITATIVE",
	                "ASSET_REVIEW"
	            ]
	        },
	        "metadata": {},
	        "organization": {
	            "city": "FLUSHING",
	            "id": 789,
	            "name": "CUNY LAW SCHOOL",
	            "state": "NY",
	            "type": "UNIVERSITY"
	        },
	        "personId": "53d909cfe4b0c84b1beceb79",
	        "timestamp": 1406732852648,
	        "userId": "4f70bfcfe4b01f7e8bec652e"
	    },
	    "requestId": "53d90a34e4b0c84b1beceb86",
	    "result": true,
	    "status": "COMPLETE",
	    "timestamp": 1406732853053
	}

#### Request 2 (same as 1)

    curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
       -d FIRST_NAME=John -d LAST_NAME=Doe -d BIRTH_DATE=1990-01-02 -d organizationId=789 -d _samePersonLimit=1

#### Response 2

    {
	    "httpStatus": 409,
	    "message": "Limit exceeded for verification, most recent request = 53d90a34e4b0c84b1beceb86",
	    "status": "409"
	}