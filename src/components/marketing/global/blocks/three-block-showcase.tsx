/**
 *
 * 'Built for modern teams' - https://mintlify.com/
 *
 * Used to showcase 3 features of TechBlitz.
 * No link to other pages, just a simple 3 block showcase.
 *
 * Either shows default values in the boxes, or they can be customized
 * via props.
 *
 * @returns
 */
export default function ThreeBlockShowcase({
  title,
  subheader,
  align = 'left',
  left,
  right,
  center,
}: {
  title: string;
  subheader: string;
  align?: 'left' | 'center' | 'right';
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
}) {
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const baseCardClasses =
    'rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-slate-800/50 overflow-hidden backdrop-blur-sm';

  return (
    <section className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24 lg:pb-32 flex flex-col gap-8">
      <div className={`flex flex-col gap-4 ${alignMap[align]}`}>
        <h2 className="text-3xl md:text-5xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 py-1">
          {title}
        </h2>
        <p className="text-base lg:text-lg text-gray-400 font-onest max-w-3xl mx-auto">
          {subheader}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-4">
        <div
          className={`${baseCardClasses} group relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-slate-800/50 overflow-hidden backdrop-blur-sm`}
        >
          <div className="relative z-10">
            {left || (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Goal Setting</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Set clear coding goals and track your progress with our intuitive goal-setting
                  features. Stay motivated with visual progress indicators.
                </p>
              </>
            )}
          </div>
        </div>

        <div
          className={`${baseCardClasses} group relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-slate-800/50 overflow-hidden backdrop-blur-sm`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {center || (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Powerful AI Assistant</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Get personalized coding help and guidance from our advanced AI assistant designed
                  to help you solve problems efficiently.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="group relative bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-slate-800/50 overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            {right || (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Progress Tracking</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Visualize your learning journey with detailed analytics and progress tracking,
                  helping you identify areas for improvement.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
