<script setup lang="ts">
import { onMounted } from 'vue';
import { useTicketsStore } from './stores/tickets';

const store = useTicketsStore();
onMounted(() => store.load());
</script>

<template>
  <div class="app">
    <aside>
      <div class="brand"><span>SH</span><b>ServiceHub</b></div>
      <nav><strong>Inbox</strong><i>My tickets</i><i>Customers</i><i>Analytics</i></nav>
      <div class="agent"><div>RM</div><p><b>Rahul Maurya</b><small>Support Engineer</small></p></div>
    </aside>
    <main>
      <header><div><small>SUPPORT OPERATIONS</small><h1>Team inbox</h1><p>Prioritize customer issues before they become SLA breaches.</p></div></header>
      <section class="metrics">
        <article><span>Visible tickets</span><strong>{{ store.visible.length }}</strong><small>active queue</small></article>
        <article><span>SLA at risk</span><strong>{{ store.visible.filter(t => t.slaRisk !== 'healthy').length }}</strong><small>review priority</small></article>
        <article><span>Urgent</span><strong>{{ store.visible.filter(t => t.priority === 'urgent').length }}</strong><small>highest priority</small></article>
        <article><span>Data source</span><strong>REST</strong><small>MongoDB-backed API</small></article>
      </section>
      <section class="panel">
        <div class="toolbar">
          <input v-model="store.query" placeholder="Search tickets or customers" />
          <select v-model="store.status">
            <option value="">All statuses</option><option value="open">Open</option><option value="in_progress">In progress</option><option value="waiting_customer">Waiting customer</option><option value="resolved">Resolved</option>
          </select>
        </div>
        <p v-if="store.error" class="error">{{ store.error }}</p>
        <table>
          <thead><tr><th>Ticket</th><th>Customer</th><th>Priority</th><th>Status</th><th>SLA</th><th>Assignee</th></tr></thead>
          <tbody>
            <tr v-for="t in store.visible" :key="t.id">
              <td><span class="id">{{ t.id }}</span><strong>{{ t.subject }}</strong></td><td>{{ t.customer }}</td>
              <td><span class="priority">{{ t.priority }}</span></td><td>{{ t.status.replace('_', ' ') }}</td>
              <td><span class="sla">{{ t.slaRisk.replace('_', ' ') }}</span></td><td>{{ t.assignee ?? 'Unassigned' }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
