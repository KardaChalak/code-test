# Stabelo code test

## Description

This is the code skeleton for the stabelo code test. It provides initial setup for frontend and backend in the intrest of saving time. It consists of two projects. Frontend and backend. Frontend has a simple react ui set up and the backend has a simple rest controller sample.

## Running

Both the frontend and the backend has the following npm scripts

- `npm run clean`
  - Used to clean the workspace
- `npm run build`
  - Builds the source files
- `npm run develop`
  - Runs the application locally

## Demo

Spin up both backend and frontend

Create the elevators by performing:

```curl
curl --location --request PUT 'localhost:3000/elevators' \
--header 'Content-Type: application/json' \
--data-raw '[
	{
		"id": 0,
		"max_floor": 20,
		"min_flor": 0,
		"start_floor": 10,
		"speed": 2
	},
	{
		"id": 1,
		"max_floor": 20,
		"min_flor": 0,
		"start_floor": 10,
		"speed": 2
	},
	{
		"id": 2,
		"max_floor": 20,
		"min_flor": 0,
		"start_floor": 10,
		"speed": 2
	},
	{
		"id": 3,
		"max_floor": 20,
		"min_flor": 0,
		"start_floor": 10,
		"speed": 2
	},
		{
		"id": 4,
		"max_floor": 20,
		"min_flor": 0,
		"start_floor": 10,
		"speed": 2
	}
]
```

Then you are ready to test the elevators at http://localhost:8080/implementation

## Work left

<b>Backend</b>

Elevator no longer possible to use with a minFloor < 0.
Lack of unit tests.
Docker.
Service test for deployable docker artifact.
Handling of elevator id in the elevatorCoordinator.
Decouple the logic.
Elevator should be able to queue requests.
Use websocket instead of http.
Try out some different cost functions.

<b>Frontend</b>

Very messy frontend code. Move request logic to own file and move logic from the page component.