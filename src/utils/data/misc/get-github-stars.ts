export const fetchGithubStars = async () => {
  const response = await fetch(
    'https://api.github.com/repos/techblitzdev/TechBlitz',
    {
      next: {
        revalidate: 3600,
      },
    },
  )

  return response.json()
}
