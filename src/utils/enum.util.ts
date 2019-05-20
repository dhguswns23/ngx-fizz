export class EnumUtils {
    public static keyList(en: object): Array<any> {
        const res = [];
        for (const key of Object.keys(en)) {
            if (typeof key !== 'number') {
                res.push(key);
            }
        }
        return res;
    }

    public static valueList(en: object): Array<any> {
        const res = [];
        for (const value of Object.values(en)) {
            if (typeof value !== 'number') {
                res.push(value);
            }
        }
        return res;
    }
}
