
export const setActive = (propsLocation, path, additionalClasses = "") => {
    return propsLocation.includes (path) ? "active" + additionalClasses : ""
}