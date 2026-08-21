import { describe, expect, it } from 'vitest';
import { createServiceHubDemo } from './serviceHubDemo';

describe('ServiceHub portfolio demo', () => {
  it('loads a realistic support queue with SLA risk and ownership data', async () => {
    const demo = createServiceHubDemo();
    const tickets = await demo.list();

    expect(tickets.length).toBeGreaterThanOrEqual(6);
    expect(tickets.some((ticket) => ticket.priority === 'urgent')).toBe(true);
    expect(tickets.some((ticket) => ticket.slaRisk === 'breached')).toBe(true);
    expect(tickets.some((ticket) => ticket.assignee)).toBe(true);
  });

  it('keeps demo data immutable between new demo sessions', async () => {
    const first = createServiceHubDemo();
    const second = createServiceHubDemo();
    const a = await first.list();
    const b = await second.list();

    a[0].status = 'resolved';
    expect(b[0].status).not.toBe('resolved');
  });
});
