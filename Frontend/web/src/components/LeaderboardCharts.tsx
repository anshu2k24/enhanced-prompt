import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Chart config
const chartConfig = {
  users: { color: "#34ca8e" },
  newUsers: { color: "#accbee" },
  co2Saved: { color: "#6ad59d" },
  trees: { color: "#098f5f" },
  water: { color: "#65e0ac" },
};

// Dummy data - will be used if Firebase fails or during development
const dummyUserGrowthData = [
  { month: 'Jan', users: 1200, newUsers: 350, co2Saved: 2400 },
  { month: 'Feb', users: 1500, newUsers: 300, co2Saved: 3000 },
  { month: 'Mar', users: 1800, newUsers: 400, co2Saved: 4500 },
  { month: 'Apr', users: 2300, newUsers: 500, co2Saved: 6000 },
  { month: 'May', users: 2800, newUsers: 550, co2Saved: 7500 },
  { month: 'Jun', users: 3300, newUsers: 600, co2Saved: 9000 },
  { month: 'Jul', users: 3800, newUsers: 550, co2Saved: 10500 },
  { month: 'Aug', users: 4300, newUsers: 500, co2Saved: 12000 },
  { month: 'Sep', users: 4800, newUsers: 550, co2Saved: 14000 },
  { month: 'Oct', users: 5400, newUsers: 600, co2Saved: 16500 },
  { month: 'Nov', users: 6000, newUsers: 700, co2Saved: 19000 },
  { month: 'Dec', users: 6700, newUsers: 800, co2Saved: 22000 },
];

const dummyEnvironmentalImpactData = [
  { category: 'CO₂ Saved (kgs)', value: 42000 },
  { category: 'NOₓ Saved (mg)', value: 58000 },
  { category: 'Energy Saved (MWh)', value: 32000 },
  { category: 'Thermal Energy (MWh)', value: 24500 },
  { category: 'Water saved (kl)', value: 78500 },
  { category: 'Waste Reduced (kg)', value: 15600 },
];

const dummyCategoryDistributionData = [
  { name: 'CO₂ Emission Savings', value: 37 },
  { name: 'Water Conservation', value: 28 },
  { name: 'Energy Efficiency', value: 15 },
  { name: 'Waste Reduction', value: 12 },
  { name: 'NOₓ Reduction', value: 5 },
  { name: 'Other Impacts', value: 3 },
];

const LeaderboardCharts = () => {
  const [userGrowthData, setUserGrowthData] = useState(dummyUserGrowthData);
  const [environmentalImpactData, setEnvironmentalImpactData] = useState(dummyEnvironmentalImpactData);
  const [categoryDistributionData, setCategoryDistributionData] = useState(dummyCategoryDistributionData);
  const [loading, setLoading] = useState(false); // Set to false since we're using dummy data
  const [usingDummyData, setUsingDummyData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from Firebase
        const userGrowthSnapshot = await getDocs(collection(db, "userGrowth"));
        const impactSnapshot = await getDocs(collection(db, "environmentalImpact"));
        const categorySnapshot = await getDocs(collection(db, "categoryDistribution"));
        
        if (!userGrowthSnapshot.empty && !impactSnapshot.empty && !categorySnapshot.empty) {
          setUserGrowthData(userGrowthSnapshot.docs.map(doc => doc.data()));
          setEnvironmentalImpactData(impactSnapshot.docs.map(doc => doc.data()));
          setCategoryDistributionData(categorySnapshot.docs.map(doc => doc.data()));
          setUsingDummyData(false);
        } else {
          setUsingDummyData(true);
        }
      } catch (error) {
        console.error("Error fetching data, using dummy data instead:", error);
        setUsingDummyData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="growth" className="mb-8">
      {usingDummyData}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Analytics & Impact</h2>
        <TabsList>
          <TabsTrigger value="growth">User Growth</TabsTrigger>
          <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
          <TabsTrigger value="distribution">Category Distribution</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="growth">
        <Card>
          <CardHeader>
            <CardTitle>Community Growth & CO₂ Saved</CardTitle>
            <CardDescription>Monthly user growth and CO₂ emission savings</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userGrowthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartConfig.users.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartConfig.users.color} stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartConfig.co2Saved.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartConfig.co2Saved.color} stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    stroke="#888"
                    label={{ value: 'Users', angle: -90, position: 'insideLeft', offset: -5 }} 
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#888"
                    label={{ value: 'CO₂ Saved (kg)', angle: -90, position: 'insideRight', offset: 10 }} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="users" 
                    stroke={chartConfig.users.color} 
                    fillOpacity={1} 
                    fill="url(#colorUsers)" 
                    name="Total Users"
                  />
                  <Area 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="co2Saved" 
                    stroke={chartConfig.co2Saved.color} 
                    fillOpacity={1} 
                    fill="url(#colorCO2)"
                    name="CO₂ Saved (kg)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="impact">
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Total positive environmental effects from our community</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={environmentalImpactData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#888"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill={chartConfig.users.color}
                    radius={[8, 8, 0, 0]}
                    name="Amount" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="distribution">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>How users are contributing across different eco-categories</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryDistributionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#888" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    scale="band" 
                    stroke="#888" 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Percentage (%)" 
                    fill="#65e0ac"
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-lg">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default LeaderboardCharts;