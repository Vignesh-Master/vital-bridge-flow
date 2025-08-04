import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { KeyRound, Search, Save, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    entityType: '',
    searchTerm: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockHospitals = [
    { id: 1, name: 'Apollo Hospital Chennai', code: 'CH-001', email: 'admin@apollo-chennai.com' },
    { id: 2, name: 'Fortis Hospital Mumbai', code: 'MB-001', email: 'admin@fortis-mumbai.com' },
    { id: 3, name: 'AIIMS Delhi', code: 'DL-001', email: 'admin@aiims-delhi.com' }
  ];

  const mockOrganizations = [
    { id: 1, name: 'Heart Foundation India', code: 'NGO-001', email: 'contact@heartfoundation.org' },
    { id: 2, name: 'Ministry of Health', code: 'GOV-001', email: 'health@gov.in' },
    { id: 3, name: 'Medical Research Institute', code: 'RES-001', email: 'research@mri.edu' }
  ];

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
    
    // Clear search results when entity type changes
    if (name === 'entityType') {
      setSearchResults([]);
      setSelectedEntity(null);
    }
  };

  const handleSearch = async () => {
    if (!formData.entityType || !formData.searchTerm) {
      toast({
        title: "Search Error",
        description: "Please select entity type and enter search term",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataSource = formData.entityType === 'hospital' ? mockHospitals : mockOrganizations;
      const results = dataSource.filter(item => 
        item.name.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(formData.searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No Results",
          description: "No entities found matching your search criteria",
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!selectedEntity) {
      toast({
        title: "Selection Required",
        description: "Please select an entity to reset password for",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Reset Successful",
        description: `Password has been reset for ${selectedEntity.name} (${selectedEntity.code})`,
      });
      
      // Reset form
      setFormData({
        entityType: '',
        searchTerm: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSearchResults([]);
      setSelectedEntity(null);
    } catch (error) {
      toast({
        title: "Reset Failed",
        description: "Failed to reset password. Please try again.",
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
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Reset Password</h2>
          <p className="text-muted-foreground">
            Reset password for hospitals or organizations
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Search Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Entity</span>
              </CardTitle>
              <CardDescription>Find the hospital or organization to reset password for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entityType">Entity Type *</Label>
                <Select onValueChange={(value) => handleSelectChange('entityType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="searchTerm">Search Term *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="searchTerm"
                    name="searchTerm"
                    value={formData.searchTerm}
                    onChange={handleInputChange}
                    placeholder="Enter name, code, or email"
                  />
                  <Button 
                    type="button" 
                    onClick={handleSearch}
                    disabled={isSearching || !formData.entityType}
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label>Search Results</Label>
                  <div className="space-y-2">
                    {searchResults.map((entity) => (
                      <div
                        key={entity.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedEntity?.id === entity.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedEntity(entity)}
                      >
                        <div className="font-medium text-foreground">{entity.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Code: {entity.code} | Email: {entity.email}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reset Password Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <KeyRound className="h-5 w-5" />
                <span>Reset Password</span>
              </CardTitle>
              <CardDescription>Set new password for the selected entity</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEntity ? (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  {/* Selected Entity Info */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium text-foreground">{selectedEntity.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Code: {selectedEntity.code}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Email: {selectedEntity.email}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password *</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
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
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      'Resetting Password...'
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Reset Password
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <KeyRound className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Search and select an entity to reset password</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ResetPassword;