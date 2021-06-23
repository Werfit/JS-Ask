export const createUpdateList = fields => {
    const tmp = []
    Object.keys(fields).forEach(f => tmp.push(`${f} = '${fields[f]}'`))
    return tmp.join(', ')
}