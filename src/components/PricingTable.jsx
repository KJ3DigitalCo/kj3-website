export default function PricingTable({ pricing }) {
  if (!pricing) return null

  const { packages, items, addOns, note, label } = pricing
  const rows = packages || items
  const hasIncluded = rows.some((row) => row.included)
  const columnLabel = label || (packages ? 'Package' : 'Item')

  return (
    <div className="mt-6">
      <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="whitespace-nowrap px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                {columnLabel}
              </th>
              <th className="whitespace-nowrap px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                Price
              </th>
              {hasIncluded && (
                <th className="whitespace-nowrap px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                  What's included
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-line last:border-b-0">
                <td className="whitespace-nowrap px-5 py-3 font-sans text-sm font-semibold text-ink">
                  {row.name}
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-sans text-sm text-marigold-ink">
                  {row.price}
                </td>
                {hasIncluded && (
                  <td className="px-5 py-3 font-sans text-sm text-ink-muted">{row.included}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <p className="mt-3 font-sans text-xs italic text-ink-muted">{note}</p>}

      {addOns && (
        <div className="mt-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            Add-ons (à la carte)
          </span>
          <div className="mt-2 overflow-x-auto rounded-2xl border border-line bg-paper">
            <table className="w-full min-w-[320px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="whitespace-nowrap px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                    Add-on
                  </th>
                  <th className="whitespace-nowrap px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((row) => (
                  <tr key={row.name} className="border-b border-line last:border-b-0">
                    <td className="px-5 py-2.5 font-sans text-sm text-ink">{row.name}</td>
                    <td className="whitespace-nowrap px-5 py-2.5 font-sans text-sm text-marigold-ink">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
