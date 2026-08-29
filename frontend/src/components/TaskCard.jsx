export default function TaskCard({ title, count, color }) {
  return (
    <div className="card-container">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
      <p className={`mt-2 text-3xl font-extrabold ${color}`}>{count}</p>
    </div>
  )
}