/* eslint-disable */
export const orgUnitPathPropValidator = (
    propValue,
    key,
    compName,
    location,
    propFullName
) => {
    if (!/(\/[a-zA-Z][a-zA-Z0-9]{10})+/.test(propValue[key])) {
        return new Error(
            `Invalid org unit path \`${
                propValue[key]
            }\` supplied to \`${compName}.${propFullName}\``
        )
    }
    return undefined
}
/* eslint-enable */
