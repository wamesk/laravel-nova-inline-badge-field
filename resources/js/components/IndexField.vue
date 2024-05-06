<template>
    <div v-if="showForm">
        <SelectControl
            :id="field.uniqueKey"
            :dusk="field.attribute"
            v-model:selected="value"
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
    </div>

    <div v-else>
        <Badge
            v-if="value"
            :label="field.label"
            :extra-classes="field.typeClass"
            :style="field.styles[field.value]"
            @click.stop.prevent="show"
        >
            <template #icon>
                <Loader v-if="loader" width="20" class="mr-1" />
                <span v-else-if="field.icon" class="mr-1 -ml-1">
                    <Icon :solid="true" :type="field.icon" />
                </span>
            </template>
        </Badge>

        <div v-else @click.stop.prevent="show">&mdash;</div>
    </div>
</template>

<script>
import InlineBadgeMixin from '../inline-badge-mixin'

export default {
    mixins: [InlineBadgeMixin],

    props: ['resourceName', 'viaResource', 'viaResourceId', 'field'],

    data() {
        return {
            resourceId: null,
            showForm: false,
            loader: false,
            defaultValue: null
        }
    },

    mounted() {
        this.resourceId = this.$attrs.resource.id.value;
        this.defaultValue = this.value;
    },

    methods: {
        show() {
            if (this.$attrs.resource.authorizedToUpdate) {
                this.showForm = true
            }
        }
    }
}
</script>
