# SheerID Hosted Verification - Offer Redemption

## Background

SheerID's hosted verification solution allows merchants to easily deploy a SheerID verification workflow within their site or by linking users to a co-branded page.  Most merchants are using the verification process to restrict access to some protected resource, be it a discount, special offer or some other "reward" for being successfully verified.  In order to ensure real protection of this resource, it is important for merchants to adhere to one of SheerID's recommended practices for ensuring that those attempting to access the protected resource have truly been verified by SheerID.

## Example

Let's say that I'm a shoe company and I am offering a special limited-release shoe only to verified college students.  I have a landing page which I can advertise widely, which then links users into a SheerID-hosted verification workflow.  Upon successful verification, that user is then referred back to a page on my site which allows the user to choose their size and buy the limited-release shoe.

To the user, the page flow looks something like this:

 1. Marketing Channels
 1. Student Landing Page
 1. SheerID Verification Workflow
 1. Shoe Size Selection Page
 1. Checkout

In order to truly protect the shoe size selection page, we need to ensure that people who arrive on that page have done so by properly proceeding through the SheerID verification process.  If the protected resource, in this case the "Shoe Size Selection Page," does not verify that its visitors are coming from SheerID, there's nothing to prevent one verified student from sharing that information with all of her non-student friends, or posting it on a message board.

## Protection Options

### Token Validation

Token validation is a simple technique to ensure that a protected page visitor has in fact been verified by SheerID.  When SheerID redirects users to your site after completing the verification workflow, a query string parameter is appended which contains a single-use unique token.  Using a simple REST API call, your site can look up the verification request associated with that token to ensure it's valid and matches your site's verification criteria and revoke the token so it cannot be used again.

Another variation of this technique consists of SheerID displaying a confirmation page to the user with a human-friendly token string.  The end user can then copy this string into a form on the merchant site which can then be validated manually by the merchant as part of order fulfillment or otherwise validated using the SheerID REST API in an offline order processing workflow.

### Promo Code Issuance

This strategy consists of the merchant generating a batch of single-use promotional codes that unlock a special offer or discount using the e-commerce platform's existing promotions functionality (not all shopping cart software has this feature).  The codes are then securely delivered to SheerID and issued only to verified individuals. Furthermore, configuration can be put in place to ensure an individual may redeem only one promotional code.  Users can event be redirected to a specific URL on your site which has been designed to accept a promo code via query string, so there's no code for them to copy/re-enter.

### Referrer Check (not recommended)

A somewhat reliable way of ensuring that an individual has come from the SheerID verification workflow is to add a few lines of code which check the Referer HTTP header and look for the URL of the SheerID verification process.  If the URL matches, you can unlock the protected resource, otherwise display an error message or send the users to a public page.  It is important to note that this strategy is easily worked around by savvy users that manipulate the HTTP headers using one of a few readily available techniques.

### Security by Obscurity (not recommended)

Another way for merchants to ensure some level of protection for the offer is to use a URL which is not easily known by a user, such as a long and/or cryptic URL.  This strategy is very prone to abuse, since once a single user finds out this direct URL, it can be shared with friends or posted to a message board, without any recourse to ensure the visitors coming to that URL have been verified.  The effectiveness of this strategy could be improved slightly by frequently changing the URL and using the SheerID API to update the URL that users are redirected to upon a successful verification.