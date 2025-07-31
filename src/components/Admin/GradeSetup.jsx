export default function GradeSetup() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-2">Grade Setup</h2>
      <p className="text-gray-300 mb-4">Configure grading schemes and thresholds for courses.</p>
      <div className="w-full max-w-md bg-white/10 rounded-lg p-4">
        <table className="w-full text-left text-sm text-white">
          <thead>
            <tr className="border-b border-blue-800">
              <th className="py-2">Grade</th>
              <th className="py-2">Min %</th>
              <th className="py-2">Max %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>90</td>
              <td>100</td>
            </tr>
            <tr>
              <td>B</td>
              <td>80</td>
              <td>89</td>
            </tr>
            <tr>
              <td>C</td>
              <td>70</td>
              <td>79</td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">Save Changes</button>
      </div>
    </div>
  );
} 