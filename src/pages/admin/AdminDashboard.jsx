import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  Activity, 
  Vote, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalHospitals: 12,
    totalOrganizations: 8,
    activePolicies: 15,
    pendingProposals: 3,
    totalVotes: 142,
    systemStatus: 'healthy'
  });

  const [recentActivity] = useState([
    { id: 1, type: 'hospital', message: 'New hospital "Delhi Medical Center" created', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'organization', message: 'Organization "Heart Foundation" updated voting rights', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'policy', message: 'Policy "Kidney Allocation Priority" approved', time: '6 hours ago', status: 'success' },
    { id: 4, type: 'vote', message: 'New proposal for liver allocation received 5 votes', time: '8 hours ago', status: 'pending' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500/10 text-green-700 border-green-500/20';
      case 'info': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'info': return <Activity className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of the OrganLink platform and system management
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
              <Building2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalHospitals}</div>
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
              <div className="text-2xl font-bold text-foreground">{stats.totalOrganizations}</div>
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
              <div className="text-2xl font-bold text-foreground">{stats.activePolicies}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-purple-600">{stats.pendingProposals}</span> pending approval
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalVotes}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+23</span> this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* System Status & Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription>Current platform health and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Services</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Blockchain</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Matching</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest system updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className={`mt-0.5 p-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Building2 className="h-6 w-6" />
                <span>Add Hospital</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Add Organization</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <KeyRound className="h-6 w-6" />
                <span>Reset Password</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>View Statistics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;