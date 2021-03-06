import { Component, OnInit } from '@angular/core';
import { Breadcrumb, PageHeaderNavigationItem, PageHeaderIconMenu } from '@ux-aspects/ux-aspects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  condensed: boolean = true;

  patted :[
    {
      "serial":1,
      "name":"Loma Laroche",
      "value":200
    }
  ];

  pattedBy :[
    {
      "serial":1,
      "name":"Loma Laroche",
      "value":200
    }
  ];

  crumbs: Breadcrumb[] = [
    {
      title: 'Micro Focus',
      onClick: () => { }
    },
    {
      title: 'Pats',
      onClick: () => { }
    }
  ];

  items: PageHeaderNavigationItem[] = [
    {
      icon: 'hpe-home',
      title: 'Home'
    },
    {
      icon: 'hpe-analytics',
      title: 'Analytics',
      children: [
        {
          title: 'Bar Charts'
        },
        {
          title: 'Pie Charts',
          children: [
            {
              title: 'Daily View'
            },
            {
              title: 'Weekly View'
            },
            {
              title: 'Monthly View'
            }
          ]
        }
      ]
    }
  ];

  iconMenus: PageHeaderIconMenu[] = [
    {
      icon: 'hpe-payment-mastercard',
      label: 'Notifications. 3 new items.',
     
      dropdown: [
        {
          icon: 'hpe-payment-mastercard',
          title: 'You have 3100 Micro Pats',
          subtitle: 'Now',
          divider: true
        }
      ]
    }, {
      icon: 'hpe-notification',
      label: 'Notifications. 3 new items.',
      badge: 3,
      dropdown: [
        {
          icon: 'hpe-chat',
          title: 'You have 16 messages',
          subtitle: '4 minutes ago',
          divider: true
        },
        {
          icon: 'hpe-social-twitter',
          title: '3 New Followers',
          subtitle: '12 minutes ago',
          divider: true
        },
        {
          icon: 'hpe-cloud',
          title: 'Server Rebooted',
          subtitle: '22 minutes ago'
        }
      ]
    },
    {
      icon: 'hpe-actions',
      label: 'Actions',
      dropdown: [
        {
          header: true,
          title: 'John Doe',
          divider: true
        },
        {
          icon: 'hpe-halt',
          title: 'Pat your peer'
        },
        {
          icon: 'hpe-user-settings',
          title: 'Settings'
        },
        {
          icon: 'hpe-logout',
          title: 'Log Out'
        }
      ]
    }
  ];
}
