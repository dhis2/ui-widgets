export const select = (selected, path) => [...selected, path]

export const deselect = (selected, path) => {
    const index = selected.indexOf(path)

    if (index === -1) return selected

    return [...selected.slice(0, index), ...selected.slice(index + 1)]
}

export const expand = (expanded, path) => [...expanded, path]

export const collapse = (expanded, path) => {
    const index = expanded.indexOf(path)

    if (index === -1) return expanded

    return [...expanded.slice(0, index), ...expanded.slice(index + 1)]
}

export const SELECT = 'SELECT'
export const DESELECT = 'DESELECT'
export const EXPAND = 'EXPAND'
export const COLLAPSE = 'COLLAPSE'
