import Header from '@/components/Header'
import HeroSlider from '@/components/HeroSlider'
import BestSeller from '@/components/BestSeller'
import WeRecommend from '@/components/WeRecommend'
import Disclaimer from '@/components/Disclaimer'
import Blog from '@/components/Blog'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <BestSeller />
        <WeRecommend />
        <Disclaimer />
        <Blog />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
