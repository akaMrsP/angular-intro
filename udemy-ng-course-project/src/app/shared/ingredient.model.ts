// What should an ingredient look like?
export class Ingredient {
    // public name: string;
    // public amount: number;
    // public unit: string;

    // constructor (name: string, amount: number, unit: string) {
        //     this.name = name;
        //     this.amount = amount;
        //     this.unit = unit;
        // }
        
    // typescript shortcut for the above:
    constructor (public name: string, public amount: number, public units: string) {}
}