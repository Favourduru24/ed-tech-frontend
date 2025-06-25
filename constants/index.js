export const navLinks = [
    {
      label: "Dashboard",
      route: "/",
      icon: "/assets/icons/dashboard.png",
    },
    {
      label: "Trainings",
      route: "/training",
      icon: "/assets/icons/training.png",
    },
    // {
    //   label: "Message",
    //   route: "/message",
    //   icon: "/icons/message.png",
    // },
    {
      label: "Feeds",
      route: "/feeds",
      icon: "/assets/icons/explore.png",
    },
    // {
    //   label: "Notification",
    //   route: "/notification",
    //   icon: "/icons/notify.png",
    // },
    // {
    //   label: "Explore",
    //   route: "/leadership",
    //   icon: "/icons/explore.png",
    // },
    {
      label: "Quizes",
      route: "/quiz",
      icon: "/assets/icons/feeds.png",
    },
    {
      label: "Profile",
      route: "/profile",
      icon: "/assets/icons/profile.png",
    },
  ];

  export const Skills = [
     {
       title: 'Today Lesson taken',
       number: '10',
       image: '/assets/images/decrement.svg',
       icon: '/icons/arrow-down-red.svg',
       subtitle: '20%',
       color: '#2923D9',
       id:'3'
     },
     {
       title: 'Total Quiz taken',
       number: '20',
       image: '/images/increment.svg',
       icon:'/assets/icons/arrow-up-green.svg',
       subtitle: '40%',
       color: '#9E4B9E',
       id:'1'
     },
     {
       title: 'Total Lesson taken',
       number: '40',
       subtitle: '30% vs last month',
       color: '#E07B38',
       id:'2'
     },
     
    //  {
    //    title: 'Total Quiz created',
    //    number: '5',
    //    icons: '/icons/globe.png',
    //    subtitle: '100% vs last month',
    //    color: '#9E4B9E',
    //    id:'4'
    //  },
  ]

  
  
  export const notify = [
    {
      title: 'Upcomming Assesment: Marketing Strategy and Basics',
      subtitle: "Your schedule arrangement on Marketing Strategy and Basics is Due today at 13:00 Dont't forget to complete it on time",
      time: '13:00'
   },
     {
      title: 'New Learning Module Available!',
      subtitle: "Your schedule arrangement on Marketing Strategy and Basics is Due today at 13:00 Dont't forget to complete it on time",
      time: '09:40'
     },
     {
      title: 'Reminder: Group Discussion Tommorrow',
      subtitle: "Your schedule arrangement on Marketing Strategy and Basics is Due today at 13:00 Dont't forget to complete it on time",
      time: 'Yesterday'
     },
     {
      title: 'Reminder: Group Discussion Tommorrow',
      subtitle: "Your schedule arrangement on Marketing Strategy and Basics is Due today at 13:00 Dont't forget to complete it on time",
      time: 'Yesterday'
     },
     {
      title: 'Reminder: Group Discussion Tommorrow',
      subtitle: "Your schedule arrangement on Marketing Strategy and Basics is Due today at 13:00 Dont't forget to complete it on time",
      time: 'Yesterday'
     }
    ]

    export const data2 = [
      {
       value: 'Mathematics',
       id: 1
        },
      {
       value: 'Chemistry',
       id: 2
        },
       {
       value: 'Physic',
       id: 3
        },
       {
       value: 'Coding',
       id: 4
        },
       {
       value: 'Biology',
       id: 5
        },
       {
       value: 'Economics',
       id: 6
        },
        {
       value: 'Biology',
       id: 7
        },
        {
       value: 'History',
       id: 8
        },
        {
       value: 'Art',
       id: 9
        },
     ]

    export const data5 = [
      {
       value: 'Beginner',
       id: 1
        },
       {
       value: 'Intermediate',
       id: 2
        },
       {
       value: 'Advance',
       id: 3
        },
       {
       value: 'Under Graduate',
       id: 4
        },
       {
       value: 'Post Graduate',
       id: 5
        },
       {
       value: 'Graduate',
       id: 6
        },
       {
       value: 'Master',
       id: 7
        },
       {
       value: 'SS1',
       id: 8
        },
       {
       value: 'SS2',
       id: 9
        },
       {
       value: 'SS3',
       id: 10
        },
     ]

     export const data6 = [
      {
       title: 'Liked Notification',
       id: 1
        },
       {
       title: 'Comm',
       id: 2
        },
       {
       title: 'Advance',
       id: 3
        },
       {
       title: 'Under Graduate',
       id: 4
        },
       {
       title: 'Post Graduate',
       id: 5
        },
       {
       title: 'Graduate',
       id: 6
        },
       {
       title: 'Master',
       id: 7
        },
       {
       title: 'SS1',
       id: 8
        },
       {
       title: 'SS2',
       id: 9
        },
       {
       title: 'SS3',
       id: 10
        },
     ]

     export const sideLinks = [
             {
               label: "Personal Information",
               icon: "/icons/menu.png",
             },
             {
               label: "My Tranings",
               icon: "/icons/menu.png",
             },
             {
               label: "My Feeds",
               icon: "/icons/menu.png",
             },
             {
               label: "My Quizes",
               icon: "/icons/menu.png",
             },
             {
               label: "My History",
               icon: "/icons/menu.png",
             }
           ];

           export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};


export const LineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
     "Thursday",
     "Friday",
     "Saturday",
     "Sunday"  
  ],
   datasets: [
     {
      label: "Your Quiz monthly progress",
      data: [5, 25, 34, 30, 70, 90, 95],
      borderColor: "#B391F0",
      backgroundColor: ["rbga(255, 99, 132, 0.2)"],
      borderWidth: 1
   },
  ],
}

  
//   export const plans = [
//     {
//       _id: 1,
//       name: "Free",
//       icon: "/assets/icons/free-plan.svg",
//       price: 0,
//       credits: 20,
//       inclusions: [
//         {
//           label: "20 Free Credits",
//           isIncluded: true,
//         },
//         {
//           label: "Basic Access to Services",
//           isIncluded: true,
//         },
//         {
//           label: "Priority Customer Support",
//           isIncluded: false,
//         },
//         {
//           label: "Priority Updates",
//           isIncluded: false,
//         },
//       ],
//     },
//     {
//       _id: 2,
//       name: "Pro Package",
//       icon: "/assets/icons/free-plan.svg",
//       price: 40,
//       credits: 120,
//       inclusions: [
//         {
//           label: "120 Credits",
//           isIncluded: true,
//         },
//         {
//           label: "Full Access to Services",
//           isIncluded: true,
//         },
//         {
//           label: "Priority Customer Support",
//           isIncluded: true,
//         },
//         {
//           label: "Priority Updates",
//           isIncluded: false,
//         },
//       ],
//     },
//     {
//       _id: 3,
//       name: "Premium Package",
//       icon: "/assets/icons/free-plan.svg",
//       price: 199,
//       credits: 2000,
//       inclusions: [
//         {
//           label: "2000 Credits",
//           isIncluded: true,
//         },
//         {
//           label: "Full Access to Services",
//           isIncluded: true,
//         },
//         {
//           label: "Priority Customer Support",
//           isIncluded: true,
//         },
//         {
//           label: "Priority Updates",
//           isIncluded: true,
//         },
//       ],
//     },
//   ];
  
//   export const transformationTypes = {
//     restore: {
//       type: "restore",
//       title: "Restore Image",
//       subTitle: "Refine images by removing noise and imperfections",
//       config: { restore: true },
//       icon: "image.svg",
//     },
//     removeBackground: {
//       type: "removeBackground",
//       title: "Background Remove",
//       subTitle: "Removes the background of the image using AI",
//       config: { removeBackground: true },
//       icon: "camera.svg",
//     },
//     fill: {
//       type: "fill",
//       title: "Generative Fill",
//       subTitle: "Enhance an image's dimensions using AI outpainting",
//       config: { fillBackground: true },
//       icon: "stars.svg",
//     },
//     remove: {
//       type: "remove",
//       title: "Object Remove",
//       subTitle: "Identify and eliminate objects from images",
//       config: {
//         remove: { prompt: "", removeShadow: true, multiple: true },
//       },
//       icon: "scan.svg",
//     },
//     recolor: {
//       type: "recolor",
//       title: "Object Recolor",
//       subTitle: "Identify and recolor objects from the image",
//       config: {
//         recolor: { prompt: "", to: "", multiple: true },
//       },
//       icon: "filter.svg",
//     },
//   };
  
//   export const aspectRatioOptions = {
//     "1:1": {
//       aspectRatio: "1:1",
//       label: "Square (1:1)",
//       width: 1000,
//       height: 1000,
//     },
//     "3:4": {
//       aspectRatio: "3:4",
//       label: "Standard Portrait (3:4)",
//       width: 1000,
//       height: 1334,
//     },
//     "9:16": {
//       aspectRatio: "9:16",
//       label: "Phone Portrait (9:16)",
//       width: 1000,
//       height: 1778,
//     },
//   };
  
//   export const defaultValues = {
//     title: "",
//     aspectRatio: "",
//     color: "",
//     prompt: "",
//     publicId: "",
//   };
  
//   export const creditFee = -1;


// jwt-decode nodemailer html email template