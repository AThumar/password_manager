export default function YourCards() {
  // This would typically fetch data from an API or database
  const cards = [
    { id: 1, last4: "1234", brand: "Visa" },
    { id: 2, last4: "5678", brand: "Mastercard" },
  ]

  return (
    <ul className="space-y-2">
      {cards.map((card) => (
        <li key={card.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
          <span>
            {card.brand} •••• {card.last4}
          </span>
          <button className="text-red-600 hover:text-red-800">Delete</button>
        </li>
      ))}
    </ul>
  )
}

