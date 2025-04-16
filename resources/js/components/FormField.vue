<template>
    <DefaultField
        :field="field"
        :errors="errors"
        :show-help-text="showHelpText"
        :full-width-content="fullWidthContent"
    >
        <template #field>
            <SelectControl
                :id="field.uniqueKey"
                :dusk="field.attribute"
                v-model="value"
                @selected="value"
                @change="handleChange"
                @click.stop
                :select-classes="{ 'form-input-border-error': hasError }"
                :options="field.options"
                :disabled="isReadonly"
            >
                <option value="" selected :disabled="!field.nullable">
                    {{ placeholder }}
                </option>
            </SelectControl>
        </template>
    </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'
import find from 'lodash/find'

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    methods: {
        handleChange(value) {
            let selectedOption = find(this.currentField.options, v => v.value == value.target.value);
            this.value = selectedOption ? selectedOption.value : '';
            this.field.value = this.value;
        }
    },

    computed: {
        placeholder() {
            return this.field.placeholder || this.__('placeholder')
        }
    }
}
</script>
