export interface Registry {
  unregister: () => void;
}

export interface Callable {
  [key: string]: Function;
}

export interface Subscriber {
  [key: string]: Callable;
}

export interface IBus {
  dispatch<T>(event: string, arg?: T): void;
  register(event: string, callback: Function): Registry;
}

export class Bus implements IBus {
  private subscribers: Subscriber;
  private static nextId = 0;
  private static instance?: Bus = undefined;

  private constructor() {
    this.subscribers = {};
  }

  public static getInstance(): Bus {
    if (this.instance === undefined) {
      this.instance = new Bus();
    }

    return this.instance;
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscriber = this.subscribers[event];

    if (subscriber === undefined) {
      return;
    }

    Object.keys(subscriber).forEach((key) => subscriber[key](arg));
  }

  public register(event: string, callback: Function): Registry {
    const id = this.getNextId();
    if (!this.subscribers[event]) this.subscribers[event] = {};

    this.subscribers[event][id] = callback;

    return {
      unregister: () => {
        delete this.subscribers[event][id];
        if (Object.keys(this.subscribers[event]).length === 0)
          delete this.subscribers[event];
      },
    };
  }

  private getNextId(): number {
    return Bus.nextId++;
  }
}
