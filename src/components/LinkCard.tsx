import type { ReactNode } from 'react'

interface LinkCardProps {
  href: string
  label: string
  caption: string
  icon: ReactNode
  variant?: 'genesis' | 'bmc' | 'kofi' | 'social' | 'default'
  className?: string
  iconWrapperClassName?: string
  iconWrapperStyle?: React.CSSProperties
}

const VARIANT: Record<string, { border: string; glow: string; iconBg: string; title: string; chevron: string }> = {
  genesis: {
    border: 'border border-genesisBlue border-opacity-30',
    glow: 'absolute inset-0 bg-genesisBlue opacity-5',
    iconBg: 'bg-genesisBlue shadow-[0_0_15px_rgba(79,70,229,0.3)]',
    title: 'text-indigo-400',
    chevron: 'text-genesisBlue',
  },
  bmc: {
    border: 'border border-bmcYellow border-opacity-50',
    glow: 'absolute inset-0 bg-bmcYellow opacity-5',
    iconBg: 'bg-bmcYellow shadow-[0_0_15px_rgba(255,221,0,0.4)]',
    title: 'text-bmcYellow',
    chevron: 'text-bmcYellow',
  },
  kofi: {
    border: 'border border-kofiRed border-opacity-50',
    glow: 'absolute inset-0 bg-kofiRed opacity-5',
    iconBg: 'bg-kofiRed shadow-[0_0_15px_rgba(255,94,91,0.4)]',
    title: 'text-kofiRed',
    chevron: 'text-kofiRed',
  },
  social: {
    border: 'border border-gray-700',
    glow: '',
    iconBg: '',
    title: 'text-white',
    chevron: 'text-gray-500',
  },
  default: {
    border: 'border border-gray-700',
    glow: '',
    iconBg: '',
    title: 'text-white',
    chevron: 'text-gray-500',
  },
}

export default function LinkCard({
  href,
  label,
  caption,
  icon,
  variant = 'default',
  className,
  iconWrapperClassName,
  iconWrapperStyle,
}: LinkCardProps) {
  const v = VARIANT[variant]
  const base =
    'link-btn flex items-center bg-hdGray hover:bg-gray-800 w-full rounded-xl p-5 text-white font-medium'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${v.border} relative overflow-hidden ${className ?? ''}`}
    >
      {v.glow && <div className={v.glow} />}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mr-5 shadow-lg relative z-10 ${v.iconBg} ${iconWrapperClassName ?? ''}`}
        style={iconWrapperStyle}
      >
        {icon}
      </div>
      <div className="flex-1 text-left relative z-10">
        <span className={`block text-xl font-bold ${v.title}`}>{label}</span>
        <span className="block text-sm text-gray-400">{caption}</span>
      </div>
      <i className={`fa-solid fa-chevron-right relative z-10 ${v.chevron}`} />
    </a>
  )
}