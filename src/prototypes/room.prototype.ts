export {}

declare global {
    interface Room {
    sources:Source[];
    test():void;
}
}

Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        // If we dont have the value stored locally
        if (!this._sources) {
            // Get the sources objects from the id's in memory and store them locally
            this._sources = this.find(FIND_SOURCES);
        }
        return this._sources;
    },

    enumerable: false,
    configurable: true

});

Room.prototype.test = function():void {

    console.log('Test function');

};
