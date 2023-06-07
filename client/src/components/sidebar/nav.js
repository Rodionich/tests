import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SchoolIcon from '@mui/icons-material/School'
import PublicIcon from '@mui/icons-material/Public'
import ContactsIcon from '@mui/icons-material/Contacts'
import InfoIcon from '@mui/icons-material/Info'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'

export const menu = [
  {
    id: 1,
    page: 'Home',
    link: '/',
    icon: <HomeTwoToneIcon />,
  },
  {
    id: 2,
    page: 'Play',
    link: '/play',
    icon: <PlayCircleOutlineIcon />,
  },
  {
    id: 3,
    page: 'My Quests',
    link: '/myQuests',
    icon: <SchoolIcon />,
  },
  {
    id: 4,
    page: 'Public Quests',
    link: '/publicQuests',
    icon: <PublicIcon />,
  },

  {
    id: 5,
    page: 'Contacts',
    link: '/contacts',
    icon: <ContactsIcon />,
  },
  {
    id: 6,
    page: 'About',
    link: '/about',
    icon: <InfoIcon />,
  },
]
