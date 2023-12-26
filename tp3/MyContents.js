/// @ts-check

import * as THREE from "three";
import { MyApp } from "./MyApp.js";
import { MyBackground } from "./background/MyBackground.js";
import { Kart } from "./Kart.js";
import { Picker } from "./Picker.js";
import { ALL_VEHICLES, HELPERS } from "./Layers.js";
import PlayState from "./state/PlayState.js";
import GameStateManager from "./state/GameStateManager.js";

/**
 *  This class contains the contents of out application
 */
export class MyContents {
    /**
       constructs the object
       @param {MyApp} app The application object
    */
    constructor(app) {
        this.app = app;

        this.axis = new THREE.AxesHelper();
        this.axis.layers.set(HELPERS);
        this.app.scene.add(this.axis);

        this.showHelpers = true;
        /** @type {(THREE.SpotLightHelper|THREE.PointLightHelper|THREE.DirectionalLightHelper)[]} */
        this.helpers = [];

        this.ambient = new THREE.AmbientLight(0xffffff);
        this.app.scene.add(this.ambient);

        this.background = new MyBackground(this.app);
        this.app.scene.add(this.background);

        this.timestamp = null;

        this.stateManager = new GameStateManager();

        this.kart = new Kart(this.app);

        this.vehiclePicker = new Picker(app, ALL_VEHICLES);
        this.vehiclePicker.startPicking();

        // TODO: change initial state
        const state = new PlayState(this.app, this.stateManager, this.kart, null);
        this.stateManager.pushState(state);
    }

    /**
     * initializes the contents
     */
    init() {
        // create once
        if (this.axis === null) {
            // create and attach the axis to the scene
            this.axis = new THREE.AxesHelper();
            this.app.scene.add(this.axis);
        }
    }

    /**
     * Updates the helpers of the scene on user input (controlled through the GUI).
     */
    updateHelpers() {
        this.helpers.forEach((h) => (h.visible = this.showHelpers));
    }

    update() {
        if (this.timestamp === null) {
            this.timestamp = performance.now();
            return;
        }

        const deltaMs = performance.now() - this.timestamp;
        const deltaS = deltaMs / 1000;

        this.stateManager.current.update(deltaS);

        this.timestamp = performance.now();
    }
}
