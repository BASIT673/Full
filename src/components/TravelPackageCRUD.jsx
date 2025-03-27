// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle, 
//   Button, 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   Input, 
//   Label, 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/';

// const TravelPackageCRUD = () => {
//   const [packages, setPackages] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'

//   // Form state
//   const [formData, setFormData] = useState({
//     packageId: '',
//     name: '',
//     category: '',
//     difficulty: 'Moderate',
//     bestSeason: '',
//     totalSpots: 0,
//     features: []
//   });

//   // Fetch packages on component mount
//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   // Fetch all packages
//   const fetchPackages = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/packages');
//       setPackages(response.data.data);
//     } catch (error) {
//       console.error('Error fetching packages:', error);
//     }
//   };

//   // Create a new package
//   const createPackage = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/packages', formData);
//       fetchPackages(); // Refresh the list
//       resetForm();
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error('Error creating package:', error);
//     }
//   };

//   // Update an existing package
//   const updatePackage = async () => {
//     try {
//       const response = await axios.patch(`http://localhost:5000/api/packages/${formData.packageId}`, formData);
//       fetchPackages(); // Refresh the list
//       resetForm();
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error('Error updating package:', error);
//     }
//   };

//   // Delete a package
//   const deletePackage = async (packageId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/packages/${packageId}`);
//       fetchPackages(); // Refresh the list
//     } catch (error) {
//       console.error('Error deleting package:', error);
//     }
//   };

//   // Open dialog for creating a new package
//   const handleCreateNew = () => {
//     setFormMode('create');
//     resetForm();
//     setIsDialogOpen(true);
//   };

//   // Open dialog for editing an existing package
//   const handleEdit = (pkg) => {
//     setFormMode('edit');
//     setFormData({
//       packageId: pkg.packageId,
//       name: pkg.name,
//       category: pkg.category,
//       difficulty: pkg.difficulty || 'Moderate',
//       bestSeason: pkg.bestSeason || '',
//       totalSpots: pkg.totalSpots || 0,
//       features: pkg.features || []
//     });
//     setIsDialogOpen(true);
//   };

//   // Reset form to initial state
//   const resetForm = () => {
//     setFormData({
//       packageId: '',
//       name: '',
//       category: '',
//       difficulty: 'Moderate',
//       bestSeason: '',
//       totalSpots: 0,
//       features: []
//     });
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formMode === 'create') {
//       createPackage();
//     } else {
//       updatePackage();
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Travel Packages Management</h1>
//         <Button onClick={handleCreateNew}>Create New Package</Button>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {packages.map((pkg) => (
//           <Card key={pkg.packageId} className="w-full">
//             <CardHeader>
//               <CardTitle>{pkg.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>Category: {pkg.category}</p>
//               <p>Difficulty: {pkg.difficulty}</p>
//               <div className="flex justify-between mt-4">
//                 <Button 
//                   variant="outline" 
//                   onClick={() => handleEdit(pkg)}
//                 >
//                   Edit
//                 </Button>
//                 <Button 
//                   variant="destructive" 
//                   onClick={() => deletePackage(pkg.packageId)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Package Create/Edit Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               {formMode === 'create' ? 'Create New Package' : 'Edit Package'}
//             </DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label>Package ID</Label>
//               <Input
//                 name="packageId"
//                 value={formData.packageId}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Name</Label>
//               <Input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Category</Label>
//               <Select
//                 name="category"
//                 value={formData.category}
//                 onValueChange={(value) => setFormData(prev => ({
//                   ...prev,
//                   category: value
//                 }))}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Last Minute Deals">Last Minute Deals</SelectItem>
//                   <SelectItem value="Guided Tours">Guided Tours</SelectItem>
//                   <SelectItem value="Group Discounts">Group Discounts</SelectItem>
//                   <SelectItem value="Seasonal Specials">Seasonal Specials</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Difficulty</Label>
//               <Select
//                 name="difficulty"
//                 value={formData.difficulty}
//                 onValueChange={(value) => setFormData(prev => ({
//                   ...prev,
//                   difficulty: value
//                 }))}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Difficulty" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Easy">Easy</SelectItem>
//                   <SelectItem value="Moderate">Moderate</SelectItem>
//                   <SelectItem value="Challenging">Challenging</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Best Season</Label>
//               <Input
//                 name="bestSeason"
//                 value={formData.bestSeason}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <Label>Total Spots</Label>
//               <Input
//                 type="number"
//                 name="totalSpots"
//                 value={formData.totalSpots}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <Button type="submit">
//               {formMode === 'create' ? 'Create Package' : 'Update Package'}
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TravelPackageCRUD;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TravelPackageCRUD = () => {
  const [packages, setPackages] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'

  // Form state
  const [formData, setFormData] = useState({
    packageId: '',
    name: '',
    category: '',
    difficulty: 'Moderate',
    bestSeason: '',
    totalSpots: 0,
    features: []
  });

  // Fetch packages on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages');
      setPackages(response.data.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const createPackage = async () => {
    try {
      await axios.post('http://localhost:5000/api/packages', formData);
      fetchPackages();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };

  const updatePackage = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/packages/${formData.packageId}`, formData);
      fetchPackages();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  const deletePackage = async (packageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/packages/${packageId}`);
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleCreateNew = () => {
    setFormMode('create');
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (pkg) => {
    setFormMode('edit');
    setFormData({
      packageId: pkg.packageId,
      name: pkg.name,
      category: pkg.category,
      difficulty: pkg.difficulty || 'Moderate',
      bestSeason: pkg.bestSeason || '',
      totalSpots: pkg.totalSpots || 0,
      features: pkg.features || []
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      packageId: '',
      name: '',
      category: '',
      difficulty: 'Moderate',
      bestSeason: '',
      totalSpots: 0,
      features: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formMode === 'create' ? createPackage() : updatePackage();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Travel Packages Management</h1>
        <button 
          onClick={handleCreateNew}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create New Package
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.packageId} className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-1">Category: {pkg.category}</p>
            <p className="text-gray-600 mb-1">Difficulty: {pkg.difficulty}</p>
            <p className="text-gray-600 mb-3">Best Season: {pkg.bestSeason || 'N/A'}</p>
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => handleEdit(pkg)}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => deletePackage(pkg.packageId)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {formMode === 'create' ? 'Create New Package' : 'Edit Package'}
              </h2>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Package ID</label>
                <input
                  type="text"
                  name="packageId"
                  value={formData.packageId}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Category</option>
                  <option value="Last Minute Deals">Last Minute Deals</option>
                  <option value="Guided Tours">Guided Tours</option>
                  <option value="Group Discounts">Group Discounts</option>
                  <option value="Seasonal Specials">Seasonal Specials</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Best Season</label>
                <input
                  type="text"
                  name="bestSeason"
                  value={formData.bestSeason}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-medium">Total Spots</label>
                <input
                  type="number"
                  name="totalSpots"
                  value={formData.totalSpots}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              >
                {formMode === 'create' ? 'Create Package' : 'Update Package'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPackageCRUD;