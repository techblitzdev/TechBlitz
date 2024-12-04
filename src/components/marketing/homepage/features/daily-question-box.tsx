'use client';
import { motion, useInView } from 'motion/react';
import CodeDisplay from '@/components/questions/single/code-snippet';
import { useRef } from 'react';

const codeSnippet1 = `let orders = [
  { id: 1, items: [{ price: 10 }, { price: 20 }] }, { id: 2, items: [{ price: 15 }] }
];
let totalRevenue = orders
  .flatMap(order => order.items)
  .reduce((acc, item) => acc + item.price, 0);
// Apply a discount for a holiday sale
totalRevenue *= 0.9;
// Format as currency
let formattedRevenue = £\${totalSales.toFixed(2)}\;
// Missing line here
console.log(formattedRevenue);
`;

const codeSnippet2 = `
let employees = [{ name: "Alice", hoursWorked: 40, hourlyRate: 25 },
  { name: "Bob", hoursWorked: 35, hourlyRate: 20 }];
let payroll = employees
  .map(emp => emp.hoursWorked * emp.hourlyRate)
  .reduce((acc, salary) => acc + salary, 0);
// Add bonuses for overtime
payroll += employees
  .filter(emp => emp.hoursWorked > 40)
  .map(emp => (emp.hoursWorked - 40) * 
  // hey there 😉
  emp.hourlyRate * 1.5)
  .reduce((acc, bonus) => acc + bonus, 0);
// Format as currency
let formattedPayroll = \`Total payroll: £\${payroll.toFixed(2)}\`;
// Missing line here
// and another missing line
// and another!console.log(formattedPayroll);
`;

export default function DailyQuestionBox() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="gap-10"
    >
      <motion.div
        className="
          relative top-6 border border-black-50 rounded-lg overflow-hidden 
          w-3/4 group-hover:top-12 duration-500 group-hover:scale-[1.03]
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15
        }}
      >
        <CodeDisplay
          content={codeSnippet1}
          backgroundColor="#0a0a0a"
        />
      </motion.div>
      <motion.div
        className="
          absolute top-24 left-72 border border-black-50 rounded-lg 
          overflow-hidden w-3/5 group-hover:top-6 duration-500 group-hover:scale-[1.04]
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2
        }}
      >
        <CodeDisplay
          content={codeSnippet2}
          backgroundColor="#0a0a0a"
        />
      </motion.div>
    </div>
  );
}
