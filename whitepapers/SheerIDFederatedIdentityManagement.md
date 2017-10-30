# Setting up Federated Identity Management with SheerID

## Overview

SheerID is a Service Provider (SP) entity currently participating in the following federations:

 * [UK Access Federation](https://www.ukfederation.org.uk)
 * [Canadian Access Federation](https://www.canarie.ca/identity/caf/)
 * [DFN-AAI Federation (Germany)](https://www.aai.dfn.de/)
 * [eduGAIN](http://www.geant.org/Services/Trust_identity_and_security/eduGAIN)

## Privacy Information

SheerID takes the privacy of all users very seriously. More information about our privacy practices can be found in our published [Privacy Policy](http://www.sheerid.com/privacy-policy/).

## Identity Provider Configuration

### Entity ID

    https://services.sheerid.com/Shibboleth/UK

### Attributes

#### Required Attributes

 * _None at present, see note below_

#### Optional Attributes

 > NOTE: The following attributes are listed as "optional" due to support for both SAML 2.0 and older SAML 1.x IDPs. For all practical purposes, the protocol-specific variant of `eduPersonScopedAffiliation` attribute should be considered required for complete application functionality.

 * `urn:oid:1.3.6.1.4.1.5923.1.1.1.9` (eduPersonScopedAffiliation, SAML 2.0)
 * `urn:mace:dir:attribute-def:eduPersonScopedAffiliation` (eduPersonScopedAffiliation, SAML 1.x)

## References

More information (as specified in our entity metadata) is made avalable via [REFEDS Metadata Explorer Tool](https://met.refeds.org/met/entity/https%253A%252F%252Fservices.sheerid.com%252FShibboleth%252FUK/)