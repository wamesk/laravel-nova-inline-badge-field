<template>
    <PanelItem :index="index" :field="field">
        <template #value>
            <SelectControl
                v-if="showForm"
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

            <div v-else>
                <Badge
                    v-if="value"
                    class="mt-1"
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
    </PanelItem>
</template>

<script>
import InlineBadgeMixin from '../inline-badge-mixin'

export default {
    mixins: [InlineBadgeMixin],

    props: ['index', 'resource', 'resourceName', 'resourceId', 'field'],

    data() {
        return {
            showForm: false,
            loader: false,
            defaultValue: null
        }
    },

    mounted() {
        this.defaultValue = this.value;
    },

    methods: {
        show() {
            if (this.resource.authorizedToUpdate) {
                this.showForm = true
            }
        }
    }
}
</script>
