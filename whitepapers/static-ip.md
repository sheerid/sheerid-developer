# SheerID Static IP Addressing

## Overview

Some SheerID customers maintain firewall egress rule(s)/network ACL in order to allow traffic to and from SheerID. The default SheerID REST API service endpoint (`services.sheerid.com`) does not map to a static IP address, though it does change infrequently. In order to support customers with stricter network policies, SheerID has made available an alternate hostname that has a static IP address.

## Details

### Outbound API Requests

API consumers may access SheerID services via a static IP address by simply replacing `services.sheerid.com` in API URLs with the hostname shown below (`services-static.sheerid.com`). The associated IP address(es) should be added to the firewall/network ACL for outbound HTTPS traffic via port 443.

#### Production Environment

    Hostname:   services-static.sheerid.com
    IP Address: 107.23.72.226

#### Sandbox Environment

    Hostname:   services-sandbox-static.sheerid.com
    IP Address: 52.20.116.169

### Inbound Notifications (HTTP Notifier)

HTTP Notifiers are optional callbacks that can be set up to notify your server of various SheerID verification activities. Accounts with provisioned HTTP notifiers will receive notifications initiating from the IP addresses shown below. These notifications will be submitted as HTTPS requests via port 443 to a URL you define (optional).

#### Production Environment

    Hostname:	  notifications.sheerid.com
	IP Addresses: 54.236.234.189
                  54.209.170.78
                  52.4.200.14

#### Sandbox Environment

    Hostname:	  notifications-sandbox.sheerid.com
	IP Address:   54.236.196.107

## Limitations

 * These hostnames are intended for (system-to-system) REST API traffic only. There is currently no provision for hosting a (user-facing) SheerID verification app with a static IP address.
