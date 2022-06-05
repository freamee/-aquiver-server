const DefinedFrameworks = ['ESX_LEGACY', 'QBCORE', 'STANDALONE'] as const;
type SupportedFrameworks = typeof DefinedFrameworks[number];

const DefinedSqls = ['oxmysql', 'mysql-async'] as const;
type SupportedSqls = typeof DefinedSqls[number];

export class Config {
    private static _framework: SupportedFrameworks = 'STANDALONE';
    private static _sqlResource: SupportedSqls = 'oxmysql';

    /** default **getAccountMoney('bank')**, change for different account. */
    public static AccountType = 'bank';
    public static SqlDebug: boolean = true;

    /** Get selected Framework type. */
    public static get Framework() {
        return this._framework;
    }

    /** Set selected Framework type. */
    public static set Framework(framework: SupportedFrameworks) {
        if (DefinedFrameworks.includes(framework)) {
            this._framework = framework;
        } else {
            this._framework = 'STANDALONE';
            console.warn(`Framework not found: ${framework}. We set it to ${this.Framework} automatically.`);
        }
    }

    public static get sqlResource() {
        return this._sqlResource;
    }

    public static set sqlResource(sql: SupportedSqls) {
        this._sqlResource = sql;
    }
}