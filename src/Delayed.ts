export enum Type {
    Interval,
    Timeout
}

export class Delayed {
    public active: boolean;
    public time: number;
    public elapsedTime: number;

    protected handler: Function;
    protected args: any;
    protected type: number;

    constructor (handler: Function, args: any, time: number, type: number) {
        this.active = true;

        this.handler = handler;
        this.args = args;
        this.time = time;
        this.elapsedTime = 0;

        this.type = type;
    }

    tick (deltaTime: number) {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.time) {
            this.execute();
        }
    }

    execute () {
        this.handler.apply(this, this.args);

        if (this.type === Type.Timeout) {
            this.active = false;
        } else {
            this.elapsedTime -= this.time;
        }
    }

    reset () {
        this.elapsedTime = 0;
    }

    clear () {
        this.active = false;
    }

}
