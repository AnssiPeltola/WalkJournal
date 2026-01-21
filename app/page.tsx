import { getAllWalkSessions } from "@/db/queries";

export default async function Home() {
  const allSessions = await getAllWalkSessions ()
  console.log('All walk sessions:', allSessions)

  return (
    <main>
      <h1>All Walk Sessions (Test)</h1>
      <pre>{JSON.stringify(allSessions, null, 2)}</pre>
    </main>
  )
}