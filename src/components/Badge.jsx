export default function Badge({ type = "green", children }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}
