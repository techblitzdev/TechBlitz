export default function SocialProof(opts: { userCount: number }) {
  const { userCount } = opts;

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center gap-x-8 px-4 text-center justify-center">
        <span className="text-sm font-medium text-gray-400">
          Trusted by{' '}
          <span className="text-white font-semibold">{userCount}+</span>{' '}
          developers building their dream careers.
        </span>
      </div>
    </div>
  );
}
