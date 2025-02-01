export default function AdminSingleQuestionPage({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  return <div className="">Question id: {params.uid}</div>;
}
