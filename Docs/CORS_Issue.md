# CORS Fix to Interact with the Devnode

When developing a frontend that interacts with a local blockchain or a test/development node (like a Stylus devnode, Hardhat node, or Ganache), you may encounter CORS (Cross-Origin Resource Sharing) issues.

## Why this Happens

- **Different origins:**
Browsers enforce the same-origin policy. If your frontend is running on http://localhost:5173 and your blockchain devnode is on http://localhost:8547, they are considered different origins.

- **Preflight requests:**
When your frontend tries to send a POST request (like sending a transaction or reading a contract), the browser sends an OPTIONS preflight request. If the devnode does not include the proper CORS headers (Access-Control-Allow-Origin), the browser blocks the request.

- **Security Restrictions in Browser:**
Without these headers, you cannot interact with the devnode directly from the browser, even though the node itself is running locally.

## How to Fix:

We can use Caddy as a reverse proxy to forward requests from the frontend to the devnode while injecting the necessary CORS headers. This way:

- Frontend sees requests as coming from the same origin.
- Browser preflight passes successfully.
- No changes are required in the devnode itself.

## Caddy File Setup:
http://localhost:8548 Replace this with your frontend origin.


```
http://localhost:8548 {
    reverse_proxy http://127.0.0.1:8547

    header Access-Control-Allow-Origin "*"
    header Access-Control-Allow-Methods "GET, POST, OPTIONS"
    header Access-Control-Allow-Headers "*"
    header Access-Control-Allow-Credentials "true"
}
```

### Run the Caddy FIle
``` 
caddy run --config ./Caddyfile --adapter caddyfile
```




