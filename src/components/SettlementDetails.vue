<template>
  <div class="settlement-details">
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.id') }}:</div>
      <div class="form-value">{{ settlement.SettlementId }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.scheduleCode') }}:</div>
      <div class="form-value">{{ settlement.ScheduleCode }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.externalId') }}:</div>
      <div class="form-value">{{ settlement.ScheduleExternalId }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.country') }}:</div>
      <div class="form-value">{{ settlement.CountryCode }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.contingency') }}:</div>
      <div class="form-value">
        <q-checkbox :model-value="settlement.Contingency" disable />
      </div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.failed') }}:</div>
      <div class="form-value">
        <q-checkbox :model-value="settlement.Failed" disable />
      </div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.status') }}:</div>
      <div class="form-value">
        <q-badge :color="getStatusColor(settlement.Status)">
          {{ settlement.Status }}
        </q-badge>
      </div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.scheduleType') }}:</div>
      <div class="form-value">{{ settlement.ScheduleType }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.referenceDate') }}:</div>
      <div class="form-value">{{ formatDate(settlement.ReferenceDate) }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.referenceDateUtc') }}:</div>
      <div class="form-value">{{ formatDate(settlement.ReferenceDateUtc, true) }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.startDate') }}:</div>
      <div class="form-value">{{ formatDate(settlement.StartDate) }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.endDate') }}:</div>
      <div class="form-value">{{ settlement.EndDate ? formatDate(settlement.EndDate) : '-' }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.timestamp') }}:</div>
      <div class="form-value">{{ formatDate(settlement.TimeStamp) }}</div>
    </div>
    
    <div class="form-group">
      <div class="form-label">{{ $t('settlement.details.certificate') }}:</div>
      <div class="form-value">
        <q-btn 
          outline 
          color="primary" 
          icon="download" 
          :label="$t('settlement.details.downloadCertificate')" 
          :href="settlement.CertificatePath" 
          target="_blank" 
        />
      </div>
    </div>
    
    <div class="section q-mt-md">
      <h6 class="text-subtitle1 q-mb-sm">{{ $t('settlement.details.metadata') }}</h6>
      <q-table
        :rows="settlement.Metadata"
        :columns="metadataColumns"
        row-key="Code"
        hide-pagination
        :pagination="{ rowsPerPage: 0 }"
        v-if="settlement.Metadata && settlement.Metadata.length > 0"
      />
      <div v-else class="q-pa-md">{{ $t('settlement.details.noMetadata') }}</div>
    </div>
    
    <div class="section q-mt-md">
      <h6 class="text-subtitle1 q-mb-sm">{{ $t('settlement.details.files') }}</h6>
      <q-list v-if="settlement.Files && settlement.Files.length > 0">
        <q-item v-for="file in settlement.Files" :key="file">
          <q-item-section avatar>
            <q-icon name="description" color="primary" />
          </q-item-section>
          <q-item-section>{{ file }}</q-item-section>
        </q-item>
      </q-list>
      <div v-else class="q-pa-md">{{ $t('settlement.details.noFiles') }}</div>
    </div>
    
    <div class="section q-mt-md">
      <h6 class="text-subtitle1 q-mb-sm">{{ $t('settlement.details.errors') }}</h6>
      <q-list v-if="settlement.Errors && settlement.Errors.length > 0">
        <q-item v-for="(error, index) in settlement.Errors" :key="index">
          <q-item-section avatar>
            <q-icon name="error" color="negative" />
          </q-item-section>
          <q-item-section>{{ error }}</q-item-section>
        </q-item>
      </q-list>
      <div v-else class="q-pa-md">{{ $t('settlement.details.noErrors') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Settlement } from 'src/types/Settlement';
import { date } from 'quasar';

const $t = useI18n().t;

defineProps<{
  settlement: Settlement
}>();

const metadataColumns = computed(() => [
  {
    name: 'code',
    label: $t('settlement.details.metadataCode'),
    field: 'Code',
    align: 'left'
  },
  {
    name: 'value',
    label: $t('settlement.details.metadataValue'),
    field: 'Value',
    align: 'left'
  }
]);

// Función para formatear fechas
function formatDate(dateString: string, isUtc = false): string {
  if (!dateString) return '-';
  
  const dateObj = new Date(dateString);
  
  const formattedDate = date.formatDate(dateObj, 'DD/MM/YYYY HH:mm:ss');
  return isUtc ? `${formattedDate} UTC` : formattedDate;
}

// Función para determinar el color del estado
function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'InProgressAccreditation': 'blue',
    'Failed': 'red',
    'Completed': 'positive',
    'Pending': 'orange'
  };
  
  return statusColors[status] || 'grey';
}
</script>

<style lang="scss" scoped>
.settlement-details {
  .form-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
    align-items: center;
  }
  
  .form-label {
    font-weight: bold;
    width: 200px;
    color: #555;
  }
  
  .form-value {
    flex: 1;
    min-width: 300px;
  }
  
  .section {
    background-color: #f8f8f8;
    border-radius: 4px;
    padding: 0.5rem 1rem;
  }
}
</style> 