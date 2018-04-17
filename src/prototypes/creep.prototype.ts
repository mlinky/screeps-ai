export {}

declare global {
    interface Creep {
        role:string;
        homeRoom:string;
        workRoom:string;
        source:string;
        container:string;

        runRole():void;

    }
}

Creep.prototype.runRole = function():void {
    console.log('runrole');
    console.log(this.role);






}
