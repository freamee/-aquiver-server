import { sourceType } from '../types';
import { ESX_SERVER } from './esx-types';

export class ESX {
    private static _ESX: ESX_SERVER = null;

    static get ESX() {
        if (!this._ESX) {
            this._ESX = globalThis.exports['es_extended'].getSharedObject();
        }

        return this._ESX;
    }

    static getPlayer(source: sourceType) {
        return this.ESX.GetPlayerFromId(source);
    }

    static getName(source: sourceType) {
        const Player = this.getPlayer(source);
        return Player.getName();
    }

    static getIdentifier(source: sourceType) {
        const Player = this.getPlayer(source);
        return Player.identifier;
    }

    static Notification(source: sourceType, message: string) {
        emitNet('esx:showNotification', source, message);
    }

    static getAccountMoney(source: sourceType, type: string) {
        let Amount = 0;
        const Player = this.getPlayer(source);
        const Ref = Player.getAccount(type);
        if (Ref) Amount = Ref.money;
        return Amount;
    }

    static setAccountMoney(source: sourceType, type: string, amount: number) {
        const Player = this.getPlayer(source);
        Player.setAccountMoney(type, amount);
    }

    static hasGroup(source: sourceType, permissionGroup: string) {
        const Player = this.getPlayer(source);
        return Player.getGroup() == permissionGroup;
    }
}
