import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Braces, Check, ChevronRight, Clipboard, Database, ExternalLink, FileJson, Github, Layers3, Map, MapPinned, Menu, Search, ShieldCheck, Sparkles, X } from 'lucide-react';
import './styles.css';

const datasets = [
  { name: 'Building registry', file: 'building-registry.ts', type: 'Registry', status: 'Maintained', description: 'Canonical building codes, names, aliases, categories and room-to-floor interpretation rules.', fields: ['code', 'name', 'category', 'aliases', 'roomFloorRule'] },
  { name: 'Campus buildings', file: 'buildings.geojson', type: 'GeoJSON', status: 'Derived + reviewed', description: 'Navigation points and canonical building metadata for the UTM campus.', fields: ['geometry', 'code', 'name', 'geometryRole', 'source'] },
  { name: 'Building footprints', file: 'footprints/*.geojson', type: 'GeoJSON', status: 'Source-linked', description: 'Per-building polygon geometry with source IDs and provenance notes.', fields: ['buildingCode', 'name', 'category', 'sourceIds', 'geometry'] },
  { name: 'Entrances & access', file: 'generated/campus-access-audit.json', type: 'JSON', status: 'Audited', description: 'Coverage and verification information for exterior entrances and approach geometry.', fields: ['code', 'canonicalGeometry', 'verifiedExteriorEntrances', 'inferredApproaches'] },
];

const steps = [
  ['01', 'Source', 'Start from attributable public geometry, campus references, direct observation, or a clearly documented derivation.'],
  ['02', 'Normalize', 'Convert names, codes, coordinates and properties into Gapwise’s stable canonical schema.'],
  ['03', 'Verify', 'Cross-check geometry and semantics; flag uncertainty rather than silently inventing detail.'],
  ['04', 'Review', 'Inspect the data in context and run consistency checks against neighboring campus entities.'],
  ['05', 'Publish', 'Ship data with provenance and machine-readable structure so downstream projects can reuse it safely.'],
];

const snippets = {
  javascript: `const response = await fetch('/data/buildings.geojson');\nconst campus = await response.json();\n\nconst deerfield = campus.features.find(\n  feature => feature.properties.code === 'DH'\n);\n\nconsole.log(deerfield.properties.name);`,
  python: `import json\n\nwith open('buildings.geojson') as f:\n    campus = json.load(f)\n\ndeerfield = next(\n    f for f in campus['features']\n    if f['properties']['code'] == 'DH'\n)\n\nprint(deerfield['properties']['name'])`,
  curl: `curl -L https://raw.githubusercontent.com/andrewmuratov/gapwise/main/src/data/utm/buildings.geojson \\\n  -o buildings.geojson`,
};

function App() {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('javascript');
  const [copied, setCopied] = useState(false);
  const [menu, setMenu] = useState(false);
  const filtered = useMemo(() => datasets.filter(d => (d.name + d.file + d.description + d.type).toLowerCase().includes(query.toLowerCase())), [query]);

  const copy = async () => {
    await navigator.clipboard.writeText(snippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return <div className="app">
    <header className="topbar">
      <a className="brand" href="#top"><img src="/logo-mark.svg" alt="" /><span>Gapwise <b>Data</b></span></a>
      <nav className={menu ? 'nav open' : 'nav'}>
        <a href="#datasets" onClick={() => setMenu(false)}>Datasets</a>
        <a href="#collection" onClick={() => setMenu(false)}>Collection</a>
        <a href="#schemas" onClick={() => setMenu(false)}>Schemas</a>
        <a href="#use" onClick={() => setMenu(false)}>Use the data</a>
        <a href="https://github.com/andrewmuratov/gapwise-data" target="_blank">GitHub <ExternalLink size={14}/></a>
      </nav>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
    </header>

    <main id="top">
      <section className="hero shell">
        <div className="eyebrow"><Sparkles size={14}/> Open campus data, explained</div>
        <h1>The map behind <span>Gapwise.</span></h1>
        <p className="lead">A transparent, developer-friendly home for the data that powers Gapwise’s campus map: how it is collected, structured, checked, attributed, and reused.</p>
        <div className="hero-actions">
          <a className="primary" href="#datasets">Explore the data <ChevronRight size={17}/></a>
          <a className="secondary" href="https://github.com/andrewmuratov/gapwise" target="_blank"><Github size={17}/> View source</a>
        </div>
        <div className="stats">
          <div><strong>GeoJSON</strong><span>spatial data</span></div>
          <div><strong>Auditable</strong><span>provenance-first</span></div>
          <div><strong>Reusable</strong><span>project-friendly</span></div>
          <div><strong>UTM</strong><span>current coverage</span></div>
        </div>
      </section>

      <section className="shell intro-grid">
        <article className="feature-card"><MapPinned/><h3>Geometry with context</h3><p>Not just coordinates. Building identity, geometry role, source IDs and campus semantics live alongside the shapes.</p></article>
        <article className="feature-card"><ShieldCheck/><h3>Provenance over guesswork</h3><p>Every useful map eventually faces uncertainty. Gapwise records where data came from and distinguishes verification from inference.</p></article>
        <article className="feature-card"><Braces/><h3>Built to be reused</h3><p>Stable codes and conventional formats make the data straightforward to consume in websites, scripts, visualizations and experiments.</p></article>
      </section>

      <section id="datasets" className="section shell">
        <div className="section-heading"><div><span className="kicker">DATA CATALOG</span><h2>Know what exists.</h2><p>Browse the major data surfaces and the role each one plays in the map stack.</p></div><div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search datasets…" /></div></div>
        <div className="dataset-grid">
          {filtered.map((d, i) => <article className="dataset" key={d.file}>
            <div className="dataset-top"><span className="file-icon">{d.type === 'GeoJSON' ? <Map size={18}/> : d.type === 'JSON' ? <FileJson size={18}/> : <Database size={18}/>}</span><span className="badge">{d.status}</span></div>
            <h3>{d.name}</h3><code>{d.file}</code><p>{d.description}</p>
            <div className="fields">{d.fields.map(f=><span key={f}>{f}</span>)}</div>
          </article>)}
        </div>
      </section>

      <section id="collection" className="section process-wrap">
        <div className="shell"><span className="kicker">COLLECTION PIPELINE</span><h2>From source to trustworthy map.</h2><p className="section-copy">The collection process is designed to keep observations, transformations and uncertainty visible instead of collapsing them into an unexplained final file.</p>
          <div className="process">{steps.map(([n,t,p])=><div className="step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{p}</p></div></div>)}</div>
        </div>
      </section>

      <section id="schemas" className="section shell schema-grid">
        <div><span className="kicker">SCHEMA EXPLORER</span><h2>Predictable shapes for unpredictable places.</h2><p className="section-copy">Campus spaces are messy; consuming them should not be. Gapwise normalizes common entities into documented properties with explicit geometry roles.</p>
          <div className="legend"><span><i className="dot required"/> canonical</span><span><i className="dot optional"/> contextual</span><span><i className="dot source"/> provenance</span></div>
        </div>
        <div className="schema-card">
          <div className="schema-title"><Layers3 size={18}/><code>BuildingFeature</code></div>
          <div className="schema-row"><b>type</b><code>"Feature"</code><em>canonical</em></div>
          <div className="schema-row"><b>geometry</b><code>Point | Polygon</code><em>canonical</em></div>
          <div className="schema-row"><b>properties.code</b><code>string</code><em>canonical</em></div>
          <div className="schema-row"><b>properties.name</b><code>string</code><em>canonical</em></div>
          <div className="schema-row"><b>properties.geometryRole</b><code>string</code><em>context</em></div>
          <div className="schema-row"><b>properties.source</b><code>string</code><em>provenance</em></div>
          <div className="schema-row"><b>properties.sourceIds</b><code>string[]</code><em>provenance</em></div>
        </div>
      </section>

      <section id="use" className="section shell">
        <span className="kicker">QUICKSTART</span><h2>Put it in your project.</h2><p className="section-copy">The underlying Gapwise repository can be consumed directly today. These examples show the basic pattern; the data site can later expose versioned downloads and a dedicated API.</p>
        <div className="codebox">
          <div className="codebar"><div>{Object.keys(snippets).map(k=><button className={lang===k?'active':''} onClick={()=>setLang(k)} key={k}>{k}</button>)}</div><button className="copy" onClick={copy}>{copied?<Check size={16}/>:<Clipboard size={16}/>} {copied?'Copied':'Copy'}</button></div>
          <pre><code>{snippets[lang]}</code></pre>
        </div>
      </section>

      <section className="section shell principles">
        <div><BookOpen/><span className="kicker">DESIGN PRINCIPLES</span><h2>What “open data” means here.</h2></div>
        <div className="principle-list">
          <article><span>01</span><div><h3>Explain the transformation</h3><p>Reusable data needs a story: original source, normalization, derived fields and review status.</p></div></article>
          <article><span>02</span><div><h3>Separate fact from inference</h3><p>When something is inferred for navigation or presentation, it should be represented as such.</p></div></article>
          <article><span>03</span><div><h3>Prefer stable identifiers</h3><p>Human-readable labels can change. Stable building codes and source IDs give downstream projects a durable join key.</p></div></article>
          <article><span>04</span><div><h3>Make inspection easy</h3><p>A good dataset should be explorable by people as well as parsable by software. This site is the human layer.</p></div></article>
        </div>
      </section>
    </main>

    <footer><div className="shell footer-inner"><div className="brand"><img src="/logo-mark.svg" alt=""/><span>Gapwise <b>Data</b></span></div><p>Independent campus data tooling for Gapwise. Not an official University of Toronto service.</p><a href="https://github.com/andrewmuratov/gapwise-data" target="_blank">GitHub <ExternalLink size={14}/></a></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />);
