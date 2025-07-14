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


## Frontend

### Zustand ( for state management )

- If you are playing with cookies and send token when user loggedIn, then you don't need to use persist (to store data into localStorage)

- You can fetch loggedIn user data on every refresh and add logic in Protected Routes based on that data

### UI Library

- You can use magicUI and shadcnUI together, only you have to manually change the magicUI (components.json to some other name like magicui.components.json) , and good to go ...