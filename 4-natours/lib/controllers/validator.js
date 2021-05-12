function validate(object, schema, method) {
    let validatedAttributes = 0;

    for (const [attribute, properties] of Object.entries(schema)) {
        /* Update operation shouldn't validate all the required properties from the schema. */
        if (!(method === 'PATCH') && properties.required && !object[attribute]) {
            return false;
        }

        const foundAttribute = object[attribute];
        if (!foundAttribute)
            continue;

        if(properties.type === 'Array<string>') {
            if (!Array.isArray(foundAttribute)) {
                return false;
            }

            for (const element in foundAttribute)
                if (typeof element !== 'string') {
                    return false;
                }

        } else if (!(typeof foundAttribute === properties.type)) {
            return false;
        }

        validatedAttributes++;
    }

    /* It has properties that are not present in the schema. */
    return validatedAttributes === Object.keys(object).length;
}

module.exports = validate;