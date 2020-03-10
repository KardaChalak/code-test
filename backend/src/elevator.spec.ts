import { Elevator } from "./elevator";

// Create elevator
const id = 0;
const maxFloor = 20;
const minFloor = 0;
const speedInSeconds = 0.1;
const startFloor = 20;

const elevator = new Elevator({id, minFloor, maxFloor, speedInSeconds, startFloor});

const testIdlePosition = (position: string, waitSeconds: number) => {
    it(`should be idle at ${position}`, () => {
        sleep(waitSeconds);
        expect(elevator.idle).toBe(true);
    });

    it(`should have a floor and a destination with the same value at ${position}`, () => {
        expect(elevator.floor).toBe(elevator.destination);
    });

    it("should have a correct distance to the ground floor", () => {
        expect(elevator.distance(minFloor)).toBe(elevator.floor);
    });

    it("should have a correct distance to the max floor", () => {
        expect(elevator.distance(maxFloor)).toBe(maxFloor - elevator.floor);
    });
};

describe("elevator", () => {

    describe("starting position", () => {
        const waitSeconds = 0;
        testIdlePosition("start", waitSeconds);
    });

    describe("start moving", () => {

        it("should not be able to move to a floor that does not exists", () => {
            expect(() => elevator.requestFloor(maxFloor + 1)).toThrow(Error);
        });

        it("should be able to handle a valid floor request", () => {
            expect(() => elevator.requestFloor(startFloor - 3)).not.toThrow(Error);
        });
    });

    describe("moving", () => {

        it("should not be idle", () => {
            expect(elevator.idle).toBe(false);
        });

        it("should not be able to handle a request while moving", () => {
            expect(() => elevator.requestFloor(0)).toThrow(Error);
        });

        it("should have moved two floors", () => {
            sleep(speedInSeconds * 2);
            expect(elevator.floor).toBe(startFloor - 2);
        });
    });

    describe("destination position", () => {
        const waitSeconds = speedInSeconds;
        testIdlePosition("destination", waitSeconds);
    });

});

const msleep = (n: number) => {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
};
const sleep = (n: number) => {
    msleep(n * 1000);
};
