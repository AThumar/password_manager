export default function YourPasswords() {
  // This would typically fetch data from an API or database
  const passwords = [
    { id: 1, website: "example.com", username: "user1" },
    { id: 2, website: "test.com", username: "user2" },
    // Add more passwords for demonstration
    ...Array.from({ length: 5 }, (_, i) => ({
      id: i + 3,
      website: `site${i}.com`,
      username: `user${i + 3}`,
    })),
  ]

  return (
    <div className="overflow-auto max-h-[300px]">
      <ul className="space-y-2">
        {passwords.map((pw) => (
          <li key={pw.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="font-medium">{pw.website}</span>
            <span className="text-gray-600">{pw.username}</span>
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

