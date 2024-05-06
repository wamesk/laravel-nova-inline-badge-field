import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
    app.component('index-wame-inline-badge', IndexField)
    app.component('detail-wame-inline-badge', DetailField)
    app.component('form-wame-inline-badge', FormField)
})
