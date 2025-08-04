import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Vote, 
  Activity,
  Calendar,
  Target,
  Globe
} from 'lucide-react';

const Statistics = () => {
  const platformStats = [
    { name: 'Hospitals', value: 12, color: '#3b82f6' },
    { name: 'Organizations', value: 8, color: '#10b981' },
    { name: 'Active Policies', value: 15, color: '#8b5cf6' },
    { name: 'Pending Proposals', value: 3, color: '#f59e0b' }
  ];

  const hospitalsByRegion = [
    { region: 'North', hospitals: 4 },
    { region: 'South', hospitals: 3 },
    { region: 'East', hospitals: 2 },
    { region: 'West', hospitals: 3 }
  ];

  const monthlyActivity = [
    { month: 'Jan', hospitals: 8, organizations: 5, policies: 10 },
    { month: 'Feb', hospitals: 10, organizations: 6, policies: 12 },
    { month: 'Mar', hospitals: 12, organizations: 8, policies: 15 }
  ];

  const policyVotes = [
    { policy: 'Kidney Priority', yesVotes: 85, noVotes: 15 },
    { policy: 'Liver Allocation', yesVotes: 72, noVotes: 28 },
    { policy: 'Heart Protocol', yesVotes: 91, noVotes: 9 },
    { policy: 'Age Restrictions', yesVotes: 63, noVotes: 37 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Platform Statistics</h2>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights for the OrganLink platform
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
              <Building2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organizations</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
              <Vote className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">15</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">3</span> pending approval
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">142</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+23</span> this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Platform Overview Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Platform Overview</span>
              </CardTitle>
              <CardDescription>Distribution of platform entities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regional Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Hospitals by Region</span>
              </CardTitle>
              <CardDescription>Geographic distribution of hospitals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hospitalsByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hospitals" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Monthly Growth</span>
              </CardTitle>
              <CardDescription>Platform growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hospitals" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="organizations" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="policies" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Policy Voting Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Vote className="h-5 w-5" />
                <span>Policy Voting Results</span>
              </CardTitle>
              <CardDescription>Yes vs No votes for recent policies</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={policyVotes} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="policy" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="yesVotes" fill="#10b981" stackId="a" />
                  <Bar dataKey="noVotes" fill="#ef4444" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Health & Performance</span>
            </CardTitle>
            <CardDescription>Real-time system metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="text-sm font-medium text-green-700">API Response Time</div>
                <div className="text-2xl font-bold text-green-800">124ms</div>
                <div className="text-xs text-green-600">Excellent</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="text-sm font-medium text-blue-700">Database Connections</div>
                <div className="text-2xl font-bold text-blue-800">23/50</div>
                <div className="text-xs text-blue-600">Healthy</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="text-sm font-medium text-purple-700">Blockchain Sync</div>
                <div className="text-2xl font-bold text-purple-800">100%</div>
                <div className="text-xs text-purple-600">Synchronized</div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="text-sm font-medium text-orange-700">Storage Usage</div>
                <div className="text-2xl font-bold text-orange-800">67%</div>
                <div className="text-xs text-orange-600">Normal</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Statistics;