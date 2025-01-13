export default function ProfilePage({ params }: { params: { uid: string } }) {
  const { uid } = params;

  return <div>{uid}</div>;
}
