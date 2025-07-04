import {UiStateController} from "./Controllers/UiStateController";
import {ARROW_CURSOR, DATASTORE_NAMES, ENCRYPTION_KEY, GameState} from "./Utils/Constantes";
import {KeyConstant, Scancode} from "love.keyboard";
import {printTable, requireAllStates, xorEncrypt} from "./Utils/Functions";
import {Scheduler} from "./Classes/Scheduler";
import {ServiceRegistry} from "./Services/Utils/ServiceRegistry";
import {DatastoreService} from "./Services/DatastoreService";
import {DEFAULT_PLAYER_DATA, DefaultPlayerData} from "./Interfaces/Templates/DefaultPlayerData";
import {DataStorage} from "./Classes/DataStorage";
import {Localization} from "./Controllers/Localization";
import {SETTING_CONFIG, SettingConfig} from "./Interfaces/Templates/Setting";



love.load = (): void => {
    love.window.setFullscreen(true)

    requireAllStates()
    ServiceRegistry.init();

    const datastore = ServiceRegistry.getService("DatastoreService");

    const PLAYER_DATA: DataStorage<DefaultPlayerData> = datastore.getDataStorage<DefaultPlayerData>
    (
        DATASTORE_NAMES.PLAYER_DATA,
        DEFAULT_PLAYER_DATA
    );

    const SETTING_DATA : DataStorage<SettingConfig> = datastore.getDataStorage<SettingConfig>
    (
        DATASTORE_NAMES.SETTING,
        SETTING_CONFIG,
    )
    datastore.init();


    Localization.setLocalization(SETTING_DATA.get("lang"));

    UiStateController.initializeGuiStates()
    UiStateController.setCurrentGameState(GameState.Menu)
}


love.update = (dt: number): void => {
    Scheduler.schedule(dt);
    ServiceRegistry.bindOnHeartbeat(dt);

    love.mouse.setCursor(ARROW_CURSOR)
    UiStateController.updateCurrentState(dt)
}


love.draw = (): void => {
    UiStateController.drawCurrentState()
}

love.keypressed = (key: KeyConstant, scancode:Scancode, isrepeat: boolean) => {

}

love.wheelmoved = (x: number, y: number) => {
    UiStateController.onWheelMoved(x, y);
}


love.mousepressed = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
    UiStateController.buttonGuiHandler(x, y, button, isTouch, presses)
}

love.quit = () => {

   const datastore =  ServiceRegistry.getService("DatastoreService");
   datastore.saveAll();

    os.exit();
}