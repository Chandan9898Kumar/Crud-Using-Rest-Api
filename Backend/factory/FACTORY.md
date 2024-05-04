### Filter Products

`Filter by title`
By using the /products endpoint and passing title as a query parameter, you can filter for products by title.

Request:

[GET] https://api.escuelajs.co/api/v1/products/?title=Generic
Filter by price
By using the /products endpoint and passing price as a query parameter, you can filter for products by price.

Request:

[GET] https://api.escuelajs.co/api/v1/products/price=100
Filter by price range
By using the /products endpoint and passing price_min and price_max as a query parameter, you can filter for products by price range.

Request:

[GET] https://api.escuelajs.co/api/v1/products/?price_min=900&price_max=1000
Filter by category
By using the /products endpoint and passing categoryId as a query parameter, you can filter for products by category.

Request:

[GET] https://api.escuelajs.co/api/v1/products/?categoryId=1
Join filters
You can filter products using all query parameters and merge them all.

Example: All products with a price between 900 and 1000, with the title "Generic" and category id 1.

[GET]
https://api.escuelajs.co/api/v1/products/
?title=Generic&price_min=900&price_max=1000&categoryId=1
Example: All products with a price between 900 and 1000, and category id 1, with a limit of 10 products and an offset of 10.

[GET]
https://api.escuelajs.co/api/v1/products/
?price_min=900&price_max=1000&categoryId=1
Example: All products with a price between 100 and 1000, and with a limit of 10 products and an offset of 10.

[GET]
https://api.escuelajs.co/api/v1/products/
?price_min=100&price_max=1000&offset=10&limit=10

### Pagination

- APIs that use offset-based paging use the offset and limit query parameters to paginate through items in a collection.

- Offset-based pagination is often used where the list of items is of a fixed and predetermined length.

- To fetch the first page of entries in a collection, the API needs to be called with the offset set to 0 and the limit the products that you want in the response.

`Request:`

[GET] https://api.escuelajs.co/api/v1/products?offset=0&limit=10

`Response:`

```ts
{
  "id": 1,
  "title": "Handmade Fresh Table",
  "price": 687,
  "description": "Andy shoes are designed to keeping in...",
  "category": {
    "id": 5,
    "name": "Others",
    "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
  },
  "images": [
    "https://placeimg.com/640/480/any?r=0.9178516507833767",
    "https://placeimg.com/640/480/any?r=0.9300320592588625",
    "https://placeimg.com/640/480/any?r=0.8807778235430017"
  ]
}
// ... and 9 items more


```

To fetch the next page of entries, the API needs to be called with an offset parameter that equals the sum of the previous offset value and limit returned to the previous result,

To get the next page of entries, use an offset parameter equal to the sum of the previous offset value and the limit returned to the previous result, previous_offset + previous_limit.

[GET] https://api.escuelajs.co/api/v1/products?offset=10&limit=10

Note that the offset should be increased by the previous limit and not by the size of the entries in the response array, as this may be less than the limit. Generally, we advise using the value of the limit in the response object to increase the offset value.

`For example, for a pagination with 10 items per page, it looks like this:`

`Request	Description `:

1. /products?offset=0&limit=10 Return the first 10 products.
2. /products?offset=10&limit=10 Return products from 10 to 20
3. /products?offset=20&limit=10 Return products from 20 to 30

`Or for a pagination with 20 items per page, it looks like this:`

Request Description :

1. /products?offset=0&limit=20 Return the first 20 products.
2. /products?offset=20&limit=20 Return products from 20 to 40
3. /products?offset=40&limit=20 Return products from 40 to 60
