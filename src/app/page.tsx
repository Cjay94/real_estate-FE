import Navbar from "@/components/Navbar"
import Landing from "./(nondashboard)/landing/page"


const Home = () => {
  return (
    <section className="size-full">
      <Navbar />
      <main className="size-full flex flex-col">
        <Landing />
      </main>
    </section>
  )
}

export default Home