<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">{{ $t('settlement.form.title') }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="settlementId"
              :label="$t('settlement.form.placeholder')"
              :rules="[val => !!val || $t('settlement.form.required')]"
            />

            <div>
              <q-btn :label="$t('settlement.form.submit')" type="submit" color="primary" :loading="loading" />
              <q-btn :label="$t('settlement.form.clear')" color="secondary" flat class="q-ml-sm" @click="clearForm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-card v-if="currentSettlement" class="my-card">
        <q-card-section>
          <div class="text-h6">{{ $t('settlement.details.title') }}</div>
        </q-card-section>

        <q-card-section>
          <settlement-details :settlement="currentSettlement" />
        </q-card-section>
      </q-card>

      <q-banner v-if="error" class="bg-negative text-white">
        {{ error }}
      </q-banner>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettlementStore } from 'src/stores/settlementStore';
import { storeToRefs } from 'pinia';
import SettlementDetails from './SettlementDetails.vue';

const $t = useI18n().t;
const settlementStore = useSettlementStore();
const { currentSettlement, isLoading, error } = storeToRefs(settlementStore);
const settlementId = ref('');
const loading = computed(() => isLoading.value);

async function onSubmit() {
  if (!settlementId.value) return;
  
  try {
    await settlementStore.fetchSettlementById(settlementId.value);
  } catch (err) {
    console.error('Error al consultar el settlement:', err);
  }
}

function clearForm() {
  settlementId.value = '';
  settlementStore.clearSettlement();
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
}
</style>