import TagIcon from '@mui/icons-material/Tag'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { FC } from 'react'

import SideBlock from '../SideBlock/SideBlock'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: string[]
  isLoading: boolean
}

const TagsBlock: FC<Props> = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name: string) => (
          <a style={{ textDecoration: 'none', color: 'black' }} href={`/tags/${name}`}>
            <ListItem key={name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  )
}
export default TagsBlock
