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
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const HospitalManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitals] = useState([
    {
      id: 1,
      name: 'Apollo Hospital Chennai',
      code: 'CH-001',
      location: 'Chennai, Tamil Nadu',
      contactPerson: 'Dr. Raj Kumar',
      email: 'admin@apollo-chennai.com',
      phone: '+91 9876543210',
      license: 'LIC001',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Fortis Hospital Mumbai',
      code: 'MB-001',
      location: 'Mumbai, Maharashtra',
      contactPerson: 'Dr. Priya Sharma',
      email: 'admin@fortis-mumbai.com',
      phone: '+91 9876543211',
      license: 'LIC002',
      status: 'active',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'AIIMS Delhi',
      code: 'DL-001',
      location: 'New Delhi, Delhi',
      contactPerson: 'Dr. Amit Singh',
      email: 'admin@aiims-delhi.com',
      phone: '+91 9876543212',
      license: 'LIC003',
      status: 'inactive',
      createdAt: '2024-02-01'
    }
  ]);

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Hospital Management</h2>
            <p className="text-muted-foreground">
              Manage hospitals, their details, and access permissions
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Hospital</span>
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
                  placeholder="Search hospitals by name, code, or location..."
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

        {/* Hospitals Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Hospitals ({filteredHospitals.length})</CardTitle>
                <CardDescription>
                  Complete list of registered hospitals in the system
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital Details</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHospitals.map((hospital) => (
                  <TableRow key={hospital.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{hospital.name}</div>
                        <div className="text-sm text-muted-foreground">{hospital.email}</div>
                        <div className="text-sm text-muted-foreground">{hospital.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{hospital.code}</Badge>
                    </TableCell>
                    <TableCell>{hospital.contactPerson}</TableCell>
                    <TableCell>{hospital.location}</TableCell>
                    <TableCell>{getStatusBadge(hospital.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{hospital.createdAt}</TableCell>
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
                            Edit Hospital
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <KeyRound className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Hospital
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Hospitals</CardDescription>
              <CardTitle className="text-2xl">
                {hospitals.filter(h => h.status === 'active').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Inactive Hospitals</CardDescription>
              <CardTitle className="text-2xl">
                {hospitals.filter(h => h.status === 'inactive').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Hospitals</CardDescription>
              <CardTitle className="text-2xl">{hospitals.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default HospitalManagement;