import { Elevator, IElevatorSpec } from "./elevator";

class ElevatorCoordinator {

    private elevators: Elevator[];

    constructor(specs?: IElevatorSpec[]) {
        this.elevators = new Array<Elevator>();

        if (specs) {
            // TODO create a map with elevatorID to array index
            specs.forEach((spec) =>  this.elevators.push(new Elevator(spec)));
        }
    }

    public isIdleElevator = (): boolean => this.elevators.some((elevator) => elevator.idle === true);

    public getSnapshot = (): IElevator[] => {
        const elevatorSnapshots = this.elevators.map((elevator) => {
            return {
                id: elevator.id,
                floor: elevator.floor,
                destination: elevator.destination,
                idle: elevator.idle,
            };
        });
        return elevatorSnapshots;
    }

    public requestElevator(floor: number): IElevator {
        const index = this.decideElevatorForRequest(floor);
        const elevator = this.elevators[index];
        elevator.requestFloor(floor);
        return {
            id: elevator.id,
            floor: elevator.floor,
            destination: elevator.destination,
            idle: elevator.idle,
        };
    }

    private decideElevatorForRequest = (floor: number): number => {
        const distanceArray = this.elevators.map((elevator): number => elevator.cost(floor));
        // find the index
        return distanceArray.indexOf(Math.min(...distanceArray));
    }

}

interface IElevator {
    id: number;
    floor: number;
    destination: number;
    idle: boolean;
}

export { ElevatorCoordinator, IElevator, IElevatorSpec };
