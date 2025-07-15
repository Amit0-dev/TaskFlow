# Learning From Project

## Backend

### If you are using axios, then it byDefault handle JSON.Stringify() . You don't have to do manually:

```
- Automatically serialize the object using JSON.stringify(...)

- Set the Content-Type header to "application/json" (unless overridden)

- Send it as the HTTP request body

```

### Only use JSON.stringify() manually when:

-   If you're sending custom data (like raw JSON strings), or using fetch instead of Axios, then you need to do it manually:

```javascript
fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Amit" }), // ✅ Required in fetch
});
```

### MongoDB Operator:

- $lte -> means less and equal to
- $lt -> means less than

## Frontend

### Zustand ( for state management )

-   If you are playing with cookies and send token when user loggedIn, then you don't need to use persist (to store data into localStorage)

-   You can fetch loggedIn user data on every refresh and add logic in Protected Routes based on that data

### UI Library

-   You can use magicUI and shadcnUI together, only you have to manually change the magicUI (components.json to some other name like magicui.components.json) , and good to go ...

### Date

```javascript
new Date().toISOString().split("T")[0];
```

-   new Date() → creates a JavaScript Date object with the current time in your system’s local time.
-   .toISOString() → converts that date to a string in UTC timezone, like:
-   .split("T")[0] → keeps only the date part before "T":

```
🧠 So what is "2025-07-13" exactly?
This string:

Represents the UTC date

Not necessarily your local time's date

So if you run this at:

2025-07-13, 00:30 AM IST (India), it will still be 2025-07-12 UTC!

The result would be "2025-07-12" — not what you expect.

❌ Misconception
It does NOT give you your local date starting from 12:00 AM.
It gives you the current UTC date, formatted as a string.
```

-   ✅ If you want local date as "YYYY-MM-DD":

```javascript
const localDate = new Date().toLocaleDateString("en-CA");
```

```javascript
const todayStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata", // or your actual local timezone
});

// Works even on UTC-hosted servers (thanks to timeZone setting)
```

### useSearchParams (React hook)

- It is extract query from url

```javascript
 navigate(`/keep/${tag?._id}?name=${tag?.tagName}`)

const [searchParams] = useSearchParams();
const tagName = searchParams.get("name");
```