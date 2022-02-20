# Payments service
NodeJs service to create payments, manage payments providers and payment methods, project based in express Js.

## Start server

Production
```
npm run start
```

Development
```
npm run dev
```

## Testing

Run tests
```
npm run test
```

Run coverage tests
```
npm run coverage
```

## Linter

Payments service uses Standard Js to create a style code, you can to check your code with the next command.

```
npm run lint
```

## Routes

Get service info

```
GET /info
```

Get all payment methods

```
GET /payments/methods
```

Create a payment

```
POST /payments
```

Create a payment

```
POST /payments
```

Reimburse a payment

```
POST /payments/${paymentId}/actions/reimburse
```

For more details about request endpoints and different configurations and params, check the postman collection `payments-service.postman_collection.json`  included in the repository.

## Create custom payment providers

Payments service support different payment providers, you can create a custom provider inyecting an object to PaymentService class.
Example of payment provider class:

```JS
class PaymentProvider {
  constructor () {
    this.id = 'stripe'
  }

  // Returns an array with payment methods supported by the provider
  getPaymentMethods ()

  // Create a new payment to the provider
  pay ({ amount, method } = {})

  // Make a reimburse from a payment
  reimburse ({ id, amount } = {})
}

module.exports = new PaymentProvider()
```

You can add this provider to PaymentService:

```JS
    const paymentService = new PaymentService({ providers: [PaymentProvider] })
```

## Env vars


| Var         | example     | # required |
|--------------|-----------|------------|
| PORT | 3000      | false       |
| ENV      | dev,production  | false       |


