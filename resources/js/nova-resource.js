async function getResource(resourceName, resourceId) {
    let data = {};

    await Nova.request().get(`/nova-api/${resourceName}/${resourceId}`)
        .then((response) => {
            for (const field of response.data.resource.fields) {
                if (field.value !== 'undefined' && field.required === true) {
                    if (field.component === 'belongs-to-field') {
                        data[field.attribute] = field.belongsToId;
                    } else {
                        data[field.attribute] = field.value;
                    }
                }
            }
        }, (response) => {
            Nova.error(response);
        });

    return data;
}

module.exports = {
    getResource: getResource
}
