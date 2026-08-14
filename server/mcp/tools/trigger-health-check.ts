import { tasks } from '@trigger.dev/sdk'
import { defineMcpTool } from '@nuxtjs/mcp-toolkit/server'

export default defineMcpTool({
  name: "trigger_health_check",
  description: "Queue the Trigger.dev health-check background task",
  inputSchema: {},
  handler: async () => {
    const handle = await tasks.trigger("health-check", {});

    return {
      runId: handle.id,
      message: "Health check task queued",
    };
  },
});
