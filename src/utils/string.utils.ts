export class StringUtils {
    public static capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);

    }
}
