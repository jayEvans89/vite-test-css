import VueRender from '@/vueRender'

import home from '@/components/home.vue'
import shared from '@/components/shared.vue'

const components = [
  {
    name: 'homeComponent',
    component: home
  },
  {
    name: 'sharedComponent',
    component: shared
  }
]

VueRender(components)
