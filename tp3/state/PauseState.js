import { Game } from "../game/Game.js";
import { PAUSE_MENU } from "../renderer/Layers.js";
import { MainMenuState } from "./MainMenuState.js";
import { MenuState } from "./MenuState.js";

export class PauseState extends MenuState {
    /**
     * @param {Game} game
     */
    constructor(game) {
        super(game, game.contents.pauseMenu, PAUSE_MENU);
    }

    /**
     * @param {THREE.Object3D} object
     */
    onPick(object) {
        switch (object.name) {
            case "resume_button":
                this.stateManager.popState();
                break;
            case "main_menu_button":
                this.stateManager.popUntil(MainMenuState);

                if (this.stateManager.current instanceof MainMenuState) {
                    this.stateManager.current.reset();
                }

                break;
        }
    }
}
