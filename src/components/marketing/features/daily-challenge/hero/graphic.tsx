import CodeSnippet from '@/components/marketing/global/code-snippet';

const codeSnippet1 = `const loadDataWithCache = async (url, options = {}) => {
  const cache = new Map();
  const cacheKey = \`\${url}-\${JSON.stringify(options)}\`;
  const cacheDuration = options.cacheDuration || 300000; // 5 minutes

  try {
    if (cache.has(cacheKey)) {
      const { data, timestamp } = cache.get(cacheKey);
      if (Date.now() - timestamp < cacheDuration) {
        console.log('Returning cached data');
        return data;
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data.');
  }
};`;

const codeSnippet2 = `const validateFormData = ({ email, password, name }) => {
  const errors = {};
  const sanitized = {};

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.email = 'Invalid email format';
  } else {
    sanitized.email = email.trim().toLowerCase();
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.password = 'Password must include letters and numbers';
  } else {
    sanitized.password = password;
  }

  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else {
    sanitized.name = name
      .trim()
      .replace(/\\b\\w/g, (char) => char.toUpperCase());
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
};`;

const codeSnippet3 = `const analyzeTransactions = (transactions) => {
  const totals = transactions.reduce(
    (acc, { date, amount, category }) => {
      acc.total += amount;
      acc.count++;
      acc.category[category || 'uncategorized'] =
        (acc.category[category] || 0) + amount;

      const month = new Date(date).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      acc.month[month] = (acc.month[month] || 0) + amount;

      if (amount > (acc.largest?.amount || 0)) {
        acc.largest = { date, amount, category };
      }

      return acc;
    },
    { total: 0, count: 0, category: {}, month: {}, largest: null }
  );

  totals.avg = totals.total / totals.count;
  totals.percentages = Object.fromEntries(
    Object.entries(totals.category).map(([cat, amt]) => [
      cat,
      ((amt / totals.total) * 100).toFixed(2) + '%',
    ])
  );

  return totals;
};`;

const codeSnippet4 = `const processUserData = (users) => {
  const grouped = users.reduce((acc, user) => {
    const range = \`\${Math.floor(user.age / 10) * 10}-\${Math.floor(user.age / 10) * 10 + 9}\`;
    if (!acc[range]) acc[range] = [];
    acc[range].push(user);
    return acc;
  }, {});

  const stats = Object.entries(grouped).map(([range, group]) => ({
    range,
    count: group.length,
    avgAge: group.reduce((sum, user) => sum + user.age, 0) / group.length,
    activeCount: group.filter((u) => u.active).length,
  }));

  return {
    stats,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.active).length,
    avgAge: users.reduce((sum, u) => sum + u.age, 0) / users.length,
  };
};`;

export default function FeatureDailyChallengeHeroGraphic() {
  return (
    <>
      <div
        className="
						bg-black-75 h-96 w-80 absolute -top-40 right-[22rem] 
          	rounded-2xl backdrop-blur-sm hidden xl:block
					"
      >
        <CodeSnippet
          code={codeSnippet1}
          language="javascript"
          filename="loadDataWithCache.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>
      <div
        className="
						bg-black-75 h-96 w-80 absolute top-[19rem] right-[22rem] 
          	rounded-2xl backdrop-blur-sm z-20 hidden xl:block
					"
      >
        <CodeSnippet
          code={codeSnippet2}
          language="javascript"
          filename="validateFormData.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>
      <div
        className="
						bg-black-75 h-96 w-80 absolute right-0 
          	rounded-2xl backdrop-blur-sm
					"
      >
        <CodeSnippet
          code={codeSnippet3}
          language="javascript"
          filename="analyzeTransactions.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>
      <div
        className="
						bg-black-75 h-96 w-80 absolute top-[29rem] right-0 
          	rounded-2xl backdrop-blur-sm
					"
      >
        <CodeSnippet
          code={codeSnippet4}
          language="javascript"
          filename="processUserData.js"
          lightTheme="one-dark-pro"
          darkTheme="one-dark-pro"
        />
      </div>

      {/** gradient fade */}
      <div className="z-10 absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000] to-transparent pointer-events-none"></div>
    </>
  );
}
