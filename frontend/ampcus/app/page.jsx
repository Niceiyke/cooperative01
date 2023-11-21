import Link from "next/link";


export default function Home() {
  return (
    <main className="main bg-slate-950">

      <h1 className="text-orange-500 text-center"> Welcome to Ama cooperative society</h1>
      <h2 className="text-primary-text mb-4">Empoering you for greatness</h2>
      <Link href='/register'><button >Join us</button></Link>




    </main>
  )
}
