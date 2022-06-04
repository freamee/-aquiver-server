import { Config } from '../..';
import { Frameworks } from '../Frameworks';

export class AquiverPlayer {
    public source: number | string;

    constructor(source: number | string) {
        this.source = source;
    }

    /** Get the Player Ped Handle. */
    get playerPed() {
        return GetPlayerPed(this.source as string);
    }

    /** Get Player's Account money. can be selected by **Config.AccountType**. */
    get accountMoney(): number {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getAccount(Config.AccountType).money;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.Functions.GetMoney(Config.AccountType);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].getBank(this.source) ?? 0;
            }
        }
    }

    /** Set Player's Account money, can be selected by **Config.AccountType**. */
    set accountMoney(amount: number) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.setAccountMoney(Config.AccountType, amount);
                break;
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                Player.Functions.SetMoney(Config.AccountType, amount);
                break;
            }
            case 'STANDALONE': {
                globalThis.exports[GetCurrentResourceName()].setBank(this.source, amount);
                break;
            }
        }
    }

    /** Get Player's Roleplay Name */
    get name() {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getName();
            }
            case 'QBCORE': {
                const Player = Frameworks.QBCore.Functions.GetPlayer(this.source);
                return Player.charinfo.firstname + ' ' + Player.charinfo.lastname;
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].getRoleplayName(this.source) ?? 'UNDEFINED_NAME';
            }
        }
    }

    /** Get Player's Identifier */
    get identifier() {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getIdentifier();
            }
            case 'QBCORE': {
                return Frameworks.QBCore.Functions.GetIdentifier(this.source);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].getIdentifier(this.source) ?? '';
            }
        }
    }

    hasPermission(permissionGroup: string) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                return Player.getGroup() == permissionGroup;
            }
            case 'QBCORE': {
                return Frameworks.QBCore.Functions.HasPermission(this.source, permissionGroup);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].isAdmin(this.source) ?? false;
            }
        }
    }

    /** Send notification to Player. */
    Notification(message: string) {
        switch (Config.Framework) {
            case 'ESX_LEGACY': {
                const Player = Frameworks.ESX.GetPlayerFromId(this.source);
                Player.showNotification(message);
                break;
            }
            case 'QBCORE': {
                this.triggerClient('QBCore:Notify', message);
                break;
            }
            case 'STANDALONE': {
                globalThis.exports[GetCurrentResourceName()].notification(this.source, message);
                break;
            }
        }
    }

    /** Check if player exist on the server or not. */
    exist() {
        return GetPlayerName(this.source as string) == null;
    }

    /** Trigger clientside event on player. */
    triggerClient(eventName: string, ...args: any[]) {
        emitNet(eventName, this.source, ...args);
    }
}
