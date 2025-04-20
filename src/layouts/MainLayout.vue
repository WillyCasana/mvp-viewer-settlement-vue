<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Visor de Settlements
        </q-toolbar-title>

        <q-btn flat round dense icon="translate" class="q-ml-sm">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable @click="changeLanguage('es-ES')">
                <q-item-section>Español</q-item-section>
              </q-item>
              <q-item clickable @click="changeLanguage('en-US')">
                <q-item-section>English</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-2 text-grey-8">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle2">
          © {{ currentYear }} - Visor de Settlements v1.0.0
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const currentYear = computed(() => new Date().getFullYear());

function changeLanguage(locale: string) {
  i18n.locale.value = locale;
}
</script>
