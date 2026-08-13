export default defineMcpTool({
  name: 'health',
  description: 'Check that the MCP server and app are running',
  inputSchema: {},
  handler: async () => ({
    ok: true as const,
    service: 'my-nuxt-stack',
    checkedAt: new Date().toISOString(),
  }),
})
