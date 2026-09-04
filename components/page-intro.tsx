export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return <section className="simple-page"><p className="eyebrow">{label}</p><h1>{title}</h1><p>{description}</p></section>;
}
