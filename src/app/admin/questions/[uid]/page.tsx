export default async function AdminSingleQuestionPage(
  props: {
    params: Promise<{
      uid: string;
    }>;
  }
) {
  const params = await props.params;
  return <div className="">Question id: {params.uid}</div>;
}
