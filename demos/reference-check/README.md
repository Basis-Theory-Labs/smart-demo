# Reference Check Demo

A company is doing reference checks for drivers. They have an existing form that takes the name and phone number for the driver. But they find out that the phone number is now considered PII and they aren’t able to store it, so they need a solution that will ensure their application does not touch the data.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Basis-Theory-Labs/smart-demo/tree/master/demos/reference-check)

## Pages

### `/` (Setup)

This is where you add the public and private API keys used in the demo. Nothing works without this.

### `/original-form`

Shows the original driver registration form, featuring a "Name" and a masked "Phone Number" input; and how the captured data is stored in plain text in the database.

Makes a `POST /api/drivers` call to create a new `Driver` record in the database.

Relevant source code: [components/OriginalForm.tsx](components/OriginalForm.tsx)

### `/with-elements`

Shows the original form but the "Phone Number" input is replaced with a `TextElement`.

Tokenizes the "Phone Number" and passes the token id as a value to the `POST /api/drivers` call.

Relevant source code: [components/FormWithElements.tsx](components/FormWithElements.tsx)

> To enable format preserving alias, uncomment the line where says `'{{ data | alias_preserve_format }}'`

### `/migration`

Allows user to enter a Server API Key to tokenize plain text phone numbers from previous records.

Makes a `POST /api/migrate` call that will start the server process:
1. List all plain text driver records;
2. Bulk tokenizes phone numbers with format preserving aliasing;
3. Bulk update the driver records with token ids as phone numbers;

Relevant source code:
- [components/MigrationForm.tsx](components/MigrationForm.tsx)
- [pages/api/migration.ts](pages/api/migrate.ts)
