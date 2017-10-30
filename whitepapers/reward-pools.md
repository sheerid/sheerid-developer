# Reward Pool Management

## Overview

Reward pools provide SheerID customers with the ability to import a list of pre-determined codes that will be issued one at a time to individuals verified via SheerID's eligibility verification API and hosted applications.  The type of data that is most frequently used in reward pools includes:

 * Single-use coupon or promo codes
 * Unique bar codes
 * Product keys or serial numbers

## Reward Set Up Steps (one-time process)

 1. Log in to the SheerID Control Center (https://services.sheerid.com) with a user account that has been granted `TEMPLATE_ADMIN` role
 1. Follow the link to "Reward Management" from the Tools section ([Direct Link](https://services.sheerid.com/home/reward-management.html))
 1. Create Reward Pool (a reward pool is simply a bunch of codes that can be issued to users one at a time)
   1. From the navigation menu, select "Create Reward Pool"
   1. Give your pool a meaningful name, such as "Academic Serial Numbers - Professional Version 5.0"
   1. (Optional) set a warning threshold - if fewer than this many entries remain in the pool, we'll send an email notification. (_NOTE:_ this notification is currently provisioned by SheerID support on a by-request basis)
   1. (Optional) specify a CSV file - can be omitted for the first set up, we'll cover that in the [Adding Reward Pool Entries](#adding-reward-pool-entries) section below. When uploading a CSV file, if file does not contain a header row, remember to uncheck the "CSV File Contains Header" checkbox, which is checked by default.
   1. Click "Create New Reward Pool" to create your pool. You should see a confirmation message "Reward Pool created successfully" and a processing indicator. When processing is complete, the confirmation message area will indicate the number of entries added. Note that uploading larger files can take a few minutes as the file entries are uploaded and encrypted for secure storage. If you navigate to the "Reward Pools" option while your reward pool file is still being processed the total entries for your reward pool displayed on that screen may be incomplete, so give the process sufficient time to finish.
 1. Create Reward (a reward is a set of data that is issued to verified users, which can source its values from a pool of values)
   1. From the navigation menu, select "Create Reward"
   1. Enter a meaningful reward name, such as "Verified Student Software Serial"
   1. Under "Reward Data", select the following options:
      1. Key should be a simple name that can be used as a variable elsewhere (emails, success page, redirect URLs) to obtain the reward pool entry (examples: "serialNumber" or "promoCode")
      1. The type menu should be set to Pooled
      1. Value should be set to the Reward Pool name created in the previous step
   1. Click "Create New Reward" to create your reward

## Reward Usage

Rewards can be used in a few ways:

 * Specify one or more reward IDs (found in the table in the "Rewards" section) when submitting a verification request via the API using the configuration parameter `_rewardIds`.  Multiple rewardIds should be delimited with commas.
 * When creating or editing a verification template in the Web Templates management area, select the desired rewards from the Rewards menu.

If either of these options is used to associate a reward with a VerificationRequest that results in a positive response, the VerificationResponse metadata will contain a key-value pair corresponding to the key set up in the reward above, with its value being a unique value from the reward pool.  Once a reward pool entry has been assigned to a VerificationResponse, it will not be given out to any other user.  This key-value pair can be used by SheerID-hosted and integrated applications to display or otherwise use the value obtained from the pool.

## Adding Reward Pool Entries

This action can be performed during initial Reward Pool set up as indicated above but may need to be repeated when inventory is getting low.

 1. Log in to the SheerID Control Center (https://services.sheerid.com) with a user account that has been granted `TEMPLATE_ADMIN` role
 1. Follow the link to "Reward Management" from the Tools section ([Direct Link](https://services.sheerid.com/home/reward-management.html))
 1. Click on the "Reward Pools" option from the navigation menu.
 1. Find the reward pool that needs additional entries (the number of remaining, unassigned entries is shown in the table as well as the total number) and click "Edit"
 1. Use the file picker labeled "List of Entries" to select a CSV file from your computer for upload.  The file should be formatted according to the following rules:
    * File should be CSV formatted data (individual values may be, but do not have to be, quoted with double or single quotes). This format is easily exported from spreadsheet programs such as Microsoft Excel.
    * Entry data should be contained in a single column, with or without a column header
 1. Make sure that the checkbox "CSV File Contains Header" is checked if there is a column header in the attached CSV file.
 1. Click "Update Reward Pool" - this may take a moment to upload and process your file, so be patient.  Upon successful completion, you can navigate back to the "Reward Pools" tab to see the updated number of entries which reflects the data just uploaded.
