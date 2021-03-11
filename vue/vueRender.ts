import 'vite/dynamic-import-polyfill'
import Vue from 'vue'
import kebabCase from 'lodash.kebabcase'
import { VueConstructor } from 'vue/types/umd'

Vue.config.productionTip = false

export default function VueRender(components: Array<VueComponent>) {
  document.addEventListener('DOMContentLoaded', () => {

    components.forEach((vueComponent: VueComponent) => {
      const kebabName = kebabCase(vueComponent.name)
      const componentName = document.getElementsByTagName(kebabName)
      const componentsArray = Array.prototype.slice.call(componentName)

      componentsArray.forEach(component => {
        const data = {} as ComponentProps

        // Get any props
        for (const attr of component.attributes) {
          const name = attr.name
          data[name] = (attr.value)
        }

        new Vue({
          render: h => h(vueComponent.component, {
            props: data
          })
        }).$mount(component)
      })
    })
  })
}

interface VueComponent {
  name: string,
  component: VueConstructor<Vue>
}

interface ComponentProps {
  [key: string]: string
}
