class Elevator {

    private _voyage: Voyage;

    constructor(
      private _id: number,
      private _maxFloor: number,
      private _minFloor: number,
      private _speedInSeconds: number,
      private _startFloor: number,
    ) {
        if (this.floorOutOfBounds(_startFloor)) {
            throw new Error(`startFloor can not be ${_startFloor}, should be in [${_minFloor}, ${_maxFloor}]`);
        }

        this._voyage = new Voyage(_startFloor, _startFloor);
    }

    get id(): number {
      return this._id;
    }

    get floor(): number {
        return this.calculateFloor();
    }

    get destination(): number {
        return this._voyage.destination;
    }

    get idle(): boolean {
        this.updateVoyage();
        if (this._voyage.direction === Direction.Idle) {
            return true;
        }
        return false;
    }

    public requestFloor(floor: number): void {
      if (!this.idle) {
         throw new Error("floor can only be requested when elevator is idle");
      }
      if (this.floorOutOfBounds(floor)) {
          throw new Error(`floor was ${floor} but should be [${this._minFloor}, ${this._maxFloor}]`);
      }
      const startFloor = this._voyage.destination;
      this._voyage = new Voyage(startFloor, floor);
    }

    private updateVoyage(): void {
      const floor = this.calculateFloor();
      // if destination is reached update start floor
      if (this._voyage.destination === floor) {
          this._voyage = new Voyage(floor, floor);
      }
    }

    private calculateFloor(): number {
      const timeNow = new Date().getTime();
      const secondsSinceStart = (timeNow - this._voyage.startTimestamp) / 1000;
      const traveledFloorsSinceStart = Math.floor(secondsSinceStart / this._speedInSeconds);

      const floorIfGoingUp =  Math.min(this._voyage.start + traveledFloorsSinceStart, this._voyage.destination);
      const floorIfGoingDown = Math.max(this._voyage.start - traveledFloorsSinceStart, this._voyage.destination);

      return this._voyage.direction === Direction.Up ? floorIfGoingUp : floorIfGoingDown;
  }

    private floorOutOfBounds(floor: number): boolean {
      if ((floor < this._minFloor) ||  (floor > this._maxFloor)) {
          return true;
      }
      return false;
    }

  }

  // Voyage should be immutable
class Voyage {

      // timestamp in milliseconds
      private _startTimestamp: number;
      private _direction: Direction;

      constructor(private _start, private _destination: number) {
          this._startTimestamp = new Date().getTime();
          this._direction = _start > _destination ? Direction.Down
                          : _start < _destination ? Direction.Up
                          : Direction.Idle;
      }
      get start(): number {
          return this._start;
      }
      get destination(): number {
          return this._destination;
      }

      get startTimestamp(): number {
          return this._startTimestamp;
      }

      get direction(): Direction {
          return this._direction;
      }

  }

enum Direction {
      Down = -1,
      Idle = 0,
      Up = 1,
  }

export { Elevator };
