import { FC } from 'react'

import styles from './UserInfo.module.scss'

type Props = {
  fullName: string
  additionalText: string
  avatarUrl?: string
}

const UserInfo: FC<Props> = ({ fullName, additionalText, avatarUrl = '/no-avatar.png' }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
export default UserInfo
