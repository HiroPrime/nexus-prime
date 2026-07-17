const BASE_STATS = [
  { label: "Bandwidth", value: "999" },
  { label: "Creative Vision", value: "255" },
  { label: "Execution", value: "99" },
  { label: "Agile Development", value: "60" },
  { label: "Bug Resistance", value: "404" },
  { label: "Total EXP", value: "1337", highlight: true },
] as const;

const RESISTANCES = [
  { label: "Scope Creep", value: "99%" },
  { label: "Shiny Object Syndrome", value: "40%" },
  { label: "Tutorial Paralysis", value: "IMMUNE", immune: true },
] as const;

export function StatusPanel() {
  return (
    <aside className="status-panel" aria-label="Character status">
      <div className="status-panel-frame">
        <p className="status-panel-kicker">Status</p>

        <div className="status-panel-header">
          <p className="status-panel-name">BasicHiro</p>
        </div>

        <div className="status-panel-section">
          <h2 className="status-panel-heading">Base Stats</h2>
          <dl className="status-panel-list">
            {BASE_STATS.map((stat) => (
              <div
                key={stat.label}
                className={`status-panel-row${
                  "highlight" in stat && stat.highlight
                    ? " status-panel-row--highlight"
                    : ""
                }`}
              >
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="status-panel-section">
          <h2 className="status-panel-heading">Resistances</h2>
          <dl className="status-panel-list">
            {RESISTANCES.map((stat) => (
              <div key={stat.label} className="status-panel-row">
                <dt>{stat.label}</dt>
                <dd
                  className={
                    "immune" in stat && stat.immune
                      ? "status-panel-value--immune"
                      : undefined
                  }
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </aside>
  );
}
