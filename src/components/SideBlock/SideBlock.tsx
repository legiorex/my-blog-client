import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FC, ReactNode } from 'react'

import styles from './SideBlock.module.scss'

type Props = {
  title: string
  children: ReactNode
}

const SideBlock: FC<Props> = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}

export default SideBlock
