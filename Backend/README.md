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

- We you should use the querystring for pagination. It would look like this:
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
