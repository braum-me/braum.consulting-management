import Image from 'next/image'

/**
 * Full Wordmark (Schrift + Icon). `size` = Höhe in px, Breite folgt
 * dem natürlichen 2:1-Verhältnis der SVG.
 */
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/assets/logo/logo-04.svg"
      alt="Braum Consulting"
      width={size * 2}
      height={size}
      priority
      style={{ display: 'block', height: `${size}px`, width: 'auto' }}
    />
  )
}
