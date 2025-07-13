# Learning From Project

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
