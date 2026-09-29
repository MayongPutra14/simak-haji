import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const ZoneDistributionChart = ({ data }) => {
  return (
    <div className="flex flex-col justify-between p-5 bg-white border shadow-sm rounded-2xl border-slate-100">
      <div>
        <h3 className="text-base font-bold text-slate-800">Distribusi Zona</h3>
        <p className="text-xs text-slate-500">
          Sebaran jemaah per wilayah zona (A-F)
        </p>
      </div>

      <div className="w-full my-auto h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} Jemaah (${props.payload.percentage}%)`,
                name,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs font-medium text-slate-600">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
