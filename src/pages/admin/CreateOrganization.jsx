import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Users, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateOrganization = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationCode: '',
    organizationType: '',
    description: '',
    contactPersonName: '',
    contactPersonTitle: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    canPropose: false,
    canVote: false,
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name, checked) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const generateOrgCode = () => {
    const typeCode = formData.organizationType.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const code = `${typeCode}-${randomNum}`;
    setFormData({ ...formData, organizationCode: code });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      if (!formData.canPropose && !formData.canVote) {
        toast({
          title: "Error",
          description: "Organization must have at least one permission (propose or vote)",
          variant: "destructive",
        });
        return;
      }

      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      toast({
        title: "Organization Created",
        description: `${formData.organizationName} has been successfully created with code ${formData.organizationCode}`,
      });

      // Reset form or navigate
      navigate('/admin/organizations');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create organization. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/organizations')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Organizations
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Create New Organization</h2>
            <p className="text-muted-foreground">
              Add a new organization to the OrganLink platform
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Organization Information</span>
              </CardTitle>
              <CardDescription>Basic details about the organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="e.g., Heart Foundation India"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizationCode">Organization Code *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="organizationCode"
                      name="organizationCode"
                      value={formData.organizationCode}
                      onChange={handleInputChange}
                      placeholder="e.g., NGO-001"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateOrgCode}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organizationType">Organization Type *</Label>
                <Select onValueChange={(value) => handleSelectChange('organizationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngo">NGO (Non-Governmental Organization)</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="research">Research Institution</SelectItem>
                    <SelectItem value="medical">Medical Association</SelectItem>
                    <SelectItem value="advocacy">Advocacy Group</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the organization's mission and activities"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Primary contact person and communication details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                  <Input
                    id="contactPersonName"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPersonTitle">Title/Designation</Label>
                  <Input
                    id="contactPersonTitle"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Executive Director"
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@organization.org"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.organization.org"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Organization address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Set what this organization can do in the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canPropose"
                  checked={formData.canPropose}
                  onCheckedChange={(checked) => handleCheckboxChange('canPropose', checked)}
                />
                <Label htmlFor="canPropose" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Can Propose Policies
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Allow this organization to propose new organ allocation policies
              </p>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="canVote"
                  checked={formData.canVote}
                  onCheckedChange={(checked) => handleCheckboxChange('canVote', checked)}
                />
                <Label htmlFor="canVote" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Can Vote on Policies
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Allow this organization to vote on proposed policies
              </p>
            </CardContent>
          </Card>

          {/* Login Credentials */}
          <Card>
            <CardHeader>
              <CardTitle>Login Credentials</CardTitle>
              <CardDescription>Set up login credentials for the organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="e.g., ngo-001"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Strong password"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/admin/organizations')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>Creating...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Organization
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateOrganization;