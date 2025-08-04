import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  MoreHorizontal, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  KeyRound,
  Filter,
  Vote,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const OrganizationManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations] = useState([
    {
      id: 1,
      name: 'Heart Foundation India',
      code: 'NGO-001',
      type: 'NGO',
      contactPerson: 'Dr. Sarah Johnson',
      email: 'contact@heartfoundation.org',
      phone: '+91 9876543210',
      canPropose: true,
      canVote: true,
      status: 'active',
      proposalCount: 5,
      voteCount: 23,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Ministry of Health',
      code: 'GOV-001',
      type: 'Government',
      contactPerson: 'Mr. Rajesh Kumar',
      email: 'health@gov.in',
      phone: '+91 9876543211',
      canPropose: true,
      canVote: true,
      status: 'active',
      proposalCount: 12,
      voteCount: 45,
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'Medical Research Institute',
      code: 'RES-001',
      type: 'Research',
      contactPerson: 'Dr. Priya Sharma',
      email: 'research@mri.edu',
      phone: '+91 9876543212',
      canPropose: false,
      canVote: true,
      status: 'active',
      proposalCount: 0,
      voteCount: 18,
      createdAt: '2024-02-01'
    }
  ]);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-500/20">
        Inactive
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const colors = {
      'NGO': 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      'Government': 'bg-purple-500/10 text-purple-700 border-purple-500/20',
      'Research': 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      'Medical': 'bg-green-500/10 text-green-700 border-green-500/20'
    };
    
    return (
      <Badge variant="outline" className={colors[type] || 'bg-muted text-muted-foreground'}>
        {type}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Organization Management</h2>
            <p className="text-muted-foreground">
              Manage organizations, their permissions, and policy participation
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Organization</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search organizations by name, code, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Organizations Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Organizations ({filteredOrganizations.length})</CardTitle>
                <CardDescription>
                  Complete list of registered organizations in the system
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization Details</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{org.name}</div>
                        <div className="text-sm text-muted-foreground">{org.email}</div>
                        <div className="text-sm text-muted-foreground">{org.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{org.code}</Badge>
                    </TableCell>
                    <TableCell>{getTypeBadge(org.type)}</TableCell>
                    <TableCell>{org.contactPerson}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        {org.canPropose && (
                          <Badge variant="outline" className="w-fit bg-blue-500/10 text-blue-700 border-blue-500/20">
                            <FileText className="h-3 w-3 mr-1" />
                            Can Propose
                          </Badge>
                        )}
                        {org.canVote && (
                          <Badge variant="outline" className="w-fit bg-green-500/10 text-green-700 border-green-500/20">
                            <Vote className="h-3 w-3 mr-1" />
                            Can Vote
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{org.proposalCount} proposals</div>
                        <div className="text-muted-foreground">{org.voteCount} votes cast</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(org.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Organization
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Vote className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <KeyRound className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Organization
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Organizations</CardDescription>
              <CardTitle className="text-2xl">{organizations.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Can Propose</CardDescription>
              <CardTitle className="text-2xl">
                {organizations.filter(o => o.canPropose).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Can Vote</CardDescription>
              <CardTitle className="text-2xl">
                {organizations.filter(o => o.canVote).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Proposals</CardDescription>
              <CardTitle className="text-2xl">
                {organizations.reduce((sum, o) => sum + o.proposalCount, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrganizationManagement;