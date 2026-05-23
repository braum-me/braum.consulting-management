import HoldingHero from '@/components/HoldingHero'
import AnimatedGradient from '@/components/AnimatedGradient'
import HeroParticles from '@/components/HeroParticles'

export default function Page() {
  return (
    <>
      <AnimatedGradient variant="hero" />
      <HeroParticles />
      <HoldingHero />
    </>
  )
}
