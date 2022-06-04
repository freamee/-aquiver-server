import { sourceType } from '../types';

export class QBCORE {
    private static _QBCORE = null;

    static get QBCore() {
        if (!this._QBCORE) {
            this._QBCORE = globalThis.exports['qb-core'].GetCoreObject();
        }

        return this._QBCORE;
    }

    static getPlayer(source: sourceType) {
        return this.QBCore.Functions.GetPlayer(source);
    }

    static getName(source: sourceType) {
        const Player = this.getPlayer(source);
        return `${Player.charinfo.firstname} ${Player.charinfo.lastname}`;
    }

    static getIdentifier(source: sourceType) {
        return this.QBCore.Functions.GetIdentifier(source);
    }

    static Notification(source: sourceType, message: string) {
        emitNet('QBCore:Notify', source, message);
    }

    static getAccountMoney(source: sourceType, type: string) {
        const Player = this.getPlayer(source);
        return Player.Functions.GetMoney(type);
    }

    static setAccountMoney(source: sourceType, type: string, amount: number) {
        const Player = this.getPlayer(source);
        Player.Functions.SetMoney(type, amount);
    }

    static hasGroup(source: sourceType, permissionGroup: string) {
        return this.QBCore.Functions.HasPermission(source, permissionGroup);
    }
}
