import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg">
        <p className="mb-1 font-semibold" style={{ color: data.color }}>
          {data.name}
        </p>
        <p className="text-white">Penyelesaian: {data.percentage}%</p>
        <p className="text-slate-300">
          ({data.okCount} dari {data.total} Jemaah)
        </p>
      </div>
    );
  }
  return null;
};

export const AdministrationChart = ({ data }) => {
  return (
    <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-100">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-800">
          Kelengkapan Administrasi
        </h3>
        <p className="text-xs text-slate-500">
          Persentase status "ok" per indikator
        </p>
      </div>

      {/* Tinggi dinaikkan dari 380px ke 520px agar jarak antar bar lebih lega */}
      <div className="w-full h-120">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            barCategoryGap="25%" // Memberikan gap/spasi yang cukup di antara tiap kategori
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              unit="%"
              stroke="#94A3B8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#64748B"
              fontSize={12}
              width={85}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
            <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={14}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
