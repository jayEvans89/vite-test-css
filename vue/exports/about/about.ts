import VueRender from '@/vueRender'

import about from '@/components/about.vue'
import shared from '@/components/shared.vue'

const components = [
  {
    name: 'aboutComponent',
    component: about
  },
  {
    name: 'sharedComponent',
    component: shared
  }
]

VueRender(components)
