/*
An event bus implements the publisher/subscriber pattern. 
It can be used to decouple the components of an application, 
so that a component can react to events fired from 
another component without them having direct dependencies with each other.


Every subscriber can subscribe to a specific event. A subscriber 
will be notified when the event it subscribes to is published on the event bus.
*/

export default class EventBus {
    /**
     * Initialize a new event bus instance.
     */
    constructor() {
        this.bus = document.createElement('fakeelement');
    }

    /**
     * Add an event listener.
     */
    addEventListener(event, callback) {
        this.bus.addEventListener(event, callback);
    }

    /**
     * Remove an event listener.
     */
    removeEventListener(event, callback) {
        this.bus.removeEventListener(event, callback);
    }

    /**
     * Dispatch an event.
     */
    dispatchEvent(event, detail = {}) {
        this.bus.dispatchEvent(new CustomEvent(event, { detail }));
    }
}