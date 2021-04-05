class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return 'Beep.';
    }
    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`
    }
}

let myFirstVehicle = new Vehicle('Honda', 'Monster Truck', 1999);

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

let myFirstCar = new Car('Toyota', 'Corolla', 2005);

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine() {
        return 'VROOM!';
    }
}

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

class Garage {
    constructor(numSpaces) {
        this.spaces = [];
        this.numSpaces = 2;
    }
    addVehicle(myVehicle) {
        if (!(myVehicle instanceof Vehicle)) {
            return 'Cars only bud!';
        }
        if (this.spaces.length >= this.numSpaces) {
            return `We're filled up!`;
        }
        this.spaces.push(myVehicle);
        return 'Vehicle added!';
    }
}

let garage = new Garage(2);