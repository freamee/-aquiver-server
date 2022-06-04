import { ESX_SERVER } from './esx-types';
import { QBCORE_SERVER } from './qbcore-types';

export class Frameworks {
    private static _ESX: ESX_SERVER = null;
    private static _QBCORE: QBCORE_SERVER = null;

    static get ESX() {
        if (!this._ESX) {
            this._ESX = globalThis.exports['es_extended'].getSharedObject();
        }

        return this._ESX;
    }

    static get QBCore() {
        if (!this._QBCORE) {
            this._QBCORE = globalThis.exports['qb-core'].GetCoreObject();
        }

        return this._QBCORE;
    }
}
