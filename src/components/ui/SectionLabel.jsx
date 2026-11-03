export default function SectionLabel({ index, children, className = '' }) {
  return (
    <div className={`label flex items-center gap-3 ${className}`}>
      {index && <span className="opacity-50">{index}</span>}
      <span className="h-px w-8 bg-current opacity-30" />
      <span>{children}</span>
    </div>
  )
}
