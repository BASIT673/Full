// import React from 'react';

// const PremiumCertificate = () => {
//   // Certificate details
//   const certificateId = "MCF-2025-0342";
//   const issueDate = "March 3, 2025";
//   const recipientName = "Basit Yaqoob";
//   const program = "Full-Stack Development";
//   const duration = "12 weeks";
//   const startDate = "December 10, 2024";
//   const endDate = "March 1, 2025";
//   const signatory = "Mumin Chasti";
//   const designation = "Director of Engineering";

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <div className="w-full max-w-4xl relative">
//         {/* Background decorative elements */}
//         <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-purple-400 opacity-50"></div>
//         <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-purple-400 opacity-50"></div>
        
//         {/* Main certificate container */}
//         <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
//           {/* Top accent bar */}
//           <div className="h-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
          
//           {/* Certificate header */}
//           <div className="pt-12 px-12 pb-6 bg-gray-50 text-center relative">
//             <div className="absolute top-6 right-6 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
//               ID: {certificateId}
//             </div>
            
//             <div className="mx-auto w-64 h-16 mb-4 flex items-center justify-center">
//               <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">MACROFLIP</div>
//               <div className="text-sm ml-1 text-gray-500 mt-1">TECHNOLOGIES</div>
//             </div>
            
//             <h1 className="text-4xl font-black text-gray-800 tracking-tight">CERTIFICATE OF EXCELLENCE</h1>
//             <div className="w-40 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
//           </div>
          
//           {/* Certificate body */}
//           <div className="p-12 bg-white relative">
//             {/* Watermark */}
//             {/* <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
//               <div className="text-9xl font-black text-gray-100 transform -rotate-12">MACROFLIP</div>
//             </div> */}
            
//             <div className="text-center mb-10">
//               <h2 className="text-lg text-gray-500 font-medium mb-2">THIS CERTIFIES THAT</h2>
//               <h3 className="text-3xl font-bold text-gray-800 mb-2">{recipientName}</h3>
//               <p className="text-gray-600">has successfully completed the</p>
//               <p className="text-2xl font-bold text-purple-700 mt-1">{program}</p>
//               <p className="text-gray-600 mt-4">
//                 with outstanding performance and demonstrated exceptional skills across all areas of assessment
//               </p>
//             </div>
            
//             <div className="flex justify-center mb-10">
//               <div className="flex space-x-8 text-center">
//                 <div className="px-6 py-4 bg-gray-50 rounded-lg">
//                   <p className="text-sm text-gray-500 mb-1">DURATION</p>
//                   <p className="font-bold text-gray-800">{duration}</p>
//                 </div>
//                 <div className="px-6 py-4 bg-gray-50 rounded-lg">
//                   <p className="text-sm text-gray-500 mb-1">STARTED</p>
//                   <p className="font-bold text-gray-800">{startDate}</p>
//                 </div>
//                 <div className="px-6 py-4 bg-gray-50 rounded-lg">
//                   <p className="text-sm text-gray-500 mb-1">COMPLETED</p>
//                   <p className="font-bold text-gray-800">{endDate}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="border-t border-gray-200 pt-8 mt-8">
//               <div className="flex justify-between items-end">
//                 <div className="text-left">
//                   <div className="w-40 border-b-2 border-gray-800 mb-1"></div>
//                   <p className="font-bold text-gray-800">{signatory}</p>
//                   <p className="text-sm text-gray-600">{designation}</p>
//                   <p className="text-sm font-medium text-purple-700 mt-1">Macroflip Technologies</p>
//                 </div>
                
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500 mb-1">ISSUED ON</p>
//                   <p className="font-medium text-gray-800">{issueDate}</p>
//                 </div>
                
//                 <div className="w-24 h-24 flex items-center justify-center relative">
//                   <div className="absolute inset-0 rounded-full border-2 border-purple-200"></div>
//                   <div className="absolute inset-3 rounded-full border border-purple-300"></div>
//                   <div className="absolute inset-6 rounded-full border border-purple-400"></div>
//                   <div className="text-xs text-purple-800 font-bold">VERIFIED</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Certificate footer */}
//           <div className="bg-gray-50 p-6 flex justify-between items-center border-t border-gray-200">
//             <div className="text-sm text-gray-500">
//               <p>Verify this certificate at <span className="text-purple-600">verify.macroflip.com</span></p>
//             </div>
//             <div className="text-sm text-gray-500">
//               <p>Tech Hub, Innovation Park, Bangalore 560001</p>
//             </div>
//           </div>
          
//           {/* Bottom accent bar */}
//           <div className="h-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumCertificate;



import React from 'react';

const MacroflipInternshipCertificate = () => {
  // Certificate details
  const certificateId = "MCF-INT-2025-0342";
  const issueDate = "March 3, 2025";
  const recipientName = "Basit Yaqoob";
  const university = "Islamia college of Science of Sringar";
  const degree = "Bachelor of Technology in Computer Science";
  const internshipTitle = "Full-Stack Development Internship";
  const duration = "12 weeks";
  const startDate = "December 10, 2024";
  const endDate = "March 1, 2025";
  const signatory = "Mumin Chasti";
  const designation = "Chief Technology Officer";
  const projectName = "E-Commerce Platform Redesign";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="w-full max-w-4xl relative">
        {/* Background decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-teal-400 opacity-50"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-teal-400 opacity-50"></div>
        
        {/* Main certificate container */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
          {/* Top accent bar */}
          <div className="h-3 bg-gradient-to-r from-teal-600 via-cyan-500 to-indigo-500"></div>
          
          {/* Certificate header */}
          <div className="pt-12 px-12 pb-6 bg-gradient-to-b from-gray-50 to-white text-center relative">
            <div className="absolute top-6 right-6 bg-teal-50 text-teal-800 text-xs font-bold px-3 py-1 rounded-full border border-teal-100">
              Certificate ID: {certificateId}
            </div>
            
            <div className="mx-auto w-72 h-16 mb-6 flex items-center justify-center">
              <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">MACROFLIP</div>
              <div className="text-sm ml-1 text-gray-500 mt-1">TECHNOLOGIES</div>
            </div>
            
            <h1 className="text-4xl font-black text-gray-800 tracking-tight uppercase">Internship Certificate</h1>
            <div className="w-40 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4"></div>
          </div>
          
          {/* Certificate body */}
          <div className="p-12 bg-white relative">
            {/* Watermark */}
            {/* <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
              <div className="text-9xl font-black text-gray-100 transform -rotate-12">INTERNSHIP</div>
            </div>
             */}
            <div className="text-center mb-8">
              <h2 className="text-lg text-gray-500 font-medium mb-2">THIS CERTIFIES THAT</h2>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{recipientName}</h3>
              <p className="text-gray-600">{university}</p>
              <p className="text-gray-600 text-sm">{degree}</p>
              
              <div className="my-6 mx-auto max-w-xl border-t border-b border-gray-200 py-6">
                <p className="text-gray-600">has successfully completed the</p>
                <p className="text-2xl font-bold text-teal-700 mt-1 mb-2">{internshipTitle}</p>
                <p className="text-gray-600 mb-4">
                  at Macroflip Technologies with distinction and professional excellence
                </p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase mb-1">DURATION</p>
                  <p className="font-bold text-gray-800">{duration}</p>
                </div>
                <div className="text-center border-l border-r border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-1">PERIOD</p>
                  <p className="font-bold text-gray-800">{startDate} - {endDate}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase mb-1">PROJECT</p>
                  <p className="font-bold text-gray-800">{projectName}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6 text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">During this internship, the candidate demonstrated exceptional skills in:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span>Frontend development with React.js</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span>Backend architecture with Node.js</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span>Database design and optimization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span>UI/UX principles and implementation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span>API integration and development</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                  <span>Collaborative development workflows</span>
                </div>
              </div>
              <p>The intern consistently delivered high-quality work, demonstrated exceptional problem-solving abilities, and showed remarkable team collaboration skills throughout the internship period.</p>
            </div>
            
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex justify-between items-end">
                <div className="text-left">
                  {/* <div className="w-48 border-b-2 border-gray-800 mb-1"></div> */}
                  <p className="font-bold text-gray-800">{signatory}</p>
                  <p className="text-sm text-gray-600">{designation}</p>
                  <p className="text-sm font-medium text-teal-700 mt-1">Macroflip Technologies</p>
                </div>
                
                {/* <div className="text-center"> */}
                  {/* <div className="w-32 h-32 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-2 border-teal-200"></div>
                    <div className="absolute inset-3 rounded-full border border-teal-300"></div>
                    <div className="absolute inset-6 rounded-full border border-teal-400"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xs text-teal-800 font-bold">OFFICIAL SEAL</div>
                    </div> */}
                  {/* </div> */}
                {/* </div> */}
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">ISSUED ON</p>
                  <p className="font-medium text-gray-800">{issueDate}</p>
                  <div className="mt-2 p-1 bg-teal-50 border border-teal-100 rounded text-xs text-teal-800">
                    Digitally Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Certificate footer */}
          <div className="bg-slate-50 p-6 text-center border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-1">This certificate validates the successful completion of the internship program and is issued for academic and professional references.</p>
            <p className="text-xs text-gray-400">Verify this certificate at <span className="text-teal-600">info@macroflip.com </span> | Macroflip Technologies, Bucaphora, srinagar, Jammau and Kashmir </p>
          </div>
          
          {/* Bottom accent bar */}
          <div className="h-3 bg-gradient-to-r from-indigo-500 via-cyan-500 to-teal-600"></div>
        </div>
      </div>
    </div>
  );
};

export default MacroflipInternshipCertificate;