const originalJSONParse = JSON.parse

// Tried to apply BigInt parse globally
JSON.parse = function (text: string, reviver?: (this: any, key: string, value: any) => any) {
    return originalJSONParse(text, (key, value) => {
        if (typeof value === 'string' && /^\d+$/.test(value) && value.length > 15) {
            return BigInt(value)
        }
        return reviver ? reviver.call(this, key, value) : value
    })
}
