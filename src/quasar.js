import Vue from 'vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QAvatar,
  QImg,
  QChip,
  QPage,
  QCard,
  QCardSection,
  QCardActions,
  QScrollArea,
  QDialog,
  QToolbar,
  QToolbarTitle,
  QTabPanels,
  QTabPanel,
  QTooltip,
  QInput,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  ClosePopup
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QAvatar,
    QImg,
    QChip,
    QPage,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QScrollArea,
    QToolbar,
    QToolbarTitle,
    QTabPanels,
    QTabPanel,
    QTooltip,
    QInput,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel
  },
  directives: {
    ClosePopup
  },
  plugins: {
  }
})
