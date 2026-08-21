export interface DemoTicket {
  id: string;
  subject: string;
  customer: string;
  priority: string;
  status: string;
  assignee?: string;
  createdAt: string;
  slaRisk: string;
}

const seed: DemoTicket[] = [
  { id: 'SUP-1421', subject: 'Payment confirmation not received', customer: 'Northstar Retail', priority: 'urgent', status: 'open', assignee: 'Rahul', createdAt: '2026-08-21T04:45:00Z', slaRisk: 'breached' },
  { id: 'SUP-1420', subject: 'Unable to export monthly report', customer: 'Clearview Logistics', priority: 'high', status: 'in_progress', assignee: 'Maya', createdAt: '2026-08-21T05:10:00Z', slaRisk: 'at_risk' },
  { id: 'SUP-1419', subject: 'SSO role mapping question', customer: 'Beacon Health', priority: 'medium', status: 'waiting_customer', assignee: 'Rahul', createdAt: '2026-08-20T21:24:00Z', slaRisk: 'healthy' },
  { id: 'SUP-1418', subject: 'Webhook delivery failures', customer: 'Cedar Labs', priority: 'high', status: 'open', createdAt: '2026-08-21T06:01:00Z', slaRisk: 'at_risk' },
  { id: 'SUP-1417', subject: 'Update billing contact', customer: 'Summit Foods', priority: 'low', status: 'resolved', assignee: 'Jordan', createdAt: '2026-08-20T17:40:00Z', slaRisk: 'healthy' },
  { id: 'SUP-1416', subject: 'API token rotation assistance', customer: 'Nova Capital', priority: 'medium', status: 'in_progress', assignee: 'Leah', createdAt: '2026-08-21T02:15:00Z', slaRisk: 'healthy' },
  { id: 'SUP-1415', subject: 'Dashboard latency during peak hours', customer: 'Oak & Main', priority: 'urgent', status: 'in_progress', assignee: 'Rahul', createdAt: '2026-08-21T03:00:00Z', slaRisk: 'breached' }
];

export function createServiceHubDemo() {
  const tickets = seed.map((ticket) => ({ ...ticket }));

  return {
    list: async () => tickets.map((ticket) => ({ ...ticket }))
  };
}
