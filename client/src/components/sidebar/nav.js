import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SchoolIcon from '@mui/icons-material/School'
import PublicIcon from '@mui/icons-material/Public'
import ContactsIcon from '@mui/icons-material/Contacts'
import InfoIcon from '@mui/icons-material/Info'

export const menu = [
  {
    id: 1,
    page: 'Play',
    link: '/play',
    icon: <PlayCircleOutlineIcon />,
  },
  {
    id: 2,
    page: 'My Quizes',
    link: '/myQuizes',
    icon: <SchoolIcon />,
  },
  {
    id: 3,
    page: 'Public quizes',
    link: '/publicQuizes',
    icon: <PublicIcon />,
  },

  {
    id: 4,
    page: 'Contacts',
    link: '/contacts',
    icon: <ContactsIcon />,
  },
  {
    id: 5,
    page: 'About',
    link: '/about',
    icon: <InfoIcon />,
  },
]
