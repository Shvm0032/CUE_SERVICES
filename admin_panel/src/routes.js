import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
//Cources
const AllCources = React.lazy(() => import('./views/Cources/AllCources/index'))
const AddCourse = React.lazy(() => import('./views/Cources/AddNewCources/index'))
const EditCources = React.lazy(() => import('./views/Cources/EditCources/index'))

//Industary
const viewIndustary = React.lazy(() => import('./views/Industary/viewIndustary/index'))
const CatagoryIndustary = React.lazy(() => import('./views/Industary/CatagoryIndustary/index'))
const NewIndustary = React.lazy(() => import('./views/Industary/NewIndustary/index'))
// Speakers
const AllSpeakers = React.lazy(() => import('./views/Speakers/AllSpeakers/index'))
const AddSpeakers = React.lazy(() => import('./views/Speakers/AddSpeakers/index'))
const EditSpeakers = React.lazy(() => import('./views/Speakers/EditSpeakers/index'))

//orders
const AllOrders = React.lazy(() => import('./views/Orders/All Orders/index'))
const FailedOrders = React.lazy(() => import('./views/Orders/Failed Orders/index'))
// Copons
const AllCopons = React.lazy(() => import('./views/coupons/allCoupons/index'))
const AddCopon = React.lazy(() => import('./views/coupons/addNewCoupons/index'))
const EditCopons = React.lazy(() => import('./views/coupons/EditCopons/index'))
//user_message
const user_message = React.lazy(() => import('./views/User_Message/Index'))
//Suscribe
const Subscribe = React.lazy(() => import('./views/Subscribe/index'))

// add selling_option

const Selling_Option = React.lazy(() => import('./views/Selling_Option/AddSelling_option/Index'))
 const EditSelling_Option = React.lazy(() => import('./views/Selling_Option/EditSelling_option/Index'))

 //  faq 
 const Faq = React.lazy(() => import('./views/Faq/Add_catagory/Index'))
 const Add_catagory = React.lazy(() => import('./views/Faq/Add_catagory/Index'))
 const Faq_list = React.lazy(() => import('./views/Faq/Faq_list/Index'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  // Cources
  { path: '/Cources', name: 'Cources', element: AllCources, exact: true },
  { path: '/Cources/AllCources', name: 'AllCources', element: AllCources },
  { path: '/Cources/AddCourse', name: 'AddCourse', element: AddCourse },
  { path: '/Cources/EditCources', name: 'EditCources', element: EditCources },
  
  // Industary
  { path: '/Industary', name: 'Industary', element: NewIndustary, exact: true },
  { path: '/Industary/NewIndustary', name: ' NewIndustary', element: NewIndustary },
  { path: '/Industary/viewIndustary', name: 'ViewIndustary', element: viewIndustary },
  { path: '/Industary/CatagoryIndustary', name: 'Industary Catagory ', element: CatagoryIndustary },
  //Speakers
  { path: '/Speakers', name: 'Speakers', element: AllSpeakers, exact: true },
  { path: '/Speakers/AllSpeakers', name: 'All Speakers', element: AllSpeakers },
  { path: '/Speakers/AddSpeakers', name: 'Add Speakers', element: AddSpeakers },
  { path: '/Speakers/EditSpeakers/:id', name: 'EditSpeakers', element: EditSpeakers },


  //Orders
  { path: '/Orders', name: 'Orders', element: AllOrders, exact: true },
  { path: '/Orders/All Orders', name: 'All Orders', element: AllOrders },
  { path: '/Orders/Failed Orders', name: 'Faileds Orders', element: FailedOrders },

  // Copons 
  { path: '/Copons', name: 'Copons', element: AllCopons, exact: true },
  { path: '/Copons/AllCopons', name: 'All Copons', element: AllCopons },
  { path: '/Copons/AddCopon', name: 'Add Copon', element: AddCopon },
  { path: '/Copons/EditCopons/:id', name: 'EditCopons', element: EditCopons },
  
  //user_message
  { path: '/User_Message', name: 'Users_message', element: user_message, exact: true },
  { path: '/User_Message/User_Message', name: 'Users_message', element: user_message },

  //Suscribe
  { path: '/Subscribe', name: 'Subscribe', element: Subscribe, exact: true },
  { path: '/Subscribe/Subscribe', name: 'Subscribe', element: Subscribe },


// selling options

{ path: '/Selling_Option', name: 'Selling_Option', element: Selling_Option, exact: true },
{ path: '/Selling_Option/AddSelling_option', name: 'Selling_Option/AddSelling_option', element: Selling_Option },
{ path: '/Selling_Option/EditSelling_option/:id', name: 'Selling_Option/EditSelling_option', element: EditSelling_Option },


{ path: '/Faq', name: 'Faq', element: Faq, exact: true },
{ path: '/Faq/Add_catagory', name: 'Faq/Add_catagory', element: Add_catagory },
{ path: '/Faq/Faq_list', name: 'Faq/Faq_list', element: Faq_list },

]
export default routes
