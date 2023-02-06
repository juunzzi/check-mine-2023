# API Scheme

-   User
    -   id
    -   name
    -   email
    -   password
    -   account_id
    -   pay_point
-   Account
    -   id
    -   bank_name
    -   number
    -   amount
    -   user_id
-   Product
    -   id
    -   name
    -   price
    -   stock

## 회원

### 로그인

-   request
    ```jsx
    HTTP/1.1
    POST /api/users/login
    Host: localhost:8080
    {
      "email": "olivier@mail.com",
      "password": "bestPassw0rd"
    }
    ```
-   response
    ```jsx
    HTTP/1.1 200 OK
    {
      data:{
         "accessToken": "xxx.xxx.xxx"
      }
    }
    ```
    ```jsx
    HTTP/1.1 400
    {
      message:errorMessage
    }
    ```

### 회원가입

-   request
    ```jsx
    HTTP/1.1
    POST /api/users/join
    Host: localhost:8080
    {
        "id": 4,
        "email": "wnsgur8397@aver.com",
        "name": "juunzz",
        "payPoint": 100000,
        "password": "960asfsaggx"
    }
    ```
-   response
    ```jsx
    HTTP/1.1 200 OK
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message:errorMessage
    }
    ```

### 회원 수정

-   request
    ```jsx
    HTTP/1.1
    PUT /api/users/me
    Authorization: Bearer AccessToken
    Host: localhost:8080
    {
      "id": 4,
      "email": "wnsgur8397@naver.com",
      "name":"장준혁",
      "payPoint":500,
      "accountId":null
    }
    ```
-   response
    ```jsx
    HTTP/1.1 200 OK
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```

### 본인 정보 조회

-   request
    ```jsx
    HTTP/1.1
    GET /api/users/me
    Authorization: Bearer AccessToken
    Host: localhost:8080
    ```
-   response
    ```jsx
    HTTP/1.1 200 OK
    {
      "id" : 1,
      "name" : "User1",
      "email" : "Wnsgur8397@naver.com",
      "payPoint" : 100000,
      "accountId" : 10
    }
    ```
    ```jsx
    HTTP/1.1 200 OK
    {
      "id" : 1,
      "name" : "User1",
      "email" : "Wnsgur8397@naver.com",
      "payPoint" : 100000,
      "accountId" : null,
    }
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```

### 본인 바코드 조회

-   request
    ```jsx
    HTTP/1.1
    GET /api/users/me/barcode
    Authorization: Bearer AccessToken
    Host: localhost:8080
    ```
-   response

    ```jsx
    HTTP/1.1 200 OK

    {
      "data":{
        "barcodeToken": "xxx.xxx.xxx"
      }
    }
    ```

    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```

## 상품

### 상품 전체 조회

-   request
    ```jsx
    HTTP / 1.1
    GET / api / products
    Host: localhost: 8080
    ```
-   response
    ```jsx
    HTTP/1.1 200 OK
    {
      "data" : {
    		"products":[
    	    {
    				id: 1,
    				name: '사이다'
    				price: 100000,
    				stock: 20,
    			},
    			{
    				id: 2,
    				name: '콜라'
    				price: 100000,
    				stock: 20,
    			}
    		]
    	}
    }
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```

## 계좌

### 계좌 정보 조회

-   request
    ```jsx
    HTTP/1.1
    GET /api/accounts
    Authorization: Bearer AccessToken
    Host: localhost:8080
    ```
-   response
    ```jsx
    HTTP/1.1 200 OK
    {
        "data": {
            account :{
    					"id": 4,
    				  "bankName": "국민은행",
    			    "amount": 100000,
    			    "number": "91245-215215-125",
    			    "userId": 1
    				}
        }
    }
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```

### 계좌 생성

-   request

    ```jsx
    HTTP/1.1
    GET /api/accounts
    Authorization: Bearer AccessToken
    Host: localhost:8080
    {
        "bankName": "국민은행",
        "number": "930102-01-241524",
        "amount": 1000000
    }

    ```

-   response
    ```jsx
    HTTP/1.1 200 OK
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```

## 주문

### 주문 생성

-   request

    ```jsx
    HTTP/1.1
    POST /api/orders
    Host: localhost:8080
    {
      "barcode":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjc1NDEyNzAxLCJleHAiOjE2NzkwMTI3MDF9.KoyITL9pX13XIkApXEm2ifNSS6Gfcm7MeqsrTG43sLM",
      "orderProducts" : [{"id":1,"quantity":5},{"id":2,"quantity":5}]
    }

    ```

-   response
    ```jsx
    HTTP/1.1
    GET /api/a
    Host: localhost:8080
    {
      "barcode":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjc1NDEyNzAxLCJleHAiOjE2NzkwMTI3MDF9.KoyITL9pX13XIkApXEm2ifNSS6Gfcm7MeqsrTG43sLM",
      "orderProducts" : [{"id":1,"quantity":5},{"id":2,"quantity":5}]
    }
    ```
    ```jsx
    HTTP/1.1 400
    {
    	message: errorMessage
    }
    ```
