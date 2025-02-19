import AddCard from "@/components/AddCard"
import AddPassword from "@/components/AddPassword"
import YourCards from "@/components/YourCards"
import YourPasswords from "@/components/YourPasswords"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Add New</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Add a credit card</h3>
              <AddCard />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Add a password</h3>
              <AddPassword />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Your cards</h3>
              <YourCards />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Your passwords</h3>
              <YourPasswords />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

