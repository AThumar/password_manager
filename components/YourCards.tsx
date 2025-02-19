export default function YourCards() {
  // This would typically fetch data from an API or database
  const cards = [
    { id: 1, last4: "1234", brand: "Visa" },
    { id: 2, last4: "5678", brand: "Mastercard" },
    // Add more cards for demonstration
    ...Array.from({ length: 5 }, (_, i) => ({
      id: i + 3,
      last4: String(1000 + i).slice(-4),
      brand: i % 2 === 0 ? "Visa" : "Mastercard",
    })),
  ]

  return (
    <div className="overflow-auto max-h-[300px]">
      <ul className="space-y-2">
        {cards.map((card) => (
          <li key={card.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="font-medium">
              {card.brand} •••• {card.last4}
            </span>
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

