import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: ' Course',
    to: '/Cources/AddCourse',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'View All',
        to: '/Cources/AllCources',
      },
      {
        component: CNavItem,
        name: 'Add Cources',
        to: '/Cources/AddCourse',
      },
      // {
      //   component: CNavItem,
      //   name: 'EditCources',
      //   to: '/Cources/EditCources',
      // },
      
    ],
  },

  {
    component: CNavGroup,
    name: 'Industries/Categories',
    to: '/Industary',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/Industary/viewIndustary',
      },
      {
        component: CNavItem,
        name: 'Add New',
        to: '/Industary/NewIndustary',
      },
      {
        component: CNavItem,
        name: 'Category wise list',
        to: '/Industary/CatagoryIndustary',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Speakers',
    to: '/Speakerss',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/Speakers/AllSpeakers',
      },
      {
        component: CNavItem,
        name: 'Add New',
        to: '/Speakers/AddSpeakers',
      },

      // {
      //   component: CNavItem,
      //   name: 'EditSpeakers',
      //   to: '/Speakers/EditSpeakers',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/Orders',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/Orders/All Orders',
      },
      {
        component: CNavItem,
        name: 'Failed Orders',
        to: '/Orders/Failed Orders',
      },
      {
        component: CNavItem,
        name: 'Pending Orders',
        to: '/base/cards',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Copons',
    to: '/Copons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Copans',
        to: '/Copons/AllCopons',
      },
      {
        component: CNavItem,
        name: 'Add Coupans',
        to: '/Copons/AddCopon',
      },
//       {
//         component: CNavItem,
//         name: 'EditCopons',
//         to: '/Copons/EditCopons',
//       },
      

    ],
  },

  {
    component: CNavGroup,
    name: 'Faq',
    to: '/Faq',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add_catagory',
        to: '/Faq/Add_catagory',
      },
        
      {
        component: CNavItem,
        name: 'Faq_list',
        to: '/Faq/Faq_list',
      },

    ],
  },


  {
    component: CNavGroup,
    name: 'Selling Options',
    to: '/Selling Opection',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'AddSelling_Option',
        to: '/Selling_Option/AddSelling_option',
      },

      // {
      //   component: CNavItem,
      //   name: 'Edit Selling_Option',
      //   to: '/Selling_Option/EditSelling_option',
      // },
      
    ],
  },



  {
    component: CNavItem,
    name: 'Subscribers',
    to: '/Subscribe',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Query',
    to: '/User_Message',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },

  
]

export default _nav
