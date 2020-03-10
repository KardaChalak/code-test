import * as cors from "kcors";
import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as Router from "koa-router";

import { ElevatorCoordinator, IElevator, IElevatorSpec } from "./elevatorCoordinator";

const app = new Koa();
const router = new Router();

const statusOK = 200;
const statusCreated = 201;
const statusServiceUnavailable = 503;

let elevatorsCoordinator = new ElevatorCoordinator();

router.put("/elevators", (ctx) => {

    // TODO: validate data in body
    const newElevators: any[] = ctx.request.body;

    const specs = newElevators.map((value) => {
        return {
            id: value.id,
            minFloor: value.min_floor,
            maxFloor: value.max_floor,
            speedInSeconds: value.speed,
            startFloor: value.start_floor,
        };
    });
    elevatorsCoordinator = new ElevatorCoordinator(specs);
    ctx.status = statusCreated;
});

router.get("/elevators", (ctx) => {

    const elevatorsSnapshot: IElevator[] = elevatorsCoordinator.getSnapshot();

    ctx.response.body = {
        elevators: elevatorsSnapshot,
    };
    ctx.status = statusOK;
});

router.post("/elevators/request", (ctx) => {
    if (elevatorsCoordinator.isIdleElevator()) {
        const floor: number = ctx.request.body.floor;
        ctx.response.body = elevatorsCoordinator.requestElevator(floor);
        ctx.status = statusOK;
        return;
    }

    ctx.response.set("Retry-After", "1.0");
    ctx.status = statusServiceUnavailable;

});

// Add additional routes for implementation here...

app.use(bodyparser({
    enableTypes: ["json"],
}));
app.use(cors());

app.use(router.routes());

app.listen(3000);
