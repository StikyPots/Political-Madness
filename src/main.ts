import { UiStateController } from "./Controllers/UiStateController";
import { ARROW_CURSOR, DATASTORE_NAMES, ENCRYPTION_KEY, GameState, restart } from "./Utils/Constantes";
import { KeyConstant, Scancode } from "love.keyboard";
import { printTable, requireAllStates, xorEncrypt } from "./Utils/Functions";
import { Scheduler } from "./Classes/Scheduler";
import { ServiceRegistry } from "./Services/Utils/ServiceRegistry";
import { DEFAULT_PLAYER_DATA, DefaultPlayerData } from "./Types/Templates/DefaultPlayerData";
import { DataStorage } from "./Classes/DataStorage";
import { Localization } from "./Controllers/Localization";
import { SETTING_CONFIG, SettingConfig } from "./Types/Templates/Setting";
import { InputManager } from "./Controllers/InputManager";
import { MenuComponent } from "./Controllers/GUIComponents/MenuComponent";



love.load = (): void => {
  love.window.setFullscreen(false)

  requireAllStates()
  ServiceRegistry.init();

  const datastore = ServiceRegistry.getService("DatastoreService");

  const PLAYER_DATA: DataStorage<DefaultPlayerData> = datastore.getDataStorage<DefaultPlayerData>
    (
      DATASTORE_NAMES.PLAYER_DATA,
      DEFAULT_PLAYER_DATA
    );




  const SETTING_DATA: DataStorage<SettingConfig> = datastore.getDataStorage<SettingConfig>
    (
      DATASTORE_NAMES.SETTING,
      SETTING_CONFIG,
    )
  datastore.init();


  Localization.setLocalization(SETTING_DATA.get("lang"));

  UiStateController.initializeGuiStates()
  UiStateController.setCurrentGameState(GameState.Menu)


  InputManager.bindDefaultGameInput();

  const guiState = UiStateController.getGuiState(GameState.Menu);
  const menuComponent = guiState.getComponent(MenuComponent);
}


love.update = (dt: number): void => {
  love.mouse.setCursor(ARROW_CURSOR)

  Scheduler.schedule(dt);
  ServiceRegistry.bindOnHeartbeat(dt);
  UiStateController.updateCurrentState(dt)
}


love.draw = (): void => {
  if (PLAYER_DATA.get("IsWomen") === false) {
    print('retrun to kitchen')
    os.exit(0);
  }
  UiStateController.drawCurrentState()
}

love.keypressed = (key: KeyConstant, scancode: Scancode, isrepeat: boolean) => {
  InputManager.bindsOnLoveEvent(key, scancode, isrepeat);
}

love.wheelmoved = (x: number, y: number) => {
  UiStateController.onWheelMoved(x, y);
}

love.mousemoved = () => {
}


love.mousepressed = (x: number, y: number, button: number, isTouch: boolean, presses: number) => {
  UiStateController.buttonGuiHandler(x, y, button, isTouch, presses)
}

love.quit = () => {



  const datastore = ServiceRegistry.getService("DatastoreService");
  datastore.saveAll();

  os.exit();
}
