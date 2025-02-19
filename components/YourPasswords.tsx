export default function YourPasswords() {
  // This would typically fetch data from an API or database
  const passwords = [
    { id: 1, website: "example.com", username: "user1" },
    { id: 2, website: "test.com", username: "user2" },
  ]

  return (
    <ul className="space-y-2">
      {passwords.map((pw) => (
        <li key={pw.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
          <span>
            {pw.website} - {pw.username}
          </span>
          <button className="text-red-600 hover:text-red-800">Delete</button>
        </li>
      ))}
    </ul>
  )
}

