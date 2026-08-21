import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { createServiceHubDemo } from '../demo/serviceHubDemo';

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  priority: string;
  status: string;
  assignee?: string;
  createdAt: string;
  slaRisk: string;
}

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true';
const demo = createServiceHubDemo();

export const useTicketsStore = defineStore('tickets', () => {
  const items = ref<Ticket[]>([]);
  const query = ref('');
  const status = ref('');
  const error = ref<string | null>(null);

  const visible = computed(() => items.value.filter((item) =>
    (!query.value || `${item.subject} ${item.customer} ${item.id}`.toLowerCase().includes(query.value.toLowerCase())) &&
    (!status.value || item.status === status.value)
  ));

  async function load() {
    try {
      if (demoMode) {
        items.value = await demo.list();
      } else {
        const response = await fetch('/api/tickets');
        if (!response.ok) throw new Error('Unable to load tickets');
        items.value = await response.json();
      }
      error.value = null;
    } catch (caught) {
      error.value = caught instanceof Error ? caught.message : 'Request failed';
    }
  }

  return { items, visible, query, status, error, load };
});
