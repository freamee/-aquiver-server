import { Config } from '../..';
import { ESX } from '../ESX';
import { QBCORE } from '../QBCORE';

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
            case 'ESX': {
                return ESX.getAccountMoney(this.source, Config.AccountType);
            }
            case 'QBCORE': {
                return QBCORE.getAccountMoney(this.source, Config.AccountType);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].getBank(this.source) ?? 0;
            }
        }
    }

    /** Set Player's Account money, can be selected by **Config.AccountType**. */
    set accountMoney(amount: number) {
        switch (Config.Framework) {
            case 'ESX': {
                ESX.setAccountMoney(this.source, Config.AccountType, amount);
                break;
            }
            case 'QBCORE': {
                QBCORE.setAccountMoney(this.source, Config.AccountType, amount);
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
            case 'ESX': {
                return ESX.getName(this.source);
            }
            case 'QBCORE': {
                return QBCORE.getName(this.source);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].getRoleplayName(this.source) ?? 'UNDEFINED_NAME';
            }
        }
    }

    /** Get Player's Identifier */
    get identifier() {
        switch (Config.Framework) {
            case 'ESX': {
                return ESX.getIdentifier(this.source);
            }
            case 'QBCORE': {
                return QBCORE.getIdentifier(this.source);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].getIdentifier(this.source) ?? '';
            }
        }
    }

    hasPermission(permissionGroup: string) {
        switch (Config.Framework) {
            case 'ESX': {
                return ESX.hasGroup(this.source, permissionGroup);
            }
            case 'QBCORE': {
                return QBCORE.hasGroup(this.source, permissionGroup);
            }
            case 'STANDALONE': {
                return globalThis.exports[GetCurrentResourceName()].isAdmin(this.source) ?? false;
            }
        }
    }

    /** Send notification to Player. */
    Notification(message: string) {
        switch (Config.Framework) {
            case 'ESX': {
                this.triggerClient('esx:showNotification', message);
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
