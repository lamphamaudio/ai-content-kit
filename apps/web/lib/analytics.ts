export function trackClientEvent(name: string, properties: Record<string, unknown> = {}) {
  console.info("[analytics]", name, properties);
}

