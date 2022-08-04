# Reference Check Demo

A company is doing reference checks for drivers. They have an existing form that takes the name and phone number for the driver. But they find out that the phone number is now considered PII and they aren’t able to store it, so they need a solution that will ensure their application does not touch the data.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/___YOUR_PATH___)

## Pages

### Index (/)


Shows the original driver registration form, featuring a "Name" and a masked "Phone Number" input; and how the captured data is stored in plain text in the database.

Makes a `POST /api/drivers` call to create a new `Driver` record in the database.

Relevant source code: [components/OriginalForm.tsx](components/OriginalForm.tsx)

### With Elements (/with-elements)

Shows the original form but the "Phone Number" input is replaced with a `TextElement`.

Tokenizes the "Phone Number" and passes the token id as a value to the `POST /api/drivers` call.

Relevant source code: [components/FormWithElements.tsx](components/FormWithElements.tsx)

> To enable format preserving alias, uncomment the line where says `'{{ data | alias_preserve_format }}`

