import { FormField, HandlesValidationErrors } from 'laravel-nova'
import find from 'lodash/find'
import { getResource } from './nova-resource'

export default {
    mixins: [
        FormField,
        HandlesValidationErrors
    ],

    methods: {
        async handleChange(value) {
            this.loader = true;
            this.showForm = false;

            let selectedOption = find(this.currentField.options, v => v.value == value);
            this.value = selectedOption ? selectedOption.value : '';
            this.field.value = this.value;
            this.field.label = this.field.options.find(item => item.value === this.value)?.label;
            this.field.typeClass = this.field.types[this.value];

            let formData = new FormData();

            // let resource = await getResource(this.resourceName, this.resourceId);
            let resource = this.field.resource_data;
            for (const key in resource) {
                if (resource.hasOwnProperty(key)) {
                    formData.append(key, resource[key] === null ? '' : resource[key]);
                }
            }

            formData.append(this.field.attribute, this.value);
            formData.append('_method', 'PUT');

            let urlParams = new URLSearchParams();
            urlParams.append('viaResource', this.viaResource);
            urlParams.append('viaResourceId', this.viaResourceId);
            urlParams.append('viaRelationship', '');
            urlParams.append('editing', 'true');
            urlParams.append('editMode', 'update');

            return Nova.request().post(`/nova-api/${this.resourceName}/${this.resourceId}?${urlParams.toString()}`, formData)
                .then(() => {
                    Nova.success(this.__('success', {field: this.field.name, value: selectedOption.label}));
                }, (response) => {
                    Nova.error(response);

                    this.value = this.defaultValue;
                    this.field.value = this.value;
                    this.field.label = this.field.options.find(item => item.value === this.value)?.label;
                    this.field.typeClass = this.field.types[this.value];
                })
                .finally(() => {
                    this.loader = false;
                });
        }
    },

    computed: {
        placeholder() {
            return this.field.placeholder || this.__('placeholder')
        }
    }
}
