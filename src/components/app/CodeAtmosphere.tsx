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
      /(\b(?:export|async|function|interface|readonly|return|await|const|try|finally|public|private|final|class|var|new|SELECT|FROM|WHERE|AND|GROUP BY|ORDER BY|WITH|AS|JOIN|ON|OVER|PARTITION BY|DESC)\b|'[^']*'|@\w+|\b\d+\b)/g,
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
