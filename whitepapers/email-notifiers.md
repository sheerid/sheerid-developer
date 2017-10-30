# Customizing Email Content

## Velocity Template Syntax

Email Notifiers use Velocity templates to render email content.  Consult the [Velocity User Guide](http://velocity.apache.org/engine/releases/velocity-1.5/user-guide.html) for specific details on syntax.

## Available Variables

### Person Data

 * `${FIRST_NAME}`
 * `${LAST_NAME}`
 * `${EMAIL}`

### Request Metadata

#### Hosted Applications

 * `${token}` - the user's unique verification token
 * `${verifyUrl}` - the fully-qualified URL of the verification app that this user used (example: `https://birdiesforthebrave.sheerid.com/ThePlayers/ActiveRetired/`)
 * _Any defined field name from `extraFields` template configuration_

#### API Integrations

 * _Any metadata which is explicitly sent with the initial verification request_

### Reward Data

 * _Conditional based on the template/request configuration. (example: `${coupon}` if there is a Reward configured to assign a coupon code to the `coupon` reward data key)_

### Other

 * `${errorblock}` - an HTML unordered list containing zero or more errors that accompany the current VerificationResponse (example: reason for document review failure)

## Common conventions

### Upload URL

Constructing a URL to offer a user-specific link to upload additional documentation (provided request came from a hosted verification app):

    ${verifyUrl}upload.html?token=${token}
