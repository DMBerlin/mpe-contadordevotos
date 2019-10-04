<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <q-img src="" />
          </q-avatar>
          Contador de Votos
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      elevated
      v-model="left"
      side="left"
      behavior="mobile"
      class="bg-blue-grey-1"
    >
      <div
        class="col"
        style="width: 100%; height: 100%; background-image: linear-gradient(to top right, #c2009e, #fcb51f);"
      >
        <q-item>
          <q-item-label class="text-body1 text-italic text-white">
            Made by: Daniel Marinho
          </q-item-label>
        </q-item>
        <q-item>
          <q-item-label class="text-subtitle1 text-italic text-white">
            Git: github.com/DMBerlin
          </q-item-label>
        </q-item>
        <q-item>
          <q-item-label class="text-caption text-italic text-white">
            Stack: Vue, Quasar & ApexChart
          </q-item-label>
        </q-item>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="row">
        <q-card
          style="top: 53%; height: auto; width: 720px;"
          class="bg-grey-2 card-wrapper q-pa-md"
        >
          <q-scroll-area style="height: 80vh; width: 700px;">
            <q-item>
              <q-item-section>
                <div class="row q-gutter-md">
                  <q-btn
                    class="q-my-auto"
                    color="primary"
                    @click="alert = !alert"
                    label="Adicionar"
                    :disable="total > 0"
                    :outline="total > 0"
                  />
                  <q-btn
                    class="q-my-auto"
                    :color="total > 0 ? 'secondary' : 'negative'"
                    :outline="!total > 0"
                    @click="
                      (candidatos = []),
                        (chart.series = []),
                        (total = 0),
                        (newPersonAddLocker = true)
                    "
                    :label="total > 0 ? 'Reiniciar' : 'Limpar Todos'"
                  />
                  <q-btn
                    flat
                    :icon="showchart ? 'visibility' : 'visibility_off'"
                    class="q-my-auto"
                    color="grey-6"
                    @click="showchart = !showchart"
                  >
                    <q-tooltip>
                      {{ showchart ? "Esconder gráfico" : "Mostrar gráfico" }}
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-chip>
                  <q-avatar color="red" text-color="white">
                    {{ total }}
                  </q-avatar>
                  Total de votos
                </q-chip>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item>
                  <div class="col-6 text-subtitle1" side>
                    Nome
                  </div>
                  <div class="col-4 text-subtitle1" side>
                    Votos
                  </div>
                  <div class="col-auto text-subtitle1" side>
                    Somar / Sub.
                  </div>
                </q-item>
                <template v-for="(candidato, index) in candidatos">
                  <q-item
                    :key="index"
                    class="bg-blue-grey-1 q-ma-xs"
                    style="border-radius: 5px; border: 1px solid grey; height: 6vh;"
                  >
                    <q-item-section class="col-1" side>
                      <template v-if="!total > 0">
                        <q-btn
                          icon="delete"
                          @click="removerCandidato(candidato)"
                          flat
                          dense
                          :disable="total > 0"
                        >
                          <q-tooltip>
                            Deletar este candidato
                          </q-tooltip>
                        </q-btn>
                      </template>
                      <template v-else>
                        <q-icon
                          :name="getIconName(candidato.votos)"
                          :color="getIconColor(candidato.votos)"
                        />
                      </template>
                    </q-item-section>
                    <q-item-section class="col-5  text-left" side>
                      <q-item-label lines="1">
                        ({{ getUserRank(candidato) }}º) {{ candidato.nome }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section class="col-4" side>
                      <div class="text-h4 text-blue">
                        {{ candidato.votos }}
                      </div>
                    </q-item-section>
                    <q-item-section class="col-md-4" side>
                      <div class="row q-gutter-sm">
                        <q-btn
                          @click="adicionarVoto(candidato)"
                          color="blue"
                          dense
                          style="width: 35px; height: 35px;"
                          label="+"
                        />
                        <q-btn
                          @click="removerVoto(candidato)"
                          color="teal"
                          dense
                          style="width: 35px; height: 35px;"
                          label="-"
                          :disable="candidato.votos === 0"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </template>
              </q-item-section>
            </q-item>
            <apexchart
              v-if="showchart"
              width="100%"
              height="auto"
              type="line"
              :options="chart.options"
              :series="chart.series"
            />
          </q-scroll-area>
        </q-card>
      </div>
      <q-dialog
        v-model="alert"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card style="width: 300px">
          <q-card-section>
            <div class="text-h6">Adicionar Candidato</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="nome"
              hint="Digite o nome do candidato"
              :rules="[
                val => !isNameUnique(val) || 'Esse candidato já existe.'
              ]"
            />
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn
              unelevated
              color="primary"
              text-color="white"
              label="Guardar"
              :disable="newPersonAddLocker"
              @click="adicionarCandidato"
              v-close-popup
            />
            <q-btn outline color="negative" label="Cancelar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      showchart: false,
      newPersonAddLocker: true,
      alert: false,
      left: false,
      total: 0,
      nome: '',
      candidatos: [],
      chart: {
        options: {
          toolbar: {
            show: false
          },
          type: 'line'
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'int',
          range: this.total
        },
        series: [
          // {
          //   name: 'Daniel',
          //   data: [1, 2, 3, 3, 3, 4, 4, 5]
          // },
          // {
          //   name: 'Allanna',
          //   data: [0, 0, 0, 1, 2, 2, 3, 3]
          // }
        ]
      }
    }
  },
  computed: {
    maiorvoto: function () {
      var maior = 0
      this.chart.series.map(serie => {
        if (serie.data[serie.data.length - 1] > maior) {
          maior = serie.data[serie.data.length - 1]
        }
      })
      return maior
    }
  },
  methods: {
    isNameUnique: function (nome) {
      this.newPersonAddLocker = this.candidatos.some(candidato => candidato.nome === nome)
      return this.newPersonAddLocker
    },
    getIconName: function (votos) {
      return (votos >= this.maiorvoto) ? 'star' : 'person'
    },
    getIconColor: function (votos) {
      return (votos >= this.maiorvoto) ? 'orange' : 'blue'
    },
    getUserRank: function (user) {
      const arr = this.chart.series.filter(serie => (serie.data[serie.data.length - 1] > user.votos))
      return arr.length + 1
    },
    adicionarCandidato () {
      this.candidatos.push({
        nome: this.nome,
        icon: 'person',
        votos: 0
      })

      this.chart.series.push({
        name: this.nome,
        data: [0]
      })

      this.nome = ''
      this.newPersonAddLocker = true
    },
    removerCandidato (item) {
      this.candidatos = this.candidatos.filter(candidato => candidato.nome !== item.nome)
      this.chart.series = this.chart.series.filter(serie => serie.name !== item.nome)
      this.nome = ''
      this.newPersonAddLocker = true
    },
    adicionarVoto (data) {
      this.candidatos.map(candidato => {
        if (candidato.nome === data.nome) {
          candidato.votos++
          this.chart.series.map(serie => {
            if (serie.name === data.nome) {
              serie.data.push(candidato.votos)
            } else {
              serie.data.push(serie.data[serie.data.length - 1])
            }
          })
        }
      })
      this.total++
      this.chart.series.push({}) /* Force apex to rerender */
      this.chart.series.pop()
    },
    removerVoto (data) {
      this.candidatos.map(candidato => {
        if (candidato.nome === data.nome) {
          candidato.votos--
          this.chart.series.map(serie => {
            if (serie.name === data.nome) {
              serie.data.push(candidato.votos)
            } else {
              serie.data.push(serie.data[serie.data.length - 1])
            }
          })
        }
      })
      this.total--
      this.chart.series.push({}) /* Force apex to rerender */
      this.chart.series.pop()
    }
  },
  components: {
    apexchart: () => import('vue-apexcharts')
  }
}
</script>
<style scoped>
.card-wrapper {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  widows: auto;
}
</style>
