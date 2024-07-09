### API Architecture - Design Best Practices for REST APIs

1. HTTP

- HTTP has verbs (actions or methods): GET, POST, PUT, PATCH and DELETE are most common.
- REST is resource-oriented and a resource is represented by an URI: /library/
- An endpoint is the combination of a verb and an URI, example: GET: /books/
- An endpoint can be interpreted as an action performed on a resource. Example: POST: /books/ may mean "Create a new book".
- At a high-level, verbs map to CRUD operations: GET means Read, POST means Create, PUT and PATCH mean Update, and DELETE means Delete
- A response’s status is specified by its status code:
  `A.` 1xx for information.
  `B.` 2xx for success.
  `C.` 3xx for redirection.
  `D.` 4xx for client errors.
  `E.` 5xx for server errors

2. Do not return plain text

- Although this is not imposed or mandated by any REST architectural style, most REST APIs by convention use JSON as the data format.

- However, it is not good enough to just return a response body containing a JSON-formatted String. You should still specify the `Content-Type header`. It must be set to the value `application/json`.
  Example : “Content-Type: application/json”

3. Do not use verbs in URIs.

- This is because the HTTP verbs should be sufficient to accurately describe the action being performed on the resource.

Example :

```ts
Let’s say that you are providing an endpoint to generate and retrieve a book cover for a book. I will note :param a placeholder for an URI parameter (like an ID or a slug). Your first idea might be to create a similar endpoint to this one:

`A.`GET: /books/:slug/generateBookCover/

But, the GET method is syntactically sufficient here to say that we are retrieving ("GETting") a book’s cover. So, let's just use:
`B.` GET: /books/:slug/bookCover/

Likewise, for an endpoint that creates a new book:

# Don’t do this:
1. POST: /books/createNewBook/

# Do this:
2. POST: /books/

- HTTP verbs (verbalizses) all the things!
```

4. Use plural nouns for resources

- This may be hard to determine, whether or not you should use plural or singular form for resource nouns.

Should we use /book/:id/ (singular) or /books/:id/ (plural) ?

- Advice is to use the plural form.

- Why? Because it fits all types of endpoints very well.

- We can see that GET /book/2/ is fine. But what about GET /book/? Are we GETting the one and only book in the library, couple of them, or all of them?

- To prevent this kind of ambiguity, let’s be consistent (💡Software career advice!) and use plural everywhere:
  `A.` GET: /books/2/
  `B.` POST: /books/

5. Return the error details in the response body

- When an API server handles an error, it is convenient (_and recommended_) to return error details within the JSON body to help consumers with debugging. Even better if you include which fields were affected by the error!

```ts
{
    "error": "Invalid payload.",
    "detail": {
        "name": "This field is required."
    }
}
```

6. Pay special attention to HTTP status codes

- Make use of the HTTP status code, and only use the response body to provide error details.

```ts
HTTP/1.1 400 Bad Request
Content-Type: application/json{
    "error": "Expected at least three items in the list."
}
```

7. You should use HTTP status codes consistently.

- Once you’ve mastered HTTP status codes, you should aim to use them consistently.

- For example, if you choose that a POST endpoint returns a 201 Created somewhere, use that same HTTP status code for every POST endpoint.

- Why? Because consumers should not have to worry about which method on which endpoint will return which status code in which circumstances.

- So, be predictable (consistent). If you have to stray away from conventions, document it somewhere with big signs.

- Typically, I stick to the following pattern:
  `A.` GET: 200 OK
  `B.`PUT: 200 OK
  `C.`POST: 201 Created
  `D.`PATCH: 200 OK
  `E.`DELETE: 204 No Content

8. Do not nest resources.

- You are probably noticing by now that REST APIs deal with resources. Retrieving a list, or a single instance of a resource is straightforward. But, what happens when you deal with related resources?

- For example, let’s say we want to retrieve the list of books for a particular author — the one with name=Cagan. There are basically two options.

- The first option would be to nest the books resource under the authors resource, example:
  `A.` GET: /authors/Cagan/books/

- Some architects recommend this convention because it does indeed represent the one-to-many relationship between an author and their books.

- But, it is not clear anymore what type of resource you are requesting. Is it authors? Is it books? …

- Also flat is better than nested, so there must be a better way… And there is! :)

- My personal recommendation is to use query string parameters to filter the books resource directly:
  `B.` GET: /books?author=Cagan
  And this clearly means: “Get all books for author name Cagan”, right? 🙂

9. Handle trailing slashes gracefully

```ts
# Wrong : the server will be failing because  missing a trailing slash!
POST: /buckets

# Right
POST: /buckets/
```

10. Make use of the querystring for filtering and pagination

- Pagination allows consumers to retrieve fractions of the set of data. The simplest kind of pagination is page number pagination, which is determined by a `page` and `a page_size`.

- Now, the question is: How do you incorporate such features in a REST API?

- Answer is: Use the querystring.

- We should use the querystring for pagination. It would look like this:
  `A.` GET: /books?page=1&page_size=10

- But, it may be less obvious for filtering. At first, you might think of doing something like this to retrieve a list of only published books:
  `B.` GET: /books/published/

```ts
- Design issue: published is not a resource! Instead, it is a trait of the data you are retrieving. That kind of thing should go in the querystring.

- So in the end, a user could retrieve “the second page of published books containing 20 items” like this:

1. GET: /books?published=true&page=2&page_size=10

Beautifully explicit, isn’t it?
```

11. Know the difference between 401 Unauthorized and 403 Forbidden.

- When handling security errors in a REST API, it is extremely easy to get confused about whether the error relates to Authentication or Authorization (a.k.a. permissions) — used to happen to me all of the time.

- This is my cheat sheet for knowing what I am dealing with, depending on the situation:
  `A.` Has the consumer not provided authentication credentials? Was their SSO Token invalid/timed out? 👉 401 Unauthorized.
  `B. ` Was the consumer correctly authenticated, but they don’t have the required permissions/proper clearance to access the resource? 👉 403 Forbidden.

12. Make good use of HTTP 202 Accepted.

- Sometime we find 202 Accepted to be a very handy alternative to 201 Created. It basically means:
  `A.` I, the server, have understood your request. I have not created the resource (yet), but that is fine.

- There are two main scenarios which I find 202 Accepted to be especially suitable:
  `A. `If the resource will be created as a result of future processing — example: After a job/process has finished.
  `B. `If the resource already existed in some way, but this should not be interpreted as an error.

### Understanding Express Rate Limit Middleware.

1. Installation:

```ts
   npm install express-rate-limit
```

2. Basic Setup:

```ts
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

- Customizing:
  `A.` Message: Customize the response message:

```ts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
```

`B.` Handlers: Add custom handlers for logging or other actions:

```ts
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    res.status(429).send("Too many requests, please try again later.");
  },
});
```

### Understanding Express Slow Down Middleware .

Express Slow Down is another middleware that slows down responses instead of blocking them outright, which can deter abuse.

1. Installation:

```ts
  npm install express-slow-down
```

2. Basic Setup:

```ts
const slowDown = require("express-slow-down");

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // Allow 100 requests per 15 minutes, then...
  delayMs: 500, // Begin adding 500ms of delay per request above 100
});

app.use(speedLimiter);
```

- Customizing::
  `A.` Delay After: Adjust the delay threshold:

```ts
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50, // Start slowing down after 50 requests
  delayMs: 1000, // 1 second delay per request after threshold
});
```

`B.` Max Delay: Set a maximum delay:

```ts
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100,
  delayMs: 500,
  maxDelayMs: 5000, // Maximum delay of 5 seconds
});
```

### Practical Uses and Examples .

Combining rate limiting and slowing down requests can provide robust protection for your API:

1. Combining Middlewares:

`A.` Sequential Usage:

```ts
app.use(limiter);
app.use(speedLimiter);
```

`B`. Example Endpoint:

```ts
app.get("/api", (req, res) => {
  res.send("API response");
});

- Protecting Specific Routes:

`A.` Apply middleware to specific routes:
1. app.use('/api/', limiter, speedLimiter);

`B`. Error Handling:
1. Customize error responses for rate limiting:

 app.use((err, req, res, next) => {
   if (err instanceof rateLimit.RateLimitError) {
     return res.status(429).json({ error: 'Rate limit exceeded' });
   }
   next(err);
 });

```

<!--                                                                    OVER RATE LIMITING                            -->

“Application Programming Interface,” or API, refers to a communication channel between various software services. Applications that transmit requests and responses are called clients and servers, respectively.

There are different types of API protocols:

1. REST — relies on a client/server approach that separates the front and back ends of the API and provides considerable flexibility in development and implementation.
2. RPC — The remote procedural call (RPC) protocol sends multiple parameters and receives results.
3. SOAP — Supports a wide range of communication protocols found across the internet, such as HTTP, SMTP, and TCP.
4. WebSocket — Provides a way to exchange data between browser and server via a persistent connection.

- status codes:

1. 200 for general success.
2. 201 for successful creation.
3. 202 for a successful request.
4. 204 for no content.
5. 307 for redirected content.
6. 400 for bad requests.
7. 401 for unauthorized requests.
8. 403 for missing permissions.
9. 404 for lacking resources.
10. 5xx for internal errors.

### Appropriate HTTP Method.

1. GET requests are used to retrieve resources.
2. PUT requests are typically employed for resource creation or replacement.
3. POST requests are suitable for resource creation when the server assigns a unique identifier.
4. PATCH requests allow for partial resource updates.
5. DELETE requests, as the name implies, deletes the specified resource.

Example :

1. Retrieving a list of books: GET /api/books
2. Creating a new book: POST /api/books
3. Updating an existing book: PUT /api/books/{id}
4. Deleting a book: DELETE /api/books/{id}

```ts
app.get("/api/books", (req, res) => {
  // Retrieve and return a list of books
});

app.post("/api/books", (req, res) => {
  // Create a new book
});

app.put("/api/books/:id", (req, res) => {
  // Update the book with the specified ID
});

app.delete("/api/books/:id", (req, res) => {
  // Delete the book with the specified ID
});
```

### The Appropriate Request Headers for Authentication.

- Request headers to provide a way to pass authentication information from the client to the server. By utilizing appropriate request headers, you can implement authentication mechanisms like API keys, JWT (JSON Web Tokens), OAuth, or other custom authentication schemes. Here are some recommended request headers to use:

1. `Authorization header`: The Authorization header allows the client to include authentication credentials, such as tokens or API keys, in the request header. Here’s an example that uses the Bearer scheme to send the JWT after the scheme as authentication credentials.

```ts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

2. `API key header`: Another approach is using an x-api-key header to authenticate API requests. The client includes an API key, a unique identifier, in this header. The header carries the API key value, which is sent to the server for authentication.

```ts
x-api-key: ABCDEFG123456789
```

3. `Custom headers`: Depending on the authentication mechanism implemented, custom headers can pass authentication-related information.

```ts
X-Auth-Token: abcd12
```

### When to use Parameters vs. Query Parameters.

- Web APIs often require you to work with additional information passed in the endpoint from the client. Understanding when to use `path parameters (e.g., /api/books/{id})` versus `query parameters (e.g., /api/books?category=fiction)` is essential, especially for API consumers.

1. `Path parameters` are typically used to identify or retrieve a specific resource.

2. `Query parameters` are more suitable for sorting the request data. You can also use it for filtering and pagination.

`A. `Returning to our previous example of books API, we’ve used path parameters for deleting a book or updating a book information using the endpoint /api/books/{id}. Here, the path parameter is id, and its value is the unique book identifier.

`B. `On the other hand, let’s say you wish to retrieve all the books that belong to a certain category. You can use query parameters to specify this filter, such as /api/books?category=fiction. Here, the query parameter is category, and its value is fiction.

### Provide Informative and Actionable Error Messages.

- A good API design ensures that your RESTful web services throw the correct error when needed. Having a robust error-handling mechanism aims to provide informative and actionable error messages.

- You should wrap your code in Try-Catch blocks and return appropriate HTTP status codes, error payloads, and error messages that can be directly displayed to your users.

- Consider the following API, which retrieves book information based on the path parameter id:

```ts
// Express.js example
app.get("/api/books/:id", (req, res) => {
  try {
    const bookId = req.params.id;

    // Retrieve book from the database
    const book = database.getBookById(bookId);

    // Check if the book exists
    if (!book) {
      // Return a 404 Not Found error
      res.status(404).json({
        error: "Book not found",
      });
      return;
    }

    // Return the book details
    res.json(book);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error occurred:", error);

    // Return a generic 500 Internal Server Error with a meaningful message
    res.status(500).json({
      error: "An unexpected error occurred",
    });
  }
});
```

- In the code snippet above, a 404 status is returned if the book doesn’t exist in the database. It also returns a 500 status with a generic error message if the API fails due to some other reason.

### Versioning your REST APIs.

- API versioning helps to easily manage changes and updates to an API while still maintaining compatibility with other versions of the APIs for clients. To version your APIs, you can assign unique identifiers or labels. Here are some common approaches to versioning your API:

1. URL versioning: In this approach, the API version is included in the URL. For example, /api/v1/books indicate that this is version 1 of the API.
2. Query parameter versioning: The version number is specified as a query parameter in the API request. For example, /api/books?version=1.
3. Header versioning: The version number is a custom header in the API request. For example, Accept-Version: 1.
4. Content negotiation versioning: The version is negotiated based on the Accept header or the media type of the request payload.

- Versioning enables you to provide backward compatibility to your clients, facilitate the gradual adoption of changes for developers, and ensure stability throughout your various versions of APIs.

### Adopt These Performance Optimization Techniques.

- Performance is an essential factor in determining the end-user experience of your APIs.

Let’s look at some common performance optimization techniques that you can adopt to create high-performing REST APIs:

1. Use `caching mechanisms` to store frequently accessed data and reduce the load on the server. This can significantly improve response times when sending data between client and server and also reduce network traffic.

2. Implement `pagination` to retrieve large datasets in smaller and more manageable chunks to ensure an optimized API design. By returning a limited number of results per page and providing navigation links, APIs can efficiently handle large amounts of data.

3. Apply `compression techniques`, such as gzip, to reduce the size of data transferred between the client and server. This will improve response times for bandwidth-constrained environments and your application specific architectural constraints.

4. `Leverage rate limiting and throttling mechanisms` to control the number of requests allowed from a particular client within a specific timeframe. This will prevent abuse and ensure fair usage of your REST API resources.

### Apply These Security Best Practices.

- Security is a critical aspect of developing any software. However, security is also a tricky subject. By addressing some common vulnerabilities and implementing robust security measures, you can protect your APIs and the sensitive data they handle.

- Here are some security best practices that you should add to your REST APIs against some common vulnerabilities:

1. Properly validate and sanitize user inputs received on the server side. Also, encode the API responses to prevent malicious code execution. Following this will protect your REST APIs against vulnerabilities like SQL injection and cross-site scripting (XSS).

2. Implement foolproof authentication and RBAC (Role-Based Access Control) mechanisms to protect your database resources from being accessed by unauthorized users. Your REST APIs are a gateway to your database, and you should ensure that all of your data is only accessed by users who are allowed to access it.

3. Employ tools like Edge Stack as an API gateway solution for additional security features. It acts as a centralized entry point for all API traffic, enabling traffic encryption through SSL/TLS and offering protection against common attacks like DDoS (Distributed Denial-of-Service).

# NOTE : By Integrate script called "dev" inside package.json:

- The script makes sure that the development server restarts automatically when we make changes (thanks to nodemon).

```ts
"scripts": {
    "dev": "nodemon src/index.js"
  },
```

### Avoid verbs in endpoint names.

It doesn't make much sense to use verbs inside your endpoints and is, in fact, pretty useless. Generally each URL should point towards a resource.Nothing more and nothing less.

```ts
// Current implementations (without verbs) . Good practice
GET "/api/v1/workouts"
GET "/api/v1/workouts/:workoutId"
POST "/api/v1/workouts"
PATCH "/api/v1/workouts/:workoutId"
DELETE "/api/v1/workouts/:workoutId"

// Implementation using verbs .  Wrong practice
GET "/api/v1/getAllWorkouts"
GET "/api/v1/getWorkoutById/:workoutId"
CREATE "/api/v1/createWorkout"
PATCH "/api/v1/updateWorkout/:workoutId"
DELETE "/api/v1/deleteWorkout/:workoutId"

```

### Use data caching for performance improvements.

- Using a data cache is also a great practice to improve the overall experience and performance of our API.

- It makes a lot of sense to use a cache to serve data from, when the data is an often requested resource or/and querying that data from the database is a heavy lift and may take multiple seconds.

- You can store this type of data inside your cache and serve it from there instead of going to the database every time to query the data.

- `One important thing you have to keep in mind when serving data from a cache is that this data can become outdated.` So you have to make sure that the data inside the cache is always up to date.

There are many different solutions out there :

1. One appropriate example is to use `redis`.
2. the express middleware `apicache`.

- A few things you have to be aware of when using a cache:

1. you always have to make sure that the data inside the cache is up to date because you don't want to serve outdated data.

2. while the first request is being processed and the cache is about to be filled and more requests are coming in, you have to decide if you delay those other requests and serve the data from the cache or if they also receive data straight from the database like the first request.

3. it's another component inside your infrastructure if you're choosing a distributed cache like Redis (so you have to ask yourself if it really makes sense to use it).

### Example of Creating a pagination Api

```ts
- paginatedResultsMiddleWare function is acting as middleware here.So this function will gets called first inside app.get("") and then function inside get method will be called.

import data from "./MockData/data.js"


app.get("/users", paginatedResultsMiddleWare(data), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResultsMiddleWare(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    //  user this to show user next page and its limit
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
   //  user this to show user previous page and its limit
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = model.slice(startIndex,endIndex);
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

1. NOTE:  Also we can use this paginatedResultsMiddleWare function which acts as a middleware in other api which is having pagination functionality.
`Example :`
    app.get("/customers", paginatedResultsMiddleWare(data), (req, res) => {
        res.json(res.paginatedResults);
    });



- NOTE : API To Hit = "http://localhost:5000/users?page=1&limit=10". when user hit this api then server will get this page and limit data from req.query
```

### New Api Sites to get mocked data:

1. https://rickandmortyapi.com/

2. https://www.mockaroo.com/

### 𝐇𝐨𝐰 𝐭𝐨 𝐈𝐦𝐩𝐫𝐨𝐯𝐞 𝐀𝐏𝐈 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞

1. Pagination

- Efficient Data Transfer: Implement server-side pagination.
- Client Navigation: Use intuitive query parameters like `page` and `pageSize`.
- Clear Documentation: Provide guidance in your API documentation.

2. Seamless Asynchronous Logging

- Asynchronous Logging: Log activities asynchronously.
- Reduce Overhead: Use message queues or dedicated services for background processing.

3. Connection Pooling

- Optimized Operations: Employ strategic connection pooling.
- Stable Management: Ensure swift and stable database interaction.

4. Advanced Caching Techniques

- Fast Access: Use in-memory systems like Redis or Memcached.
- Reduce Strain: Employ HTTP caching directives.

5. Dynamic Load Balancing

- Resilient API: Implement intelligent load balancing.
- Balanced Load: Distribute incoming requests across multiple servers.

6. Payload Compression

- Streamlined Transmission: Utilize compression techniques like GZIP, Brotli, or Zstandard.
- Quick Interactions: Reduce transfer times for efficient API interactions.

<p align="center">
  <img src="../Backend/Assets/ApiPerformance.gif" height="584" width="700" background='rgba(0, 255, 0, 1)' loading="lazy"/>
</p>

### “What’s the difference between Session-based authentication and JWTs?”

- `Session-Based Authentication`
  In this approach, you store the session information in a database or session store and give a session ID to the user.

For the user, it’s similar to just getting the Ticket ID of their flight. All other details are stored in the airline’s database.

Here’s how it works:

- 1. The user makes a login request and the frontend app sends the request to the backend server

- 2. The backend creates a session using a secret key and stores the data in session storage

- 3. Then, the server sends a cookie back to the client with the unique session ID

- 4. The user makes a new request to view another page and the browser sends the session id along with it.

- 5. The server verifies the user using this ID.

- `JWT-based Authentication`

In the JWT-based approach, you don’t store the session information in the session store.

The entire information is available within the token.

It’s like getting the flight ticket along with all the details available on the ticket but encrypted.

Here’s how it works:

- 1. The user makes a login request and it goes to the backend server

- 2. The backend server verifies the credentials and issues a JWT. The JWT is signed using a private key. No session storage is involved.

- 3. The JWT is passed to the browser using a cookie. For every subsequent request, the browser sends the cookie with the JWT

- 4. The server verifies the JWT using the secret private key and extracts the user info.

<p align="center">
  <img src="../Backend/Assets/sessionJwt.jpg" height="584" width="700" background='rgba(0, 255, 0, 1)' loading="lazy"/>
</p>

### What’s the better approach - Session or JWTs?

In a general sense, you can give the favorite answer of every software engineer.

“It depends”

`JWTs offer some cool benefits when compared to sessions such as:`

- No separate storage

- Easier to scale the client and server

`But JWTs also have some disadvantages:`

- Invalidating a JWT is not easy. With session, you can simply delete them from the session store.

- The data in the JWT can become stale

- The JWTs aren’t exactly small when it comes to size
