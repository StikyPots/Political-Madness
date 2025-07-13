import {Player} from "./Player";

export class GameInstance {
    public running: boolean = true;
    public currentPlayer: Player = new Player();


    public draw(): void {

    };

    public update(dt: number): void {

    }

    public getPlayer() {
        return this.currentPlayer;
    }


    createEnnemyInstance() {

    }
}