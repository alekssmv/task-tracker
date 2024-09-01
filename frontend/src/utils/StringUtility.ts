class StringUtility {

    stringToDate(str: string)
    {
        return str.split('T')[0];
    }

}
export default new StringUtility()