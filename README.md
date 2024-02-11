
# Sports App Backend

This repository contains the backend service for a sports app, managing entities such as Sports, Tours, Matches, and News. The service provides endpoints to retrieve information about tours, matches, and news related to sports.
## Setup

To start the app, run the following command

    1. Install Docker and Docker Compose.
    2. Run the service using the following command from the home folder of the service:

```bash
  docker-compose up -d

```
The service will be available at http://localhost:3000.


## Problem Statements

### Problem 1: Tour Matches
Implement an endpoint of the /tour/matches returning all the matches for a given tour name. Also the endpoint exhibits linear latency with the number of tours. Optimize this endpoint to improve performance.

### Problem 2: Enhance Match Information
Modify the /sport/tour/match endpoint to include additional match details such as id, startTime, and format.

### Problem 3: News Support
*Functional Requirements:*
Create news for a match or a tour.
Associate each news created for a match with the corresponding tour.
Associate each news created for a tour with the corresponding sport.

*Technical Requirements:*
Implement an endpoint to create news.
Implement an endpoint to fetch news by match id.
Implement an endpoint to fetch news by tour id.
Implement an endpoint to fetch news by sport id.

## Solution
- Implemented an endpoint /tour/matches returning all the matches for a given tour name and implement the following to increase the performance
    - Added indexing in the db for better fetching.
    - Pagination to not overload the fetch.
    - Defined fields of matches to not overload fetch. 

- Modified the endpoint /sport/tour/match to also return match's id, startTime and format


- Created a new table named News in migration/base.sql with the following schema :
    - id(pkey)
    - title
    - description
    - matchId
    - tourId
    - sportId
    - recUpdatedAt 
    - createdAt

- Implemented a new endpoint /news to post the news depending on requestType(Match/Tour). The news posted for a match will also be linked to the respective tour and sport. Also the news posted for a tour will also be linked to the respective sport. Added exceptional handling to improve the code.


- Implemented 3 new GET APIs: 
    - /news/match/:matchId to get news on basis of matchId
    - /news/tour/:tourId to get news on basis of tourId
    - /news/sport/:sportId to get news on basis of sportId
    Note: Here a single endpoint can also hosted having matchId/tourId/sportId as param to fetch the news accordingly.




## New APIs Reference

Note : Added Sports Backend.postman_collection.json in the project for reference.

#### Post news for a match/tour

```http
  POST /news
```
Request Body:
| Field | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `requestType` | `Enum` | **Required**. (Match/Tour)|
| `id` | `string` | **Required**. id of that match/tour|
| `title` | `string` | **Required**. news title|
| `description` | `string` | **Required**. news description|


#### Get news for a match

```http
  GET /news/match/${matchId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `matchId`      | `string` | **Required**. Id of match to fetch |

#### Get news for a tour

```http
  GET /news/match/${tourId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `tourId`      | `string` | **Required**. Id of tour to fetch |

#### Get news for a sport

```http
  GET /news/match/${sportId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sportId`      | `string` | **Required**. Id of sport to fetch |



## Run Tests

To run the test cases, do the following command

- Install Mocha, Chai and Supertest
```bash
  npm install --save-dev mocha chai supertest

```
- Install Sinon
```bash
  npm install sinon

```
- Run the test file 
```bash
  npx mocha test/route/news.test.js 

```


## Screenshots

[![Screenshot-15.png](https://i.postimg.cc/xdgRCxsy/Screenshot-15.png)](https://postimg.cc/qthnDLHz)

[![Screenshot-16.png](https://i.postimg.cc/PJvzStd2/Screenshot-16.png)](https://postimg.cc/307vRQ4v)

[![Screenshot-17.png](https://i.postimg.cc/vBNt71w4/Screenshot-17.png)](https://postimg.cc/CBb8Sx10)

[![Screenshot-18.png](https://i.postimg.cc/668Dkn31/Screenshot-18.png)](https://postimg.cc/bdjCbG1Q)

[![Screenshot-19.png](https://i.postimg.cc/nzz1Q4g8/Screenshot-19.png)](https://postimg.cc/06TSTw9Z)

[![Screenshot-20.png](https://i.postimg.cc/G90PNZ2r/Screenshot-20.png)](https://postimg.cc/RJRnJpKb)

