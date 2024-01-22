import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import {  useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
  LineChart,
  BarChart,
  CartesianGrid,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";

const Row1 = () => {
  const { data } = useGetKpisQuery();
  const revenueExpenses = useMemo(() => {
    if (data && data[0] && data[0].monthlyData) {
      return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
      }));
    } else {
      return [];
    }
  }, [data]);
   
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  const { palette } = useTheme();
  return (
    <>
      <DashboardBox gridArea="a">
      <BoxHeader title="Revenue and Expenses" 
        subtitle="top line represents revenue , bottom line represents expenses"
        sideText="+6%"></BoxHeader>
        <ResponsiveContainer width="100%" height="70%">
          <AreaChart
            width={730}
            height={250}
            data={revenueExpenses}
            margin={{ top: 15, right: 25, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "11px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />

            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              dot={true}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#82ca9d"
              dot={true}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
      <BoxHeader title="Profit and revenue" 
        subtitle="top line represents revenue , bottom line represents expenses"
        sideText="+4%"></BoxHeader>
        <ResponsiveContainer width="100%" height="65%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{ top: 15, right: 5, left: -10, bottom:-20 }}
          >
                       <CartesianGrid vertical={false} stroke={palette.grey[800]} />

            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "11px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
         
            />
           <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+10%"
        />
        <ResponsiveContainer width="100%" height="62%">
          <BarChart
            width={500}
            height={400}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
