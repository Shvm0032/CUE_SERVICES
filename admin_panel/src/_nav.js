import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilEducation,
  cilNotes,
  cilCash,
  cilIndustry,
  cilChatBubble,
  cilSpeedometer,
  cilStar, cilPeople,
  cilAddressBook,
  cilVoiceOverRecord,
  cilOpentype
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
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Courses',
        to: '/Cources/AllCources',
      },
      {
        component: CNavItem,
        name: 'Add New',
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
    name: 'Industries',
    to: '/Industary',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Industary',
        to: '/Industary/viewIndustary',
      },
      {
        component: CNavItem,
        name: 'Add New',
        to: '/Industary/NewIndustary',
      },
      // {
      //   component: CNavItem,
      //   name: 'Category wise list',
      //   to: '/Industary/CatagoryIndustary',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Speakers',
    to: '/Speakerss',
    icon: <CIcon icon={cilVoiceOverRecord} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All  Speaker',
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
    component: CNavItem,
    name: 'Users',
    to: '/User/AllUser',
    icon: <CIcon icon={cilPeople
} customClassName="nav-icon" />,
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
      // {
      //   component: CNavItem,
      //   name: 'Failed Orders',
      //   to: '/Orders/Failed Orders',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Pending Orders',
      //   to: '/base/cards',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Copons',
    to: '/Copons',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Copans',
        to: '/Copons/AllCopons',
      },
      {
        component: CNavItem,
        name: 'Add New',
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
        name: 'Faq catagory',
        to: '/Faq/Add_catagory',
      },
        
      {
        component: CNavItem,
        name: 'Faq Qestion',
        to: '/Faq/Faq_list',
      },

    ],
  },


  {
    component: CNavGroup,
    name: 'Selling Options',
    to: '/Selling Opection',
    icon: <CIcon icon={cilOpentype} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add New',
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
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Query',
    to: '/User_Message',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },

  
]

export default _nav
