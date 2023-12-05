export const getUser = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/success`, {
      credentials: 'include'
    })
    if (response.ok) {
      const data = await response.json()
      return data
      // dispatch(userActions.login(data.user));
    } else {
      throw new Error('Error logging in..')
    }
  } catch (err) {
    console.log(err)
  }
}
