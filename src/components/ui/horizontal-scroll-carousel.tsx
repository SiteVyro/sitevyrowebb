import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"

interface HorizontalScrollCarouselProps {
  images: string[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ images }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-95%"])

  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-x-hidden overflow-y-hidden">
        <motion.div style={{ x }} className="flex gap-4 md:gap-6">
          {images.map((src, i) => (
            <Card key={i} src={src} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const Card: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="group relative h-[250px] w-[250px] md:h-[450px] md:w-[450px] overflow-hidden rounded-2xl flex-shrink-0">
      <img
        src={src}
        alt="Portfolio"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  )
}

export { HorizontalScrollCarousel }
