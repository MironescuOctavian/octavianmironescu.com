const fragments = [
  {
    name: "RequestPipeline.ts",
    language: "TypeScript",
    position: "code-panel-typescript",
    source: `interface RequestContext<T> {
  readonly requestId: string;
  payload: T;
  signal: AbortSignal;
}

export async function execute<T, R>(
  context: RequestContext<T>,
  handler: (payload: T) => Promise<R>,
): Promise<R> {
  context.signal.throwIfAborted();
  const started = performance.now();
  try {
    return await handler(context.payload);
  } finally {
    trace.record(context.requestId, {
      duration: performance.now() - started,
    });
  }
}`,
  },
  {
    name: "EdgeWorker.ts",
    language: "Cloudflare",
    position: "code-panel-edge",
    source: `export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const key = request.headers.get('CF-Connecting-IP') ?? 'local';
    const { success } = await env.RATE_LIMIT.limit({ key });
    if (!success) {
      return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const row = await env.DB.prepare(
      'SELECT slug, title FROM entries WHERE status = ?1 LIMIT 6',
    )
      .bind('published')
      .all();

    ctx.waitUntil(recordEdgeHit(env, request.url));
    return Response.json(row.results);
  },
};`,
  },
  {
    name: "MetricsQuery.sql",
    language: "PostgreSQL / D1",
    position: "code-panel-sql",
    source: `WITH recent_traces AS (
  SELECT
    route_slug,
    edge_region,
    latency_ms,
    ROW_NUMBER() OVER (
      PARTITION BY edge_region
      ORDER BY recorded_at DESC
    ) AS sample_rank
  FROM worker_request_traces
  WHERE status_code = 200
)
SELECT
  edge_region,
  COUNT(*) AS requests,
  ROUND(AVG(latency_ms), 2) AS avg_ms
FROM recent_traces
WHERE sample_rank <= 50
GROUP BY edge_region
ORDER BY avg_ms ASC;`,
  },
  {
    name: "ProjectService.java",
    language: "Java / Spring",
    position: "code-panel-java",
    source: `@Service
@RequiredArgsConstructor
public class ProjectService {
  private final ProjectRepository repository;
  private final ApplicationEventPublisher events;

  @Transactional
  public Project publish(UUID projectId) {
    var project = repository.findById(projectId)
      .orElseThrow(ProjectNotFound::new);

    project.publish(Instant.now());
    events.publishEvent(
      new ProjectPublished(project.getId())
    );
    return repository.save(project);
  }
}`,
  },
];

function highlight(line: string) {
  return line
    .split(
      /(\b(?:export|default|async|function|interface|readonly|return|await|const|if|try|finally|public|private|final|class|var|new|SELECT|FROM|WHERE|AND|GROUP BY|ORDER BY|WITH|AS|JOIN|ON|OVER|PARTITION BY|DESC|ASC|LIMIT|COUNT|AVG|ROUND|ROW_NUMBER)\b|'[^']*'|@\w+|\b\d+\b)/g,
    )
    .map((token, index) => (
      <span
        class={
          index % 2
            ? token.startsWith("'")
              ? "code-token-string"
              : "code-token-keyword"
            : undefined
        }
      >
        {token}
      </span>
    ));
}

export default function CodeAtmosphere() {
  return (
    <div class="site-code-workspace">
      {fragments.map((fragment) => (
        <div class={`code-panel ${fragment.position}`}>
          <div class="code-panel-tab">
            <span class="code-tab-dot" />
            {fragment.name}
            <span>{fragment.language}</span>
          </div>
          <pre>
            <code class="code-scroll-track">
              {[0, 1].map(() => (
                <span class="code-scroll-copy">
                  {fragment.source.split("\n").map((line, index) => (
                    <span class="code-source-line">
                      <span class="code-line-number">{String(index + 1).padStart(2, "0")}</span>
                      {highlight(line)}
                      {"\n"}
                    </span>
                  ))}
                </span>
              ))}
            </code>
          </pre>
        </div>
      ))}
    </div>
  );
}
