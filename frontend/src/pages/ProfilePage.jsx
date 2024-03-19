function ProfilePage () {
  const { user } = useAuth()
  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
export default ProfilePage;