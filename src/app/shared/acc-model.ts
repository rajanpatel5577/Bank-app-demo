export class AccModel {
    constructor( 
        public name:string, 
        public userId:string, 
        public password:number, 
        public accNum: number, 
        public accType:string,
        public statments:statmentModel[],
        ){
    }
}

export class statmentModel {
    constructor(
        public date:string, 
        public movementType:string, 
        public amount:number){}
}