import { useMemo } from 'react'
import { default as Plot } from 'react-plotly.js'

const SAMPLE: { iso3: string; country: string; attacks: number }[] = [
  { iso3: 'USA', country: 'United States', attacks: 1240 },
  { iso3: 'CAN', country: 'Canada', attacks: 230 },
  { iso3: 'MEX', country: 'Mexico', attacks: 180 },
  { iso3: 'BRA', country: 'Brazil', attacks: 510 },
  { iso3: 'ARG', country: 'Argentina', attacks: 75 },
  { iso3: 'GBR', country: 'United Kingdom', attacks: 840 },
  { iso3: 'FRA', country: 'France', attacks: 465 },
  { iso3: 'DEU', country: 'Germany', attacks: 590 },
  { iso3: 'RUS', country: 'Russia', attacks: 720 },
  { iso3: 'CHN', country: 'China', attacks: 1320 },
  { iso3: 'IND', country: 'India', attacks: 980 },
  { iso3: 'PAK', country: 'Pakistan', attacks: 120 },
  { iso3: 'JPN', country: 'Japan', attacks: 410 },
  { iso3: 'KOR', country: 'South Korea', attacks: 350 },
  { iso3: 'AUS', country: 'Australia', attacks: 260 },
  { iso3: 'IDN', country: 'Indonesia', attacks: 200 },
  { iso3: 'ZAF', country: 'South Africa', attacks: 170 },
  { iso3: 'NGA', country: 'Nigeria', attacks: 140 },
  { iso3: 'EGY', country: 'Egypt', attacks: 95 },
  { iso3: 'TUR', country: 'Turkey', attacks: 310 },
  { iso3: 'SAU', country: 'Saudi Arabia', attacks: 220 },
]

export default function WorldMap({
  data,
  isDark = false,
  isLoading = false,
}: {
  data?: { iso3: string; country: string; attacks: number }[]
  isDark?: boolean
  isLoading?: boolean
}) {
  const source = data && data.length ? data : SAMPLE
  const locations = useMemo(() => source.map((s) => s.iso3), [source])
  const z = useMemo(() => source.map((s) => s.attacks), [source])
  const text = useMemo(() => source.map((s) => `${s.country}<br><b>${s.attacks.toLocaleString()}</b> attacks`), [source])
  const total = useMemo(() => source.reduce((acc, s) => acc + s.attacks, 0), [source])

  const maxVal = Math.max(...z)

  const plotData = [
    {
      type: 'choropleth' as const,
      locations,
      z,
      text,
      hovertemplate: '%{text}<extra></extra>',
      autocolorscale: false,
      colorscale: [
        [0, '#fff7fb'],
        [0.2, '#fde0ef'],
        [0.4, '#fcc5c0'],
        [0.6, '#fa9fb5'],
        [0.8, '#f768a1'],
        [1, '#c51b8a'],
      ],
      marker: { line: { color: 'rgba(255,255,255,0.6)', width: 0.5 } },
      zmin: 0,
      zmax: Math.max(50, Math.ceil(maxVal * 1.05)),
      colorbar: {
        title: 'Attacks',
        ticksuffix: '',
        outlinewidth: 0,
        thickness: 12,
      },
    },
  ]

  const layout = {
    title: {
      text: `Global attacks — total ${total.toLocaleString()}`,
      font: { size: 16, color: isDark ? '#e6e6e9' : '#111827' },
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 48, b: 8, l: 8, r: 8 },
    geo: {
      projection: { type: 'natural earth' },
      showframe: false,
      showcoastlines: true,
      coastlinecolor: isDark ? '#374151' : '#9ca3af',
      bgcolor: 'rgba(0,0,0,0)',
      lakecolor: isDark ? '#062a3a' : '#e6f7ff',
      landcolor: isDark ? '#0b1220' : '#f7f7f7',
      showland: true,
      subunitcolor: isDark ? '#1f2937' : '#e5e7eb',
    },
    annotations: [
      {
        text: '<b>Hover</b> a country for details',
        showarrow: false,
        x: 0.01,
        xanchor: 'left',
        y: 0.02,
        yanchor: 'bottom',
        font: { size: 11, color: isDark ? '#9ca3af' : '#6b7280' },
      },
    ],
  }

  const config = { responsive: true, displaylogo: false }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <svg className="h-10 w-10 animate-spin text-cyan-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading map data…</p>
        </div>
      </div>
    )
  }

  if (!source || source.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">No data available</p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Adjust filters to display data on the map.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
      World map placeholder
    </div>
  )
}
