# Reference Check Demo

A company is doing reference checks for drivers. They have an existing form that takes the name and phone number for the driver. But they find out that the phone number is now considered PII and they aren’t able to store it, so they need a solution that will ensure their application does not touch the data.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Basis-Theory-Labs/smart-demo/tree/master/demos/reference-check)

## Pages

### Setup `/`

This is where you add the public and private API keys used in the demo. 

> Nothing works without this.

### Home `/home`

Shows the original driver registration form, featuring a "Name" and a masked "Phone Number" input; and how the captured data is stored in plain text in the database.

On form submit, it makes a `POST /api/drivers` call to create a new `Driver` record in the database.

Relevant source code: [components/OriginalForm.tsx](components/OriginalForm.tsx)

### Elements `/elements`

Shows the original form but the "Phone Number" input is replaced with a `TextElement`.

User can enable/disable request-level aliasing using UI switch.

On form submit, it tokenizes the "Phone Number" and passes the token id as a value calls `POST /api/drivers` to create a driver.

Relevant source code: [components/FormWithElements.tsx](components/FormWithElements.tsx)

### Migration `/migration`

Makes a `POST /api/migrate` call that will start the server process:
1. List all plain text driver records;
2. Bulk tokenizes phone numbers with format preserving alias;
3. Bulk updates the driver records with token ids as phone numbers;

Relevant source code: [pages/api/migrate.ts](pages/api/migrate.ts)

### Deduplicate `/deduplicate`

Shows the original form with "Phone Number" and "SSN" inputs as `TextElement`.

When it is submitted, it will perform tokenization in the frontend and send the tokens + "Name" to the backend, where:
1. It checks for an existing SSN in the local database;
2. If it finds an existing record, it will reject the request and display a message to the user;
3. Otherwise, it inserts the driver in the database;

Relevant source code:
- [pages/api/drivers.ts](pages/api/drivers.ts)
- [components/FormWithFingerprint.tsx](components/FormWithFingerprint.tsx)

### Proxy `/proxy`

Shows [Deduplicate form](#deduplicate-deduplicate), but submits to `POST /reference-check`, which will:
1. Perform same steps as deduplicate;
2. Invoke Basis Theory Proxy passing detokenized data to Basis Theory Echo server;
3. Show the downstream API response in the UI, which is the request it received, highlighting the special headers;

Relevant source code:
- [pages/api/reference-check.ts](pages/api/reference-check.ts)
