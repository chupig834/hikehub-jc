import dynamic from "next/dynamic"
import { Pie, Cell, Tooltip, Label } from "recharts";

const PieChart = dynamic(() => import("recharts").then(recharts => recharts.PieChart), { ssr: false })


export default function PackingWeightChart({ data }) {

  const totalWeight = data.reduce((sum, entry) => sum + entry.value, 0);
  const isEmpty = data.length === 0 || totalWeight === 0;

  const convertToLbs = (weight) => {
    // convert to lbs and round to 1 decimal place
    return Math.round(weight / 16 * 10) / 10
  }

  return (
    <div className="grow basis-48 bg-white p-6 rounded-lg border">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <img
          src="/icons/map-pin.svg" 
          alt="Chart Icon"
          className="w-5 h-5 object-contain"
        />
        Weight
      </h2>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center mt-6 text-center text-sm text-gray-500">
          <img src="/icons/no-results.svg" alt="Empty Icon" className="w-30 h-30 mb-4" />
          <p>No item has been added. Add an item to see weight calculation.</p>
        </div>
      ) : (
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6 mt-4">
        {/* Pie Chart */}
        <PieChart className="flex-none" width={160} height={160}>
          <Pie data={data} dataKey="value" outerRadius={80} innerRadius={52} stroke="none">
            <Label value={convertToLbs(totalWeight) + " lbs"} position="center" />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        
        {/* Legend */}
        <div className="shrink text-sm w-full space-y-1">
          {data.map((entry, index) => {
              const percent = totalWeight > 0 ? Math.round((entry.value / totalWeight) * 100) : 0;
              const roundedValue = Number(entry.value.toFixed(1));
              return (
                <div key={index} className="flex flex-row justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className="font-semibold text-gray-700">{entry.name}</span>
                </div>
                <div className="font-semibold text-gray-600 tabular-nums">
                  {roundedValue} oz <span className="text-gray-400">({percent}%)</span>
                </div>
              </div>
              );
            })}
        </div>
      </div>
      )}
    </div>
  );
}