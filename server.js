const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname
    const url = new URL(req.url, `http://${hostname}`);
    const path = url.pathname;

    // Set default headers
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    // Route handling
    switch (path) {
        case '/':
            // Default route - simple welcome page
            res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h1>Welcome to the Test Server!</h1>
            <p>Try these routes:</p>
            <ul>
              <li><a href="/echo?message=hello">Echo Route (/echo?message=yourMessage)</a></li>
              <li><a href="/time">Current Time (/time)</a></li>
              <li><a href="/random">Random Number Generator (/random)</a></li>
              <li><a href="/headers">Request Headers Info (/headers)</a></li>
            </ul>
          </body>
        </html>
      `);
            break;

        case '/echo':
            // Echo route - returns whatever message is in the query parameter
            const message = url.searchParams.get('message') || 'No message provided';
            res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h2>Echo Service</h2>
            <p>Your message: <strong>${message}</strong></p>
            <p><a href="/">Back to home</a></p>
          </body>
        </html>
      `);
            break;

        case '/time':
            // Time route - displays current time with a refreshing page
            res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h2>Current Time</h2>
            <p>Server time: <strong>${new Date().toLocaleString()}</strong></p>
            <p><small>This page auto-refreshes every 5 seconds</small></p>
            <p><a href="/">Back to home</a></p>
            <script>
              setTimeout(() => window.location.reload(), 5000);
            </script>
          </body>
        </html>
      `);
            break;

        case '/random':
            // Random number generator route
            const randomNum = Math.floor(Math.random() * 100) + 1;
            res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h2>Random Number Generator</h2>
            <p>Your random number (1-100): <strong>${randomNum}</strong></p>
            <button onclick="window.location.reload()">Generate New Number</button>
            <p><a href="/">Back to home</a></p>
          </body>
        </html>
      `);
            break;

        case '/headers':
            // Display request headers
            res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h2>Request Headers</h2>
            <pre style="background: #f0f0f0; padding: 15px; border-radius: 5px;">
${JSON.stringify(req.headers, null, 2)}
            </pre>
            <p><a href="/">Back to home</a></p>
          </body>
        </html>
      `);
            break;

        default:
            // 404 route for unknown paths
            res.statusCode = 404;
            res.end(`
        <html>
          <body style="font-family: Arial, sans-serif; margin: 40px;">
            <h1>404 - Page Not Found</h1>
            <p>The requested path '${path}' does not exist.</p>
            <p><a href="/">Back to home</a></p>
          </body>
        </html>
      `);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});