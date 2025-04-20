import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Settlement } from '../types/Settlement';
import { api } from 'src/boot/axios';
import axios from 'axios';

export const useSettlementStore = defineStore('settlement', () => {
  const currentSettlement = ref<Settlement | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchSettlementById(id: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    
    try {

      const response = await api.get(`/api/v1/settlements/${id}`);
      currentSettlement.value = response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 404) {
          error.value = 'The settlementId wasn\'t found';
        } else {
          error.value = `Error ${err.response.status}: ${err.response.data?.message || 'Error in server response'}`;
        }
      } else {
        error.value = err instanceof Error ? err.message : 'Unkown error';
      }
      currentSettlement.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  function clearSettlement(): void {
    currentSettlement.value = null;
    error.value = null;
  }

  return {
    currentSettlement,
    isLoading,
    error,
    fetchSettlementById,
    clearSettlement
  };
});