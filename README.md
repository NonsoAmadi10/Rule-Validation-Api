# Rule-Validation-Api
[![Build Status](https://travis-ci.com/NonsoAmadi10/Rule-Validation-Api.svg?branch=main)](https://travis-ci.com/NonsoAmadi10/Rule-Validation-Api)  |  [![Coverage Status](https://coveralls.io/repos/github/NonsoAmadi10/Rule-Validation-Api/badge.svg?branch=main)](https://coveralls.io/github/NonsoAmadi10/Rule-Validation-Api?branch=main)

- The Documentation can be found [here](https://web.postman.co/documentation/14391038-02281dda-e82c-4ae8-b69e-f749e9d53862/publish)
### Technologies 
- Node JS >= 13.1
- Express JS 
- Babel 7 
- ESLint
- Mocha
- Chai
- Travis CI 

### Getting Started

#### Prerequisites

- Computer Terminal 
- POSTMAN
- Git 
- NPM

### Constraints
- The rule and data fields are required.
- The rule field should be a valid JSON object and should contain the following required fields: 
- **b1/ field:** The field in the data passed to validate the rule against. Your implementation for the field should also support nested data objects.
`e.g. if field is passed as "card.first6" it means you need to check to see if the data contains a card field, then check to see if the card field contains a first6 field.`
`[PS: The nesting should not be more than two levels]`
- **b2/ condition:** The condition to use for validating the rule. Accepted condition values are:
    - i/ eq: Means the field value should be equal to the condition value 
   - ii/ neq: Means the field value should not be equal to the condition value 
   - iii/ gt: Means the field value should be greater than the condition value 
    - iv/ gte: Means the field value should be greater than or equal to the condition value 
    - v/ contains: Means the field value should contain the condition value
- **b3/ condition_value:** The condition value to run the rule against. Your rule evaluation is expected to be like: 
`["data.field"] ["rule.condition"] ["rule.condition_value"]`

- **c/ The data field can be any of:**
  - c1/ A valid JSON object 
  - c2/ A valid array
  - c3/ A string



#### Installation 
- Clone this Repo by running `git clone https://github.com/NonsoAmadi10/Rule-Validation-Api`
- Cd into the cloned Repo
- Start the development server by running `npm run dev:start`
- Open POSTMAN and test the following endpoints with their appropriate request body 
    - `GET /` 
    - Returns an example response like this:
    > {
    > "message": "My Rule-Validation API"
    > "status": "success",
    > "data": {
    > "name": "Amos Burton",
    > "github": "@amosburton",
    > "email": "amosburton@rocinantecrew.com",
    > "mobile": "08069920011",
    >  "twitter": "@amosb"
    >          }
    > }

    - `POST /validate-rule`
    - accepts JSON data containing a rule and data field to validate the rule against
    - request body:
    > {
    > "rule": {
    > "field": "missions"
    > "condition": "gte",
    > "condition_value": 30
    >  },
    > "data": {
    > "name": "James Holden",
    > "crew": "Rocinante",
    > "age": 34,
    > "position": "Captain",
    > "missions": 45
    >       }
    >  }  

    - appropriate response:
    > {
    > "message": "field missions.count successfully validated."
    >   "status": "success",
    >    "data": {
    >    "validation": {
    >   "error": false,
    >   "field": "missions",
    >    "field_value": 45,
    >    "condition": "gte",
    >    "condition_value: 30
    >   }
    >  }
    >   }

    - error responses
        - **If a required field isn't passed. The endpoint should returns a response (HTTP 400 status code) that is similar to the below:**
        > {
  "message": "[field] is required."
  "status": "error",
  "data": null
} 
        - **If a field is of the wrong type, The endpoint returns with a response (HTTP 400 status code) that is similar to the below:**
        > {
  "message": "[field] should be a|an [type]."
  "status": "error",
  "data": null
}
        - **If an invalid JSON payload is passed to the API, your endpoint response (HTTP 400 status code) returns:**
        > {
  "message": "Invalid JSON payload passed."
  "status": "error",
  "data": null
}

        - **If the field specified in the rule object is missing from the data passed, the endpoint response (HTTP 400 status code) returns:**
        > {
  "message": "field [name of field] is missing from data."
  "status": "error",
  "data": null
}
        - **If the rule validation fails, the endpoint response (HTTP 400 status code) returns:**
        > {
  "message": "field [name of field] failed validation."
  "status": "error",
  "data": {
    "validation": {
      "error": true,
      "field": "[name of field]",
      "field_value": [value of field],
      "condition": "[rule condition]",
      "condition_value: [condition value]
    }
  }
}

### Author 
- Amadi Justice Chinonso
    
